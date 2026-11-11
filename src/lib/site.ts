import { PUBLIC_SITE_URL } from '$app/env/public';
import { TELEGRAM_URL } from '#lib/attribution.svelte.js';

export const site = {
	name: 'Dollar Man Learning',
	url: PUBLIC_SITE_URL,
	tagline: 'Learn a new skill from zero, free for a limited time.',
	description:
		'Learn a valuable new skill from zero, free for a limited time: step-by-step lessons, live classes on Telegram, free tools and a supportive community.',
	// Default social share image (1200×630). Replace static/og-image.png with a designed banner any time.
	ogImage: '/og-image.png' as string | null,
	// PLACEHOLDER: paste the Facebook Page URL, e.g. 'https://www.facebook.com/dollarmanlearning'.
	// The footer icon and the Organization `sameAs` schema appear once this is set.
	facebookUrl: null as string | null,
	// PLACEHOLDER: support contact shown on the legal pages.
	contactEmail: 'contact@dollarmanlearning.com'
};

/** Official profiles, used for the Organization `sameAs` schema. */
export const socialProfiles = () =>
	[site.facebookUrl, TELEGRAM_URL].filter(
		(url): url is string => !!url && !url.endsWith('/YOUR_CHANNEL')
	);

export const absoluteUrl = (pathname: string) => new URL(pathname, `${site.url}/`).href;
