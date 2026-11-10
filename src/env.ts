import { defineEnvVars } from '@sveltejs/kit/env';

/** Optional string: empty or missing becomes `undefined`. */
const optional = (value: string | undefined) => (value ? value : undefined);

export const variables = defineEnvVars({
	// ── Public, inlined at build time (prerendered pages need them) ─────────
	PUBLIC_SITE_URL: {
		public: true,
		static: true,
		description: 'Canonical site origin, no trailing slash, e.g. https://dollarmanlearning.com',
		schema: (value) => (value || 'https://dollarmanlearning.com').replace(/\/$/, '')
	},
	PUBLIC_TELEGRAM_CHANNEL: {
		public: true,
		static: true,
		description:
			'Telegram channel username, e.g. dollarman4178. "@dollarman4178" and "https://t.me/dollarman4178" also work.',
		schema: (value) =>
			optional(
				value
					?.trim()
					.replace(/^(https?:\/\/)?(t\.me|telegram\.me)\//i, '')
					.replace(/^@/, '')
					.replace(/[/?#].*$/, '')
			)
	},
	PUBLIC_META_PIXEL_ID: {
		public: true,
		static: true,
		description: 'Meta Pixel ID. Leave empty to disable the Pixel entirely.',
		schema: optional
	},

	// ── Private, read at runtime ────────────────────────────────────────────
	META_CAPI_ACCESS_TOKEN: {
		description: 'Meta Conversions API access token (Events Manager → Settings).',
		schema: optional
	},
	META_API_VERSION: {
		description: 'Graph API version for the Conversions API, e.g. v24.0',
		schema: (value) => value || 'v24.0'
	},
	META_TEST_EVENT_CODE: {
		description: 'Optional Events Manager test code (TEST12345). Remove in production.',
		schema: optional
	},
	DATABASE_PATH: {
		description: 'Path to the SQLite content database. Default: data/content.db',
		schema: (value) => value || 'data/content.db'
	},
	DATABASE_READONLY: {
		description:
			'Set to "false" only on a host with a persistent disk (VPS). Always read-only on Vercel.',
		schema: (value) => value !== 'false'
	}
});
