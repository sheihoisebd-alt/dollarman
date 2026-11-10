// Apply pending migrations to an existing database (useful on a VPS with a persistent disk).
// Usage: npm run db:migrate
import fs from 'node:fs';
import path from 'node:path';
import { Database, dbPath, migrate } from './sqlite.ts';

fs.mkdirSync(path.dirname(dbPath), { recursive: true });
const db = new Database(dbPath);
db.exec('PRAGMA foreign_keys = ON');
console.log(`Migrating ${path.relative(process.cwd(), dbPath)}`);
migrate(db);
db.close();
