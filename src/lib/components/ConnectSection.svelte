<!--
	"Connect with us": one card per channel, with its link and a join/follow button. Links come from
	site.socials; a placeholder "/" shows the platform's domain instead of a handle.
-->
<script lang="ts">
	import { TELEGRAM_URL } from '#lib/attribution.svelte.js';
	import type { Lang } from '#lib/types.js';
	import { t } from '#lib/i18n.js';
	import { trackLead } from '#lib/tracking.js';
	import { site } from '#lib/site.js';
	import BrandIcon, { type BrandName } from './BrandIcon.svelte';
	import Icon from './Icon.svelte';

	let { lang }: { lang: Lang } = $props();
	const c = $derived(t(lang).home.connect);

	type Channel = {
		icon: BrandName;
		name: string;
		url: string;
		domain: string;
		text: string;
		action: string;
		/** Button style in the platform's colours (layout.css) */
		btn: string;
	};

	const channels = $derived<Channel[]>([
		{
			icon: 'youtube',
			name: 'YouTube',
			url: site.socials.youtube,
			domain: 'youtube.com',
			text: c.youtube,
			action: c.subscribe,
			btn: 'btn-youtube'
		},
		{
			icon: 'telegram',
			name: 'Telegram',
			url: TELEGRAM_URL,
			domain: 't.me',
			text: c.telegram,
			action: c.join,
			btn: 'btn-telegram'
		},
		{
			icon: 'facebook',
			name: 'Facebook',
			url: site.facebookUrl ?? '/',
			domain: 'facebook.com',
			text: c.facebook,
			action: c.follow,
			btn: 'btn-facebook'
		},
		{
			icon: 'tiktok',
			name: 'TikTok',
			url: site.socials.tiktok,
			domain: 'tiktok.com',
			text: c.tiktok,
			action: c.follow,
			btn: 'btn-tiktok'
		},
		{
			icon: 'instagram',
			name: 'Instagram',
			url: site.socials.instagram,
			domain: 'instagram.com',
			text: c.instagram,
			action: c.follow,
			btn: 'btn-instagram'
		},
		{
			icon: 'email',
			name: 'Email',
			url: `mailto:${site.contactEmail}`,
			domain: site.contactEmail,
			text: c.email,
			action: c.write,
			btn: 'btn-gold'
		}
	]);

	// "https://www.youtube.com/@channel" -> "youtube.com/@channel"
	const display = (url: string) =>
		url
			.replace(/^mailto:/, '')
			.replace(/^https?:\/\/(www\.)?/, '')
			.replace(/\/$/, '');

	// Real links show their handle; a placeholder "/" shows the platform's domain
	const label = (ch: Channel) => (/^(https?:|mailto:)/.test(ch.url) ? display(ch.url) : ch.domain);
</script>

<section class="relative py-14 sm:py-20" aria-labelledby="connect">
	<div class="dot-band absolute inset-0" aria-hidden="true"></div>
	<div class="container-page relative">
		<h2
			id="connect"
			class="text-center text-3xl font-extrabold tracking-tight text-ink uppercase sm:text-4xl"
		>
			{c.title}
		</h2>
		<p class="mx-auto mt-3 max-w-xl text-center text-body">{c.intro}</p>
		<ul class="mt-10 flex flex-wrap justify-center gap-4">
			{#each channels as ch (ch.name)}
				<li
					class="flex w-full flex-col rounded-2xl border border-line bg-surface/90 p-4 shadow-xl shadow-black/40 transition hover:border-gold-400/50 sm:w-[calc(50%-0.5rem)] lg:w-[calc((100%-2rem)/3)]"
				>
					<div class="flex items-center gap-3 border-b border-line pb-4">
						<span
							class="flex size-14 shrink-0 items-center justify-center rounded-xl bg-raised ring-1 ring-line"
						>
							<BrandIcon name={ch.icon} class="size-8" />
						</span>
						<div class="min-w-0">
							<p class="text-lg font-extrabold tracking-tight text-ink uppercase">{ch.name}</p>
							<p class="truncate text-sm font-semibold text-gold-300">
								{label(ch)}
							</p>
						</div>
					</div>
					<p class="mt-3 text-sm text-muted">{ch.text}</p>
					<a
						href={ch.url}
						rel="noopener"
						target={ch.url.startsWith('http') ? '_blank' : undefined}
						onclick={ch.icon === 'telegram' ? () => trackLead('connect') : undefined}
						class="mt-4 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl text-sm font-bold uppercase {ch.btn}"
					>
						{ch.action}<Icon name="arrow-right" class="size-4" />
					</a>
				</li>
			{/each}
		</ul>
	</div>
</section>
