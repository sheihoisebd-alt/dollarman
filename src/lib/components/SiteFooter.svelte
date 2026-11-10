<script lang="ts">
	import { resolve } from '$app/paths';
	import type { Dictionary } from '#lib/i18n.js';
	import { consent } from '#lib/consent.svelte.js';
	import { site } from '#lib/site.js';

	let { dict }: { dict: Dictionary } = $props();

	const groups = $derived([
		{
			title: dict.footer.learn,
			links: [
				{ href: '/course' as const, label: dict.nav.course },
				{ href: '/tools' as const, label: dict.nav.tools },
				{ href: '/downloads' as const, label: dict.footer.downloads },
				{ href: '/blog' as const, label: dict.nav.blog }
			]
		},
		{
			title: dict.footer.company,
			links: [{ href: '/about' as const, label: dict.nav.about }]
		},
		{
			title: dict.footer.legal,
			links: [
				{ href: '/disclaimer' as const, label: dict.footer.disclaimerLink },
				{ href: '/privacy' as const, label: dict.footer.privacy },
				{ href: '/terms' as const, label: dict.footer.terms }
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
				<p class="mt-2 text-sm text-muted">{site.tagline}</p>
			</div>
			{#each groups as group (group.title)}
				<div>
					<h2 class="text-sm font-semibold text-ink">{group.title}</h2>
					<ul class="mt-2">
						{#each group.links as link (link.href)}
							<li>
								<a
									href={resolve(link.href)}
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
			<strong class="text-ink">Risk warning:</strong>
			{dict.footer.disclaimer}
			<a href={resolve('/disclaimer')} class="font-medium text-silver-200 underline"
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
