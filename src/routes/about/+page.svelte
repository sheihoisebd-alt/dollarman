<script lang="ts">
	import { resolve } from '$app/paths';
	import TelegramButton from '#lib/components/TelegramButton.svelte';
	import TextPage from '#lib/components/TextPage.svelte';
</script>

<TextPage
	title="About Dollar Man Learning"
	description="Dollar Man Learning teaches complete beginners how trading works, step by step and for free, with an honest focus on skills and risk management."
	path="/about"
>
	<p>
		<strong>Dollar Man Learning teaches people how to earn money through skills.</strong> Our first step
		is a free trading course for complete beginners. It starts from zero and builds up to practical skills:
		reading charts, managing risk, writing a plan and practising with discipline.
	</p>
	<h2>Why free?</h2>
	<p>
		Many beginners pay for signal groups or expensive courses before they understand the basics. We
		believe the foundations should be free and explained in simple words. That is why the course,
		the tools and the downloads cost nothing.
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
	<!-- PLACEHOLDER: replace with verified facts about the instructor/team and the business. -->
	<p class="rounded-xl border-2 border-dashed border-gold-400 p-4">
		[PLACEHOLDER: Instructor name, short factual background, business name and country of
		registration.]
	</p>
	<h2>Affiliate disclosure</h2>
	<p>
		We currently do not use affiliate or broker referral links. If we ever add one, it will be
		clearly labelled as an affiliate link next to the link itself and explained on our <a
			href={resolve('/disclaimer')}>disclaimer page</a
		>.
	</p>
	<div class="not-prose mt-8">
		<TelegramButton placement="about" label="Join the free course on Telegram" />
	</div>
</TextPage>
