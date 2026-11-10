// Shared helpers for the build-time scripts (plain Node, no Vite).
import sqlite from 'node:sqlite';
import fs from 'node:fs';
import path from 'node:path';

// `Database` is the current name (Node ≥ 25.7); `DatabaseSync` is the older, still-supported alias.
export const Database =
	(sqlite as unknown as { Database?: typeof sqlite.DatabaseSync }).Database ?? sqlite.DatabaseSync;
export type Db = InstanceType<typeof sqlite.DatabaseSync>;

export const root = path.resolve(import.meta.dirname, '..');
export const migrationsDir = path.join(root, 'db/migrations');
export const dbPath = path.resolve(root, process.env.DATABASE_PATH || 'data/content.db');

/** Apply any migrations in db/migrations that have not been applied yet. */
export function migrate(db: Db) {
	db.exec(`CREATE TABLE IF NOT EXISTS schema_migrations (
		name TEXT PRIMARY KEY,
		applied_at TEXT NOT NULL DEFAULT (datetime('now'))
	)`);

	const applied = new Set(
		db
			.prepare('SELECT name FROM schema_migrations')
			.all()
			.map((row) => String(row.name))
	);

	const files = fs
		.readdirSync(migrationsDir)
		.filter((f) => f.endsWith('.sql'))
		.sort();
	for (const file of files) {
		if (applied.has(file)) continue;
		const sql = fs.readFileSync(path.join(migrationsDir, file), 'utf8');
		db.exec('BEGIN');
		try {
			db.exec(sql);
			db.prepare('INSERT INTO schema_migrations (name) VALUES (?)').run(file);
			db.exec('COMMIT');
			console.log(`  applied ${file}`);
		} catch (error) {
			db.exec('ROLLBACK');
			throw error;
		}
	}
}
