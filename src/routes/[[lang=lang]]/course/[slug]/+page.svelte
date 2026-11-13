<script lang="ts">
	import { progress } from '#lib/progress.svelte.js';
	import { num, t } from '#lib/i18n.js';
	import { href } from '#lib/paths.svelte.js';
	import Checklist from '#lib/components/Checklist.svelte';
	import Icon from '#lib/components/Icon.svelte';
	import ProgressBar from '#lib/components/ProgressBar.svelte';
	import Quiz from '#lib/components/Quiz.svelte';
	import Seo from '#lib/components/Seo.svelte';
	import TelegramButton from '#lib/components/TelegramButton.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	const lang = $derived(data.lang);
	const common = $derived(t(lang).common);

	const copy = {
		en: {
			seoTitle: (n: string, title: string) => `Module ${n}: ${title}`,
			courseName: 'Free trading course for beginners',
			of: (n: string, total: string) => `Module ${n} of ${total}`,
			progress: 'Module progress',
			outcomes: 'By the end of this module you can',
			lessons: 'Lessons in this module',
			previewNote: 'This page is a preview of the module.',
			previewStrong: 'The full lessons are free in our Telegram community',
			previewRest: ', where they are unlocked step by step with practice tasks and Q&A.',
			ctaNext: (n: string) => `Continue with Module ${n} on Telegram`,
			ctaNextText: (title: string) =>
				`Get "${title}" free, plus daily mini-lessons and answers to your questions.`,
			ctaEnd: 'Keep learning with the community',
			ctaEndText: 'Share your journal, get feedback and keep practising with other students.',
			nav: 'Module navigation'
		},
		bn: {
			seoTitle: (n: string, title: string) => `মডিউল ${n}: ${title}`,
			courseName: 'নতুনদের জন্য ফ্রি ট্রেডিং কোর্স',
			of: (n: string, total: string) => `${total}টার মধ্যে মডিউল ${n}`,
			progress: 'এই মডিউলে অগ্রগতি',
			outcomes: 'এই মডিউল শেষে আপনি পারবেন',
			lessons: 'এই মডিউলের লেসনগুলো',
			previewNote: 'এই পেজটা মডিউলের একটা প্রিভিউ।',
			previewStrong: 'পুরো লেসনগুলো আমাদের টেলিগ্রাম কমিউনিটিতে ফ্রিতে পাবেন',
			previewRest: '। সেখানে প্র্যাকটিসের কাজ আর প্রশ্নোত্তরসহ লেসনগুলো ধাপে ধাপে খোলে।',
			ctaNext: (n: string) => `টেলিগ্রামে মডিউল ${n} শুরু করুন`,
			ctaNextText: (title: string) =>
				`"${title}" ফ্রিতে পড়ুন। সাথে পাবেন প্রতিদিনের ছোট লেসন আর আপনার প্রশ্নের উত্তর।`,
			ctaEnd: 'কমিউনিটির সাথে শেখা চালিয়ে যান',
			ctaEndText: 'নিজের জার্নাল শেয়ার করুন, মতামত নিন, আর অন্যদের সাথে প্র্যাকটিস চালিয়ে যান।',
			nav: 'মডিউলের মধ্যে যাওয়া-আসা'
		}
	};
	const c = $derived(copy[lang]);

	const m = $derived(data.module);
	const checked = $derived(m.checklist.filter((_, i) => progress.isChecked(m.slug, i)).length);
</script>

<Seo
	title={c.seoTitle(num(lang, m.position), m.title)}
	description={m.summary}
	path="/course/{m.slug}"
	jsonLd={[
		{
			'@context': 'https://schema.org',
			'@type': 'LearningResource',
			name: m.title,
			description: m.summary,
			inLanguage: lang,
			learningResourceType: 'Lesson',
			educationalLevel: 'Beginner',
			isAccessibleForFree: true,
			timeRequired: `PT${m.durationMin}M`,
			teaches: m.outcomes,
			isPartOf: { '@type': 'Course', name: c.courseName }
		}
	]}
/>

<article>
	<header class="hero-glow border-b border-line">
		<div class="container-page max-w-3xl py-10 sm:py-14">
			<nav aria-label="Breadcrumb" class="text-sm">
				<a href={href(lang, '/course')} class="font-medium text-gold-300 hover:underline"
					>{common.freeCourse}</a
				>
				<span class="text-muted" aria-hidden="true"> / </span>
				<span class="text-muted">{c.of(num(lang, m.position), num(lang, data.total))}</span>
			</nav>
			<h1 class="mt-3 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
				{m.title}
			</h1>
			<p class="mt-4 text-lg text-body">{m.summary}</p>
			<div class="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-body">
				<span class="inline-flex items-center gap-1.5"
					><Icon name="clock" class="size-4" />{num(lang, m.durationMin)} {common.min}</span
				>
				<span class="inline-flex items-center gap-1.5"
					><Icon name="book" class="size-4" />{common.lessons(num(lang, m.lessons.length))}</span
				>
				{#if m.preview}
					<span class="rounded-full bg-emerald-400/15 px-2.5 py-0.5 font-semibold text-emerald-300"
						>{common.freePreview}</span
					>
				{/if}
			</div>
			<div class="mt-6 max-w-md">
				<ProgressBar value={checked} max={m.checklist.length} label={c.progress} />
			</div>
		</div>
	</header>

	<div class="container-page max-w-3xl space-y-10 pb-16">
		<section aria-labelledby="outcomes" class="rounded-2xl border border-line p-5 sm:p-6">
			<h2 id="outcomes" class="text-xl font-bold text-ink">{c.outcomes}</h2>
			<ul class="mt-4 space-y-2.5">
				{#each m.outcomes as outcome (outcome)}
					<li class="flex gap-3 text-ink">
						<Icon name="check" class="mt-0.5 size-5 shrink-0 text-gold-300" />{outcome}
					</li>
				{/each}
			</ul>
		</section>

		<section aria-labelledby="lessons">
			<h2 id="lessons" class="text-xl font-bold text-ink">{c.lessons}</h2>
			<ol class="mt-4 divide-y divide-line rounded-2xl border border-line">
				{#each m.lessons as lesson, i (lesson)}
					<li class="flex items-center gap-3 p-4">
						<span
							class="flex size-8 shrink-0 items-center justify-center rounded-full bg-raised text-sm font-semibold text-body"
							>{num(lang, i + 1)}</span
						>
						<span class="flex-1 text-ink">{lesson}</span>
						{#if !m.preview}<Icon name="lock" class="size-4 text-muted" />{/if}
					</li>
				{/each}
			</ol>
		</section>

		{#if !m.preview}
			<div class="flex gap-4 rounded-2xl bg-raised p-5" role="note">
				<Icon name="telegram" class="size-7 shrink-0 text-gold-300" />
				<p class="text-ink">
					{c.previewNote} <strong>{c.previewStrong}</strong>{c.previewRest}
				</p>
			</div>
		{/if}

		<div class="prose">
			<data.Content />
		</div>

		{#if data.quiz.length > 0}
			<Quiz {lang} slug={m.slug} questions={data.quiz} />
		{/if}

		<Checklist {lang} slug={m.slug} items={m.checklist} />

		<!-- Telegram CTA at the end of every module -->
		<section class="panel-cta rounded-2xl p-6 text-ink sm:p-8" aria-labelledby="module-cta">
			<h2 id="module-cta" class="text-2xl font-bold">
				{data.next ? c.ctaNext(num(lang, data.next.position)) : c.ctaEnd}
			</h2>
			<p class="mt-2 text-body">
				{data.next ? c.ctaNextText(data.next.title) : c.ctaEndText}
			</p>
			<div class="mt-6">
				<TelegramButton
					placement="module-{m.position}"
					label={t(lang).cta.join}
					variant="inverse"
				/>
			</div>
		</section>

		<nav aria-label={c.nav} class="grid gap-3 sm:grid-cols-2">
			{#if data.prev}
				<a
					href={href(lang, `/course/${data.prev.slug}`)}
					class="rounded-2xl border border-line p-4 hover:border-gold-400/60"
				>
					<span class="text-sm text-muted">{common.previous}</span>
					<span class="block font-semibold text-ink">{data.prev.title}</span>
				</a>
			{:else}
				<span></span>
			{/if}
			{#if data.next}
				<a
					href={href(lang, `/course/${data.next.slug}`)}
					class="rounded-2xl border border-line p-4 text-right hover:border-gold-400/60"
				>
					<span class="text-sm text-muted">{common.next}</span>
					<span class="block font-semibold text-ink">{data.next.title}</span>
				</a>
			{/if}
		</nav>
	</div>
</article>
