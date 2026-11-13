<script lang="ts">
	import Seo from '#lib/components/Seo.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	const lang = $derived(data.lang);

	const copy = {
		en: {
			seoTitle: 'Beginner trading cheat-sheet',
			seoDescription:
				'A free printable cheat-sheet with key trading terms, order types, candle anatomy and a pre-trade checklist.',
			savePdf: "Save as PDF: use your browser's",
			print: 'Print',
			savePdfRest: 'option and choose "Save as PDF".',
			printButton: 'Print / save as PDF',
			title: 'Beginner trading cheat-sheet',
			byline:
				'Dollar Man Learning · dollarmanlearning.com · Educational use only, not financial advice.',
			termsTitle: 'Key terms',
			terms: [
				['Long / buy', 'You expect the price to rise.'],
				['Short / sell', 'You expect the price to fall.'],
				['Pip', 'Small price unit: 0.0001 (0.01 for JPY pairs).'],
				['Lot', '1 standard lot = 100,000 units; mini 0.1; micro 0.01.'],
				['Spread', 'Difference between buy and sell price; a trading cost.'],
				['Leverage', 'Borrowed exposure. Magnifies losses as well as gains.'],
				['Margin', 'Money set aside by the broker to keep a trade open.'],
				['Stop-loss', 'Closes the trade at a set loss to protect your account.'],
				['Take-profit', 'Closes the trade at a set profit.']
			],
			ordersTitle: 'Order types',
			orders: [
				['Market', 'Buy or sell now at the current price.'],
				['Buy limit', 'Buy below the current price.'],
				['Sell limit', 'Sell above the current price.'],
				['Buy stop', 'Buy above the current price.'],
				['Sell stop', 'Sell below the current price.']
			],
			candleTitle: 'Candle anatomy',
			candleAlt:
				'A candlestick: the wick top is the high, the body spans open and close, the wick bottom is the low',
			high: 'High',
			close: 'Close (bullish candle)',
			open: 'Open',
			low: 'Low',
			checklistTitle: 'Pre-trade checklist',
			checklist: [
				'Is this setup in my written trading plan?',
				'Do I know where my idea is wrong (stop-loss)?',
				'Have I sized the position to risk 1% or less?',
				'Is the risk/reward at least what my plan requires?',
				'Is there major news due soon?',
				'Am I calm, or am I trading to win back a loss?'
			],
			formulasTitle: 'Formulas',
			formulas: [
				['Risk amount', '= balance × risk %'],
				['Lots', '= risk amount ÷ (stop-loss pips × pip value per lot)'],
				['Break-even win rate', '= 1 ÷ (1 + reward/risk)']
			]
		},
		bn: {
			seoTitle: 'নতুনদের ট্রেডিং চিট-শিট',
			seoDescription:
				'প্রিন্ট করে রাখার মতো একটা ফ্রি চিট-শিট: ট্রেডিংয়ের জরুরি শব্দ, অর্ডারের ধরন, ক্যান্ডেলের গঠন আর ট্রেডের আগের চেকলিস্ট।',
			savePdf: 'PDF হিসেবে রাখতে চাইলে ব্রাউজারের',
			print: 'Print',
			savePdfRest: 'অপশনে গিয়ে "Save as PDF" বেছে নিন।',
			printButton: 'প্রিন্ট / PDF সেভ করুন',
			title: 'নতুনদের ট্রেডিং চিট-শিট',
			byline:
				'Dollar Man Learning · dollarmanlearning.com · শুধু শেখার জন্য, কোনো আর্থিক পরামর্শ নয়।',
			termsTitle: 'জরুরি শব্দগুলো',
			terms: [
				['লং / বাই', 'আপনি ধরে নিচ্ছেন দাম বাড়বে।'],
				['শর্ট / সেল', 'আপনি ধরে নিচ্ছেন দাম কমবে।'],
				['পিপ', 'দামের ছোট্ট একক: 0.0001 (JPY পেয়ারে 0.01)।'],
				['লট', '১ স্ট্যান্ডার্ড লট = 100,000 ইউনিট; মিনি 0.1; মাইক্রো 0.01।'],
				['স্প্রেড', 'কেনা আর বেচার দামের পার্থক্য; এটা ট্রেডিংয়ের একটা খরচ।'],
				['লিভারেজ', 'ব্রোকারের থেকে ধার করা এক্সপোজার। লাভের মতো লসও কয়েকগুণ বাড়িয়ে দেয়।'],
				['মার্জিন', 'ট্রেড খোলা রাখতে ব্রোকার যে টাকাটা আলাদা করে রাখে।'],
				['স্টপ-লস', 'ঠিক করা লসে ট্রেড বন্ধ করে দেয়, যাতে অ্যাকাউন্ট বাঁচে।'],
				['টেক-প্রফিট', 'ঠিক করা লাভে ট্রেড বন্ধ করে দেয়।']
			],
			ordersTitle: 'অর্ডারের ধরন',
			orders: [
				['মার্কেট', 'এখনকার দামেই এখনই কেনা বা বেচা।'],
				['বাই লিমিট', 'এখনকার দামের নিচে কেনা।'],
				['সেল লিমিট', 'এখনকার দামের উপরে বেচা।'],
				['বাই স্টপ', 'এখনকার দামের উপরে কেনা।'],
				['সেল স্টপ', 'এখনকার দামের নিচে বেচা।']
			],
			candleTitle: 'ক্যান্ডেলের গঠন',
			candleAlt:
				'একটা ক্যান্ডেলস্টিক: উইকের মাথা হলো হাই, বডি ওপেন থেকে ক্লোজ পর্যন্ত, আর উইকের নিচের মাথা হলো লো',
			high: 'হাই',
			close: 'ক্লোজ (বুলিশ ক্যান্ডেল)',
			open: 'ওপেন',
			low: 'লো',
			checklistTitle: 'ট্রেডের আগের চেকলিস্ট',
			checklist: [
				'এই সেটআপটা কি আমার লেখা ট্রেডিং প্ল্যানে আছে?',
				'কোথায় গেলে আমার ধারণা ভুল প্রমাণ হবে (স্টপ-লস), সেটা কি জানি?',
				'পজিশন সাইজ কি এমনভাবে ঠিক করেছি যাতে রিস্ক ১% বা তার কম থাকে?',
				'রিস্ক/রিওয়ার্ড কি আমার প্ল্যানে যতটা চাই, অন্তত ততটা?',
				'শিগগিরই কি বড় কোনো নিউজ আসছে?',
				'আমি কি শান্ত আছি, নাকি লস পুষিয়ে নিতে ট্রেড করছি?'
			],
			formulasTitle: 'সূত্রগুলো',
			formulas: [
				['রিস্কের টাকা', '= ব্যালান্স × রিস্ক %'],
				['লট', '= রিস্কের টাকা ÷ (স্টপ-লস পিপ × প্রতি লটে পিপ ভ্যালু)'],
				['সমান-সমান থাকার জয়ের হার', '= 1 ÷ (1 + রিওয়ার্ড/রিস্ক)']
			]
		}
	};
	const c = $derived(copy[lang]);
</script>

<Seo title={c.seoTitle} description={c.seoDescription} path="/downloads/cheat-sheet" />

<div class="container-page max-w-4xl py-10 print:py-0">
	<div
		class="no-print mb-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-raised p-4"
	>
		<p class="text-ink">
			{c.savePdf} <strong>{c.print}</strong>
			{c.savePdfRest}
		</p>
		<button
			type="button"
			onclick={() => print()}
			class="btn-gold min-h-11 rounded-xl px-5 font-semibold"
		>
			{c.printButton}
		</button>
	</div>

	<h1 class="text-3xl font-extrabold text-ink">{c.title}</h1>
	<p class="mt-1 text-muted">{c.byline}</p>

	<div class="mt-8 grid gap-8 md:grid-cols-2 print:grid-cols-2">
		<section>
			<h2 class="text-xl font-bold text-ink">{c.termsTitle}</h2>
			<dl class="mt-3 space-y-2 text-sm">
				{#each c.terms as [term, meaning] (term)}
					<div>
						<dt class="font-semibold text-ink">{term}</dt>
						<dd class="text-body">{meaning}</dd>
					</div>
				{/each}
			</dl>
		</section>
		<section>
			<h2 class="text-xl font-bold text-ink">{c.ordersTitle}</h2>
			<dl class="mt-3 space-y-2 text-sm">
				{#each c.orders as [order, meaning] (order)}
					<div>
						<dt class="font-semibold text-ink">{order}</dt>
						<dd class="text-body">{meaning}</dd>
					</div>
				{/each}
			</dl>
			<h2 class="mt-6 text-xl font-bold text-ink">{c.candleTitle}</h2>
			<svg viewBox="0 0 220 120" class="mt-3 w-full max-w-xs" role="img" aria-label={c.candleAlt}>
				<line x1="50" x2="50" y1="10" y2="110" stroke="var(--color-muted)" stroke-width="2" />
				<rect x="35" y="35" width="30" height="50" rx="3" fill="var(--color-gold-400)" />
				<g font-size="11" fill="var(--color-body)">
					<text x="80" y="14">{c.high}</text>
					<text x="80" y="40">{c.close}</text>
					<text x="80" y="88">{c.open}</text>
					<text x="80" y="112">{c.low}</text>
				</g>
			</svg>
		</section>
	</div>

	<section class="mt-8">
		<h2 class="text-xl font-bold text-ink">{c.checklistTitle}</h2>
		<ul class="mt-3 grid gap-2 text-sm sm:grid-cols-2 print:grid-cols-2">
			{#each c.checklist as item (item)}
				<li class="flex gap-2 text-ink">
					<span class="inline-block size-4 shrink-0 rounded border-2 border-line-strong"
					></span>{item}
				</li>
			{/each}
		</ul>
	</section>

	<section class="mt-8 rounded-xl border border-line p-4 text-sm">
		<h2 class="font-bold text-ink">{c.formulasTitle}</h2>
		<ul class="mt-2 space-y-1 text-body">
			{#each c.formulas as [name, formula] (name)}
				<li><strong>{name}</strong> {formula}</li>
			{/each}
		</ul>
	</section>
</div>
