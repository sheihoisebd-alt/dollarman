<script lang="ts">
	import { resolve } from '$app/paths';
	import type { Faq, Lang, Module } from '#lib/types.js';
	import { t } from '#lib/i18n.js';
	import { absoluteUrl, site, socialProfiles } from '#lib/site.js';
	import Icon from './Icon.svelte';
	import ModuleList from './ModuleList.svelte';
	import Seo from './Seo.svelte';
	import TelegramButton from './TelegramButton.svelte';

	let { lang, modules, faqs }: { lang: Lang; modules: Module[]; faqs: Faq[] } = $props();

	const d = $derived(t(lang).home);
	const cta = $derived(t(lang).cta);
	const path = $derived(lang === 'bn' ? '/bn' : '/');

	const learnIcons = ['chart', 'book', 'shield', 'target'] as const;
	const includedIcons = ['book', 'calculator', 'file', 'users'] as const;

	const jsonLd = $derived([
		{
			'@context': 'https://schema.org',
			'@type': 'Organization',
			'@id': `${site.url}/#organization`,
			name: site.name,
			url: site.url,
			logo: absoluteUrl('/logo.jpg'),
			description: site.description,
			email: site.contactEmail,
			sameAs: socialProfiles()
		},
		{
			'@context': 'https://schema.org',
			'@type': 'WebSite',
			'@id': `${site.url}/#website`,
			name: site.name,
			url: site.url,
			inLanguage: ['en', 'bn'],
			publisher: { '@id': `${site.url}/#organization` }
		},
		{
			'@context': 'https://schema.org',
			'@type': 'Course',
			name: 'Free beginner course: learn a new skill',
			description: site.description,
			inLanguage: 'en',
			isAccessibleForFree: true,
			instructor: {
				'@type': 'Person',
				name: t('en').home.instructor.name,
				jobTitle: 'Founder and lead instructor',
				description: t('en').home.instructor.bio[0],
				image: absoluteUrl('/instructor.jpg'),
				worksFor: { '@id': `${site.url}/#organization` }
			},
			provider: { '@type': 'Organization', '@id': `${site.url}/#organization`, name: site.name },
			offers: { '@type': 'Offer', price: 0, priceCurrency: 'USD', category: 'Free' },
			hasCourseInstance: { '@type': 'CourseInstance', courseMode: 'online', courseWorkload: 'PT6H' }
		},
		{
			'@context': 'https://schema.org',
			'@type': 'FAQPage',
			mainEntity: faqs.map((f) => ({
				'@type': 'Question',
				name: f.question,
				acceptedAnswer: { '@type': 'Answer', text: f.answer }
			}))
		}
	]);
</script>

<Seo
	title={lang === 'bn'
		? `${d.title} ${d.titleHighlight}`
		: `${d.title} ${d.titleHighlight} (limited-time offer)`}
	description={d.subtitle}
	{path}
	{jsonLd}
	alternates={{ en: '/', bn: '/bn' }}
/>

<!-- Hero: must match the Facebook ad message -->
<section class="hero-glow border-b border-line">
	<div
		class="container-page grid items-center gap-10 py-12 sm:py-16 lg:grid-cols-[1.15fr_1fr] lg:py-20"
	>
		<div>
			<div class="flex flex-wrap items-center gap-2">
				<p
					class="inline-flex items-center gap-2 rounded-full bg-gold-400/15 px-3 py-1 text-sm font-semibold text-gold-300 ring-1 ring-gold-400/40"
				>
					<Icon name="clock" class="size-4" />{d.offerBadge}
				</p>
				<p
					class="inline-flex rounded-full bg-raised px-3 py-1 text-sm font-semibold text-silver-200 ring-1 ring-line-strong"
				>
					{d.eyebrow}
				</p>
			</div>
			<h1 class="mt-5 text-4xl font-extrabold tracking-tight text-ink sm:text-5xl lg:text-6xl">
				{d.title} <span class="text-metal">{d.titleHighlight}</span>
			</h1>
			<p class="mt-5 max-w-xl text-lg leading-relaxed text-body">{d.subtitle}</p>
			<div class="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
				<TelegramButton placement="hero" label={cta.primary} />
				<a
					href={resolve('/course/[slug]', { slug: modules[0].slug })}
					class="inline-flex min-h-14 items-center justify-center gap-2 rounded-xl px-5 font-semibold text-silver-200 ring-1 ring-line-strong hover:bg-raised"
				>
					{d.previewLink}
					<Icon name="arrow-right" />
				</a>
			</div>
			<p class="mt-3 text-sm text-muted">{cta.note}</p>
			<!-- One row on tablets; a stacked checklist in the narrower desktop text column. -->
			<ul
				class="mt-8 flex flex-col gap-2 text-ink sm:flex-row sm:flex-wrap sm:gap-x-6 lg:flex-col lg:gap-y-2.5"
			>
				{#each d.heroPoints as point (point)}
					<li class="flex items-center gap-2 sm:whitespace-nowrap">
						<Icon name="check" class="size-5 shrink-0 text-silver-300" />{point}
					</li>
				{/each}
			</ul>
		</div>

		<!-- The logo, lit like a badge, with the limited-time offer underneath -->
		<div class="mx-auto w-full max-w-sm">
			<div class="relative mx-auto aspect-square w-56 sm:w-72">
				<div
					class="absolute -inset-6 rounded-full bg-[radial-gradient(closest-side,rgb(191_196_204/0.28),transparent)]"
					aria-hidden="true"
				></div>
				<img
					src="/logo.jpg"
					alt="Dollar Man logo"
					width="320"
					height="320"
					fetchpriority="high"
					class="relative size-full rounded-full shadow-2xl ring-1 shadow-black ring-line-strong"
				/>
			</div>
			<div class="panel-cta mt-8 rounded-2xl p-5 text-center">
				<p class="text-sm font-semibold tracking-wide text-gold-300 uppercase">{d.offerBadge}</p>
				<p class="mt-1 text-lg font-bold text-ink">{d.offerCardTitle}</p>
				<p class="mt-1 text-sm text-body">{d.offerCardText}</p>
			</div>
		</div>
	</div>
</section>

<!-- What you'll learn -->
<section class="container-page py-14 sm:py-20" aria-labelledby="learn">
	<h2 id="learn" class="text-3xl font-bold tracking-tight text-ink">{d.learnTitle}</h2>
	<p class="mt-3 max-w-2xl text-lg text-body">{d.learnIntro}</p>
	<ul class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
		{#each d.learnItems as item, i (item.title)}
			<li class="rounded-2xl border border-line p-5">
				<span class="flex size-11 items-center justify-center rounded-xl bg-raised text-silver-200">
					<Icon name={learnIcons[i]} class="size-6" />
				</span>
				<h3 class="mt-4 font-semibold text-ink">{item.title}</h3>
				<p class="mt-1.5 text-body">{item.text}</p>
			</li>
		{/each}
	</ul>
</section>

<!-- How it works -->
<section class="bg-surface-2 py-14 sm:py-20" aria-labelledby="how">
	<div class="container-page">
		<h2 id="how" class="text-3xl font-bold tracking-tight text-ink">{d.howTitle}</h2>
		<ol class="mt-8 grid gap-4 md:grid-cols-3">
			{#each d.howSteps as step, i (step.title)}
				<li class="rounded-2xl bg-surface p-6 shadow-sm ring-1 ring-line">
					<span class="btn-metal flex size-10 items-center justify-center rounded-full font-bold"
						>{i + 1}</span
					>
					<h3 class="mt-4 text-lg font-semibold text-ink">{step.title}</h3>
					<p class="mt-1.5 text-body">{step.text}</p>
				</li>
			{/each}
		</ol>
		<div class="mt-8"><TelegramButton placement="how-it-works" label={cta.primary} /></div>
	</div>
</section>

<!-- Curriculum preview -->
<section class="container-page py-14 sm:py-20" aria-labelledby="curriculum">
	<div class="flex flex-wrap items-end justify-between gap-4">
		<div>
			<h2 id="curriculum" class="text-3xl font-bold tracking-tight text-ink">
				{d.curriculumTitle}
			</h2>
			<p class="mt-3 text-lg text-body">{d.curriculumIntro}</p>
		</div>
		<a
			href={resolve('/course')}
			class="inline-flex min-h-11 items-center gap-2 font-semibold text-silver-200 hover:underline"
		>
			{d.curriculumLink}<Icon name="arrow-right" />
		</a>
	</div>
	<div class="mt-8">
		<ModuleList {modules} minutesLabel={d.minutes} previewLabel={d.freePreview} />
	</div>
</section>

<!-- Instructor -->
<section class="bg-surface-2 py-14 sm:py-20" aria-labelledby="instructor">
	<div class="container-page">
		<h2 id="instructor" class="text-3xl font-bold tracking-tight text-ink">
			{d.instructorTitle}
		</h2>
		<!-- No income figures or profit screenshots: keep the risk note next to the story. -->
		<div
			class="mt-8 grid gap-6 overflow-hidden rounded-2xl border border-line bg-surface sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] sm:items-center"
		>
			<img
				src="/instructor.jpg"
				alt={d.instructor.photoAlt}
				width="800"
				height="1000"
				loading="lazy"
				decoding="async"
				class="aspect-4/5 w-full object-cover"
			/>
			<div class="px-6 pb-6 sm:py-6 sm:pr-8 sm:pl-0">
				<p class="text-2xl font-bold text-ink">{d.instructor.name}</p>
				<p class="mt-1 text-sm font-semibold text-silver-200">{d.instructor.role}</p>
				{#each d.instructor.bio as paragraph (paragraph)}
					<p class="mt-4 leading-relaxed text-body">{paragraph}</p>
				{/each}
				<p class="mt-4 text-sm text-muted">{d.instructor.note}</p>
			</div>
		</div>
	</div>
</section>

<!-- What's included -->
<section class="container-page py-14 sm:py-20" aria-labelledby="included">
	<h2 id="included" class="text-3xl font-bold tracking-tight text-ink">{d.includedTitle}</h2>
	<ul class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
		{#each d.includedItems as item, i (item.title)}
			<li class="rounded-2xl border border-line p-5">
				<Icon name={includedIcons[i]} class="size-7 text-silver-200" />
				<h3 class="mt-3 font-semibold text-ink">{item.title}</h3>
				<p class="mt-1.5 text-body">{item.text}</p>
			</li>
		{/each}
	</ul>
	<div class="mt-8 flex gap-4 rounded-2xl bg-raised p-5 sm:p-6">
		<Icon name="shield" class="size-7 shrink-0 text-silver-200" />
		<div>
			<h3 class="font-semibold text-ink">{d.honestyTitle}</h3>
			<p class="mt-1 text-body">{d.honestyText}</p>
		</div>
	</div>
</section>

<!-- FAQ -->
<section class="bg-surface-2 py-14 sm:py-20" aria-labelledby="faq">
	<div class="container-page max-w-3xl">
		<h2 id="faq" class="text-3xl font-bold tracking-tight text-ink">{d.faqTitle}</h2>
		<div class="mt-8 divide-y divide-line rounded-2xl bg-surface ring-1 ring-line">
			{#each faqs as faq (faq.question)}
				<details class="group p-5">
					<summary
						class="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 font-semibold text-ink [&::-webkit-details-marker]:hidden"
					>
						{faq.question}
						<span class="text-xl text-silver-200 transition group-open:rotate-45" aria-hidden="true"
							>+</span
						>
					</summary>
					<p class="mt-2 leading-relaxed text-body">{faq.answer}</p>
				</details>
			{/each}
		</div>
	</div>
</section>

<!-- Final CTA -->
<section class="panel-cta border-x-0 py-14 sm:py-20">
	<div class="container-page text-center">
		<p
			class="inline-flex items-center gap-2 rounded-full bg-gold-400/15 px-3 py-1 text-sm font-semibold text-gold-300 ring-1 ring-gold-400/40"
		>
			<Icon name="clock" class="size-4" />{d.offerBadge}
		</p>
		<h2 class="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">{d.finalTitle}</h2>
		<p class="mx-auto mt-3 max-w-xl text-lg text-body">{d.finalText}</p>
		<div class="mt-8">
			<TelegramButton placement="final-cta" label={cta.primary} variant="inverse" />
		</div>
		<p class="mt-3 text-sm text-muted">{cta.note}</p>
	</div>
</section>
