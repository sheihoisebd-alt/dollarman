<script lang="ts">
	import { site } from '#lib/site.js';
	import TextPage from '#lib/components/TextPage.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<!-- Have this reviewed by a qualified professional before launch. Placeholders are in [BRACKETS]. -->
{#if data.lang === 'bn'}
	<TextPage
		title="প্রাইভেসি পলিসি"
		description="Dollar Man Learning আপনার তথ্য কীভাবে সামলায়: কোনো অ্যাকাউন্ট নেই, অগ্রগতি থাকে আপনার ডিভাইসে, আর Meta Pixel চলে শুধু আপনার অনুমতি পেলে।"
		path="/privacy"
		updated="১১ নভেম্বর ২০২৬"
	>
		<p>
			dollarmanlearning.com ব্যবহার করলে {site.name} ("আমরা") কোন কোন তথ্য নিয়ে কাজ করে, এই পলিসিতে সেটা
			বলা আছে। ওয়েবসাইটটি চালায় DOLLAR MAN LEARNING। যোগাযোগ: {site.contactEmail}।
		</p>
		<h2>যা আমরা নিই না</h2>
		<p>
			এই ওয়েবসাইটে কোনো ইউজার অ্যাকাউন্ট নেই, সাইন-আপ ফর্মও নেই। আপনার নাম, ইমেইল বা ফোন নম্বর আমরা
			এই ওয়েবসাইটে রাখি না।
		</p>
		<h2>যা আপনার ডিভাইসে থাকে</h2>
		<ul>
			<li>
				<strong>কোর্সের অগ্রগতি</strong> (চেকলিস্ট আর কুইজের স্কোর) আপনার ব্রাউজারের লোকাল স্টোরেজে সেভ
				থাকে। এটা কখনো আপনার ডিভাইস থেকে বাইরে যায় না। ব্রাউজারের সাইট ডেটা মুছে দিলে এটাও মুছে যাবে।
			</li>
			<li>
				<strong>কুকি নিয়ে আপনার সিদ্ধান্ত</strong> লোকাল স্টোরেজে রাখা হয়, যাতে বারবার জিজ্ঞেস করতে
				না হয়।
			</li>
			<li>
				<strong>বিজ্ঞাপন ক্যাম্পেইনের তথ্য</strong> (UTM প্যারামিটার আর Facebook ক্লিক আইডি, যদি আপনার
				ব্যবহার করা লিঙ্কে থাকে) আপনি সাইট ঘোরার সময় সেশন স্টোরেজে থাকে। আপনি অনুমতি দিলে এর মাধ্যমে
				Meta বুঝতে পারে আপনি কোন বিজ্ঞাপন থেকে এসেছেন।
			</li>
		</ul>
		<h2>Meta Pixel আর Conversions API (শুধু আপনার অনুমতিতে)</h2>
		<p>
			কুকি ব্যানারে "অনুমতি দিন" চাপলে, আমাদের Facebook আর Instagram বিজ্ঞাপন কেমন কাজ করছে তা মাপতে
			আমরা Meta Pixel আর Meta-র Conversions API ব্যবহার করি। তখন Meta-কে "PageView" আর "Lead" (যখন
			আপনি টেলিগ্রাম বাটনে চাপ দেন) জাতীয় ইভেন্ট পাঠাই, সাথে কিছু টেকনিক্যাল তথ্য: আপনার IP ঠিকানা,
			ব্রাউজারের ইউজার এজেন্ট, Meta-র কুকি (_fbp, _fbc), পেজের URL, আর একটা র‍্যান্ডম ভিজিটর আইডি
			যেটা পাঠানোর আগে আমরা হ্যাশ (SHA-256) করে নিই। Meta এই তথ্য নিজেদের <a
				href="https://www.facebook.com/privacy/policy/"
				rel="noopener">প্রাইভেসি পলিসি</a
			> অনুযায়ী ব্যবহার করে। এই ইভেন্টগুলো আমরা নিজেরা জমিয়ে রাখি না।
		</p>
		<p>
			"না, থাক" চাপলে এর কিছুই চালু হয় না, কিছু পাঠানোও হয় না। প্রতিটা পেজের নিচে "কুকি সেটিংস"
			থেকে যেকোনো সময় সিদ্ধান্ত বদলাতে পারবেন।
		</p>
		<h2>টেলিগ্রাম</h2>
		<p>
			আমাদের টেলিগ্রাম চ্যানেলে যোগ দিলে, টেলিগ্রাম নিজেদের প্রাইভেসি পলিসি অনুযায়ী আপনার তথ্য
			ব্যবহার করে। কোনো ক্যাম্পেইনের তথ্য টেলিগ্রামে পাঠানো হয় না। [চ্যানেল মেম্বারদের তথ্য নিয়ে
			আপনারা কী করেন (যদি কিছু করেন) আর কীভাবে মুছে ফেলার অনুরোধ করা যায়, তা লিখুন।]
		</p>
		<h2>হোস্টিং</h2>
		<p>
			ওয়েবসাইটটি হোস্ট করে [হোস্টিং প্রোভাইডার, যেমন Vercel Inc.], যারা সাইট চালু রাখতে আর সুরক্ষিত
			রাখতে সার্ভার লগ (যেমন IP ঠিকানা) ব্যবহার করে।
		</p>
		<h2>আপনার অধিকার</h2>
		<p>
			আপনি কোথায় থাকেন তার উপর নির্ভর করে, নিজের তথ্য দেখার, ঠিক করার বা মুছে ফেলার অধিকার থাকতে
			পারে। তথ্য ব্যবহারে আপত্তিও জানাতে পারেন। যোগাযোগ করুন {site.contactEmail}-এ।
		</p>
		<h2>শিশু</h2>
		<p>এই ওয়েবসাইট প্রাপ্তবয়স্কদের (১৮+) জন্য। এটা শিশুদের উদ্দেশ্যে বানানো নয়।</p>
		<h2>পরিবর্তন</h2>
		<p>এই পলিসি আমরা মাঝে মাঝে আপডেট করতে পারি, তখন উপরের "সর্বশেষ আপডেট" তারিখটা বদলে যাবে।</p>
	</TextPage>
{:else}
	<TextPage
		title="Privacy policy"
		description="How Dollar Man Learning handles data: no accounts, progress stored on your device, and Meta Pixel only with your consent."
		path="/privacy"
		updated="11 November 2026"
	>
		<p>
			This policy explains what information {site.name} ("we") processes when you use dollarmanlearning.com.
			The website is operated by DOLLAR MAN LEARNING. Contact: {site.contactEmail}.
		</p>
		<h2>What we do not collect</h2>
		<p>
			The website has no user accounts and no sign-up forms. We do not store your name, email
			address or phone number on this website.
		</p>
		<h2>Information stored on your device</h2>
		<ul>
			<li>
				<strong>Course progress</strong> (checklists and quiz scores) is saved in your browser's local
				storage. It never leaves your device. You can clear it by clearing your browser's site data.
			</li>
			<li><strong>Your cookie choice</strong> is saved in local storage so we do not ask again.</li>
			<li>
				<strong>Ad campaign details</strong> (UTM parameters and the Facebook click ID, if present in
				the link you used) are kept in session storage while you browse, so that, with your consent, Meta
				can tell which ad you came from.
			</li>
		</ul>
		<h2>Meta Pixel and Conversions API (only with your consent)</h2>
		<p>
			If you click "Allow" on the cookie banner, we use the Meta Pixel and Meta's Conversions API to
			measure how our Facebook and Instagram ads perform. We then send Meta events such as
			"PageView" and "Lead" (when you tap a Telegram button), along with technical data: your IP
			address, browser user agent, Meta cookies (_fbp, _fbc), the page URL, and a random visitor ID
			that we hash (SHA-256) before sending. Meta processes this data under its own <a
				href="https://www.facebook.com/privacy/policy/"
				rel="noopener">privacy policy</a
			>. We do not store these events ourselves.
		</p>
		<p>
			If you click "No thanks", none of this is loaded or sent. You can change your choice at any
			time with "Cookie settings" at the bottom of every page.
		</p>
		<h2>Telegram</h2>
		<p>
			When you join our Telegram channel, Telegram processes your data under its own privacy policy.
			No campaign details are passed to Telegram. [DESCRIBE WHAT YOU DO WITH CHANNEL MEMBER DATA, IF
			ANYTHING, AND HOW TO REQUEST DELETION.]
		</p>
		<h2>Hosting</h2>
		<p>
			The website is hosted by [HOSTING PROVIDER, e.g. Vercel Inc.], which processes server logs
			(such as IP addresses) to deliver and protect the site.
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
{/if}
