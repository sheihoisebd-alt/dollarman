<script lang="ts">
	let { value, max, label }: { value: number; max: number; label: string } = $props();
	const percent = $derived(max > 0 ? Math.round((value / max) * 100) : 0);
</script>

<div>
	<div class="mb-1.5 flex items-center justify-between text-sm">
		<span class="font-medium text-ink">{label}</span>
		<span class="text-muted">{value} / {max}</span>
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
			class="h-full rounded-full bg-silver-300 transition-[width]"
			style:width="{percent}%"
		></div>
	</div>
</div>
