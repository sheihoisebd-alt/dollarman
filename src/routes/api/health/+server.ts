import { stats } from '#lib/server/db.js';
import type { RequestHandler } from './$types';

// Rendered on every request, so it proves the bundled SQLite file opens at runtime on Vercel.
export const prerender = false;

export const GET: RequestHandler = async () => {
	try {
		return Response.json(
			{ ok: true, node: process.version, database: await stats() },
			{ headers: { 'cache-control': 'no-store' } }
		);
	} catch (error) {
		console.error('[health]', error);
		return Response.json({ ok: false }, { status: 500, headers: { 'cache-control': 'no-store' } });
	}
};
