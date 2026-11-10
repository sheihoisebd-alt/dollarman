<script lang="ts">
	import { resolve } from '$app/paths';
	import type { Path } from '$app/types';
	import Icon from '#lib/components/Icon.svelte';
	import Seo from '#lib/components/Seo.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<Seo
	title="Free trading tools and calculators"
	description="Free position-size, risk/reward and pip value calculators for beginner traders, plus a trading journal template and cheat-sheet pack."
	path="/tools"
/>

<div class="container-page py-10 sm:py-14">
	<h1 class="text-4xl font-extrabold tracking-tight text-ink">Free tools and downloads</h1>
	<p class="mt-3 max-w-2xl text-lg text-body">
		Simple calculators that work on your phone, and templates to help you practise. All free, no
		sign-up.
	</p>

	<h2 class="mt-10 text-2xl font-bold text-ink">Calculators</h2>
	<ul class="mt-4 grid gap-4 md:grid-cols-3">
		{#each data.calculators as tool (tool.slug)}
			<li>
				<a
					href={resolve(tool.href.slice(1) as Path)}
					class="flex h-full flex-col rounded-2xl border border-line p-5 hover:border-silver-400 hover:shadow-md"
				>
					<Icon name="calculator" class="size-7 text-silver-200" />
					<span class="mt-3 font-semibold text-ink">{tool.title}</span>
					<span class="mt-1.5 text-body">{tool.description}</span>
				</a>
			</li>
		{/each}
	</ul>

	<h2 class="mt-12 text-2xl font-bold text-ink">Downloads</h2>
	<ul class="mt-4 grid gap-4 md:grid-cols-2">
		{#each data.downloads as tool (tool.slug)}
			<li>
				<a
					href={resolve('/downloads')}
					class="flex h-full gap-4 rounded-2xl border border-line p-5 hover:border-silver-400 hover:shadow-md"
				>
					<Icon name="file" class="size-7 shrink-0 text-silver-200" />
					<span>
						<span class="block font-semibold text-ink">{tool.title}</span>
						<span class="mt-1 block text-body">{tool.description}</span>
						<span class="mt-2 block text-sm text-muted">{tool.fileFormat}</span>
					</span>
				</a>
			</li>
		{/each}
	</ul>
</div>
