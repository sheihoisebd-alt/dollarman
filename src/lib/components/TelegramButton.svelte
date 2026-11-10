<script lang="ts">
	import { TELEGRAM_URL } from '#lib/attribution.svelte.js';
	import { trackLead } from '#lib/tracking.js';
	import Icon from './Icon.svelte';

	type Props = {
		/** Where the button sits; sent with the Lead event. */
		placement: string;
		label: string;
		variant?: 'primary' | 'inverse' | 'compact';
		class?: string;
	};

	let { placement, label, variant = 'primary', class: className = '' }: Props = $props();

	// Every variant is brushed silver; "inverse" is kept so callers on CTA panels need no change.
	const styles = {
		primary: 'min-h-14 px-6 text-base sm:text-lg',
		inverse: 'min-h-14 px-6 text-base sm:text-lg',
		compact: 'min-h-11 px-4 text-sm'
	};
</script>

<!-- External t.me link, so resolve() does not apply. -->
<!-- eslint-disable svelte/no-navigation-without-resolve -->
<a
	href={TELEGRAM_URL}
	data-cta
	rel="noopener"
	onclick={() => trackLead(placement)}
	class="btn-metal inline-flex items-center justify-center gap-2.5 rounded-xl font-semibold {styles[
		variant
	]} {className}"
>
	<Icon name="telegram" class={variant === 'compact' ? 'size-5' : 'size-6'} />
	<span>{label}</span>
</a>
<!-- eslint-enable svelte/no-navigation-without-resolve -->
