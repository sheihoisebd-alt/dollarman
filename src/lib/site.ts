import { PUBLIC_SITE_URL } from '$app/env/public';

export const site = {
	name: 'Dollar Man Learning',
	url: PUBLIC_SITE_URL,
	tagline: 'Learn a new skill from zero, free for a limited time.',
	description:
		'Learn a valuable new skill from zero, free for a limited time: step-by-step lessons, live classes on Telegram, free tools and a supportive community.',
	// PLACEHOLDER: add a 1200×630 PNG at static/og-image.png, then set this to '/og-image.png'.
	ogImage: null as string | null,
	// PLACEHOLDER: support contact shown on the legal pages.
	contactEmail: '[CONTACT EMAIL]'
};

export const absoluteUrl = (pathname: string) => new URL(pathname, `${site.url}/`).href;
