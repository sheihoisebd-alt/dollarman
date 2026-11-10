<script lang="ts">
	import { site } from '#lib/site.js';
	import TextPage from '#lib/components/TextPage.svelte';
</script>

<!-- Have this reviewed by a qualified professional before launch. Placeholders are in [BRACKETS]. -->
<TextPage
	title="Privacy policy"
	description="How Dollar Man Learning handles data: no accounts, progress stored on your device, and Meta Pixel only with your consent."
	path="/privacy"
	updated="11 November 2026"
>
	<p>
		This policy explains what information {site.name} ("we") processes when you use dollarmanlearning.com.
		The website is operated by [LEGAL BUSINESS NAME, ADDRESS]. Contact: {site.contactEmail}.
	</p>
	<h2>What we do not collect</h2>
	<p>
		The website has no user accounts and no sign-up forms. We do not store your name, email address
		or phone number on this website.
	</p>
	<h2>Information stored on your device</h2>
	<ul>
		<li>
			<strong>Course progress</strong> (checklists and quiz scores) is saved in your browser's local storage.
			It never leaves your device. You can clear it by clearing your browser's site data.
		</li>
		<li><strong>Your cookie choice</strong> is saved in local storage so we do not ask again.</li>
		<li>
			<strong>Ad campaign details</strong> (UTM parameters and the Facebook click ID, if present in the
			link you used) are kept in session storage while you browse, so that, with your consent, Meta can
			tell which ad you came from.
		</li>
	</ul>
	<h2>Meta Pixel and Conversions API (only with your consent)</h2>
	<p>
		If you click "Allow" on the cookie banner, we use the Meta Pixel and Meta's Conversions API to
		measure how our Facebook and Instagram ads perform. We then send Meta events such as "PageView"
		and "Lead" (when you tap a Telegram button), along with technical data: your IP address, browser
		user agent, Meta cookies (_fbp, _fbc), the page URL, and a random visitor ID that we hash
		(SHA-256) before sending. Meta processes this data under its own <a
			href="https://www.facebook.com/privacy/policy/"
			rel="noopener">privacy policy</a
		>. We do not store these events ourselves.
	</p>
	<p>
		If you click "No thanks", none of this is loaded or sent. You can change your choice at any time
		with "Cookie settings" at the bottom of every page.
	</p>
	<h2>Telegram</h2>
	<p>
		When you join our Telegram channel, Telegram processes your data under its own privacy policy.
		No campaign details are passed to Telegram. [DESCRIBE WHAT YOU DO WITH CHANNEL MEMBER DATA, IF
		ANYTHING, AND HOW TO REQUEST DELETION.]
	</p>
	<h2>Hosting</h2>
	<p>
		The website is hosted by [HOSTING PROVIDER, e.g. Vercel Inc.], which processes server logs (such
		as IP addresses) to deliver and protect the site.
	</p>
	<h2>Your rights</h2>
	<p>
		Depending on where you live, you may have rights to access, correct or delete your data, or to
		object to processing. Contact us at {site.contactEmail}.
	</p>
	<h2>Children</h2>
	<p>This website is intended for adults (18+). It is not directed at children.</p>
	<h2>Changes</h2>
	<p>We may update this policy and will change the "last updated" date above.</p>
</TextPage>
