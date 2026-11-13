<script lang="ts">
	import { page } from '$app/state';
	import { langFromPath } from '#lib/i18n.js';
	import { href } from '#lib/paths.svelte.js';

	const lang = $derived(langFromPath(page.url.pathname));

	const copy = {
		en: {
			error: 'Error',
			notFound: 'We could not find that page',
			broken: 'Something went wrong',
			text: 'Try the free course or go back to the home page.',
			home: 'Home',
			course: 'Free course'
		},
		bn: {
			error: 'ত্রুটি',
			notFound: 'পেজটা খুঁজে পাওয়া গেল না',
			broken: 'কিছু একটা গোলমাল হয়েছে',
			text: 'ফ্রি কোর্সটা দেখতে পারেন, অথবা হোম পেজে ফিরে যান।',
			home: 'হোম পেজ',
			course: 'ফ্রি কোর্স'
		}
	};
	const c = $derived(copy[lang]);
</script>

<svelte:head>
	<title>{page.status} | Dollar Man Learning</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<div class="container-page max-w-2xl py-20 text-center">
	<p class="text-sm font-semibold text-gold-300">{c.error} {page.status}</p>
	<h1 class="mt-2 text-3xl font-bold text-ink">
		{page.status === 404 ? c.notFound : c.broken}
	</h1>
	<p class="mt-3 text-body">{c.text}</p>
	<div class="mt-8 flex flex-wrap justify-center gap-3">
		<a
			href={href(lang, '/')}
			class="btn-gold inline-flex min-h-12 items-center rounded-xl px-5 font-semibold">{c.home}</a
		>
		<a
			href={href(lang, '/course')}
			class="inline-flex min-h-12 items-center rounded-xl border border-line-strong px-5 font-semibold text-ink"
			>{c.course}</a
		>
	</div>
</div>
