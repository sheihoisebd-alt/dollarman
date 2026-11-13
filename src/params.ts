import { defineParams } from '@sveltejs/kit/params';

export const params = defineParams({
	// Bangla is the default and lives at the root; English pages sit under /en.
	lang: (param) => (param === 'en' ? param : undefined)
});
