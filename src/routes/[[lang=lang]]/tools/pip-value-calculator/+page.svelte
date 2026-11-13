<script lang="ts">
	import { PAIRS, formatUsd, pipValueUsd } from '#lib/calc.js';
	import { href } from '#lib/paths.svelte.js';
	import NumberField from '#lib/components/NumberField.svelte';
	import ToolLayout from '#lib/components/ToolLayout.svelte';
	import Tween from '#lib/components/Tween.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	const lang = $derived(data.lang);

	let symbol = $state(PAIRS[0].symbol);
	let lots = $state<number | null>(1);
	let price = $state<number | null>(PAIRS[0].samplePrice);
	let quoteToUsd = $state<number | null>(1.27);

	const pair = $derived(PAIRS.find((p) => p.symbol === symbol) ?? PAIRS[0]);
	const quoteCurrency = $derived(pair.symbol.slice(4, 7));
	const value = $derived(
		pipValueUsd(pair, lots ?? NaN, price ?? NaN, pair.quote === 'cross' ? (quoteToUsd ?? NaN) : 1)
	);

	// Changing the pair also resets the price fields to sensible examples for that pair.
	const getSymbol = () => symbol;
	function setSymbol(next: string) {
		symbol = next;
		price = pair.samplePrice;
		quoteToUsd = quoteCurrency === 'JPY' ? 0.0067 : 1.27;
	}

	const copy = {
		en: {
			title: 'Pip value calculator',
			description:
				'Free pip value calculator for forex and gold. See how much one pip is worth in US dollars for any lot size.',
			intro:
				'See how much one pip is worth in US dollars, so you know your money risk before you trade.',
			pair: 'Currency pair',
			gold: '(gold, pip = 0.01)',
			size: 'Position size',
			lots: 'lots',
			lotsHint: '1 lot = 100,000 units (gold: 100 oz).',
			price: (s: string) => `Current ${s} price`,
			priceHint: (q: string) => `Needed because the pip is counted in ${q}.`,
			rate: (q: string) => `${q}/USD rate`,
			rateHint: (q: string) =>
				`How many US dollars one ${q} is worth today (e.g. GBP ≈ 1.27, JPY ≈ 0.0067).`,
			result: (pip: number, l: number | null) => `Value of 1 pip (${pip}) on ${l} lots`,
			pips10: '10 pips',
			pips50: '50 pips',
			empty: 'Enter positive numbers to see the pip value.',
			howTitle: 'How pip value works',
			usdQuote: 'Pairs ending in USD',
			usdQuoteText: ' (EUR/USD): pip value = pip size × units. One standard lot is $10 per pip.',
			usdBase: 'Pairs starting with USD',
			usdBaseText:
				' (USD/JPY): divide by the current price, because the pip is counted in the other currency.',
			cross: 'Cross pairs',
			crossText: ' (EUR/GBP): convert the quote currency into US dollars.',
			newTo: 'New to pips? Read',
			postLink: 'What is a pip? A simple guide for beginners'
		},
		bn: {
			title: 'পিপ ভ্যালু ক্যালকুলেটর',
			description:
				'ফরেক্স আর গোল্ডের জন্য ফ্রি পিপ ভ্যালু ক্যালকুলেটর। যেকোনো লট সাইজে এক পিপের দাম কত ডলার, দেখে নিন।',
			intro: 'এক পিপের দাম কত ডলার, জেনে নিন। তাহলে ট্রেডের আগেই বুঝবেন কত টাকা রিস্কে রাখছেন।',
			pair: 'কারেন্সি পেয়ার',
			gold: '(গোল্ড, পিপ = 0.01)',
			size: 'পজিশন সাইজ',
			lots: 'লট',
			lotsHint: '১ লট = 100,000 ইউনিট (গোল্ডের ক্ষেত্রে 100 আউন্স)।',
			price: (s: string) => `${s}-এর এখনকার প্রাইস`,
			priceHint: (q: string) => `দরকার, কারণ এখানে পিপ গোনা হয় ${q}-তে।`,
			rate: (q: string) => `${q}/USD রেট`,
			rateHint: (q: string) => `আজ এক ${q}-এর দাম কত মার্কিন ডলার (যেমন GBP ≈ 1.27, JPY ≈ 0.0067)।`,
			result: (pip: number, l: number | null) => `${l} লটে ১ পিপের (${pip}) দাম`,
			pips10: '১০ পিপ',
			pips50: '৫০ পিপ',
			empty: 'পিপ ভ্যালু দেখতে শূন্যের চেয়ে বড় সংখ্যা দিন।',
			howTitle: 'পিপ ভ্যালু কীভাবে হিসাব হয়',
			usdQuote: 'যে পেয়ারের শেষে USD',
			usdQuoteText:
				' (EUR/USD): পিপ ভ্যালু = পিপ সাইজ × ইউনিট। এক স্ট্যান্ডার্ড লটে প্রতি পিপ $10।',
			usdBase: 'যে পেয়ারের শুরুতে USD',
			usdBaseText: ' (USD/JPY): এখনকার প্রাইস দিয়ে ভাগ করুন, কারণ পিপ গোনা হয় অন্য কারেন্সিতে।',
			cross: 'ক্রস পেয়ার',
			crossText: ' (EUR/GBP): কোট কারেন্সিকে মার্কিন ডলারে রূপান্তর করে নিন।',
			newTo: 'পিপ জিনিসটা নতুন লাগছে? পড়ে নিন',
			postLink: 'পিপ কী? নতুনদের জন্য সহজ গাইড'
		}
	};
	const c = $derived(copy[lang]);

	// "XAU/USD (gold, pip = 0.01)" -> label in the page's language
	const label = (s: string) => (s.startsWith('XAU') ? `XAU/USD ${c.gold}` : s);
</script>

<ToolLayout
	title={c.title}
	description={c.description}
	path="/tools/pip-value-calculator"
	intro={c.intro}
>
	{#snippet form()}
		<div>
			<label for="pair" class="field-label">{c.pair}</label>
			<select id="pair" class="field-input" bind:value={getSymbol, setSymbol}>
				{#each PAIRS as p (p.symbol)}<option value={p.symbol}>{label(p.symbol)}</option>{/each}
			</select>
		</div>
		<NumberField
			id="lots"
			label={c.size}
			suffix={c.lots}
			step={0.01}
			bind:value={lots}
			hint={c.lotsHint}
		/>
		{#if pair.quote === 'usd-base'}
			<NumberField
				id="price"
				label={c.price(pair.symbol)}
				bind:value={price}
				hint={c.priceHint(quoteCurrency)}
			/>
		{:else if pair.quote === 'cross'}
			<NumberField
				id="quote-usd"
				label={c.rate(quoteCurrency)}
				bind:value={quoteToUsd}
				hint={c.rateHint(quoteCurrency)}
			/>
		{/if}
	{/snippet}

	{#snippet result()}
		{#if value !== null}
			<p class="text-sm text-body">{c.result(pair.pipSize, lots)}</p>
			<p class="mt-1 text-4xl font-bold tabular-nums"><Tween {value} format={formatUsd} /></p>
			<dl class="mt-6 space-y-3 border-t border-line-strong pt-5">
				<div class="flex justify-between gap-4">
					<dt class="text-body">{c.pips10}</dt>
					<dd class="font-semibold">{formatUsd(value * 10)}</dd>
				</div>
				<div class="flex justify-between gap-4">
					<dt class="text-body">{c.pips50}</dt>
					<dd class="font-semibold">{formatUsd(value * 50)}</dd>
				</div>
			</dl>
		{:else}
			<p class="text-body">{c.empty}</p>
		{/if}
	{/snippet}

	{#snippet explainer()}
		<h2>{c.howTitle}</h2>
		<ul>
			<li><strong>{c.usdQuote}</strong>{c.usdQuoteText}</li>
			<li><strong>{c.usdBase}</strong>{c.usdBaseText}</li>
			<li><strong>{c.cross}</strong>{c.crossText}</li>
		</ul>
		<p>
			{c.newTo} <a href={href(lang, '/blog/what-is-a-pip')}>{c.postLink}</a>{lang === 'bn'
				? '।'
				: '.'}
		</p>
	{/snippet}
</ToolLayout>
