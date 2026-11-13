<script lang="ts">
	import { href } from '#lib/paths.svelte.js';
	import { site } from '#lib/site.js';
	import TextPage from '#lib/components/TextPage.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	const lang = $derived(data.lang);
</script>

<!-- Have this reviewed by a qualified professional before launch. Placeholders are in [BRACKETS]. -->
{#if lang === 'bn'}
	<TextPage
		title="ব্যবহারের শর্ত"
		description="Dollar Man Learning ওয়েবসাইট, ফ্রি কোর্স, টুলস আর কমিউনিটি ব্যবহারের শর্তগুলো।"
		path="/terms"
		updated="১১ নভেম্বর ২০২৬"
	>
		<p>
			dollarmanlearning.com, ফ্রি কোর্স, টুলস আর আমাদের টেলিগ্রাম কমিউনিটি ব্যবহার করলে আপনি এই
			শর্তগুলো মেনে নিচ্ছেন।
		</p>
		<h2>শুধু শেখার জন্য</h2>
		<p>
			আমরা যা কিছু দিই, সবই শেখার জন্য। এটা কোনো আর্থিক পরামর্শ নয়। আমাদের <a
				href={href(lang, '/disclaimer')}>দায়মুক্তি</a
			> পড়ে নিন। নিজের ট্রেডিং সিদ্ধান্ত আর নিজের দেশের আইন মেনে চলার দায় পুরোপুরি আপনার।
		</p>
		<h2>কারা ব্যবহার করতে পারবেন</h2>
		<p>আমাদের সেবা ব্যবহার করতে আপনার বয়স অন্তত ১৮ বছর হতে হবে।</p>
		<h2>ফ্রি সেবা</h2>
		<p>
			কোর্স, টুলস আর ডাউনলোড বিনা খরচে দেওয়া হয়, "যেমন আছে তেমন" অবস্থায়, কোনো ধরনের ওয়ারেন্টি
			ছাড়া। যেকোনো সময় এর যেকোনো অংশ আমরা বদলাতে বা বন্ধ করতে পারি।
		</p>
		<h2>ক্যালকুলেটর</h2>
		<p>
			আমাদের ক্যালকুলেটরগুলো শেখার জন্য আনুমানিক হিসাব দেয়। আপনার ব্রোকারের লট সাইজ, দাম আর খরচ
			আলাদা হতে পারে। সবসময় নিজের ট্রেডিং প্ল্যাটফর্মে হিসাবটা মিলিয়ে নিন।
		</p>
		<h2>কমিউনিটির নিয়ম</h2>
		<ul>
			<li>সবার সাথে সম্মান রেখে কথা বলুন। হয়রানি, ঘৃণা ছড়ানো বা স্প্যাম চলবে না।</li>
			<li>
				সিগন্যাল সার্ভিস, "অ্যাকাউন্ট ম্যানেজমেন্ট", বিনিয়োগের স্কিম বা রেফারেল লিঙ্কের প্রচার করা
				যাবে না।
			</li>
			<li>অন্য মেম্বারদের কাছে কখনো টাকা, পাসওয়ার্ড বা অ্যাকাউন্টের অ্যাক্সেস চাইবেন না।</li>
		</ul>
		<p>এই নিয়ম যে ভাঙবে, তাকে আমরা সরিয়ে দিতে পারি।</p>
		<h2>মেধাস্বত্ব</h2>
		<p>
			কোর্সের সব উপকরণের মালিক {site.name}। নিজের শেখার জন্য ব্যবহার করতে পারবেন, কিন্তু অনুমতি
			ছাড়া আবার বিক্রি বা প্রকাশ করতে পারবেন না।
		</p>
		<h2>দায়ের সীমা</h2>
		<p>
			আইন যতটুকু অনুমতি দেয়, সে পর্যন্ত আমাদের কনটেন্ট বা টুলস ব্যবহারের ফলে হওয়া কোনো ট্রেডিং লস
			বা অন্য ক্ষতির জন্য {site.name} দায়ী নয়।
		</p>
		<h2>প্রযোজ্য আইন</h2>
		<p>এই শর্তগুলো [JURISDICTION]-এর আইন অনুযায়ী চলবে। যোগাযোগ: {site.contactEmail}।</p>
	</TextPage>
{:else}
	<TextPage
		title="Terms of use"
		description="The terms for using the Dollar Man Learning website, free course, tools and community."
		path="/terms"
		updated="11 November 2026"
	>
		<p>
			By using dollarmanlearning.com, the free course, tools and our Telegram community, you agree
			to these terms.
		</p>
		<h2>Educational use only</h2>
		<p>
			Everything we provide is for education. It is not financial advice. Please read our <a
				href={href(lang, '/disclaimer')}>disclaimer</a
			>. You are solely responsible for your trading decisions and for following the laws of your
			country.
		</p>
		<h2>Eligibility</h2>
		<p>You must be at least 18 years old to use our services.</p>
		<h2>Free services</h2>
		<p>
			The course, tools and downloads are provided free of charge, "as is", without warranties of
			any kind. We may change or discontinue any part at any time.
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
{/if}
