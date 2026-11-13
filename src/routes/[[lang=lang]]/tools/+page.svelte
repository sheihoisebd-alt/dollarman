<script lang="ts">
	import { revealChildren } from '#lib/motion.js';
	import { href } from '#lib/paths.svelte.js';
	import Icon from '#lib/components/Icon.svelte';
	import Seo from '#lib/components/Seo.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	const lang = $derived(data.lang);

	const copy = {
		en: {
			seoTitle: 'Free trading tools and calculators',
			seoDescription:
				'Free position-size, risk/reward and pip value calculators for beginner traders, plus a trading journal template and cheat-sheet pack.',
			title: 'Free tools and downloads',
			intro:
				'Simple calculators that work on your phone, and templates to help you practise. All free, no sign-up.',
			calculators: 'Calculators',
			downloads: 'Downloads'
		},
		bn: {
			seoTitle: 'ফ্রি ট্রেডিং টুলস আর ক্যালকুলেটর',
			seoDescription:
				'নতুন ট্রেডারদের জন্য ফ্রি পজিশন সাইজ, রিস্ক/রিওয়ার্ড আর পিপ ভ্যালু ক্যালকুলেটর। সাথে ট্রেডিং জার্নাল টেমপ্লেট আর চিট-শিট।',
			title: 'ফ্রি টুলস আর ডাউনলোড',
			intro:
				'ফোনেই চলে এমন সহজ ক্যালকুলেটর, আর প্র্যাকটিসে কাজে লাগার মতো টেমপ্লেট। সব ফ্রি, কোনো সাইন-আপ লাগবে না।',
			calculators: 'ক্যালকুলেটর',
			downloads: 'ডাউনলোড'
		}
	};
	const c = $derived(copy[lang]);
</script>

<Seo title={c.seoTitle} description={c.seoDescription} path="/tools" />

<div class="container-page py-10 sm:py-14">
	<h1 class="text-4xl font-extrabold tracking-tight text-ink">{c.title}</h1>
	<p class="mt-3 max-w-2xl text-lg text-body">{c.intro}</p>

	<h2 class="mt-10 text-2xl font-bold text-ink">{c.calculators}</h2>
	<ul {@attach revealChildren()} class="mt-4 grid gap-4 md:grid-cols-3">
		{#each data.calculators as tool (tool.slug)}
			<li>
				<a
					href={href(lang, tool.href)}
					class="flex h-full flex-col rounded-2xl border border-line p-5 hover:border-gold-400/60 hover:shadow-md"
				>
					<Icon name="calculator" class="size-7 text-gold-300" />
					<span class="mt-3 font-semibold text-ink">{tool.title}</span>
					<span class="mt-1.5 text-body">{tool.description}</span>
				</a>
			</li>
		{/each}
	</ul>

	<h2 class="mt-12 text-2xl font-bold text-ink">{c.downloads}</h2>
	<ul {@attach revealChildren()} class="mt-4 grid gap-4 md:grid-cols-2">
		{#each data.downloads as tool (tool.slug)}
			<li>
				<a
					href={href(lang, '/downloads')}
					class="flex h-full gap-4 rounded-2xl border border-line p-5 hover:border-gold-400/60 hover:shadow-md"
				>
					<Icon name="file" class="size-7 shrink-0 text-gold-300" />
					<span>
						<span class="block font-semibold text-ink">{tool.title}</span>
						<span class="mt-1 block text-body">{tool.description}</span>
						<span class="mt-2 block text-sm text-muted">{tool.fileFormat}</span>
					</span>
				</a>
			</li>
		{/each}
	</ul>
</div>
