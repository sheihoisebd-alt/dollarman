<script lang="ts">
	import Seo from '#lib/components/Seo.svelte';

	const terms = [
		['Long / buy', 'You expect the price to rise.'],
		['Short / sell', 'You expect the price to fall.'],
		['Pip', 'Small price unit: 0.0001 (0.01 for JPY pairs).'],
		['Lot', '1 standard lot = 100,000 units; mini 0.1; micro 0.01.'],
		['Spread', 'Difference between buy and sell price; a trading cost.'],
		['Leverage', 'Borrowed exposure. Magnifies losses as well as gains.'],
		['Margin', 'Money set aside by the broker to keep a trade open.'],
		['Stop-loss', 'Closes the trade at a set loss to protect your account.'],
		['Take-profit', 'Closes the trade at a set profit.']
	];
	const orders = [
		['Market', 'Buy or sell now at the current price.'],
		['Buy limit', 'Buy below the current price.'],
		['Sell limit', 'Sell above the current price.'],
		['Buy stop', 'Buy above the current price.'],
		['Sell stop', 'Sell below the current price.']
	];
	const checklist = [
		'Is this setup in my written trading plan?',
		'Do I know where my idea is wrong (stop-loss)?',
		'Have I sized the position to risk 1% or less?',
		'Is the risk/reward at least what my plan requires?',
		'Is there major news due soon?',
		'Am I calm, or am I trading to win back a loss?'
	];
</script>

<Seo
	title="Beginner trading cheat-sheet"
	description="A free printable cheat-sheet with key trading terms, order types, candle anatomy and a pre-trade checklist."
	path="/downloads/cheat-sheet"
/>

<div class="container-page max-w-4xl py-10 print:py-0">
	<div
		class="no-print mb-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-raised p-4"
	>
		<p class="text-ink">
			Save as PDF: use your browser's <strong>Print</strong> option and choose "Save as PDF".
		</p>
		<button
			type="button"
			onclick={() => print()}
			class="btn-metal min-h-11 rounded-xl px-5 font-semibold"
		>
			Print / save as PDF
		</button>
	</div>

	<h1 class="text-3xl font-extrabold text-ink">Beginner trading cheat-sheet</h1>
	<p class="mt-1 text-muted">
		Dollar Man Learning · dollarmanlearning.com · Educational use only, not financial advice.
	</p>

	<div class="mt-8 grid gap-8 md:grid-cols-2 print:grid-cols-2">
		<section>
			<h2 class="text-xl font-bold text-ink">Key terms</h2>
			<dl class="mt-3 space-y-2 text-sm">
				{#each terms as [term, meaning] (term)}
					<div>
						<dt class="font-semibold text-ink">{term}</dt>
						<dd class="text-body">{meaning}</dd>
					</div>
				{/each}
			</dl>
		</section>
		<section>
			<h2 class="text-xl font-bold text-ink">Order types</h2>
			<dl class="mt-3 space-y-2 text-sm">
				{#each orders as [order, meaning] (order)}
					<div>
						<dt class="font-semibold text-ink">{order}</dt>
						<dd class="text-body">{meaning}</dd>
					</div>
				{/each}
			</dl>
			<h2 class="mt-6 text-xl font-bold text-ink">Candle anatomy</h2>
			<svg
				viewBox="0 0 220 120"
				class="mt-3 w-full max-w-xs"
				role="img"
				aria-label="A candlestick: the wick top is the high, the body spans open and close, the wick bottom is the low"
			>
				<line x1="50" x2="50" y1="10" y2="110" stroke="var(--color-muted)" stroke-width="2" />
				<rect x="35" y="35" width="30" height="50" rx="3" fill="var(--color-silver-300)" />
				<g font-size="11" fill="var(--color-body)">
					<text x="80" y="14">High</text>
					<text x="80" y="40">Close (bullish candle)</text>
					<text x="80" y="88">Open</text>
					<text x="80" y="112">Low</text>
				</g>
			</svg>
		</section>
	</div>

	<section class="mt-8">
		<h2 class="text-xl font-bold text-ink">Pre-trade checklist</h2>
		<ul class="mt-3 grid gap-2 text-sm sm:grid-cols-2 print:grid-cols-2">
			{#each checklist as item (item)}
				<li class="flex gap-2 text-ink">
					<span class="inline-block size-4 shrink-0 rounded border-2 border-line-strong"
					></span>{item}
				</li>
			{/each}
		</ul>
	</section>

	<section class="mt-8 rounded-xl border border-line p-4 text-sm">
		<h2 class="font-bold text-ink">Formulas</h2>
		<ul class="mt-2 space-y-1 text-body">
			<li><strong>Risk amount</strong> = balance × risk %</li>
			<li><strong>Lots</strong> = risk amount ÷ (stop-loss pips × pip value per lot)</li>
			<li><strong>Break-even win rate</strong> = 1 ÷ (1 + reward/risk)</li>
		</ul>
	</section>
</div>
