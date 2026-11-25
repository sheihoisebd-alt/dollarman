/**
 * Latest uploads from the official YouTube channel, read from its public RSS feed (no API key).
 * The feed lists the 15 newest uploads; Shorts are dropped because they are vertical.
 */
import type { YoutubeVideo } from '#lib/types.js';

/** Channel id of youtube.com/@dollar_mann. Only this channel's videos are ever shown. */
export const YOUTUBE_CHANNEL_ID = 'UCaCeKHZ4zOFcTwzqf18Yfrw';

const FEED_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${YOUTUBE_CHANNEL_ID}`;
const CACHE_MS = 30 * 60 * 1000;
const LIMIT = 8;

let cache: { at: number; videos: YoutubeVideo[] } | undefined;

const decode = (text: string) =>
	text
		.replace(/&amp;/g, '&')
		.replace(/&lt;/g, '<')
		.replace(/&gt;/g, '>')
		.replace(/&quot;/g, '"')
		.replace(/&#39;/g, "'")
		.trim();

const pick = (entry: string, pattern: RegExp) => entry.match(pattern)?.[1];

export function parseFeed(xml: string): YoutubeVideo[] {
	const videos: YoutubeVideo[] = [];
	for (const [, entry] of xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)) {
		const id = pick(entry, /<yt:videoId>([\w-]{11})<\/yt:videoId>/);
		const link = pick(entry, /<link rel="alternate" href="([^"]+)"/) ?? '';
		// The feed only belongs to our channel, but check each entry anyway
		const channel = pick(entry, /<yt:channelId>([^<]+)<\/yt:channelId>/);
		if (!id || link.includes('/shorts/')) continue;
		if (channel && !YOUTUBE_CHANNEL_ID.endsWith(channel)) continue;
		videos.push({
			id,
			title: decode(pick(entry, /<title>([^<]*)<\/title>/) ?? ''),
			published: pick(entry, /<published>([^<]+)<\/published>/) ?? '',
			views: Number(pick(entry, /<media:statistics views="(\d+)"/) ?? 0)
		});
	}
	return videos.slice(0, LIMIT);
}

/** Never throws: an empty list just hides the section. */
export async function getLatestVideos(fetcher: typeof fetch = fetch): Promise<YoutubeVideo[]> {
	if (cache && Date.now() - cache.at < CACHE_MS) return cache.videos;
	try {
		const res = await fetcher(FEED_URL, { signal: AbortSignal.timeout(8000) });
		if (!res.ok) throw new Error(`YouTube feed responded ${res.status}`);
		const videos = parseFeed(await res.text());
		if (videos.length) cache = { at: Date.now(), videos };
		return videos.length ? videos : (cache?.videos ?? []);
	} catch (error) {
		console.error('[youtube]', error);
		return cache?.videos ?? [];
	}
}
