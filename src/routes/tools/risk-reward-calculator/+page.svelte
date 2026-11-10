<script lang="ts">
	import { formatNumber, riskReward } from '#lib/calc.js';
	import NumberField from '#lib/components/NumberField.svelte';
	import ToolLayout from '#lib/components/ToolLayout.svelte';

	let entry = $state<number | null>(1.085);
	let stop = $state<number | null>(1.0825);
	let target = $state<number | null>(1.09);

	const calc = $derived(riskReward(entry ?? NaN, stop ?? NaN, target ?? NaN));
</script>

<ToolLayout
	title="Risk/reward calculator"
	description="Free risk/reward ratio calculator. Enter entry, stop-loss and target to see your R multiple and break-even win rate."
	path="/tools/risk-reward-calculator"
	intro="Compare what you risk with what you aim to gain, and see the win rate you would need to break even."
>
	{#snippet form()}
		<NumberField id="entry" label="Entry price" bind:value={entry} />
		<NumberField id="stop" label="Stop-loss price" bind:value={stop} />
		<NumberField id="target" label="Target (take-profit) price" bind:value={target} />
	{/snippet}

	{#snippet result()}
		{#if typeof calc === 'string'}
			<p class="text-body">{calc}</p>
		{:else}
			<p class="text-sm text-body">
				Risk/reward ratio ({calc.direction === 'long' ? 'buy' : 'sell'})
			</p>
			<p class="mt-1 text-4xl font-bold">1 : {formatNumber(calc.ratio)}</p>
			<dl class="mt-6 space-y-3 border-t border-line-strong pt-5">
				<div class="flex justify-between gap-4">
					<dt class="text-body">Risk (price distance)</dt>
					<dd class="font-semibold">{formatNumber(calc.risk, 5)}</dd>
				</div>
				<div class="flex justify-between gap-4">
					<dt class="text-body">Reward (price distance)</dt>
					<dd class="font-semibold">{formatNumber(calc.reward, 5)}</dd>
				</div>
				<div class="flex justify-between gap-4">
					<dt class="text-body">Break-even win rate</dt>
					<dd class="font-semibold">{formatNumber(calc.breakEvenWinRate * 100, 1)}%</dd>
				</div>
			</dl>
			<p class="mt-5 text-sm text-body">
				Before costs such as spread and commission. A good ratio does not make a trade likely to
				win; it only describes the payoff if it does.
			</p>
		{/if}
	{/snippet}

	{#snippet explainer()}
		<h2>What the risk/reward ratio means</h2>
		<p>
			If you risk 25 pips to aim for 50 pips, your ratio is 1:2. You lose 1 unit when wrong and gain
			2 units when right.
		</p>
		<h2>Break-even win rate</h2>
		<p>
			<strong>Break-even win rate = 1 ÷ (1 + ratio)</strong>. At 1:2 you need to win about 33% of
			trades to break even, before costs. At 1:1 you need 50%. This is why traders look at both the
			ratio and how often a setup has worked in their own journal.
		</p>
	{/snippet}
</ToolLayout>
