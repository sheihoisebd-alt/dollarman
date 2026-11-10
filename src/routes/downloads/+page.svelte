<script lang="ts">
	import { asset, resolve } from '$app/paths';
	import type { AssetPath, Path } from '$app/types';
	import Icon from '#lib/components/Icon.svelte';
	import Seo from '#lib/components/Seo.svelte';
	import TelegramButton from '#lib/components/TelegramButton.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<Seo
	title="Free trading journal and cheat-sheet pack"
	description="Download a free trading journal template for Excel or Google Sheets and a printable beginner trading cheat-sheet."
	path="/downloads"
/>

<div class="container-page max-w-4xl py-10 sm:py-14">
	<h1 class="text-4xl font-extrabold tracking-tight text-ink">Free downloads</h1>
	<p class="mt-3 max-w-2xl text-lg text-body">
		Templates to help you practise with structure. Free, no email needed.
	</p>

	<ul class="mt-8 space-y-4">
		{#each data.downloads as item (item.slug)}
			<li
				class="flex flex-col gap-4 rounded-2xl border border-line p-5 sm:flex-row sm:items-center"
			>
				<Icon name="file" class="size-8 shrink-0 text-silver-200" />
				<div class="flex-1">
					<h2 class="font-semibold text-ink">{item.title}</h2>
					<p class="mt-1 text-body">{item.description}</p>
					<p class="mt-1 text-sm text-muted">Format: {item.fileFormat}</p>
				</div>
				<a
					href={item.href.endsWith('.csv')
						? asset(item.href.slice(1) as AssetPath)
						: resolve(item.href.slice(1) as Path)}
					download={item.href.endsWith('.csv') ? '' : undefined}
					class="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-silver-300 px-5 font-semibold text-silver-200 hover:bg-raised"
				>
					<Icon name="download" />{item.href.endsWith('.csv') ? 'Download' : 'Open'}
				</a>
			</li>
		{/each}
	</ul>

	<div class="prose mt-10">
		<h2>How to use the trading journal</h2>
		<ol>
			<li>Download the CSV file and open it in Excel, or in Google Sheets with File → Import.</li>
			<li>
				Log every demo trade: date, pair, direction, entry, stop-loss, target, size, result and a
				short note about why you took it.
			</li>
			<li>Once a week, review your journal and write down one thing to improve.</li>
		</ol>
	</div>

	<div class="mt-12 rounded-2xl bg-raised p-6">
		<h2 class="text-xl font-bold text-ink">Get feedback on your journal</h2>
		<p class="mt-2 text-body">
			Share your weekly review in the community and learn from other beginners.
		</p>
		<div class="mt-5">
			<TelegramButton placement="downloads" label="Join the free course on Telegram" />
		</div>
	</div>
</div>
