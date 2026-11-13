<script lang="ts">
	import { progress } from '#lib/progress.svelte.js';
	import { localizePath, num, t } from '#lib/i18n.js';
	import { href } from '#lib/paths.svelte.js';
	import { absoluteUrl } from '#lib/site.js';
	import Icon from '#lib/components/Icon.svelte';
	import ModuleList from '#lib/components/ModuleList.svelte';
	import ProgressBar from '#lib/components/ProgressBar.svelte';
	import Seo from '#lib/components/Seo.svelte';
	import TelegramButton from '#lib/components/TelegramButton.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	const lang = $derived(data.lang);

	const copy = {
		en: {
			seoTitle: 'Free trading course for beginners',
			seoDescription:
				'A free, structured trading course in 10 modules: markets, charts, risk management, trading plans and psychology. Module 1 is free to read now.',
			listName: 'Free trading course modules',
			eyebrow: 'Free course',
			title: 'Learn trading from zero',
			intro: (n: string) =>
				`${n} short modules that take you step by step from the basics to practical skills. Module 1 is free to read here. The full lessons, updates and Q&A are free in our Telegram community.`,
			modules: (n: string) => `${n} modules`,
			hours: (h: string) => `About ${h} hours of study`,
			quizzes: 'Quizzes and checklists',
			progress: 'Your progress',
			saved: 'Your progress is saved on this device.',
			start:
				'Start with Module 1. Tick the checklist at the end of each module to track your progress.',
			done: 'You have completed every module. Well done! Keep practising on demo.',
			nextUp: 'Next up:',
			listTitle: 'Course modules',
			ctaTitle: 'Get every module free on Telegram',
			ctaText:
				'Lessons are unlocked step by step in our Telegram community, with daily mini-lessons and a place to ask questions.'
		},
		bn: {
			seoTitle: 'নতুনদের জন্য ফ্রি ট্রেডিং কোর্স',
			seoDescription:
				'১০টা মডিউলে সাজানো একটা ফ্রি ট্রেডিং কোর্স: মার্কেট, চার্ট, রিস্ক ম্যানেজমেন্ট, ট্রেডিং প্ল্যান আর সাইকোলজি। মডিউল ১ এখনই ফ্রিতে পড়তে পারবেন।',
			listName: 'ফ্রি ট্রেডিং কোর্সের মডিউল',
			eyebrow: 'ফ্রি কোর্স',
			title: 'একদম শূন্য থেকে ট্রেডিং শিখুন',
			intro: (n: string) =>
				`${n}টা ছোট ছোট মডিউল, যা আপনাকে বেসিক থেকে ধাপে ধাপে হাতে-কলমে কাজের পর্যায়ে নিয়ে যাবে। মডিউল ১ এখানেই ফ্রিতে পড়া যায়। পুরো লেসন, আপডেট আর প্রশ্নোত্তর পাবেন আমাদের টেলিগ্রাম কমিউনিটিতে, সেটাও ফ্রি।`,
			modules: (n: string) => `${n}টি মডিউল`,
			hours: (h: string) => `মোটামুটি ${h} ঘণ্টার পড়া`,
			quizzes: 'কুইজ আর চেকলিস্ট',
			progress: 'আপনার অগ্রগতি',
			saved: 'আপনার অগ্রগতি এই ডিভাইসেই সেভ থাকে।',
			start:
				'মডিউল ১ দিয়ে শুরু করুন। প্রতিটা মডিউলের শেষে চেকলিস্টে টিক দিলে বুঝতে পারবেন কতদূর এগোলেন।',
			done: 'সবগুলো মডিউল শেষ করে ফেলেছেন, দারুণ! এবার ডেমো অ্যাকাউন্টে প্র্যাকটিস চালিয়ে যান।',
			nextUp: 'এরপর পড়ুন:',
			listTitle: 'কোর্সের মডিউলগুলো',
			ctaTitle: 'টেলিগ্রামে সব মডিউল ফ্রিতে পান',
			ctaText:
				'আমাদের টেলিগ্রাম কমিউনিটিতে লেসনগুলো ধাপে ধাপে খোলে। সাথে থাকে প্রতিদিনের ছোট লেসন, আর প্রশ্ন করার একটা জায়গা।'
		}
	};
	const c = $derived(copy[lang]);

	const completed = $derived(
		data.modules.filter((m) => progress.isComplete(m.slug, m.checklist.length)).length
	);
	const totalMinutes = $derived(data.modules.reduce((sum, m) => sum + m.durationMin, 0));
	const nextModule = $derived(
		data.modules.find((m) => !progress.isComplete(m.slug, m.checklist.length)) ?? data.modules[0]
	);
</script>

<Seo
	title={c.seoTitle}
	description={c.seoDescription}
	path="/course"
	jsonLd={[
		{
			'@context': 'https://schema.org',
			'@type': 'ItemList',
			name: c.listName,
			itemListElement: data.modules.map((m) => ({
				'@type': 'ListItem',
				position: m.position,
				name: m.title,
				url: absoluteUrl(localizePath(lang, `/course/${m.slug}`))
			}))
		}
	]}
/>

<section class="hero-glow border-b border-line">
	<div class="container-page py-12 sm:py-16">
		<p class="text-sm font-semibold tracking-wide text-gold-300 uppercase">{c.eyebrow}</p>
		<h1 class="mt-2 text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">{c.title}</h1>
		<p class="mt-4 max-w-2xl text-lg text-body">{c.intro(num(lang, data.modules.length))}</p>
		<ul class="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-body">
			<li class="inline-flex items-center gap-2">
				<Icon name="book" class="size-5 text-gold-300" />{c.modules(num(lang, data.modules.length))}
			</li>
			<li class="inline-flex items-center gap-2">
				<Icon name="clock" class="size-5 text-gold-300" />{c.hours(
					num(lang, Math.round(totalMinutes / 60))
				)}
			</li>
			<li class="inline-flex items-center gap-2">
				<Icon name="check" class="size-5 text-gold-300" />{c.quizzes}
			</li>
		</ul>

		<div class="mt-8 max-w-xl rounded-2xl border border-line bg-surface p-5">
			<ProgressBar value={completed} max={data.modules.length} label={c.progress} />
			<p class="mt-3 text-sm text-muted">
				{#if !progress.loaded}
					{c.saved}
				{:else if completed === 0}
					{c.start}
				{:else if completed === data.modules.length}
					{c.done}
				{:else}
					{c.nextUp}
					<a
						class="font-medium text-gold-300 underline"
						href={href(lang, `/course/${nextModule.slug}`)}>{nextModule.title}</a
					>
				{/if}
			</p>
		</div>
	</div>
</section>

<section class="container-page py-12" aria-labelledby="modules">
	<h2 id="modules" class="text-2xl font-bold text-ink">{c.listTitle}</h2>
	<div class="mt-6"><ModuleList {lang} modules={data.modules} showProgress /></div>

	<div class="panel-cta mt-12 rounded-2xl p-6 text-ink sm:p-8">
		<h2 class="text-2xl font-bold">{c.ctaTitle}</h2>
		<p class="mt-2 max-w-xl text-body">{c.ctaText}</p>
		<div class="mt-6">
			<TelegramButton placement="course-index" label={t(lang).cta.join} variant="inverse" />
		</div>
	</div>
</section>
