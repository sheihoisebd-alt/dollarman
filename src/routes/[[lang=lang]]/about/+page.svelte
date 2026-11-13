<script lang="ts">
	import { t } from '#lib/i18n.js';
	import { href } from '#lib/paths.svelte.js';
	import TelegramButton from '#lib/components/TelegramButton.svelte';
	import TextPage from '#lib/components/TextPage.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	const lang = $derived(data.lang);
	const instructor = $derived(t(lang).home.instructor);
</script>

{#snippet who()}
	<img
		src="/instructor.jpg"
		alt={instructor.photoAlt}
		width="800"
		height="1000"
		loading="lazy"
		decoding="async"
		class="aspect-4/5 w-full max-w-xs rounded-2xl object-cover"
	/>
	<p>
		<strong>{instructor.name}</strong><br />{instructor.role}
	</p>
	{#each instructor.bio as paragraph (paragraph)}
		<p>{paragraph}</p>
	{/each}
	<p><em>{instructor.note}</em></p>
{/snippet}

{#if lang === 'bn'}
	<TextPage
		title="Dollar Man Learning সম্পর্কে"
		description="Dollar Man Learning একদম নতুনদের ট্রেডিং শেখায়, ধাপে ধাপে আর ফ্রিতে। জোর দিই দক্ষতা আর রিস্ক ম্যানেজমেন্টে, কোনো ফাঁকা প্রতিশ্রুতিতে না।"
		path="/about"
	>
		<p>
			<strong>Dollar Man Learning মানুষকে দক্ষতার মাধ্যমে আয় করতে শেখায়।</strong> আমাদের প্রথম উদ্যোগ
			একদম নতুনদের জন্য একটা ফ্রি ট্রেডিং কোর্স। শুরু শূন্য থেকে, তারপর ধীরে ধীরে কাজের দক্ষতায়: চার্ট
			পড়া, রিস্ক সামলানো, নিজের প্ল্যান লেখা আর নিয়ম মেনে প্র্যাকটিস করা।
		</p>
		<h2>ফ্রি কেন?</h2>
		<p>
			অনেক নতুন ট্রেডার বেসিক বোঝার আগেই সিগন্যাল গ্রুপ বা দামি কোর্সে টাকা ঢেলে ফেলেন। আমরা মনে
			করি, ভিতটা সবার জন্য ফ্রি হওয়া উচিত, আর সেটা সহজ কথায় বোঝানো উচিত। তাই কোর্স, টুলস আর
			ডাউনলোড, কোনোটার জন্যই টাকা লাগে না।
		</p>
		<h2>আমরা যা মেনে চলি</h2>
		<ul>
			<li>
				<strong>দক্ষতা, শর্টকাট না।</strong> আমরা শেখাই কীভাবে নিজের সিদ্ধান্ত নিজে নেবেন। আমরা সিগন্যাল
				বিক্রি করি না।
			</li>
			<li>
				<strong>রিস্ক নিয়ে সৎ থাকা।</strong> ট্রেডিংয়ে সত্যিকারের ঝুঁকি আছে, আর অনেক নতুন ট্রেডার টাকা
				হারান। আমরা কখনো লাভের প্রতিশ্রুতি দিই না।
			</li>
			<li>
				<strong>আপনার নিরাপত্তা।</strong> আমরা কখনো আপনার পাসওয়ার্ড চাইব না, আপনার হয়ে ট্রেড করার জন্য
				টাকাও চাইব না।
			</li>
			<li>
				<strong>কমিউনিটি।</strong> একসাথে শিখলে শেখাটা সহজ হয়। আমাদের টেলিগ্রাম কমিউনিটিতে প্রতিদিন লেসন
				শেয়ার হয়, প্রশ্নের উত্তরও মেলে।
			</li>
		</ul>
		<h2>কারা আছেন এর পেছনে</h2>
		{@render who()}
		<!-- PLACEHOLDER: replace with the business name and country of registration. -->
		<p class="rounded-xl border-2 border-dashed border-gold-400 p-4">
			[PLACEHOLDER: ব্যবসার নাম আর কোন দেশে নিবন্ধিত।]
		</p>
		<h2>অ্যাফিলিয়েট লিঙ্ক নিয়ে</h2>
		<p>
			এখন আমরা কোনো অ্যাফিলিয়েট বা ব্রোকারের রেফারেল লিঙ্ক ব্যবহার করি না। কখনো যোগ করলে, লিঙ্কের
			ঠিক পাশেই স্পষ্ট করে লেখা থাকবে যে এটা অ্যাফিলিয়েট লিঙ্ক, আর আমাদের <a
				href={href(lang, '/disclaimer')}>দায়মুক্তি পেজে</a
			> সেটা বুঝিয়ে বলা থাকবে।
		</p>
		<div class="not-prose mt-8">
			<TelegramButton placement="about" label={t(lang).cta.join} />
		</div>
	</TextPage>
{:else}
	<TextPage
		title="About Dollar Man Learning"
		description="Dollar Man Learning teaches complete beginners how trading works, step by step and for free, with an honest focus on skills and risk management."
		path="/about"
	>
		<p>
			<strong>Dollar Man Learning teaches people how to earn money through skills.</strong> Our first
			step is a free trading course for complete beginners. It starts from zero and builds up to practical
			skills: reading charts, managing risk, writing a plan and practising with discipline.
		</p>
		<h2>Why free?</h2>
		<p>
			Many beginners pay for signal groups or expensive courses before they understand the basics.
			We believe the foundations should be free and explained in simple words. That is why the
			course, the tools and the downloads cost nothing.
		</p>
		<h2>What we stand for</h2>
		<ul>
			<li>
				<strong>Skills, not shortcuts.</strong> We teach you to make your own decisions. We do not sell
				signals.
			</li>
			<li>
				<strong>Honesty about risk.</strong> Trading involves real risk, and many beginners lose money.
				We never promise profits.
			</li>
			<li>
				<strong>Your safety.</strong> We will never ask for your passwords, or for money to trade on your
				behalf.
			</li>
			<li>
				<strong>Community.</strong> Learning is easier together. Our Telegram community shares daily lessons
				and answers questions.
			</li>
		</ul>
		<h2>Who is behind it</h2>
		{@render who()}
		<!-- PLACEHOLDER: replace with the business name and country of registration. -->
		<p class="rounded-xl border-2 border-dashed border-gold-400 p-4">
			[PLACEHOLDER: Business name and country of registration.]
		</p>
		<h2>Affiliate disclosure</h2>
		<p>
			We currently do not use affiliate or broker referral links. If we ever add one, it will be
			clearly labelled as an affiliate link next to the link itself and explained on our <a
				href={href(lang, '/disclaimer')}>disclaimer page</a
			>.
		</p>
		<div class="not-prose mt-8">
			<TelegramButton placement="about" label={t(lang).cta.join} />
		</div>
	</TextPage>
{/if}
