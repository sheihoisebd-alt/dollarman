<script lang="ts">
	import { reveal, revealChildren } from '#lib/motion.js';
	import { asset } from '$app/paths';
	import type { AssetPath } from '$app/types';
	import { t } from '#lib/i18n.js';
	import { href } from '#lib/paths.svelte.js';
	import Icon from '#lib/components/Icon.svelte';
	import Seo from '#lib/components/Seo.svelte';
	import TelegramButton from '#lib/components/TelegramButton.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	const lang = $derived(data.lang);

	const copy = {
		en: {
			seoTitle: 'Free trading journal and cheat-sheet pack',
			seoDescription:
				'Download a free trading journal template for Excel or Google Sheets and a printable beginner trading cheat-sheet.',
			title: 'Free downloads',
			intro: 'Templates to help you practise with structure. Free, no email needed.',
			format: 'Format:',
			download: 'Download',
			open: 'Open',
			howTitle: 'How to use the trading journal',
			steps: [
				'Download the CSV file and open it in Excel, or in Google Sheets with File → Import.',
				'Log every demo trade: date, pair, direction, entry, stop-loss, target, size, result and a short note about why you took it.',
				'Once a week, review your journal and write down one thing to improve.'
			],
			ctaTitle: 'Get feedback on your journal',
			ctaText: 'Share your weekly review in the community and learn from other beginners.'
		},
		bn: {
			seoTitle: 'ফ্রি ট্রেডিং জার্নাল আর চিট-শিট',
			seoDescription:
				'Excel বা Google Sheets-এর জন্য ফ্রি ট্রেডিং জার্নাল টেমপ্লেট, আর নতুনদের জন্য প্রিন্ট করার মতো একটা চিট-শিট ডাউনলোড করুন।',
			title: 'ফ্রি ডাউনলোড',
			intro: 'গুছিয়ে প্র্যাকটিস করার জন্য কিছু টেমপ্লেট। পুরোপুরি ফ্রি, ইমেইলও দিতে হবে না।',
			format: 'ফরম্যাট:',
			download: 'ডাউনলোড',
			open: 'খুলুন',
			howTitle: 'ট্রেডিং জার্নাল কীভাবে ব্যবহার করবেন',
			steps: [
				'CSV ফাইলটা ডাউনলোড করে Excel-এ খুলুন। Google Sheets-এ খুলতে চাইলে File → Import ব্যবহার করুন।',
				'প্রতিটা ডেমো ট্রেড লিখে রাখুন: তারিখ, পেয়ার, বাই না সেল, এন্ট্রি, স্টপ-লস, টার্গেট, সাইজ, ফলাফল, আর কেন ট্রেডটা নিলেন তার ছোট্ট একটা নোট।',
				'সপ্তাহে একবার জার্নালটা দেখুন, আর পরের সপ্তাহে কোন একটা জিনিস ভালো করবেন সেটা লিখে ফেলুন।'
			],
			ctaTitle: 'আপনার জার্নাল নিয়ে মতামত নিন',
			ctaText: 'সাপ্তাহিক রিভিউটা কমিউনিটিতে শেয়ার করুন, আর অন্য নতুনদের থেকেও শিখুন।'
		}
	};
	const c = $derived(copy[lang]);
</script>

<Seo title={c.seoTitle} description={c.seoDescription} path="/downloads" />

<div class="container-page max-w-4xl py-10 sm:py-14">
	<h1 class="text-4xl font-extrabold tracking-tight text-ink">{c.title}</h1>
	<p class="mt-3 max-w-2xl text-lg text-body">{c.intro}</p>

	<ul {@attach revealChildren({ y: 24 })} class="mt-8 space-y-4">
		{#each data.downloads as item (item.slug)}
			{@const file = item.href.endsWith('.csv')}
			<li
				class="flex flex-col gap-4 rounded-2xl border border-line p-5 sm:flex-row sm:items-center"
			>
				<Icon name="file" class="size-8 shrink-0 text-gold-300" />
				<div class="flex-1">
					<h2 class="font-semibold text-ink">{item.title}</h2>
					<p class="mt-1 text-body">{item.description}</p>
					<p class="mt-1 text-sm text-muted">{c.format} {item.fileFormat}</p>
				</div>
				<a
					href={file ? asset(item.href.slice(1) as AssetPath) : href(lang, item.href)}
					download={file ? '' : undefined}
					class="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-gold-400/60 px-5 font-semibold text-gold-300 hover:bg-raised"
				>
					<Icon name="download" />{file ? c.download : c.open}
				</a>
			</li>
		{/each}
	</ul>

	<div class="prose mt-10">
		<h2>{c.howTitle}</h2>
		<ol>
			{#each c.steps as step (step)}<li>{step}</li>{/each}
		</ol>
	</div>

	<div {@attach reveal()} class="mt-12 rounded-2xl bg-raised p-6">
		<h2 class="text-xl font-bold text-ink">{c.ctaTitle}</h2>
		<p class="mt-2 text-body">{c.ctaText}</p>
		<div class="mt-5">
			<TelegramButton placement="downloads" label={t(lang).cta.join} />
		</div>
	</div>
</div>
