<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import type { Dictionary, Lang } from '#lib/i18n.js';
	import TelegramButton from './TelegramButton.svelte';

	let { lang, dict }: { lang: Lang; dict: Dictionary } = $props();

	const links = $derived([
		{ href: '/course' as const, label: dict.nav.course },
		{ href: '/tools' as const, label: dict.nav.tools },
		{ href: '/blog' as const, label: dict.nav.blog },
		{ href: '/about' as const, label: dict.nav.about }
	]);

	const isCurrent = (href: string) =>
		page.url.pathname === href || page.url.pathname.startsWith(`${href}/`);

	// The language switch only exists for the home page; other pages are English.
	const switchHref = $derived(lang === 'bn' ? ('/' as const) : ('/bn' as const));

	let menu = $state<HTMLDetailsElement>();
	const closeMenu = () => menu?.removeAttribute('open');
</script>

<header class="sticky top-0 z-30 border-b border-line bg-page/90 backdrop-blur">
	<div class="container-page flex h-16 items-center justify-between gap-3">
		<a
			href={resolve(lang === 'bn' ? '/bn' : '/')}
			class="flex min-h-11 items-center gap-2.5 font-bold text-ink"
		>
			<img src="/logo.jpg" alt="" width="40" height="40" class="size-10 shrink-0 rounded-full" />
			<span class="leading-tight">Dollar Man <span class="text-silver-200">Learning</span></span>
		</a>

		<nav aria-label="Main" class="hidden items-center gap-1 md:flex">
			{#each links as link (link.href)}
				<a
					href={resolve(link.href)}
					aria-current={isCurrent(link.href) ? 'page' : undefined}
					class="rounded-lg px-3 py-2 text-sm font-medium text-body hover:bg-raised hover:text-ink aria-[current=page]:text-gold-300"
				>
					{link.label}
				</a>
			{/each}
			<a
				href={resolve(switchHref)}
				hreflang={lang === 'bn' ? 'en' : 'bn'}
				aria-label={dict.nav.switchLangLabel}
				class="rounded-lg px-3 py-2 text-sm font-medium text-body hover:bg-raised"
			>
				{dict.nav.switchLang}
			</a>
			<TelegramButton placement="header" label={dict.cta.short} variant="compact" class="ml-2" />
		</nav>

		<div class="flex items-center gap-1 md:hidden">
			<a
				href={resolve(switchHref)}
				hreflang={lang === 'bn' ? 'en' : 'bn'}
				aria-label={dict.nav.switchLangLabel}
				class="flex min-h-11 items-center rounded-lg px-3 text-sm font-medium text-body"
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
						aria-hidden="true"
					>
						<path class="group-open:hidden" d="M4 7h16M4 12h16M4 17h16" />
						<path class="hidden group-open:block" d="M6 6l12 12M18 6 6 18" />
					</svg>
				</summary>
				<nav
					aria-label="Main"
					class="absolute inset-x-0 top-16 border-b border-line bg-surface shadow-lg"
				>
					<ul class="container-page py-2">
						{#each links as link (link.href)}
							<li>
								<a
									href={resolve(link.href)}
									onclick={closeMenu}
									aria-current={isCurrent(link.href) ? 'page' : undefined}
									class="flex min-h-12 items-center border-b border-line text-base font-medium text-ink aria-[current=page]:text-gold-300"
								>
									{link.label}
								</a>
							</li>
						{/each}
					</ul>
				</nav>
			</details>
		</div>
	</div>
</header>
