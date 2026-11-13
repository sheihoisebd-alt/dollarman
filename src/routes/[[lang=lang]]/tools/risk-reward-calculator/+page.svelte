<script lang="ts">
	import { formatNumber, riskReward } from '#lib/calc.js';
	import NumberField from '#lib/components/NumberField.svelte';
	import ToolLayout from '#lib/components/ToolLayout.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	const lang = $derived(data.lang);

	let entry = $state<number | null>(1.085);
	let stop = $state<number | null>(1.0825);
	let target = $state<number | null>(1.09);

	const calc = $derived(riskReward(entry ?? NaN, stop ?? NaN, target ?? NaN));

	const copy = {
		en: {
			title: 'Risk/reward calculator',
			description:
				'Free risk/reward ratio calculator. Enter entry, stop-loss and target to see your R multiple and break-even win rate.',
			intro:
				'Compare what you risk with what you aim to gain, and see the win rate you would need to break even.',
			entry: 'Entry price',
			stop: 'Stop-loss price',
			target: 'Target (take-profit) price',
			errors: {
				missing: 'Enter an entry, stop-loss and target price.',
				'same-as-entry': 'The stop-loss cannot be the same as the entry price.',
				'buy-target': 'For a buy (stop below entry), the target must be above the entry price.',
				'sell-target': 'For a sell (stop above entry), the target must be below the entry price.'
			},
			ratio: (dir: string) => `Risk/reward ratio (${dir})`,
			buy: 'buy',
			sell: 'sell',
			risk: 'Risk (price distance)',
			reward: 'Reward (price distance)',
			breakEven: 'Break-even win rate',
			costs:
				'Before costs such as spread and commission. A good ratio does not make a trade likely to win; it only describes the payoff if it does.',
			meansTitle: 'What the risk/reward ratio means',
			means:
				'If you risk 25 pips to aim for 50 pips, your ratio is 1:2. You lose 1 unit when wrong and gain 2 units when right.',
			breakEvenTitle: 'Break-even win rate',
			formula: 'Break-even win rate = 1 ÷ (1 + ratio)',
			breakEvenText:
				'. At 1:2 you need to win about 33% of trades to break even, before costs. At 1:1 you need 50%. This is why traders look at both the ratio and how often a setup has worked in their own journal.'
		},
		bn: {
			title: 'রিস্ক/রিওয়ার্ড ক্যালকুলেটর',
			description:
				'ফ্রি রিস্ক/রিওয়ার্ড রেশিও ক্যালকুলেটর। এন্ট্রি, স্টপ-লস আর টার্গেট দিলেই দেখবেন রেশিও কত, আর লাভ-লোকসান সমান রাখতে কত ভাগ ট্রেড জিততে হবে।',
			intro:
				'কতটা রিস্ক নিচ্ছেন আর কতটা লাভের আশা করছেন, পাশাপাশি রেখে দেখুন। সাথে জেনে নিন, লাভ-লোকসান সমান রাখতে কত ভাগ ট্রেড জিততে হবে।',
			entry: 'এন্ট্রি প্রাইস',
			stop: 'স্টপ-লস প্রাইস',
			target: 'টার্গেট (টেক-প্রফিট) প্রাইস',
			errors: {
				missing: 'এন্ট্রি, স্টপ-লস আর টার্গেট, তিনটা প্রাইসই দিন।',
				'same-as-entry': 'স্টপ-লস আর এন্ট্রি প্রাইস এক হতে পারে না।',
				'buy-target': 'বাই ট্রেডে (স্টপ এন্ট্রির নিচে) টার্গেট এন্ট্রির উপরে হতে হবে।',
				'sell-target': 'সেল ট্রেডে (স্টপ এন্ট্রির উপরে) টার্গেট এন্ট্রির নিচে হতে হবে।'
			},
			ratio: (dir: string) => `রিস্ক/রিওয়ার্ড রেশিও (${dir})`,
			buy: 'বাই',
			sell: 'সেল',
			risk: 'রিস্ক (প্রাইসের দূরত্ব)',
			reward: 'রিওয়ার্ড (প্রাইসের দূরত্ব)',
			breakEven: 'সমান-সমান থাকতে যত ভাগ জিততে হবে',
			costs:
				'স্প্রেড আর কমিশনের মতো খরচ এখানে ধরা হয়নি। ভালো রেশিও মানে ট্রেড জিতবেই এমন না; জিতলে কতটা পাবেন, শুধু সেটাই বোঝায়।',
			meansTitle: 'রিস্ক/রিওয়ার্ড রেশিও মানে কী',
			means:
				'25 পিপ রিস্ক নিয়ে 50 পিপের টার্গেট রাখলে রেশিও হয় 1:2। ভুল হলে হারাবেন ১ ভাগ, ঠিক হলে পাবেন ২ ভাগ।',
			breakEvenTitle: 'কত ভাগ জিতলে সমান-সমান',
			formula: 'সমান-সমান থাকার জয়ের হার = 1 ÷ (1 + রেশিও)',
			breakEvenText:
				'। 1:2 রেশিওতে খরচ বাদ দিয়ে মোটামুটি ৩৩% ট্রেড জিতলেই সমান-সমান থাকবেন। 1:1 হলে লাগবে ৫০%। এ কারণেই ট্রেডাররা রেশিওর পাশাপাশি নিজের জার্নালে দেখেন, একটা সেটআপ কত ঘন ঘন কাজ করেছে।'
		}
	};
	const c = $derived(copy[lang]);
</script>

<ToolLayout
	title={c.title}
	description={c.description}
	path="/tools/risk-reward-calculator"
	intro={c.intro}
>
	{#snippet form()}
		<NumberField id="entry" label={c.entry} bind:value={entry} />
		<NumberField id="stop" label={c.stop} bind:value={stop} />
		<NumberField id="target" label={c.target} bind:value={target} />
	{/snippet}

	{#snippet result()}
		{#if typeof calc === 'string'}
			<p class="text-body">{c.errors[calc]}</p>
		{:else}
			<p class="text-sm text-body">{c.ratio(calc.direction === 'long' ? c.buy : c.sell)}</p>
			<p class="mt-1 text-4xl font-bold">1 : {formatNumber(calc.ratio)}</p>
			<dl class="mt-6 space-y-3 border-t border-line-strong pt-5">
				<div class="flex justify-between gap-4">
					<dt class="text-body">{c.risk}</dt>
					<dd class="font-semibold">{formatNumber(calc.risk, 5)}</dd>
				</div>
				<div class="flex justify-between gap-4">
					<dt class="text-body">{c.reward}</dt>
					<dd class="font-semibold">{formatNumber(calc.reward, 5)}</dd>
				</div>
				<div class="flex justify-between gap-4">
					<dt class="text-body">{c.breakEven}</dt>
					<dd class="font-semibold">{formatNumber(calc.breakEvenWinRate * 100, 1)}%</dd>
				</div>
			</dl>
			<p class="mt-5 text-sm text-body">{c.costs}</p>
		{/if}
	{/snippet}

	{#snippet explainer()}
		<h2>{c.meansTitle}</h2>
		<p>{c.means}</p>
		<h2>{c.breakEvenTitle}</h2>
		<p><strong>{c.formula}</strong>{c.breakEvenText}</p>
	{/snippet}
</ToolLayout>
