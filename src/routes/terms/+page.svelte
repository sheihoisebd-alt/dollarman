<script lang="ts">
	import { resolve } from '$app/paths';
	import { site } from '#lib/site.js';
	import TextPage from '#lib/components/TextPage.svelte';
</script>

<!-- Have this reviewed by a qualified professional before launch. Placeholders are in [BRACKETS]. -->
<TextPage
	title="Terms of use"
	description="The terms for using the Dollar Man Learning website, free course, tools and community."
	path="/terms"
	updated="11 November 2026"
>
	<p>
		By using dollarmanlearning.com, the free course, tools and our Telegram community, you agree to
		these terms.
	</p>
	<h2>Educational use only</h2>
	<p>
		Everything we provide is for education. It is not financial advice. Please read our <a
			href={resolve('/disclaimer')}>disclaimer</a
		>. You are solely responsible for your trading decisions and for following the laws of your
		country.
	</p>
	<h2>Eligibility</h2>
	<p>You must be at least 18 years old to use our services.</p>
	<h2>Free services</h2>
	<p>
		The course, tools and downloads are provided free of charge, "as is", without warranties of any
		kind. We may change or discontinue any part at any time.
	</p>
	<h2>Calculators</h2>
	<p>
		Our calculators give estimates for learning purposes. Contract sizes, prices and costs at your
		broker may differ. Always check the figures on your trading platform.
	</p>
	<h2>Community rules</h2>
	<ul>
		<li>Be respectful. No harassment, hate speech or spam.</li>
		<li>
			No promotion of signal services, "account management", investment schemes or referral links.
		</li>
		<li>Never ask other members for money, passwords or account access.</li>
	</ul>
	<p>We may remove anyone who breaks these rules.</p>
	<h2>Intellectual property</h2>
	<p>
		Course materials are owned by {site.name}. You may use them for your own learning, but you may
		not resell or republish them without permission.
	</p>
	<h2>Limitation of liability</h2>
	<p>
		To the extent permitted by law, {site.name} is not liable for any trading losses or other damages
		arising from your use of our content or tools.
	</p>
	<h2>Governing law</h2>
	<p>These terms are governed by the laws of [JURISDICTION]. Contact: {site.contactEmail}.</p>
</TextPage>
