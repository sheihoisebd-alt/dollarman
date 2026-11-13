<script lang="ts">
	import { formatNumber, formatUsd, positionSize } from '#lib/calc.js';
	import { href } from '#lib/paths.svelte.js';
	import NumberField from '#lib/components/NumberField.svelte';
	import ToolLayout from '#lib/components/ToolLayout.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	const lang = $derived(data.lang);

	let balance = $state<number | null>(500);
	let riskPercent = $state<number | null>(1);
	let stopPips = $state<number | null>(25);
	let pipValuePerLot = $state<number | null>(10);

	const calc = $derived(
		positionSize(balance ?? NaN, riskPercent ?? NaN, stopPips ?? NaN, pipValuePerLot ?? NaN)
	);
	const highRisk = $derived((riskPercent ?? 0) > 2);

	const copy = {
		en: {
			title: 'Position size calculator',
			description:
				'Free forex position size calculator. Enter your balance, risk percentage and stop-loss in pips to get the right lot size.',
			intro: 'Find a lot size that keeps each loss within the risk you chose before the trade.',
			balance: 'Account balance',
			risk: 'Risk per trade',
			riskHint: 'Many beginners use 1% or less.',
			stop: 'Stop-loss distance',
			pips: 'pips',
			pipValue: 'Pip value per standard lot',
			pipValueHint:
				'$10 for pairs ending in /USD (e.g. EUR/USD). For other pairs, use the pip value calculator.',
			size: 'Position size',
			lots: 'lots',
			atRisk: 'Amount at risk',
			units: 'Units',
			mini: 'Mini lots (0.1)',
			micro: 'Micro lots (0.01)',
			tooSmall:
				'This is smaller than 0.01 lots, the minimum at many brokers. Use a wider account buffer, a smaller stop, or skip the trade.',
			tooRisky:
				'Risking more than 2% per trade can drain an account quickly during a losing streak.',
			empty: 'Enter positive numbers in every field to see your position size.',
			howTitle: 'How position size is calculated',
			formula: 'Lots = (balance × risk %) ÷ (stop-loss in pips × pip value per lot)',
			example:
				'Example: with a $500 account, 1% risk is $5. With a 25-pip stop on EUR/USD (about $10 per pip per standard lot), the position is 5 ÷ (25 × 10) = 0.02 lots.',
			whyTitle: 'Why it matters',
			why: 'Position sizing is how you control your loss before you enter. Place the stop-loss where your idea is wrong, then let the size adjust. Never move the stop just to trade bigger. Learn more in',
			moduleLink: 'Module 7: Risk management'
		},
		bn: {
			title: 'পজিশন সাইজ ক্যালকুলেটর',
			description:
				'ফ্রি ফরেক্স পজিশন সাইজ ক্যালকুলেটর। ব্যালান্স, কত শতাংশ রিস্ক নেবেন আর স্টপ-লস কত পিপ দূরে, এটুকু দিলেই সঠিক লট সাইজ পেয়ে যাবেন।',
			intro: 'এমন একটা লট সাইজ বের করুন, যাতে প্রতিটা লস ট্রেডের আগে ঠিক করা রিস্কের মধ্যেই থাকে।',
			balance: 'অ্যাকাউন্ট ব্যালান্স',
			risk: 'প্রতি ট্রেডে রিস্ক',
			riskHint: 'অনেক নতুন ট্রেডার ১% বা তার কম রাখেন।',
			stop: 'স্টপ-লস কত দূরে',
			pips: 'পিপ',
			pipValue: 'প্রতি স্ট্যান্ডার্ড লটে পিপ ভ্যালু',
			pipValueHint:
				'যে পেয়ারের শেষে /USD আছে (যেমন EUR/USD), সেখানে $10। অন্য পেয়ারের জন্য পিপ ভ্যালু ক্যালকুলেটর ব্যবহার করুন।',
			size: 'পজিশন সাইজ',
			lots: 'লট',
			atRisk: 'রিস্কে থাকা টাকা',
			units: 'ইউনিট',
			mini: 'মিনি লট (0.1)',
			micro: 'মাইক্রো লট (0.01)',
			tooSmall:
				'এটা 0.01 লটের চেয়েও ছোট, অথচ অনেক ব্রোকারে এটাই সর্বনিম্ন। হয় স্টপ একটু কাছে আনুন, নয়তো এই ট্রেডটা বাদ দিন।',
			tooRisky:
				'প্রতি ট্রেডে ২%-এর বেশি রিস্ক নিলে পরপর কয়েকটা লসেই অ্যাকাউন্ট দ্রুত খালি হয়ে যেতে পারে।',
			empty: 'পজিশন সাইজ দেখতে প্রতিটা ঘরে শূন্যের চেয়ে বড় সংখ্যা দিন।',
			howTitle: 'পজিশন সাইজ কীভাবে হিসাব হয়',
			formula: 'লট = (ব্যালান্স × রিস্ক %) ÷ (স্টপ-লস পিপ × প্রতি লটে পিপ ভ্যালু)',
			example:
				'উদাহরণ: $500 অ্যাকাউন্টে ১% রিস্ক মানে $5। EUR/USD-তে 25 পিপের স্টপ ধরলে (প্রতি স্ট্যান্ডার্ড লটে প্রতি পিপ প্রায় $10), পজিশন হবে 5 ÷ (25 × 10) = 0.02 লট।',
			whyTitle: 'কেন এটা জরুরি',
			why: 'ট্রেডে ঢোকার আগেই লস কতটা হবে, সেটা নিয়ন্ত্রণ করার উপায় হলো পজিশন সাইজ। স্টপ-লস বসান সেখানে, যেখানে গেলে বুঝবেন আপনার ধারণা ভুল ছিল। তারপর সেই অনুযায়ী সাইজ ঠিক করুন। বড় ট্রেড নেওয়ার জন্য কখনো স্টপ সরাবেন না। আরও জানতে পড়ুন',
			moduleLink: 'মডিউল ৭: রিস্ক ম্যানেজমেন্ট'
		}
	};
	const c = $derived(copy[lang]);
</script>

<ToolLayout
	title={c.title}
	description={c.description}
	path="/tools/position-size-calculator"
	intro={c.intro}
>
	{#snippet form()}
		<NumberField id="balance" label={c.balance} suffix="USD" bind:value={balance} />
		<NumberField
			id="risk"
			label={c.risk}
			suffix="%"
			step={0.1}
			bind:value={riskPercent}
			hint={c.riskHint}
		/>
		<NumberField id="stop" label={c.stop} suffix={c.pips} bind:value={stopPips} />
		<NumberField
			id="pip-value"
			label={c.pipValue}
			suffix="USD"
			bind:value={pipValuePerLot}
			hint={c.pipValueHint}
		/>
	{/snippet}

	{#snippet result()}
		{#if calc}
			<p class="text-sm text-body">{c.size}</p>
			<p class="mt-1 text-4xl font-bold">{formatNumber(calc.lots)} {c.lots}</p>
			<dl class="mt-6 space-y-3 border-t border-line-strong pt-5">
				<div class="flex justify-between gap-4">
					<dt class="text-body">{c.atRisk}</dt>
					<dd class="font-semibold">{formatUsd(calc.riskAmount)}</dd>
				</div>
				<div class="flex justify-between gap-4">
					<dt class="text-body">{c.units}</dt>
					<dd class="font-semibold">{formatNumber(calc.units, 0)}</dd>
				</div>
				<div class="flex justify-between gap-4">
					<dt class="text-body">{c.mini}</dt>
					<dd class="font-semibold">{formatNumber(calc.lots * 10)}</dd>
				</div>
				<div class="flex justify-between gap-4">
					<dt class="text-body">{c.micro}</dt>
					<dd class="font-semibold">{formatNumber(calc.lots * 100, 1)}</dd>
				</div>
			</dl>
			{#if calc.lots < 0.01}
				<p class="mt-5 rounded-lg bg-gold-400/15 p-3 text-sm text-gold-300">{c.tooSmall}</p>
			{/if}
			{#if highRisk}
				<p class="mt-5 rounded-lg bg-gold-400/15 p-3 text-sm text-gold-300">{c.tooRisky}</p>
			{/if}
		{:else}
			<p class="text-body">{c.empty}</p>
		{/if}
	{/snippet}

	{#snippet explainer()}
		<h2>{c.howTitle}</h2>
		<p><strong>{c.formula}</strong></p>
		<p>{c.example}</p>
		<h2>{c.whyTitle}</h2>
		<p>
			{c.why} <a href={href(lang, '/course/risk-management')}>{c.moduleLink}</a>.
		</p>
	{/snippet}
</ToolLayout>
