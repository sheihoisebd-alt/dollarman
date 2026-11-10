<script lang="ts">
	import { resolve } from '$app/paths';
	import { formatNumber, formatUsd, positionSize } from '#lib/calc.js';
	import NumberField from '#lib/components/NumberField.svelte';
	import ToolLayout from '#lib/components/ToolLayout.svelte';

	let balance = $state<number | null>(500);
	let riskPercent = $state<number | null>(1);
	let stopPips = $state<number | null>(25);
	let pipValuePerLot = $state<number | null>(10);

	const calc = $derived(
		positionSize(balance ?? NaN, riskPercent ?? NaN, stopPips ?? NaN, pipValuePerLot ?? NaN)
	);
	const highRisk = $derived((riskPercent ?? 0) > 2);
</script>

<ToolLayout
	title="Position size calculator"
	description="Free forex position size calculator. Enter your balance, risk percentage and stop-loss in pips to get the right lot size."
	path="/tools/position-size-calculator"
	intro="Find a lot size that keeps each loss within the risk you chose before the trade."
>
	{#snippet form()}
		<NumberField id="balance" label="Account balance" suffix="USD" bind:value={balance} />
		<NumberField
			id="risk"
			label="Risk per trade"
			suffix="%"
			step={0.1}
			bind:value={riskPercent}
			hint="Many beginners use 1% or less."
		/>
		<NumberField id="stop" label="Stop-loss distance" suffix="pips" bind:value={stopPips} />
		<NumberField
			id="pip-value"
			label="Pip value per standard lot"
			suffix="USD"
			bind:value={pipValuePerLot}
			hint="$10 for pairs ending in /USD (e.g. EUR/USD). For other pairs, use the pip value calculator."
		/>
	{/snippet}

	{#snippet result()}
		{#if calc}
			<p class="text-sm text-body">Position size</p>
			<p class="mt-1 text-4xl font-bold">{formatNumber(calc.lots)} lots</p>
			<dl class="mt-6 space-y-3 border-t border-line-strong pt-5">
				<div class="flex justify-between gap-4">
					<dt class="text-body">Amount at risk</dt>
					<dd class="font-semibold">{formatUsd(calc.riskAmount)}</dd>
				</div>
				<div class="flex justify-between gap-4">
					<dt class="text-body">Units</dt>
					<dd class="font-semibold">{formatNumber(calc.units, 0)}</dd>
				</div>
				<div class="flex justify-between gap-4">
					<dt class="text-body">Mini lots (0.1)</dt>
					<dd class="font-semibold">{formatNumber(calc.lots * 10)}</dd>
				</div>
				<div class="flex justify-between gap-4">
					<dt class="text-body">Micro lots (0.01)</dt>
					<dd class="font-semibold">{formatNumber(calc.lots * 100, 1)}</dd>
				</div>
			</dl>
			{#if calc.lots < 0.01}
				<p class="mt-5 rounded-lg bg-gold-400/15 p-3 text-sm text-gold-300">
					This is smaller than 0.01 lots, the minimum at many brokers. Use a wider account buffer, a
					smaller stop, or skip the trade.
				</p>
			{/if}
			{#if highRisk}
				<p class="mt-5 rounded-lg bg-gold-400/15 p-3 text-sm text-gold-300">
					Risking more than 2% per trade can drain an account quickly during a losing streak.
				</p>
			{/if}
		{:else}
			<p class="text-body">Enter positive numbers in every field to see your position size.</p>
		{/if}
	{/snippet}

	{#snippet explainer()}
		<h2>How position size is calculated</h2>
		<p><strong>Lots = (balance × risk %) ÷ (stop-loss in pips × pip value per lot)</strong></p>
		<p>
			Example: with a $500 account, 1% risk is $5. With a 25-pip stop on EUR/USD (about $10 per pip
			per standard lot), the position is 5 ÷ (25 × 10) = 0.02 lots.
		</p>
		<h2>Why it matters</h2>
		<p>
			Position sizing is how you control your loss before you enter. Place the stop-loss where your
			idea is wrong, then let the size adjust. Never move the stop just to trade bigger. Learn more
			in <a href={resolve('/course/[slug]', { slug: 'risk-management' })}
				>Module 7: Risk management</a
			>.
		</p>
	{/snippet}
</ToolLayout>
