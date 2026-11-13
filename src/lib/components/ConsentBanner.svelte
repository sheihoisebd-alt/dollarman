<script lang="ts">
	import type { Dictionary, Lang } from '#lib/i18n.js';
	import { href } from '#lib/paths.svelte.js';
	import { consent, setConsent } from '#lib/consent.svelte.js';
	import { revokeTracking, trackPageView } from '#lib/tracking.js';

	let { lang, dict }: { lang: Lang; dict: Dictionary } = $props();

	function accept() {
		setConsent('granted');
		trackPageView();
	}

	function decline() {
		setConsent('denied');
		revokeTracking();
	}
</script>

<!-- A non-blocking bar, not a modal: the page stays fully usable. -->
{#if consent.loaded && consent.value === null}
	<section
		aria-label="Cookie consent"
		class="no-print fixed inset-x-0 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-40 px-3"
	>
		<div
			class="mx-auto flex max-w-3xl flex-col gap-3 rounded-2xl border border-line bg-surface p-4 shadow-lg sm:flex-row sm:items-center"
		>
			<p class="flex-1 text-sm text-body">
				{dict.consent.text}
				<a href={href(lang, '/privacy')} class="font-medium text-gold-300 underline"
					>{dict.consent.more}</a
				>
			</p>
			<div class="flex gap-2">
				<button
					type="button"
					onclick={decline}
					class="min-h-11 flex-1 rounded-xl border border-line-strong px-4 text-sm font-semibold text-ink hover:bg-raised"
				>
					{dict.consent.decline}
				</button>
				<button
					type="button"
					onclick={accept}
					class="btn-gold min-h-11 flex-1 rounded-xl px-4 text-sm font-semibold"
				>
					{dict.consent.accept}
				</button>
			</div>
		</div>
	</section>
{/if}
