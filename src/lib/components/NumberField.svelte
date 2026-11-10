<script lang="ts">
	type Props = {
		id: string;
		label: string;
		value: number | null;
		hint?: string;
		suffix?: string;
		min?: number;
		step?: number | 'any';
	};

	// Two-way binding is the point of this component: the parent owns the number.
	let { id, label, value = $bindable(), hint, suffix, min = 0, step = 'any' }: Props = $props();
</script>

<div>
	<label for={id} class="field-label">{label}</label>
	<div class="relative">
		<input
			{id}
			type="number"
			inputmode="decimal"
			{min}
			{step}
			bind:value
			aria-describedby={hint ? `${id}-hint` : undefined}
			class="field-input {suffix ? 'pr-16' : ''}"
		/>
		{#if suffix}
			<span
				class="pointer-events-none absolute inset-y-0 right-4 flex items-center text-sm text-muted"
				>{suffix}</span
			>
		{/if}
	</div>
	{#if hint}<p id="{id}-hint" class="mt-1.5 text-sm text-muted">{hint}</p>{/if}
</div>
