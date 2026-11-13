<script lang="ts">
	import type { Snippet } from 'svelte';
	import { t } from '#lib/i18n.js';
	import { currentLang, href } from '#lib/paths.svelte.js';
	import Seo from './Seo.svelte';
	import TelegramButton from './TelegramButton.svelte';

	type Props = {
		title: string;
		description: string;
		/** Language-neutral path, e.g. "/tools/pip-value-calculator" */
		path: string;
		intro: string;
		form: Snippet;
		result: Snippet;
		explainer: Snippet;
	};

	let { title, description, path, intro, form, result, explainer }: Props = $props();
	const lang = $derived(currentLang());

	const copy = {
		en: {
			estimate:
				"Results are estimates for learning purposes. Your broker's contract sizes, spreads and fees may differ. Not financial advice.",
			ctaTitle: 'Learn how to use this in your trading plan',
			ctaText:
				'The free course explains risk management step by step, with practice tasks and Q&A on Telegram.'
		},
		bn: {
			estimate:
				'ফলাফলগুলো শেখার জন্য একটা আনুমানিক হিসাব। আপনার ব্রোকারের লট সাইজ, স্প্রেড আর ফি আলাদা হতে পারে। এটা কোনো আর্থিক পরামর্শ নয়।',
			ctaTitle: 'নিজের ট্রেডিং প্ল্যানে এটা কীভাবে কাজে লাগাবেন, শিখে নিন',
			ctaText:
				'ফ্রি কোর্সে রিস্ক ম্যানেজমেন্ট ধাপে ধাপে বোঝানো আছে, সাথে টেলিগ্রামে প্র্যাকটিসের কাজ আর প্রশ্নোত্তর।'
		}
	};
	const c = $derived(copy[lang]);
</script>

<Seo
	{title}
	{description}
	{path}
	jsonLd={[
		{
			'@context': 'https://schema.org',
			'@type': 'WebApplication',
			name: title,
			description,
			inLanguage: lang,
			applicationCategory: 'FinanceApplication',
			operatingSystem: 'Any',
			isAccessibleForFree: true,
			offers: { '@type': 'Offer', price: 0, priceCurrency: 'USD' }
		}
	]}
/>

<div class="container-page max-w-4xl py-10 sm:py-14">
	<nav aria-label="Breadcrumb" class="text-sm">
		<a href={href(lang, '/tools')} class="font-medium text-gold-300 hover:underline"
			>{t(lang).common.freeTools}</a
		>
	</nav>
	<h1 class="mt-2 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">{title}</h1>
	<p class="mt-3 max-w-2xl text-lg text-body">{intro}</p>

	<div class="mt-8 grid gap-6 md:grid-cols-2">
		<form
			class="space-y-5 rounded-2xl border border-line bg-surface p-5 sm:p-6"
			onsubmit={(e) => e.preventDefault()}
		>
			{@render form()}
		</form>
		<div
			class="rounded-2xl bg-raised p-5 text-ink ring-1 ring-line-strong sm:p-6"
			aria-live="polite"
		>
			{@render result()}
		</div>
	</div>

	<p class="mt-4 text-sm text-muted">{c.estimate}</p>

	<div class="prose mt-10">
		{@render explainer()}
	</div>

	<div class="mt-12 rounded-2xl bg-raised p-6">
		<h2 class="text-xl font-bold text-ink">{c.ctaTitle}</h2>
		<p class="mt-2 text-body">{c.ctaText}</p>
		<div class="mt-5">
			<TelegramButton placement="tool-{path.split('/').pop()}" label={t(lang).cta.join} />
		</div>
	</div>
</div>
