<script lang="ts">
	import type { Dictionary } from '#lib/i18n.js';
	import TelegramButton from './TelegramButton.svelte';

	let { dict }: { dict: Dictionary } = $props();
</script>

<!-- Always visible, never covers content: the layout reserves space at the bottom of the page. -->
<div
	class="no-print fixed inset-x-0 bottom-0 z-40 border-t border-line bg-page/90 px-4 pt-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))] backdrop-blur"
>
	<div class="mx-auto flex max-w-6xl items-center gap-3">
		<p class="hidden flex-1 text-sm text-body sm:block">{dict.cta.note}</p>
		<TelegramButton placement="sticky" label={dict.cta.sticky} class="w-full sm:w-auto" />
	</div>
</div>
