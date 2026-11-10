<script lang="ts">
	import { resolve } from '$app/paths';
	import { PAIRS, formatUsd, pipValueUsd } from '#lib/calc.js';
	import NumberField from '#lib/components/NumberField.svelte';
	import ToolLayout from '#lib/components/ToolLayout.svelte';

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
</script>

<ToolLayout
	title="Pip value calculator"
	description="Free pip value calculator for forex and gold. See how much one pip is worth in US dollars for any lot size."
	path="/tools/pip-value-calculator"
	intro="See how much one pip is worth in US dollars, so you know your money risk before you trade."
>
	{#snippet form()}
		<div>
			<label for="pair" class="field-label">Currency pair</label>
			<select id="pair" class="field-input" bind:value={getSymbol, setSymbol}>
				{#each PAIRS as p (p.symbol)}<option value={p.symbol}>{p.symbol}</option>{/each}
			</select>
		</div>
		<NumberField
			id="lots"
			label="Position size"
			suffix="lots"
			step={0.01}
			bind:value={lots}
			hint="1 lot = 100,000 units (gold: 100 oz)."
		/>
		{#if pair.quote === 'usd-base'}
			<NumberField
				id="price"
				label="Current {pair.symbol} price"
				bind:value={price}
				hint="Needed because the pip is counted in {quoteCurrency}."
			/>
		{:else if pair.quote === 'cross'}
			<NumberField
				id="quote-usd"
				label="{quoteCurrency}/USD rate"
				bind:value={quoteToUsd}
				hint="How many US dollars one {quoteCurrency} is worth today (e.g. GBP ≈ 1.27, JPY ≈ 0.0067)."
			/>
		{/if}
	{/snippet}

	{#snippet result()}
		{#if value !== null}
			<p class="text-sm text-body">Value of 1 pip ({pair.pipSize}) on {lots} lots</p>
			<p class="mt-1 text-4xl font-bold">{formatUsd(value)}</p>
			<dl class="mt-6 space-y-3 border-t border-line-strong pt-5">
				<div class="flex justify-between gap-4">
					<dt class="text-body">10 pips</dt>
					<dd class="font-semibold">{formatUsd(value * 10)}</dd>
				</div>
				<div class="flex justify-between gap-4">
					<dt class="text-body">50 pips</dt>
					<dd class="font-semibold">{formatUsd(value * 50)}</dd>
				</div>
			</dl>
		{:else}
			<p class="text-body">Enter positive numbers to see the pip value.</p>
		{/if}
	{/snippet}

	{#snippet explainer()}
		<h2>How pip value works</h2>
		<ul>
			<li>
				<strong>Pairs ending in USD</strong> (EUR/USD): pip value = pip size × units. One standard lot
				is $10 per pip.
			</li>
			<li>
				<strong>Pairs starting with USD</strong> (USD/JPY): divide by the current price, because the pip
				is counted in the other currency.
			</li>
			<li><strong>Cross pairs</strong> (EUR/GBP): convert the quote currency into US dollars.</li>
		</ul>
		<p>
			New to pips? Read <a href={resolve('/blog/[slug]', { slug: 'what-is-a-pip' })}
				>What is a pip? A simple guide for beginners</a
			>.
		</p>
	{/snippet}
</ToolLayout>
