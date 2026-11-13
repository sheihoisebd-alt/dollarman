import { PUBLIC_SITE_URL } from '$app/env/public';
import { TELEGRAM_URL } from '#lib/attribution.svelte.js';

export const site = {
	name: 'Dollar Man Learning',
	url: PUBLIC_SITE_URL,
	description:
		'Learn a valuable new skill from zero, free for a limited time: step-by-step lessons, live classes on Telegram, free tools and a supportive community.',
	// Default social share image (1200×630). Replace static/og-image.png with a designed banner any time.
	ogImage: '/og-image.png' as string | null,
	// PLACEHOLDER: paste the Facebook Page URL, e.g. 'https://www.facebook.com/dollarmanlearning'.
	// The footer icon and the Organization `sameAs` schema appear once this is set.
	facebookUrl: null as string | null,
	// Home page showcase. Drop a new photo in static/showcase/ and point featuredImage at it.
	showcase: {
		// PLACEHOLDER: the YouTube video id of the intro video (the part after watch?v=). While it is
		// null the big card shows the photo only, with no play button.
		introVideoId: null as string | null,
		featuredImage: '/instructor.jpg'
	},
	// PLACEHOLDER LINKS: "/" until the real channel URLs are in, e.g. 'https://www.youtube.com/@name'.
	// Used by the "connect with us" cards; a "/" link shows the platform name instead of a handle.
	socials: {
		youtube: '/' as string,
		tiktok: '/' as string,
		instagram: '/' as string
	},
	// PLACEHOLDER FIGURES: replace the YouTube, Telegram and student numbers with your real ones
	// before launch (7+ years is confirmed).
	// Shown in the stats band under the home showcase; labels are in i18n.ts (home.stats).
	stats: [
		{ key: 'youtube', icon: 'youtube', value: '100k+' },
		{ key: 'telegram', icon: 'telegram', value: '25k+' },
		{ key: 'students', icon: 'students', value: '5k+' },
		{ key: 'years', icon: 'award', value: '7+' }
	] as const,
	// PLACEHOLDER: support contact shown on the legal pages.
	contactEmail: 'contact@dollarmanlearning.com'
};

/** Official profiles, used for the Organization `sameAs` schema. */
export const socialProfiles = () =>
	[site.facebookUrl, TELEGRAM_URL].filter(
		(url): url is string => !!url && !url.endsWith('/YOUR_CHANNEL')
	);

export const absoluteUrl = (pathname: string) => new URL(pathname, `${site.url}/`).href;
