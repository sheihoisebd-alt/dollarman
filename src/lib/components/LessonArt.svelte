<!--
	Topic artwork for a lesson thumbnail, drawn in the site's gold and Telegram blue so every card
	has a picture that matches its subject. Falls back to a generic chart for unknown slugs.
-->
<script lang="ts">
	let { slug, class: className = '' }: { slug: string; class?: string } = $props();

	// Unique gradient ids per instance, since the same art can appear twice on a page
	const uid = $props.id();

	const candles = [
		{ x: 22, o: 92, c: 78, h: 70, l: 98, up: true },
		{ x: 42, o: 80, c: 88, h: 74, l: 94, up: false },
		{ x: 62, o: 86, c: 66, h: 58, l: 90, up: true },
		{ x: 82, o: 68, c: 74, h: 62, l: 80, up: false },
		{ x: 102, o: 72, c: 52, h: 44, l: 76, up: true },
		{ x: 122, o: 54, c: 60, h: 48, l: 66, up: false },
		{ x: 142, o: 58, c: 36, h: 28, l: 62, up: true }
	];
</script>

<svg
	viewBox="0 0 200 125"
	class={className}
	preserveAspectRatio="xMidYMid slice"
	aria-hidden="true"
	focusable="false"
>
	<defs>
		<linearGradient id="{uid}-bg" x1="0" y1="0" x2="1" y2="1">
			<stop offset="0%" stop-color="#1c1c21" />
			<stop offset="100%" stop-color="#0d0d10" />
		</linearGradient>
		<radialGradient id="{uid}-glow-gold" cx="0.8" cy="0.15" r="0.7">
			<stop offset="0%" stop-color="#ffbf1a" stop-opacity="0.35" />
			<stop offset="100%" stop-color="#ffbf1a" stop-opacity="0" />
		</radialGradient>
		<radialGradient id="{uid}-glow-blue" cx="0.1" cy="1" r="0.7">
			<stop offset="0%" stop-color="#2aabee" stop-opacity="0.3" />
			<stop offset="100%" stop-color="#2aabee" stop-opacity="0" />
		</radialGradient>
		<linearGradient id="{uid}-gold" x1="0" y1="0" x2="1" y2="1">
			<stop offset="0%" stop-color="#ffe68a" />
			<stop offset="50%" stop-color="#ffbf1a" />
			<stop offset="100%" stop-color="#f59e0b" />
		</linearGradient>
		<linearGradient id="{uid}-area" x1="0" y1="0" x2="0" y2="1">
			<stop offset="0%" stop-color="#ffbf1a" stop-opacity="0.45" />
			<stop offset="100%" stop-color="#ffbf1a" stop-opacity="0" />
		</linearGradient>
		<pattern id="{uid}-grid" width="20" height="20" patternUnits="userSpaceOnUse">
			<path d="M20 0H0V20" fill="none" stroke="#ffffff" stroke-opacity="0.05" stroke-width="1" />
		</pattern>
	</defs>

	<rect width="200" height="125" fill="url(#{uid}-bg)" />
	<rect width="200" height="125" fill="url(#{uid}-grid)" />
	<rect width="200" height="125" fill="url(#{uid}-glow-gold)" />
	<rect width="200" height="125" fill="url(#{uid}-glow-blue)" />

	{#if slug === 'trading-basics'}
		<!-- Candlesticks climbing, with a trend arrow -->
		{#each candles as k (k.x)}
			<line
				x1={k.x + 6}
				x2={k.x + 6}
				y1={k.h}
				y2={k.l}
				stroke={k.up ? '#ffd23f' : '#5ccbff'}
				stroke-width="1.5"
			/>
			<rect
				x={k.x}
				y={Math.min(k.o, k.c)}
				width="12"
				height={Math.abs(k.o - k.c)}
				rx="1.5"
				fill={k.up ? `url(#${uid}-gold)` : '#2aabee'}
			/>
		{/each}
		<path
			d="M18 104 L80 84 L118 70 L170 30"
			fill="none"
			stroke="#ffffff"
			stroke-opacity="0.85"
			stroke-width="2.5"
			stroke-linecap="round"
			stroke-dasharray="4 5"
		/>
		<path
			d="M160 28 L172 28 L172 40"
			fill="none"
			stroke="#ffffff"
			stroke-width="2.5"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
	{:else if slug === 'markets-and-instruments'}
		<!-- Currency coins: dollar, euro, taka and gold -->
		<circle cx="62" cy="62" r="30" fill="url(#{uid}-gold)" />
		<circle
			cx="62"
			cy="62"
			r="24"
			fill="none"
			stroke="#111"
			stroke-opacity="0.25"
			stroke-width="2"
		/>
		<text x="62" y="74" text-anchor="middle" font-size="34" font-weight="800" fill="#111">$</text>
		<circle cx="122" cy="44" r="20" fill="#2aabee" />
		<text x="122" y="52" text-anchor="middle" font-size="22" font-weight="800" fill="#fff">€</text>
		<circle cx="140" cy="88" r="22" fill="#1d1d22" stroke="url(#{uid}-gold)" stroke-width="3" />
		<text x="140" y="97" text-anchor="middle" font-size="24" font-weight="800" fill="#ffd23f"
			>৳</text
		>
		<rect
			x="28"
			y="98"
			width="30"
			height="12"
			rx="2"
			fill="url(#{uid}-gold)"
			transform="skewX(-12)"
		/>
		<rect
			x="62"
			y="98"
			width="30"
			height="12"
			rx="2"
			fill="url(#{uid}-gold)"
			transform="skewX(-12)"
		/>
		<rect x="46" y="86" width="30" height="12" rx="2" fill="#ffe68a" transform="skewX(-12)" />
	{:else if slug === 'reading-price-charts'}
		<!-- Price line with a glowing area and a marked level -->
		<path
			d="M0 100 L28 88 L52 94 L80 66 L104 74 L132 44 L156 52 L200 22 L200 125 L0 125 Z"
			fill="url(#{uid}-area)"
		/>
		<path
			d="M0 100 L28 88 L52 94 L80 66 L104 74 L132 44 L156 52 L200 22"
			fill="none"
			stroke="url(#{uid}-gold)"
			stroke-width="3"
			stroke-linejoin="round"
			stroke-linecap="round"
		/>
		<line
			x1="0"
			x2="200"
			y1="66"
			y2="66"
			stroke="#2aabee"
			stroke-width="1.5"
			stroke-dasharray="5 4"
		/>
		<circle cx="132" cy="44" r="5" fill="#fff" />
		<circle
			cx="132"
			cy="44"
			r="10"
			fill="none"
			stroke="#fff"
			stroke-opacity="0.4"
			stroke-width="2"
		/>
		<rect x="140" y="58" width="44" height="16" rx="4" fill="#2aabee" />
		<text x="162" y="70" text-anchor="middle" font-size="10" font-weight="700" fill="#fff"
			>1.0850</text
		>
	{:else}
		<!-- Generic: rising bars -->
		{#each [30, 48, 40, 64, 56, 82] as hgt, i (i)}
			<rect
				x={30 + i * 25}
				y={110 - hgt}
				width="16"
				height={hgt}
				rx="3"
				fill={i % 2 ? '#2aabee' : `url(#${uid}-gold)`}
			/>
		{/each}
	{/if}
</svg>
