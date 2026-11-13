<script lang="ts">
	import TextPage from '#lib/components/TextPage.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

{#if data.lang === 'bn'}
	<TextPage
		title="দায়মুক্তি"
		description="Dollar Man Learning-এর সব কনটেন্ট শুধু শেখার জন্য, কোনো আর্থিক পরামর্শ নয়। ট্রেডিংয়ে টাকা হারানোর বড় ঝুঁকি আছে।"
		path="/disclaimer"
		updated="১১ নভেম্বর ২০২৬"
	>
		<p>
			<strong
				>এই ওয়েবসাইট, আমাদের কোর্স আর টেলিগ্রাম কমিউনিটির সব কনটেন্ট শুধু শেখার জন্য। এটা কোনো
				আর্থিক, বিনিয়োগ বা ট্রেডিং পরামর্শ নয়</strong
			>, আর কোনো কিছু কেনা বা বেচার সুপারিশও নয়।
		</p>
		<h2>ট্রেডিংয়ে ঝুঁকি আছে</h2>
		<ul>
			<li>
				ফরেক্স, CFD, ক্রিপ্টোকারেন্সি, শেয়ারসহ যেকোনো কিছুর ট্রেডিংয়ে বড় ঝুঁকি আছে। আপনার কিছু
				টাকা বা পুরো টাকাই হারাতে পারেন।
			</li>
			<li>লিভারেজওয়ালা প্রোডাক্টে খুব দ্রুত লস হতে পারে। বেশিরভাগ সাধারণ ট্রেডারই টাকা হারান।</li>
			<li>
				অতীতের ফলাফল বা শেখানোর জন্য দেখানো উদাহরণ ভবিষ্যতে একই রকম হবে, এমন কোনো নিশ্চয়তা নেই।
			</li>
			<li>
				শুধু সেই টাকা দিয়েই ট্রেড করুন যেটা হারালেও চলবে। দরকার হলে একজন স্বাধীন, লাইসেন্সধারী
				আর্থিক পরামর্শকের সাথে কথা বলুন।
			</li>
		</ul>
		<h2>কোনো নিশ্চয়তা নেই</h2>
		<p>
			কোনো আয়, লাভ বা ফলাফলের প্রতিশ্রুতি বা নিশ্চয়তা আমরা দিই না। আমাদের শেখানো কোনো কিছুই
			"ঝুঁকিহীন" নয়। আপনার ফলাফল অনেক কিছুর উপর নির্ভর করে, যেমন আপনার নিজের সিদ্ধান্ত, মার্কেটের
			অবস্থা আর খরচ।
		</p>
		<h2>নিজের দেশের আইন জেনে নিন</h2>
		<p>
			অনলাইন ট্রেডিংয়ের নিয়ম দেশভেদে আলাদা। বাংলাদেশসহ কিছু দেশে বিদেশি ব্রোকারের মাধ্যমে ফরেক্স
			বা CFD ট্রেড করা, কিংবা এই কাজে দেশের বাইরে টাকা পাঠানো সীমিত হতে পারে বা অনুমোদন লাগতে পারে।
			কোনো লাইভ ট্রেডিং অ্যাকাউন্ট খোলার আগে আপনার জন্য প্রযোজ্য আইন বোঝা আর মেনে চলা আপনারই
			দায়িত্ব।
		</p>
		<h2>ব্রোকার আর অন্যান্য প্রতিষ্ঠান</h2>
		<p>
			আমরা নির্দিষ্ট কোনো ব্রোকারের সুপারিশ করি না। লেসনে কোনো প্ল্যাটফর্ম বা ওয়েবসাইটের নাম এলে,
			সেটা শুধু শেখানোর উদাহরণ। ব্রোকার কোনো স্বীকৃত নিয়ন্ত্রক সংস্থার লাইসেন্সপ্রাপ্ত কিনা, সবসময়
			যাচাই করে নিন।
		</p>
		<h2>অ্যাফিলিয়েট লিঙ্ক</h2>
		<p>
			এখন আমরা কোনো অ্যাফিলিয়েট বা ব্রোকারের রেফারেল লিঙ্ক ব্যবহার করি না। ভবিষ্যতে যোগ করলে,
			যেখানে লিঙ্ক থাকবে সেখানেই স্পষ্ট করে লেখা থাকবে।
		</p>
		<h2>আমাদের নাম ভাঙিয়ে প্রতারণা</h2>
		<p>
			আমরা কখনো আপনার পাসওয়ার্ড, ওয়ান-টাইম কোড (OTP) বা আপনার হয়ে ট্রেড করার জন্য টাকা চাইব না।
			আমাদের নাম করে কেউ এসব চাইলে, সে আমরা নই।
		</p>
	</TextPage>
{:else}
	<TextPage
		title="Disclaimer"
		description="Dollar Man Learning provides educational content only. It is not financial advice. Trading involves significant risk of loss."
		path="/disclaimer"
		updated="11 November 2026"
	>
		<p>
			<strong
				>All content on this website, in our course and in our Telegram community is for educational
				purposes only. It is not financial, investment or trading advice</strong
			>, and it is not a recommendation to buy or sell any financial instrument.
		</p>
		<h2>Trading involves risk</h2>
		<ul>
			<li>
				Trading forex, CFDs, cryptocurrencies, stocks and other instruments involves significant
				risk, and you can lose some or all of your money.
			</li>
			<li>Leveraged products can lose money quickly. Many retail traders lose money.</li>
			<li>Past performance and examples shown for teaching do not guarantee future results.</li>
			<li>
				Only trade with money you can afford to lose, and consider getting advice from an
				independent, licensed financial adviser.
			</li>
		</ul>
		<h2>No guarantees</h2>
		<p>
			We do not promise or guarantee any income, profit or result. Nothing we teach is "risk-free".
			Your results depend on many factors, including your own decisions, market conditions and
			costs.
		</p>
		<h2>Check the law in your country</h2>
		<p>
			Rules for online trading differ between countries. In some countries, including Bangladesh,
			trading foreign exchange or CFDs with overseas brokers, or sending money abroad for this
			purpose, may be restricted or require approval. It is your responsibility to understand and
			follow the laws that apply to you before opening any live trading account.
		</p>
		<h2>Brokers and third parties</h2>
		<p>
			We do not recommend any particular broker. Any platform or website mentioned in our lessons is
			an example for teaching. Always check that a broker is licensed by a recognised regulator.
		</p>
		<h2>Affiliate links</h2>
		<p>
			We currently do not use affiliate or broker referral links. If we add any in the future, they
			will be clearly labelled where they appear.
		</p>
		<h2>Impersonation</h2>
		<p>
			We will never ask for your passwords, one-time codes or money to trade for you. Anyone doing
			so in our name is not us.
		</p>
	</TextPage>
{/if}
