<!--
	Full-colour brand and illustration icons for the stats and "connect with us" cards.
	(Icon.svelte stays for the single-colour line icons.)
-->
<script module lang="ts">
	export type BrandName =
		'telegram' | 'facebook' | 'youtube' | 'tiktok' | 'instagram' | 'email' | 'students' | 'award';
</script>

<script lang="ts">
	let { name, class: className = 'size-8' }: { name: BrandName; class?: string } = $props();
	const uid = $props.id();
</script>

<svg viewBox="0 0 48 48" class={className} aria-hidden="true" focusable="false">
	{#if name === 'telegram'}
		<defs>
			<linearGradient id="{uid}-tg" x1="0" y1="0" x2="0" y2="1">
				<stop offset="0%" stop-color="#37bbfe" />
				<stop offset="100%" stop-color="#007dbb" />
			</linearGradient>
		</defs>
		<circle cx="24" cy="24" r="20" fill="url(#{uid}-tg)" />
		<path
			d="M13.5 23.4 32.8 16c.9-.3 1.7.2 1.4 1.6l-3.3 15.5c-.2 1.1-.9 1.4-1.8.9l-5-3.7-2.4 2.3c-.3.3-.5.5-1 .5l.4-5.1 9.2-8.3c.4-.4-.1-.6-.6-.2L16.3 26.6l-4.9-1.5c-1.1-.3-1.1-1.1.2-1.7Z"
			fill="#fff"
		/>
	{:else if name === 'facebook'}
		<circle cx="24" cy="24" r="20" fill="#1877f2" />
		<path
			d="M26.6 44V30.2h4.6l.7-5.4h-5.3v-3.4c0-1.6.4-2.6 2.7-2.6H32v-4.8c-.5-.1-2.2-.2-4.1-.2-4.1 0-6.9 2.5-6.9 7v3.9h-4.6v5.4H21V44"
			fill="#fff"
		/>
	{:else if name === 'youtube'}
		<rect x="4" y="11" width="40" height="27" rx="8" fill="#ff0000" />
		<path d="M20 18v13l11-6.5Z" fill="#fff" />
	{:else if name === 'tiktok'}
		<rect x="4" y="4" width="40" height="40" rx="10" fill="#111" />
		<path
			d="M27.5 12v15.2a5.3 5.3 0 1 1-5.3-5.3"
			fill="none"
			stroke="#25f4ee"
			stroke-width="3.2"
			stroke-linecap="round"
			transform="translate(-1.2 -1)"
		/>
		<path
			d="M27.5 12v15.2a5.3 5.3 0 1 1-5.3-5.3"
			fill="none"
			stroke="#fe2c55"
			stroke-width="3.2"
			stroke-linecap="round"
			transform="translate(1.2 1)"
		/>
		<path
			d="M27.5 12v15.2a5.3 5.3 0 1 1-5.3-5.3M27.5 12c.5 3.3 2.7 5.4 6 5.6"
			fill="none"
			stroke="#fff"
			stroke-width="3.2"
			stroke-linecap="round"
		/>
	{:else if name === 'instagram'}
		<defs>
			<radialGradient id="{uid}-ig" cx="0.3" cy="1.05" r="1.2">
				<stop offset="0%" stop-color="#ffd776" />
				<stop offset="25%" stop-color="#f3a554" />
				<stop offset="50%" stop-color="#f13e70" />
				<stop offset="80%" stop-color="#c22fb1" />
				<stop offset="100%" stop-color="#6a3ce0" />
			</radialGradient>
		</defs>
		<rect x="4" y="4" width="40" height="40" rx="11" fill="url(#{uid}-ig)" />
		<rect x="13" y="13" width="22" height="22" rx="7" fill="none" stroke="#fff" stroke-width="3" />
		<circle cx="24" cy="24" r="5.2" fill="none" stroke="#fff" stroke-width="3" />
		<circle cx="31.2" cy="16.8" r="1.7" fill="#fff" />
	{:else if name === 'email'}
		<defs>
			<linearGradient id="{uid}-em" x1="0" y1="0" x2="1" y2="1">
				<stop offset="0%" stop-color="#ffe68a" />
				<stop offset="100%" stop-color="#f59e0b" />
			</linearGradient>
		</defs>
		<rect x="5" y="10" width="38" height="28" rx="6" fill="url(#{uid}-em)" />
		<path
			d="m8 14 16 12 16-12"
			fill="none"
			stroke="#111"
			stroke-width="3"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
	{:else if name === 'students'}
		<!-- Graduation cap over a learner -->
		<circle cx="24" cy="30" r="8" fill="#f4c7a1" />
		<path d="M10 46c1.5-7 7-10.5 14-10.5S36.5 39 38 46Z" fill="#2aabee" />
		<path d="M24 8 4 16l20 8 20-8Z" fill="#ffbf1a" />
		<path d="M14 20v6c0 2.5 4.5 4.5 10 4.5s10-2 10-4.5v-6l-10 4Z" fill="#f59e0b" />
		<path d="M40 17.5v9" stroke="#ffbf1a" stroke-width="2" stroke-linecap="round" />
		<circle cx="40" cy="28" r="2" fill="#ffe68a" />
		<circle cx="35" cy="38" r="5" fill="#22c55e" />
		<path
			d="m32.8 38 1.6 1.6 3-3"
			fill="none"
			stroke="#fff"
			stroke-width="1.8"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
	{:else if name === 'award'}
		<!-- Certificate with a rosette -->
		<rect x="5" y="7" width="38" height="26" rx="3" fill="#dbeafe" />
		<rect
			x="8"
			y="10"
			width="32"
			height="20"
			rx="2"
			fill="none"
			stroke="#2aabee"
			stroke-width="1.5"
		/>
		<path d="M13 15h22M13 19.5h14" stroke="#64748b" stroke-width="2" stroke-linecap="round" />
		<path d="m20 34-3 10 4-2 3 3 1.5-11Z" fill="#ef4444" />
		<path d="m28 34 3 10-4-2-3 3-1.5-11Z" fill="#dc2626" />
		<circle cx="24" cy="31" r="7" fill="#ffbf1a" stroke="#f59e0b" stroke-width="1.5" />
		<text x="24" y="34.5" text-anchor="middle" font-size="9" font-weight="800" fill="#7c4a03"
			>$</text
		>
	{/if}
</svg>
