<script lang="ts">
	import { num } from '#lib/i18n.js';
	import { currentLang } from '#lib/paths.svelte.js';

	let { value, max, label }: { value: number; max: number; label: string } = $props();
	const lang = $derived(currentLang());
	const percent = $derived(max > 0 ? Math.round((value / max) * 100) : 0);
</script>

<div>
	<div class="mb-1.5 flex items-center justify-between text-sm">
		<span class="font-medium text-ink">{label}</span>
		<span class="text-muted">{num(lang, value)} / {num(lang, max)}</span>
	</div>
	<div
		class="h-2.5 overflow-hidden rounded-full bg-line"
		role="progressbar"
		aria-label={label}
		aria-valuemin={0}
		aria-valuemax={max}
		aria-valuenow={value}
	>
		<div
			class="h-full rounded-full bg-linear-to-r from-gold-300 to-gold-500 transition-[width]"
			style:width="{percent}%"
		></div>
	</div>
</div>
