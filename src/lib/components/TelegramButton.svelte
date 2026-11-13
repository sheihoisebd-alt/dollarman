<script lang="ts">
	import { TELEGRAM_URL } from '#lib/attribution.svelte.js';
	import { trackLead } from '#lib/tracking.js';
	import Icon from './Icon.svelte';

	type Props = {
		/** Where the button sits; sent with the Lead event. */
		placement: string;
		label: string;
		variant?: 'primary' | 'inverse' | 'medium' | 'compact';
		class?: string;
	};

	let { placement, label, variant = 'primary', class: className = '' }: Props = $props();

	// Every variant uses the Telegram blue; "inverse" is kept so callers on CTA panels need no change.
	const styles = {
		primary: 'min-h-14 px-6 text-base sm:text-lg',
		inverse: 'min-h-14 px-6 text-base sm:text-lg',
		medium: 'min-h-12 px-6 text-base',
		compact: 'min-h-11 px-4 text-sm'
	};
</script>

<a
	href={TELEGRAM_URL}
	data-cta
	rel="noopener"
	onclick={() => trackLead(placement)}
	class="btn-telegram inline-flex items-center justify-center gap-2.5 rounded-xl font-bold {styles[
		variant
	]} {className}"
>
	<Icon
		name="telegram"
		class={variant === 'primary' || variant === 'inverse' ? 'size-6' : 'size-5'}
	/>
	<span>{label}</span>
</a>
