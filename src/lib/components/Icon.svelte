<script lang="ts">
	type Name =
		| 'telegram'
		| 'facebook'
		| 'check'
		| 'book'
		| 'chart'
		| 'shield'
		| 'target'
		| 'calculator'
		| 'file'
		| 'users'
		| 'lock'
		| 'clock'
		| 'arrow-right'
		| 'download';

	let { name, class: className = 'size-5' }: { name: Name; class?: string } = $props();
</script>

<svg
	class={className}
	viewBox="0 0 24 24"
	fill="none"
	stroke="currentColor"
	stroke-width="2"
	stroke-linecap="round"
	stroke-linejoin="round"
	aria-hidden="true"
	focusable="false"
>
	{#if name === 'telegram'}
		<path
			fill="currentColor"
			stroke="none"
			d="M21.4 3.6 2.9 10.7c-1.3.5-1.2 2.3.1 2.7l4.6 1.4 1.8 5.6c.3 1 1.6 1.3 2.3.5l2.6-2.6 4.6 3.4c.9.6 2.1.1 2.3-.9l3-15c.2-1.3-1-2.3-2.2-1.9Zm-3.3 4-8 7.2-.4 3.3-1.4-4.3 9.2-6.6c.4-.3.9.1.6.4Z"
		/>
	{:else if name === 'facebook'}
		<path
			fill="currentColor"
			stroke="none"
			d="M24 12a12 12 0 1 0-13.9 11.9v-8.4H7.1V12h3V9.4c0-3 1.8-4.7 4.5-4.7 1.3 0 2.7.2 2.7.2v3h-1.5c-1.5 0-2 .9-2 1.9V12h3.4l-.5 3.5h-2.9v8.4A12 12 0 0 0 24 12Z"
		/>
	{:else if name === 'check'}
		<path d="M20 6 9 17l-5-5" />
	{:else if name === 'book'}
		<path
			d="M4 19.5V5a2 2 0 0 1 2-2h14v16H6.5A2.5 2.5 0 0 0 4 21.5v-2Zm0 0A2.5 2.5 0 0 1 6.5 17H20"
		/>
	{:else if name === 'chart'}
		<path d="M3 3v18h18M7 15l4-4 3 3 5-6" />
	{:else if name === 'shield'}
		<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
	{:else if name === 'target'}
		<circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1" />
	{:else if name === 'calculator'}
		<rect x="5" y="2" width="14" height="20" rx="2" /><path
			d="M8 6h8M8 11h.01M12 11h.01M16 11h.01M8 15h.01M12 15h.01M16 15h.01M8 19h8"
		/>
	{:else if name === 'file'}
		<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Z" /><path
			d="M14 2v6h6M8 13h8M8 17h5"
		/>
	{:else if name === 'users'}
		<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path
			d="M23 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8"
		/>
	{:else if name === 'lock'}
		<rect x="4" y="11" width="16" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" />
	{:else if name === 'clock'}
		<circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" />
	{:else if name === 'arrow-right'}
		<path d="M5 12h14M13 6l6 6-6 6" />
	{:else if name === 'download'}
		<path d="M12 3v12m0 0-5-5m5 5 5-5M4 21h16" />
	{/if}
</svg>
