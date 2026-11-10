/**
 * The only module that touches SQLite.
 *
 * - Content is generated at build time by `scripts/build-db.ts` (see README).
 * - Reads: `readDb()` always opens the file read-only.
 * - Writes: `writeDb()` is refused unless DATABASE_READONLY=false (only on a host with a
 *   persistent disk, e.g. a VPS volume). Vercel's filesystem is read-only, so never enable it there.
 */
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import sqlite from 'node:sqlite';
import { read } from '$app/server';
import { DATABASE_PATH, DATABASE_READONLY } from '$app/env/private';
// Importing the file makes SvelteKit ship it as a server asset, so `read()` can find it inside a
// serverless function, where the project files are not on disk.
import bundledDb from '../../../data/content.db?url';
import type { Faq, Lang, Module, Post, QuizQuestion, Tool } from '#lib/types.js';

type Db = InstanceType<typeof sqlite.DatabaseSync>;
// `Database` is the current name (Node ≥ 25.7); `DatabaseSync` is the older, still-supported alias.
const Database =
	(sqlite as unknown as { Database?: typeof sqlite.DatabaseSync }).Database ?? sqlite.DatabaseSync;

let reader: Promise<Db> | undefined;
let writer: Db | undefined;

/** Locate the database file: the configured path if present, else a /tmp copy of the bundled asset. */
async function resolveFile(): Promise<string> {
	const configured = path.resolve(DATABASE_PATH);
	if (fs.existsSync(configured)) return configured;

	const copy = path.join(os.tmpdir(), 'dollarman-content.db');
	if (!fs.existsSync(copy)) {
		const bytes = new Uint8Array(await read(bundledDb).arrayBuffer());
		const partial = `${copy}.${process.pid}.tmp`;
		fs.writeFileSync(partial, bytes);
		fs.renameSync(partial, copy);
	}
	return copy;
}

export function readDb(): Promise<Db> {
	reader ??= resolveFile().then((file) => new Database(file, { readOnly: true }));
	return reader;
}

export function writeDb(): Db {
	if (DATABASE_READONLY) {
		throw new Error('Database writes are disabled (DATABASE_READONLY is not "false").');
	}
	writer ??= new Database(path.resolve(DATABASE_PATH));
	writer.exec('PRAGMA foreign_keys = ON; PRAGMA journal_mode = WAL;');
	return writer;
}

// ── Typed read queries ───────────────────────────────────────────────────────

type Row = Record<string, unknown>;

const toModule = (r: Row): Module => ({
	slug: String(r.slug),
	position: Number(r.position),
	title: String(r.title),
	summary: String(r.summary),
	durationMin: Number(r.duration_min),
	preview: r.preview === 1,
	outcomes: JSON.parse(String(r.outcomes)),
	lessons: JSON.parse(String(r.lessons)),
	checklist: JSON.parse(String(r.checklist))
});

const toPost = (r: Row): Post => ({
	slug: String(r.slug),
	title: String(r.title),
	description: String(r.description),
	published: String(r.published),
	updated: r.updated == null ? null : String(r.updated),
	readingMin: Number(r.reading_min),
	tags: JSON.parse(String(r.tags))
});

const POST_SELECT = `
	SELECT p.*, COALESCE(
		(SELECT json_group_array(json_object('slug', t.slug, 'name', t.name))
		 FROM post_tags pt JOIN tags t ON t.slug = pt.tag_slug WHERE pt.post_slug = p.slug),
		'[]') AS tags
	FROM posts p`;

export async function listModules(): Promise<Module[]> {
	const db = await readDb();
	return (db.prepare('SELECT * FROM modules ORDER BY position').all() as Row[]).map(toModule);
}

export async function getModule(slug: string): Promise<Module | undefined> {
	const db = await readDb();
	const row = db.prepare('SELECT * FROM modules WHERE slug = ?').get(slug) as Row | undefined;
	return row && toModule(row);
}

export async function listQuiz(moduleSlug: string): Promise<QuizQuestion[]> {
	const db = await readDb();
	const rows = db
		.prepare('SELECT * FROM quiz_questions WHERE module_slug = ? ORDER BY position')
		.all(moduleSlug) as Row[];
	return rows.map((r) => ({
		question: String(r.question),
		options: JSON.parse(String(r.options)),
		answerIndex: Number(r.answer_index),
		explanation: String(r.explanation)
	}));
}

export async function listTools(kind?: Tool['kind']): Promise<Tool[]> {
	const db = await readDb();
	const rows = (
		kind
			? db.prepare('SELECT * FROM tools WHERE kind = ? ORDER BY position').all(kind)
			: db.prepare('SELECT * FROM tools ORDER BY position').all()
	) as Row[];
	return rows.map((r) => ({
		slug: String(r.slug),
		kind: r.kind as Tool['kind'],
		title: String(r.title),
		description: String(r.description),
		href: String(r.href),
		fileFormat: r.file_format == null ? null : String(r.file_format)
	}));
}

export async function listPosts(tag?: string): Promise<Post[]> {
	const db = await readDb();
	const rows = (
		tag
			? db
					.prepare(
						`${POST_SELECT} WHERE EXISTS (SELECT 1 FROM post_tags WHERE post_slug = p.slug AND tag_slug = ?)
						 ORDER BY p.published DESC`
					)
					.all(tag)
			: db.prepare(`${POST_SELECT} ORDER BY p.published DESC`).all()
	) as Row[];
	return rows.map(toPost);
}

export async function getPost(slug: string): Promise<Post | undefined> {
	const db = await readDb();
	const row = db.prepare(`${POST_SELECT} WHERE p.slug = ?`).get(slug) as Row | undefined;
	return row && toPost(row);
}

export async function listTags(): Promise<{ slug: string; name: string; count: number }[]> {
	const db = await readDb();
	const rows = db
		.prepare(
			`SELECT t.slug, t.name, COUNT(pt.post_slug) AS count FROM tags t
			 JOIN post_tags pt ON pt.tag_slug = t.slug GROUP BY t.slug ORDER BY t.name`
		)
		.all() as Row[];
	return rows.map((r) => ({ slug: String(r.slug), name: String(r.name), count: Number(r.count) }));
}

export async function listFaqs(lang: Lang): Promise<Faq[]> {
	const db = await readDb();
	const rows = db
		.prepare('SELECT question, answer FROM faqs WHERE lang = ? ORDER BY position')
		.all(lang) as Row[];
	return rows.map((r) => ({ question: String(r.question), answer: String(r.answer) }));
}

/** Row counts, used by /api/health to prove the bundled database opens at runtime. */
export async function stats() {
	const db = await readDb();
	const count = (table: string) =>
		Number((db.prepare(`SELECT COUNT(*) AS n FROM ${table}`).get() as Row).n);
	return {
		modules: count('modules'),
		posts: count('posts'),
		faqs: count('faqs'),
		tools: count('tools')
	};
}
