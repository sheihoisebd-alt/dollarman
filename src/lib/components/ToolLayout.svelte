<script lang="ts">
	import { resolve } from '$app/paths';
	import type { Snippet } from 'svelte';
	import Seo from './Seo.svelte';
	import TelegramButton from './TelegramButton.svelte';

	type Props = {
		title: string;
		description: string;
		path: string;
		intro: string;
		form: Snippet;
		result: Snippet;
		explainer: Snippet;
	};

	let { title, description, path, intro, form, result, explainer }: Props = $props();
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
			applicationCategory: 'FinanceApplication',
			operatingSystem: 'Any',
			isAccessibleForFree: true,
			offers: { '@type': 'Offer', price: 0, priceCurrency: 'USD' }
		}
	]}
/>

<div class="container-page max-w-4xl py-10 sm:py-14">
	<nav aria-label="Breadcrumb" class="text-sm">
		<a href={resolve('/tools')} class="font-medium text-silver-200 hover:underline">Free tools</a>
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

	<p class="mt-4 text-sm text-muted">
		Results are estimates for learning purposes. Your broker's contract sizes, spreads and fees may
		differ. Not financial advice.
	</p>

	<div class="prose mt-10">
		{@render explainer()}
	</div>

	<div class="mt-12 rounded-2xl bg-raised p-6">
		<h2 class="text-xl font-bold text-ink">Learn how to use this in your trading plan</h2>
		<p class="mt-2 text-body">
			The free course explains risk management step by step, with practice tasks and Q&A on
			Telegram.
		</p>
		<div class="mt-5">
			<TelegramButton
				placement="tool-{path.split('/').pop()}"
				label="Join the free course on Telegram"
			/>
		</div>
	</div>
</div>
