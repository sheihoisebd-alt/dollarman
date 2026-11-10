import { mdsvex } from 'mdsvex';
import tailwindcss from '@tailwindcss/vite';
import adapter from '@sveltejs/adapter-vercel';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit({
			compilerOptions: {
				// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') ? undefined : true,
				// mdsvex still emits `<script context="module">` for frontmatter; harmless in Svelte 5.
				warningFilter: (warning) =>
					!(warning.code === 'script_context_deprecated' && warning.filename?.endsWith('.md'))
			},
			// Pin the function runtime so builds are reproducible regardless of the local Node version.
			// For a VPS, swap this for `@sveltejs/adapter-node` (see README).
			adapter: adapter({ runtime: 'nodejs24.x' }),
			preprocess: [mdsvex({ extensions: ['.md'] })],
			extensions: ['.svelte', '.md'],
			prerender: {
				handleHttpError: 'fail',
				handleMissingId: 'warn'
			}
		})
	]
});
