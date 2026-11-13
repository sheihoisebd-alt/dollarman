<script lang="ts">
	import type { Dictionary, Lang } from '#lib/i18n.js';
	import { href } from '#lib/paths.svelte.js';
	import { consent } from '#lib/consent.svelte.js';
	import { TELEGRAM_URL } from '#lib/attribution.svelte.js';
	import { site } from '#lib/site.js';
	import Icon from './Icon.svelte';

	let { lang, dict }: { lang: Lang; dict: Dictionary } = $props();

	const groups = $derived([
		{
			title: dict.footer.learn,
			links: [
				{ path: '/course', label: dict.nav.course },
				{ path: '/tools', label: dict.nav.tools },
				{ path: '/downloads', label: dict.footer.downloads },
				{ path: '/blog', label: dict.nav.blog }
			]
		},
		{
			title: dict.footer.company,
			links: [{ path: '/about', label: dict.nav.about }]
		},
		{
			title: dict.footer.legal,
			links: [
				{ path: '/disclaimer', label: dict.footer.disclaimerLink },
				{ path: '/privacy', label: dict.footer.privacy },
				{ path: '/terms', label: dict.footer.terms }
			]
		}
	]);
</script>

<footer class="border-t border-line bg-surface-2">
	<div class="container-page py-12">
		<div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
			<div>
				<p class="flex items-center gap-2.5 font-bold text-ink">
					<img
						src="/logo.jpg"
						alt=""
						width="48"
						height="48"
						loading="lazy"
						class="size-12 shrink-0 rounded-full"
					/>
					{site.name}
				</p>
				<p class="mt-2 text-sm text-muted">{dict.footer.tagline}</p>
				<div class="mt-4 flex gap-2">
					{#if site.facebookUrl}
						<a
							href={site.facebookUrl}
							target="_blank"
							rel="noopener me"
							aria-label="{site.name} on Facebook"
							class="inline-flex size-10 items-center justify-center rounded-full border border-line text-body hover:text-ink"
						>
							<Icon name="facebook" />
						</a>
					{/if}
					<a
						href={TELEGRAM_URL}
						target="_blank"
						rel="noopener me"
						aria-label="{site.name} on Telegram"
						class="inline-flex size-10 items-center justify-center rounded-full border border-line text-body hover:text-ink"
					>
						<Icon name="telegram" />
					</a>
				</div>
			</div>
			{#each groups as group (group.title)}
				<div>
					<h2 class="text-sm font-semibold text-ink">{group.title}</h2>
					<ul class="mt-2">
						{#each group.links as link (link.path)}
							<li>
								<a
									href={href(lang, link.path)}
									class="inline-flex min-h-10 items-center text-sm text-body hover:text-ink"
								>
									{link.label}
								</a>
							</li>
						{/each}
					</ul>
				</div>
			{/each}
		</div>

		<p class="mt-10 rounded-xl border border-line bg-surface p-4 text-sm leading-relaxed text-body">
			<strong class="text-ink">{dict.footer.riskWarning}</strong>
			{dict.footer.disclaimer}
			<a href={href(lang, '/disclaimer')} class="font-medium text-gold-300 underline"
				>{dict.footer.disclaimerLink}</a
			>
		</p>

		<div class="mt-6 flex flex-wrap items-center justify-between gap-3 text-sm text-muted">
			<p>© {new Date().getFullYear()} {site.name}</p>
			<button
				type="button"
				class="min-h-10 underline hover:text-ink"
				onclick={() => (consent.value = null)}
			>
				{dict.footer.cookieSettings}
			</button>
		</div>
	</div>
</footer>
