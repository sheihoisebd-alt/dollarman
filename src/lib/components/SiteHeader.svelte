<script lang="ts">
	import { page } from '$app/state';
	import { stripLang, type Dictionary, type Lang } from '#lib/i18n.js';
	import { href } from '#lib/paths.svelte.js';
	import TelegramButton from './TelegramButton.svelte';

	let { lang, dict }: { lang: Lang; dict: Dictionary } = $props();

	const links = $derived([
		{ path: '/course', label: dict.nav.course },
		{ path: '/tools', label: dict.nav.tools },
		{ path: '/blog', label: dict.nav.blog },
		{ path: '/about', label: dict.nav.about }
	]);

	// The page path without its /en prefix, so "current" works in both languages
	const here = $derived(stripLang(page.url.pathname));
	const isCurrent = (path: string) => here === path || here.startsWith(`${path}/`);

	// The switch opens this same page in the other language.
	const other = $derived(lang === 'bn' ? 'en' : 'bn');
	const switchHref = $derived(href(other, here));

	let menu = $state<HTMLDetailsElement>();
	const closeMenu = () => menu?.removeAttribute('open');
</script>

<!-- A floating rounded bar, the same on phones (logo, language, menu) and desktop (links and CTA) -->
<header class="enter-down sticky top-0 z-30 px-3 pt-3 sm:px-4">
	<div
		class="relative mx-auto flex h-14 max-w-5xl items-center justify-between gap-3 rounded-2xl border border-line-strong/70 bg-surface/80 px-3 shadow-lg shadow-black/40 backdrop-blur-md sm:h-16 sm:px-5"
	>
		<a href={href(lang, '/')} class="flex min-h-11 items-center gap-2.5 font-bold text-ink">
			<img
				src="/logo.jpg"
				alt=""
				width="40"
				height="40"
				class="size-9 shrink-0 rounded-full sm:size-10"
			/>
			<span class="leading-tight">Dollar Man <span class="text-gold-300">Learning</span></span>
		</a>

		<nav aria-label="Main" class="hidden items-center gap-1 md:flex">
			{#each links as link (link.path)}
				<a
					href={href(lang, link.path)}
					aria-current={isCurrent(link.path) ? 'page' : undefined}
					class="relative px-3 py-2 text-sm font-medium text-body transition hover:text-gold-200 aria-[current=page]:text-gold-300 aria-[current=page]:after:absolute aria-[current=page]:after:inset-x-3 aria-[current=page]:after:bottom-0.5 aria-[current=page]:after:h-0.5 aria-[current=page]:after:rounded-full aria-[current=page]:after:bg-gold-400"
				>
					{link.label}
				</a>
			{/each}
			<a
				href={switchHref}
				hreflang={other}
				aria-label={dict.nav.switchLangLabel}
				class="ml-1 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-ink ring-1 ring-line-strong hover:bg-raised"
			>
				{dict.nav.switchLang}
			</a>
			<TelegramButton placement="header" label={dict.cta.short} variant="compact" class="ml-2" />
		</nav>

		<div class="flex items-center gap-1.5 md:hidden">
			<a
				href={switchHref}
				hreflang={other}
				aria-label={dict.nav.switchLangLabel}
				class="flex min-h-9 items-center rounded-lg px-2.5 text-xs font-semibold text-ink ring-1 ring-line-strong"
			>
				{dict.nav.switchLang}
			</a>
			<!-- details/summary: a working menu even before JavaScript loads -->
			<details bind:this={menu} class="group">
				<summary
					class="flex min-h-11 min-w-11 cursor-pointer list-none items-center justify-center rounded-lg text-ink hover:bg-raised [&::-webkit-details-marker]:hidden"
				>
					<span class="sr-only">{dict.nav.menu}</span>
					<svg
						viewBox="0 0 24 24"
						class="size-6"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						aria-hidden="true"
					>
						<path class="group-open:hidden" d="M4 7h16M4 12h16M4 17h16" />
						<path class="hidden group-open:block" d="M6 6l12 12M18 6 6 18" />
					</svg>
				</summary>
				<!-- Drops below the bar as a matching rounded card -->
				<nav
					aria-label="Main"
					class="absolute inset-x-0 top-full mt-2 rounded-2xl border border-line-strong/70 bg-surface/95 p-2 shadow-xl shadow-black/50 backdrop-blur-md"
				>
					<ul>
						{#each links as link (link.path)}
							<li>
								<a
									href={href(lang, link.path)}
									onclick={closeMenu}
									aria-current={isCurrent(link.path) ? 'page' : undefined}
									class="flex min-h-12 items-center rounded-xl px-3 text-base font-medium text-ink hover:bg-raised aria-[current=page]:bg-gold-400/10 aria-[current=page]:text-gold-300"
								>
									{link.label}
								</a>
							</li>
						{/each}
					</ul>
					<TelegramButton
						placement="header-menu"
						label={dict.cta.short}
						variant="compact"
						class="mt-2 w-full"
					/>
				</nav>
			</details>
		</div>
	</div>
</header>
