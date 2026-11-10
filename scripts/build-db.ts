// Rebuilds the read-only content database from src/content/** (Markdown + JSON).
// Runs before `vite dev` and `vite build`. Usage: npm run db:build
import fs from 'node:fs';
import path from 'node:path';
import { Database, dbPath, migrate, root } from './sqlite.ts';

const contentDir = path.join(root, 'src/content');

type ModuleJson = {
	slug: string;
	title: string;
	summary: string;
	durationMin: number;
	preview?: boolean;
	outcomes: string[];
	lessons: string[];
	checklist: string[];
};
type QuizJson = Record<
	string,
	{ question: string; options: string[]; answer: number; explanation: string }[]
>;
type ToolJson = {
	slug: string;
	kind: 'calculator' | 'download';
	title: string;
	description: string;
	href: string;
	fileFormat?: string;
};
type FaqJson = Record<'en' | 'bn', { q: string; a: string }[]>;

const readJson = <T>(file: string): T =>
	JSON.parse(fs.readFileSync(path.join(contentDir, file), 'utf8')) as T;

/** Minimal frontmatter reader: `key: value`, quoted strings and `[a, b]` lists. */
function frontmatter(source: string): { data: Record<string, string | string[]>; body: string } {
	const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(source);
	if (!match) return { data: {}, body: source };
	const unquote = (s: string) => s.trim().replace(/^(['"])(.*)\1$/, '$2');
	const data: Record<string, string | string[]> = {};
	for (const line of match[1].split(/\r?\n/)) {
		const i = line.indexOf(':');
		if (i === -1) continue;
		const key = line.slice(0, i).trim();
		const raw = line.slice(i + 1).trim();
		data[key] = raw.startsWith('[')
			? raw.slice(1, -1).split(',').map(unquote).filter(Boolean)
			: unquote(raw);
	}
	return { data, body: source.slice(match[0].length) };
}

function required(data: Record<string, unknown>, key: string, file: string): string {
	const value = data[key];
	if (typeof value !== 'string' || !value) throw new Error(`${file}: missing frontmatter "${key}"`);
	return value;
}

// ── Build ────────────────────────────────────────────────────────────────────
fs.mkdirSync(path.dirname(dbPath), { recursive: true });
for (const suffix of ['', '-wal', '-shm', '-journal']) fs.rmSync(dbPath + suffix, { force: true });

const db = new Database(dbPath);
db.exec('PRAGMA foreign_keys = ON');
migrate(db);

db.exec('BEGIN');

const modules = readJson<ModuleJson[]>('course/modules.json');
const insertModule = db.prepare(
	`INSERT INTO modules (slug, position, title, summary, duration_min, preview, outcomes, lessons, checklist)
	 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
);
modules.forEach((m, i) => {
	if (!fs.existsSync(path.join(contentDir, 'course', `${m.slug}.md`))) {
		throw new Error(`course/modules.json: no Markdown file for "${m.slug}"`);
	}
	insertModule.run(
		m.slug,
		i + 1,
		m.title,
		m.summary,
		m.durationMin,
		// Module 1 is always previewable.
		i === 0 || m.preview ? 1 : 0,
		JSON.stringify(m.outcomes),
		JSON.stringify(m.lessons),
		JSON.stringify(m.checklist)
	);
});

const quizzes = readJson<QuizJson>('course/quizzes.json');
const insertQuestion = db.prepare(
	`INSERT INTO quiz_questions (module_slug, position, question, options, answer_index, explanation)
	 VALUES (?, ?, ?, ?, ?, ?)`
);
for (const [slug, questions] of Object.entries(quizzes)) {
	questions.forEach((q, i) => {
		if (q.answer < 0 || q.answer >= q.options.length)
			throw new Error(`quiz ${slug}#${i}: bad answer`);
		insertQuestion.run(slug, i + 1, q.question, JSON.stringify(q.options), q.answer, q.explanation);
	});
}

const insertTool = db.prepare(
	`INSERT INTO tools (slug, position, kind, title, description, href, file_format) VALUES (?, ?, ?, ?, ?, ?, ?)`
);
readJson<ToolJson[]>('tools.json').forEach((t, i) =>
	insertTool.run(t.slug, i + 1, t.kind, t.title, t.description, t.href, t.fileFormat ?? null)
);

const faqs = readJson<FaqJson>('faq.json');
const insertFaq = db.prepare(
	`INSERT INTO faqs (lang, position, question, answer) VALUES (?, ?, ?, ?)`
);
for (const lang of ['en', 'bn'] as const) {
	faqs[lang].forEach((f, i) => insertFaq.run(lang, i + 1, f.q, f.a));
}

const tagNames = readJson<Record<string, string>>('blog/tags.json');
const insertTag = db.prepare(`INSERT INTO tags (slug, name) VALUES (?, ?)`);
for (const [slug, name] of Object.entries(tagNames)) insertTag.run(slug, name);

const insertPost = db.prepare(
	`INSERT INTO posts (slug, title, description, published, updated, reading_min) VALUES (?, ?, ?, ?, ?, ?)`
);
const insertPostTag = db.prepare(`INSERT INTO post_tags (post_slug, tag_slug) VALUES (?, ?)`);
const blogDir = path.join(contentDir, 'blog');
let postCount = 0;
for (const file of fs.readdirSync(blogDir).filter((f) => f.endsWith('.md'))) {
	const slug = file.replace(/\.md$/, '');
	const { data, body } = frontmatter(fs.readFileSync(path.join(blogDir, file), 'utf8'));
	if (data.draft === 'true') continue;
	const words = body.split(/\s+/).filter(Boolean).length;
	insertPost.run(
		slug,
		required(data, 'title', file),
		required(data, 'description', file),
		required(data, 'published', file),
		typeof data.updated === 'string' ? data.updated : null,
		Math.max(1, Math.round(words / 200))
	);
	for (const tag of Array.isArray(data.tags) ? data.tags : []) {
		if (!(tag in tagNames))
			throw new Error(`${file}: unknown tag "${tag}" (add it to blog/tags.json)`);
		insertPostTag.run(slug, tag);
	}
	postCount++;
}

db.exec('COMMIT');

// Keep a human-readable snapshot of the full schema in the repo.
const schema = db
	.prepare(
		`SELECT sql FROM sqlite_master WHERE sql IS NOT NULL AND name NOT LIKE 'sqlite_%' ORDER BY type DESC, name`
	)
	.all()
	.map((row) => `${row.sql};`)
	.join('\n\n');
fs.writeFileSync(
	path.join(root, 'db/schema.sql'),
	`-- GENERATED by scripts/build-db.ts from db/migrations. Do not edit by hand.\n\n${schema}\n`
);

db.exec('VACUUM');
db.close();

console.log(
	`Built ${path.relative(root, dbPath)}: ${modules.length} modules, ${postCount} posts, ` +
		`${faqs.en.length}+${faqs.bn.length} FAQs`
);
