import { getLatestVideos } from '#lib/server/youtube.js';
import type { RequestHandler } from './$types';

// Runs on request so new uploads appear without a redeploy; the CDN caches it for 30 minutes.
export const prerender = false;

export const GET: RequestHandler = async ({ fetch }) => {
	const videos = await getLatestVideos(fetch);
	return Response.json(videos, {
		headers: {
			'cache-control': videos.length
				? 'public, max-age=300, s-maxage=1800, stale-while-revalidate=86400'
				: 'no-store'
		}
	});
};
