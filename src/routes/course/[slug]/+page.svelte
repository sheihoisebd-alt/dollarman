<script lang="ts">
	import { resolve } from '$app/paths';
	import { progress } from '#lib/progress.svelte.js';
	import Checklist from '#lib/components/Checklist.svelte';
	import Icon from '#lib/components/Icon.svelte';
	import ProgressBar from '#lib/components/ProgressBar.svelte';
	import Quiz from '#lib/components/Quiz.svelte';
	import Seo from '#lib/components/Seo.svelte';
	import TelegramButton from '#lib/components/TelegramButton.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const m = $derived(data.module);
	const checked = $derived(m.checklist.filter((_, i) => progress.isChecked(m.slug, i)).length);
</script>

<Seo
	title="Module {m.position}: {m.title}"
	description={m.summary}
	path="/course/{m.slug}"
	jsonLd={[
		{
			'@context': 'https://schema.org',
			'@type': 'LearningResource',
			name: m.title,
			description: m.summary,
			learningResourceType: 'Lesson',
			educationalLevel: 'Beginner',
			isAccessibleForFree: true,
			timeRequired: `PT${m.durationMin}M`,
			teaches: m.outcomes,
			isPartOf: { '@type': 'Course', name: 'Free trading course for beginners' }
		}
	]}
/>

<article>
	<header class="hero-glow border-b border-line">
		<div class="container-page max-w-3xl py-10 sm:py-14">
			<nav aria-label="Breadcrumb" class="text-sm">
				<a href={resolve('/course')} class="font-medium text-silver-200 hover:underline"
					>Free course</a
				>
				<span class="text-muted" aria-hidden="true"> / </span>
				<span class="text-muted">Module {m.position} of {data.total}</span>
			</nav>
			<h1 class="mt-3 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
				{m.title}
			</h1>
			<p class="mt-4 text-lg text-body">{m.summary}</p>
			<div class="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-body">
				<span class="inline-flex items-center gap-1.5"
					><Icon name="clock" class="size-4" />{m.durationMin} min</span
				>
				<span class="inline-flex items-center gap-1.5"
					><Icon name="book" class="size-4" />{m.lessons.length} lessons</span
				>
				{#if m.preview}
					<span class="rounded-full bg-emerald-400/15 px-2.5 py-0.5 font-semibold text-emerald-300"
						>Free preview</span
					>
				{/if}
			</div>
			<div class="mt-6 max-w-md">
				<ProgressBar value={checked} max={m.checklist.length} label="Module progress" />
			</div>
		</div>
	</header>

	<div class="container-page max-w-3xl space-y-10 pb-16">
		<section aria-labelledby="outcomes" class="rounded-2xl border border-line p-5 sm:p-6">
			<h2 id="outcomes" class="text-xl font-bold text-ink">By the end of this module you can</h2>
			<ul class="mt-4 space-y-2.5">
				{#each m.outcomes as outcome (outcome)}
					<li class="flex gap-3 text-ink">
						<Icon name="check" class="mt-0.5 size-5 shrink-0 text-silver-200" />{outcome}
					</li>
				{/each}
			</ul>
		</section>

		<section aria-labelledby="lessons">
			<h2 id="lessons" class="text-xl font-bold text-ink">Lessons in this module</h2>
			<ol class="mt-4 divide-y divide-line rounded-2xl border border-line">
				{#each m.lessons as lesson, i (lesson)}
					<li class="flex items-center gap-3 p-4">
						<span
							class="flex size-8 shrink-0 items-center justify-center rounded-full bg-raised text-sm font-semibold text-body"
							>{i + 1}</span
						>
						<span class="flex-1 text-ink">{lesson}</span>
						{#if !m.preview}<Icon name="lock" class="size-4 text-muted" />{/if}
					</li>
				{/each}
			</ol>
		</section>

		{#if !m.preview}
			<div class="flex gap-4 rounded-2xl bg-raised p-5" role="note">
				<Icon name="telegram" class="size-7 shrink-0 text-silver-200" />
				<p class="text-ink">
					This page is a preview of the module. <strong
						>The full lessons are free in our Telegram community</strong
					>, where they are unlocked step by step with practice tasks and Q&A.
				</p>
			</div>
		{/if}

		<div class="prose">
			<data.Content />
		</div>

		{#if data.quiz.length > 0}
			<Quiz slug={m.slug} questions={data.quiz} />
		{/if}

		<Checklist slug={m.slug} items={m.checklist} />

		<!-- Telegram CTA at the end of every module -->
		<section class="panel-cta rounded-2xl p-6 text-ink sm:p-8" aria-labelledby="module-cta">
			<h2 id="module-cta" class="text-2xl font-bold">
				{data.next
					? `Continue with Module ${data.next.position} on Telegram`
					: 'Keep learning with the community'}
			</h2>
			<p class="mt-2 text-body">
				{data.next
					? `Get "${data.next.title}" free, plus daily mini-lessons and answers to your questions.`
					: 'Share your journal, get feedback and keep practising with other students.'}
			</p>
			<div class="mt-6">
				<TelegramButton
					placement="module-{m.position}"
					label="Join the free course on Telegram"
					variant="inverse"
				/>
			</div>
		</section>

		<nav aria-label="Module navigation" class="grid gap-3 sm:grid-cols-2">
			{#if data.prev}
				<a
					href={resolve('/course/[slug]', { slug: data.prev.slug })}
					class="rounded-2xl border border-line p-4 hover:border-silver-400"
				>
					<span class="text-sm text-muted">Previous</span>
					<span class="block font-semibold text-ink">{data.prev.title}</span>
				</a>
			{:else}
				<span></span>
			{/if}
			{#if data.next}
				<a
					href={resolve('/course/[slug]', { slug: data.next.slug })}
					class="rounded-2xl border border-line p-4 text-right hover:border-silver-400"
				>
					<span class="text-sm text-muted">Next</span>
					<span class="block font-semibold text-ink">{data.next.title}</span>
				</a>
			{/if}
		</nav>
	</div>
</article>
