<script lang="ts">
	import type { Faq, Lang, Module } from '#lib/types.js';
	import { t } from '#lib/i18n.js';
	import { href } from '#lib/paths.svelte.js';
	import { popChildren, reveal, revealChildren, smoothDetails, tilt } from '#lib/motion.js';
	import { absoluteUrl, site, socialProfiles } from '#lib/site.js';
	import Icon from './Icon.svelte';
	import ModuleList from './ModuleList.svelte';
	import ConnectSection from './ConnectSection.svelte';
	import HeroShowcase from './HeroShowcase.svelte';
	import PointerArrow from './PointerArrow.svelte';
	import ReviewsSection from './ReviewsSection.svelte';
	import Seo from './Seo.svelte';
	import StatsBand from './StatsBand.svelte';
	import TelegramButton from './TelegramButton.svelte';
	import VideoSection from './VideoSection.svelte';

	let { lang, modules, faqs }: { lang: Lang; modules: Module[]; faqs: Faq[] } = $props();

	const d = $derived(t(lang).home);
	const cta = $derived(t(lang).cta);

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
			inLanguage: ['bn', 'en'],
			publisher: { '@id': `${site.url}/#organization` }
		},
		{
			'@context': 'https://schema.org',
			'@type': 'Course',
			name: 'Free course: learn ways to earn online',
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
	title={`${d.heroPrompt.before}${d.heroPrompt.highlight}${d.heroPrompt.after}`}
	description={d.subtitle}
	path="/"
	{jsonLd}
/>

<!-- Hero: must match the Facebook ad message. Centred and compact: badges, headline, arrow, button. -->
<section class="hero-glow relative overflow-hidden border-b border-line">
	<div
		class="hero-enter container-page flex flex-col items-center pt-6 pb-3 text-center sm:pt-10 sm:pb-5"
	>
		<div class="flex flex-wrap items-center justify-center gap-2">
			<p
				class="inline-flex items-center gap-1.5 rounded-full bg-gold-400/15 px-2.5 py-0.5 text-xs font-semibold text-gold-300 ring-1 ring-gold-400/40 sm:text-sm"
			>
				<Icon name="clock" class="size-3.5" />{d.offerBadge}
			</p>
			<p
				class="inline-flex rounded-full bg-raised px-2.5 py-0.5 text-xs font-semibold text-gold-300 ring-1 ring-line-strong sm:text-sm"
			>
				{d.eyebrow}
			</p>
		</div>
		<h1
			class="mt-3 max-w-4xl text-[1.6rem] leading-snug font-extrabold tracking-tight text-balance text-ink sm:mt-4 sm:text-4xl lg:text-[2.6rem]"
		>
			{d.heroPrompt.before}<span class="text-gold">{d.heroPrompt.highlight}</span>{d.heroPrompt
				.after}
		</h1>
		<div class="mt-1 sm:mt-2"><PointerArrow /></div>
		<TelegramButton
			placement="hero"
			label={cta.primary}
			variant="medium"
			class="cta-pulse mt-1 sm:mt-2"
		/>
		<p class="mt-2 hidden text-sm text-muted sm:block">{cta.note}</p>
	</div>

	<!-- Cinematic showcase under the hero: video card in the middle, lessons either side -->
	<div class="relative pt-2 pb-10 sm:pb-14">
		<div class="dot-band absolute inset-x-0 top-8 bottom-0" aria-hidden="true"></div>
		<div class="enter-late container-page relative max-w-7xl">
			<HeroShowcase {lang} {modules} />
		</div>
	</div>
</section>

<!-- Community figures (site.stats) -->
<StatsBand {lang} />

<!-- What you'll learn -->
<section class="container-page py-14 sm:py-20" aria-labelledby="learn">
	<h2 {@attach reveal()} id="learn" class="text-3xl font-bold tracking-tight text-ink">
		{d.learnTitle}
	</h2>
	<p {@attach reveal({ delay: 0.1 })} class="mt-3 max-w-2xl text-lg text-body">{d.learnIntro}</p>
	<ul
		{@attach revealChildren()}
		{@attach popChildren('.learn-icon')}
		class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
	>
		{#each d.learnItems as item, i (item.title)}
			<li class="rounded-2xl border border-line p-5">
				<span
					class="learn-icon flex size-11 items-center justify-center rounded-xl bg-gold-400/12 text-gold-300 ring-1 ring-gold-400/25"
				>
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
		<h2 {@attach reveal()} id="how" class="text-3xl font-bold tracking-tight text-ink">
			{d.howTitle}
		</h2>
		<ol
			{@attach revealChildren({ y: 30, gap: 0.15 })}
			{@attach popChildren('.step-num', 0.2)}
			class="mt-8 grid gap-4 md:grid-cols-3"
		>
			{#each d.howSteps as step, i (step.title)}
				<li class="rounded-2xl bg-surface p-6 shadow-sm ring-1 ring-line">
					<span
						class="step-num btn-gold flex size-10 items-center justify-center rounded-full font-bold"
						>{i + 1}</span
					>
					<h3 class="mt-4 text-lg font-semibold text-ink">{step.title}</h3>
					<p class="mt-1.5 text-body">{step.text}</p>
				</li>
			{/each}
		</ol>
		<div {@attach reveal({ scale: 0.9 })} class="mt-8">
			<TelegramButton placement="how-it-works" label={cta.primary} />
		</div>
	</div>
</section>

<!-- Inside the course: video with floating highlights -->
<VideoSection {lang} />

<!-- Curriculum preview -->
<section class="container-page py-14 sm:py-20" aria-labelledby="curriculum">
	<div class="flex flex-wrap items-end justify-between gap-4">
		<div>
			<h2 {@attach reveal()} id="curriculum" class="text-3xl font-bold tracking-tight text-ink">
				{d.curriculumTitle}
			</h2>
			<p class="mt-3 text-lg text-body">{d.curriculumIntro}</p>
		</div>
		<a
			href={href(lang, '/course')}
			class="inline-flex min-h-11 items-center gap-2 font-semibold text-gold-300 hover:underline"
		>
			{d.curriculumLink}<Icon name="arrow-right" />
		</a>
	</div>
	<div class="mt-8">
		<ModuleList {lang} {modules} />
	</div>
</section>

<!-- Every channel we are on -->
<ConnectSection {lang} />

<!-- Instructor -->
<section class="bg-surface-2 py-14 sm:py-20" aria-labelledby="instructor">
	<div class="container-page">
		<h2 {@attach reveal()} id="instructor" class="text-3xl font-bold tracking-tight text-ink">
			{d.instructorTitle}
		</h2>
		<!-- No income figures or profit screenshots: keep the risk note next to the story. -->
		<div class="mt-8 grid gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-center">
			<!-- Profile card: portrait fading into a name bar with the markets he teaches -->
			<figure
				{@attach reveal({ y: 50, scale: 0.95 })}
				{@attach tilt(4)}
				class="mx-auto w-full max-w-md overflow-hidden rounded-3xl border border-line-strong bg-surface shadow-2xl shadow-black/60"
			>
				<div class="relative aspect-4/5 overflow-hidden">
					<img
						src="/instructor.jpg"
						alt={d.instructor.photoAlt}
						width="800"
						height="1000"
						loading="lazy"
						decoding="async"
						class="size-full object-cover object-[50%_25%] contrast-110 saturate-[0.85]"
					/>
					<!-- Night-city mood: darker sky, warm rim light, fade into the name bar -->
					<div
						class="absolute inset-0 bg-[radial-gradient(60%_50%_at_75%_35%,rgb(255_120_40/0.22),transparent_70%),linear-gradient(to_bottom,rgb(0_0_0/0.45),transparent_30%,transparent_60%,var(--color-surface))]"
						aria-hidden="true"
					></div>
				</div>
				<figcaption
					class="grid grid-cols-[minmax(0,1fr)_auto] divide-x divide-line border-t border-line"
				>
					<div class="p-4 sm:p-5">
						<p class="text-xl font-extrabold text-ink sm:text-2xl">{d.instructor.name}</p>
						<p class="mt-1.5 inline-flex items-center gap-1.5 text-sm font-medium text-body">
							<span
								class="flex size-4 items-center justify-center rounded-full bg-gold-400 text-page"
								aria-hidden="true"><Icon name="check" class="size-3" /></span
							>
							{d.instructorBadge}
						</p>
					</div>
					<ul
						{@attach popChildren('li', 0.1)}
						class="grid grid-cols-2 content-center gap-2 p-4 text-[0.7rem] font-bold tracking-wide uppercase sm:p-5 sm:text-xs"
						aria-label={d.instructor.role}
					>
						{#each d.markets as market, i (market)}
							<li
								class={[
									'rounded-md px-2 py-1 text-center ring-1',
									[
										'bg-sky-500/15 text-sky-300 ring-sky-400/30',
										'bg-gold-400/15 text-gold-300 ring-gold-400/30',
										'bg-emerald-500/15 text-emerald-300 ring-emerald-400/30',
										'bg-rose-500/15 text-rose-300 ring-rose-400/30'
									][i % 4]
								]}
							>
								{market}
							</li>
						{/each}
					</ul>
				</figcaption>
			</figure>

			<div {@attach reveal({ y: 40 })}>
				<p class="text-sm font-semibold tracking-wide text-gold-300 uppercase">
					{d.instructor.role}
				</p>
				{#each d.instructor.bio as paragraph (paragraph)}
					<p class="mt-4 text-lg leading-relaxed text-body">{paragraph}</p>
				{/each}
				<p class="mt-5 rounded-xl border border-line bg-surface p-4 text-sm text-muted">
					{d.instructor.note}
				</p>
			</div>
		</div>
	</div>
</section>

<!-- What's included -->
<section class="container-page py-14 sm:py-20" aria-labelledby="included">
	<h2 {@attach reveal()} id="included" class="text-3xl font-bold tracking-tight text-ink">
		{d.includedTitle}
	</h2>
	<ul
		{@attach revealChildren()}
		{@attach popChildren('.included-icon')}
		class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
	>
		{#each d.includedItems as item, i (item.title)}
			<li class="rounded-2xl border border-line p-5">
				<span class="included-icon inline-block"
					><Icon name={includedIcons[i]} class="size-7 text-gold-300" /></span
				>
				<h3 class="mt-3 font-semibold text-ink">{item.title}</h3>
				<p class="mt-1.5 text-body">{item.text}</p>
			</li>
		{/each}
	</ul>
	<div {@attach reveal({ y: 30 })} class="mt-8 flex gap-4 rounded-2xl bg-raised p-5 sm:p-6">
		<Icon name="shield" class="size-7 shrink-0 text-gold-300" />
		<div>
			<h3 class="font-semibold text-ink">{d.honestyTitle}</h3>
			<p class="mt-1 text-body">{d.honestyText}</p>
		</div>
	</div>
</section>

<!-- Student reviews (src/lib/reviews.ts) -->
<ReviewsSection {lang} />

<!-- FAQ -->
<section class="bg-surface-2 py-14 sm:py-20" aria-labelledby="faq">
	<div class="container-page max-w-3xl">
		<h2 {@attach reveal()} id="faq" class="text-3xl font-bold tracking-tight text-ink">
			{d.faqTitle}
		</h2>
		<div
			{@attach revealChildren({ y: 20, scale: 1, gap: 0.06 })}
			class="mt-8 divide-y divide-line rounded-2xl bg-surface ring-1 ring-line"
		>
			{#each faqs as faq (faq.question)}
				<details {@attach smoothDetails} class="group p-5">
					<summary
						class="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 font-semibold text-ink [&::-webkit-details-marker]:hidden"
					>
						{faq.question}
						<span class="text-xl text-gold-300 transition group-open:rotate-45" aria-hidden="true"
							>+</span
						>
					</summary>
					<p class="pt-2 leading-relaxed text-body">{faq.answer}</p>
				</details>
			{/each}
		</div>
	</div>
</section>

<!-- Final CTA -->
<section class="panel-cta border-x-0 py-14 sm:py-20">
	<div {@attach revealChildren({ y: 30, gap: 0.12 })} class="container-page text-center">
		<p
			class="inline-flex items-center gap-2 rounded-full bg-gold-400/15 px-3 py-1 text-sm font-semibold text-gold-300 ring-1 ring-gold-400/40"
		>
			<Icon name="clock" class="size-4" />{d.offerBadge}
		</p>
		<h2 class="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">{d.finalTitle}</h2>
		<p class="mx-auto mt-3 max-w-xl text-lg text-body">{d.finalText}</p>
		<div class="mt-8">
			<TelegramButton
				placement="final-cta"
				label={cta.primary}
				variant="inverse"
				class="cta-pulse"
			/>
		</div>
		<p class="mt-3 text-sm text-muted">{cta.note}</p>
	</div>
</section>
