<script lang="ts">
	import { resolve } from '$app/paths';
	import { progress } from '#lib/progress.svelte.js';
	import { absoluteUrl } from '#lib/site.js';
	import Icon from '#lib/components/Icon.svelte';
	import ModuleList from '#lib/components/ModuleList.svelte';
	import ProgressBar from '#lib/components/ProgressBar.svelte';
	import Seo from '#lib/components/Seo.svelte';
	import TelegramButton from '#lib/components/TelegramButton.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const completed = $derived(
		data.modules.filter((m) => progress.isComplete(m.slug, m.checklist.length)).length
	);
	const totalMinutes = $derived(data.modules.reduce((sum, m) => sum + m.durationMin, 0));
	const nextModule = $derived(
		data.modules.find((m) => !progress.isComplete(m.slug, m.checklist.length)) ?? data.modules[0]
	);
</script>

<Seo
	title="Free trading course for beginners"
	description="A free, structured trading course in 10 modules: markets, charts, risk management, trading plans and psychology. Module 1 is free to read now."
	path="/course"
	jsonLd={[
		{
			'@context': 'https://schema.org',
			'@type': 'ItemList',
			name: 'Free trading course modules',
			itemListElement: data.modules.map((m) => ({
				'@type': 'ListItem',
				position: m.position,
				name: m.title,
				url: absoluteUrl(`/course/${m.slug}`)
			}))
		}
	]}
/>

<section class="hero-glow border-b border-line">
	<div class="container-page py-12 sm:py-16">
		<p class="text-sm font-semibold tracking-wide text-silver-200 uppercase">Free course</p>
		<h1 class="mt-2 text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
			Learn trading from zero
		</h1>
		<p class="mt-4 max-w-2xl text-lg text-body">
			{data.modules.length} short modules that take you step by step from the basics to practical skills.
			Module 1 is free to read here. The full lessons, updates and Q&A are free in our Telegram community.
		</p>
		<ul class="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-body">
			<li class="inline-flex items-center gap-2">
				<Icon name="book" class="size-5 text-silver-200" />{data.modules.length} modules
			</li>
			<li class="inline-flex items-center gap-2">
				<Icon name="clock" class="size-5 text-silver-200" />About {Math.round(totalMinutes / 60)} hours
				of study
			</li>
			<li class="inline-flex items-center gap-2">
				<Icon name="check" class="size-5 text-silver-200" />Quizzes and checklists
			</li>
		</ul>

		<div class="mt-8 max-w-xl rounded-2xl border border-line bg-surface p-5">
			<ProgressBar value={completed} max={data.modules.length} label="Your progress" />
			<p class="mt-3 text-sm text-muted">
				{#if !progress.loaded}
					Your progress is saved on this device.
				{:else if completed === 0}
					Start with Module 1. Tick the checklist at the end of each module to track your progress.
				{:else if completed === data.modules.length}
					You have completed every module. Well done! Keep practising on demo.
				{:else}
					Next up: <a
						class="font-medium text-silver-200 underline"
						href={resolve('/course/[slug]', { slug: nextModule.slug })}>{nextModule.title}</a
					>
				{/if}
			</p>
		</div>
	</div>
</section>

<section class="container-page py-12" aria-labelledby="modules">
	<h2 id="modules" class="text-2xl font-bold text-ink">Course modules</h2>
	<div class="mt-6"><ModuleList modules={data.modules} showProgress /></div>

	<div class="panel-cta mt-12 rounded-2xl p-6 text-ink sm:p-8">
		<h2 class="text-2xl font-bold">Get every module free on Telegram</h2>
		<p class="mt-2 max-w-xl text-body">
			Lessons are unlocked step by step in our Telegram community, with daily mini-lessons and a
			place to ask questions.
		</p>
		<div class="mt-6">
			<TelegramButton
				placement="course-index"
				label="Join the free course on Telegram"
				variant="inverse"
			/>
		</div>
	</div>
</section>
