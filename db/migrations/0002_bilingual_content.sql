-- Every page exists in Bangla (default) and English, so course, quiz, tool and blog content gets a
-- language column. Slugs stay the same in both languages (they are the URLs); rows are keyed by
-- (lang, slug). The content tables are rebuilt from src/content on every build, so they are simply
-- recreated here.

DROP INDEX IF EXISTS quiz_by_module;
DROP INDEX IF EXISTS posts_by_date;
DROP TABLE post_tags;
DROP TABLE tags;
DROP TABLE posts;
DROP TABLE tools;
DROP TABLE quiz_questions;
DROP TABLE modules;

CREATE TABLE modules (
	lang          TEXT NOT NULL CHECK (lang IN ('en', 'bn')),
	slug          TEXT NOT NULL,
	position      INTEGER NOT NULL,
	title         TEXT NOT NULL,
	summary       TEXT NOT NULL,
	duration_min  INTEGER NOT NULL,
	preview       INTEGER NOT NULL DEFAULT 0 CHECK (preview IN (0, 1)),
	outcomes      TEXT NOT NULL DEFAULT '[]', -- JSON string[]
	lessons       TEXT NOT NULL DEFAULT '[]', -- JSON string[] (lesson titles)
	checklist     TEXT NOT NULL DEFAULT '[]', -- JSON string[]
	PRIMARY KEY (lang, slug),
	UNIQUE (lang, position)
);

CREATE TABLE quiz_questions (
	id            INTEGER PRIMARY KEY,
	lang          TEXT NOT NULL,
	module_slug   TEXT NOT NULL,
	position      INTEGER NOT NULL,
	question      TEXT NOT NULL,
	options       TEXT NOT NULL, -- JSON string[]
	answer_index  INTEGER NOT NULL,
	explanation   TEXT NOT NULL,
	UNIQUE (lang, module_slug, position),
	FOREIGN KEY (lang, module_slug) REFERENCES modules (lang, slug) ON DELETE CASCADE
);

CREATE TABLE tools (
	lang          TEXT NOT NULL CHECK (lang IN ('en', 'bn')),
	slug          TEXT NOT NULL,
	position      INTEGER NOT NULL,
	kind          TEXT NOT NULL CHECK (kind IN ('calculator', 'download')),
	title         TEXT NOT NULL,
	description   TEXT NOT NULL,
	href          TEXT NOT NULL, -- language-neutral path, e.g. /tools/pip-value-calculator
	file_format   TEXT,          -- e.g. 'CSV', 'Printable page'; NULL for calculators
	PRIMARY KEY (lang, slug)
);

CREATE TABLE posts (
	lang          TEXT NOT NULL CHECK (lang IN ('en', 'bn')),
	slug          TEXT NOT NULL,
	title         TEXT NOT NULL,
	description   TEXT NOT NULL,
	published     TEXT NOT NULL, -- ISO date
	updated       TEXT,
	reading_min   INTEGER NOT NULL,
	PRIMARY KEY (lang, slug)
);

CREATE TABLE tags (
	lang          TEXT NOT NULL CHECK (lang IN ('en', 'bn')),
	slug          TEXT NOT NULL,
	name          TEXT NOT NULL,
	PRIMARY KEY (lang, slug)
);

CREATE TABLE post_tags (
	lang          TEXT NOT NULL,
	post_slug     TEXT NOT NULL,
	tag_slug      TEXT NOT NULL,
	PRIMARY KEY (lang, post_slug, tag_slug),
	FOREIGN KEY (lang, post_slug) REFERENCES posts (lang, slug) ON DELETE CASCADE,
	FOREIGN KEY (lang, tag_slug) REFERENCES tags (lang, slug) ON DELETE CASCADE
);

CREATE INDEX quiz_by_module ON quiz_questions (lang, module_slug, position);
CREATE INDEX posts_by_date ON posts (lang, published DESC);
