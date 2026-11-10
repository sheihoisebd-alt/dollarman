/**
 * UI and home-page copy. English is the main language; Bangla covers the site chrome and the
 * home page (/bn). Lessons and blog posts are English for now.
 *
 * KEEP THE HERO IN SYNC WITH THE FACEBOOK AD COPY (headline + CTA), so ad and landing page match.
 * Bangla copy should be reviewed by a native speaker before launch.
 */
import type { Lang } from '#lib/types.js';

export type { Lang };

export const langFromPath = (pathname: string): Lang =>
	pathname === '/bn' || pathname.startsWith('/bn/') ? 'bn' : 'en';

const en = {
	nav: {
		course: 'Free course',
		tools: 'Tools',
		blog: 'Blog',
		about: 'About',
		menu: 'Menu',
		switchLang: 'বাংলা',
		switchLangLabel: 'বাংলায় পড়ুন (Read in Bangla)'
	},
	cta: {
		primary: 'Start learning free on Telegram',
		short: 'Join free',
		sticky: 'Join free · limited time',
		note: 'Free for a limited time. No card needed. Leave any time.'
	},
	footer: {
		disclaimer:
			'Educational content only, not financial advice. Trading involves significant risk and you can lose money. Past performance does not guarantee future results. Check the laws in your country before trading.',
		learn: 'Learn',
		company: 'Company',
		legal: 'Legal',
		privacy: 'Privacy policy',
		terms: 'Terms',
		disclaimerLink: 'Disclaimer',
		downloads: 'Downloads',
		cookieSettings: 'Cookie settings'
	},
	consent: {
		text: 'We use the Meta Pixel to measure our ads, only if you allow it. Your course progress stays on your device.',
		accept: 'Allow',
		decline: 'No thanks',
		more: 'Privacy policy'
	},
	home: {
		offerBadge: 'Limited-time offer',
		eyebrow: '100% free for beginners',
		title: 'Learn a new skill',
		titleHighlight: 'for free',
		subtitle:
			'Start from zero and build a skill you can use for life. Step-by-step lessons, live classes on Telegram and a friendly community where you can ask anything. Free enrollment is open for a limited time.',
		previewLink: 'Try the first lesson',
		heroPoints: ['Live classes on Telegram', '10 beginner modules', 'Free tools and templates'],
		offerCardTitle: 'Free enrollment is open',
		offerCardText: 'For a limited time, the full course and live classes cost nothing.',
		learnTitle: "What you'll learn",
		learnIntro:
			'From your very first chart to a written plan of your own. Every topic is explained in simple words, with practice tasks.',
		learnItems: [
			{
				title: 'How markets work',
				text: 'What moves prices, how currency pairs work and when markets are open.'
			},
			{
				title: 'Reading charts',
				text: 'Candlesticks, timeframes, trends, support and resistance.'
			},
			{
				title: 'Managing risk',
				text: 'Stop-losses, position sizing and risk/reward, the skills that protect your account.'
			},
			{
				title: 'Planning and discipline',
				text: 'A simple written plan, a journal and habits that keep emotions in check.'
			}
		],
		howTitle: 'How it works',
		howSteps: [
			{
				title: 'Join on Telegram',
				text: 'Tap the button and join our Telegram channel, where the live classes are held. It is free.'
			},
			{
				title: 'Start lesson 1',
				text: 'Get Module 1 straight away, then a new step-by-step lesson as you progress.'
			},
			{
				title: 'Practise with the community',
				text: 'Share your charts, ask questions and practise on a demo account with others.'
			}
		],
		curriculumTitle: 'The course curriculum',
		curriculumIntro: '10 modules that take you from complete beginner to practical skills.',
		curriculumLink: 'See the full curriculum',
		minutes: 'min',
		freePreview: 'Free preview',
		instructorTitle: 'Your instructor',
		includedTitle: "What's included",
		includedItems: [
			{
				title: 'Structured lessons',
				text: '10 modules with learning outcomes, quizzes and checklists.'
			},
			{ title: 'Free tools', text: 'Position-size, risk/reward and pip value calculators.' },
			{ title: 'Templates', text: 'A practice journal and a printable beginner cheat-sheet pack.' },
			{ title: 'Community', text: 'Daily mini-lessons, updates and Q&A on Telegram.' }
		],
		honestyTitle: 'Our promise',
		honestyText:
			'We teach skills, not shortcuts. No signals for sale, no "guaranteed profit", and we will never ask for your money or passwords.',
		faqTitle: 'Frequently asked questions',
		finalTitle: 'Learn a new skill, free for a limited time',
		finalText:
			'Join the Telegram channel for live classes, get Module 1 straight away and new lessons step by step.'
	}
};

export type Dictionary = typeof en;

const bn: Dictionary = {
	nav: {
		course: 'ফ্রি কোর্স',
		tools: 'টুলস',
		blog: 'ব্লগ',
		about: 'আমাদের সম্পর্কে',
		menu: 'মেনু',
		switchLang: 'English',
		switchLangLabel: 'Read in English'
	},
	cta: {
		primary: 'টেলিগ্রামে ফ্রিতে শেখা শুরু করুন',
		short: 'ফ্রিতে যোগ দিন',
		sticky: 'ফ্রিতে যোগ দিন · সীমিত সময়',
		note: 'সীমিত সময়ের জন্য ফ্রি। কার্ড লাগবে না। যেকোনো সময় ছেড়ে দিতে পারবেন।'
	},
	footer: {
		disclaimer:
			'শুধুমাত্র শিক্ষামূলক কনটেন্ট, আর্থিক পরামর্শ নয়। ট্রেডিংয়ে উল্লেখযোগ্য ঝুঁকি আছে এবং আপনি টাকা হারাতে পারেন। অতীতের ফলাফল ভবিষ্যতের নিশ্চয়তা দেয় না। ট্রেড করার আগে আপনার দেশের আইন জেনে নিন।',
		learn: 'শিখুন',
		company: 'প্রতিষ্ঠান',
		legal: 'আইনি তথ্য',
		privacy: 'গোপনীয়তা নীতি',
		terms: 'শর্তাবলি',
		disclaimerLink: 'দায়মুক্তি',
		downloads: 'ডাউনলোড',
		cookieSettings: 'কুকি সেটিংস'
	},
	consent: {
		text: 'আপনি অনুমতি দিলে তবেই আমরা বিজ্ঞাপন পরিমাপের জন্য Meta Pixel ব্যবহার করি। আপনার কোর্সের অগ্রগতি আপনার ডিভাইসেই থাকে।',
		accept: 'অনুমতি দিন',
		decline: 'না, ধন্যবাদ',
		more: 'গোপনীয়তা নীতি'
	},
	home: {
		offerBadge: 'সীমিত সময়ের অফার',
		eyebrow: 'নতুনদের জন্য ১০০% ফ্রি',
		title: 'নতুন একটি দক্ষতা শিখুন',
		titleHighlight: 'সম্পূর্ণ ফ্রিতে',
		subtitle:
			'একদম শূন্য থেকে শুরু করে এমন একটি দক্ষতা গড়ে তুলুন যা সারাজীবন কাজে লাগবে। ধাপে ধাপে লেসন, টেলিগ্রামে লাইভ ক্লাস এবং একটি সহায়ক কমিউনিটি যেখানে যেকোনো প্রশ্ন করতে পারবেন। ফ্রি ভর্তি চলছে সীমিত সময়ের জন্য।',
		previewLink: 'প্রথম লেসনটি দেখুন',
		heroPoints: ['টেলিগ্রামে লাইভ ক্লাস', 'নতুনদের জন্য ১০টি মডিউল', 'ফ্রি টুলস ও টেমপ্লেট'],
		offerCardTitle: 'ফ্রি ভর্তি চলছে',
		offerCardText: 'সীমিত সময়ের জন্য পুরো কোর্স ও লাইভ ক্লাস সম্পূর্ণ ফ্রি।',
		learnTitle: 'আপনি যা শিখবেন',
		learnIntro:
			'একদম প্রথম চার্ট থেকে শুরু করে নিজের একটি লিখিত পরিকল্পনা পর্যন্ত। প্রতিটি বিষয় সহজ ভাষায় বোঝানো, সাথে প্র্যাকটিস টাস্ক।',
		learnItems: [
			{
				title: 'মার্কেট কীভাবে কাজ করে',
				text: 'দাম কেন ওঠানামা করে, কারেন্সি পেয়ার কীভাবে কাজ করে এবং মার্কেট কখন খোলা থাকে।'
			},
			{ title: 'চার্ট পড়া', text: 'ক্যান্ডেলস্টিক, টাইমফ্রেম, ট্রেন্ড, সাপোর্ট ও রেজিস্ট্যান্স।' },
			{
				title: 'ঝুঁকি ব্যবস্থাপনা',
				text: 'স্টপ-লস, পজিশন সাইজিং ও রিস্ক/রিওয়ার্ড, যে দক্ষতাগুলো আপনার অ্যাকাউন্ট রক্ষা করে।'
			},
			{
				title: 'পরিকল্পনা ও শৃঙ্খলা',
				text: 'একটি সহজ লিখিত পরিকল্পনা, জার্নাল এবং আবেগ নিয়ন্ত্রণে রাখার অভ্যাস।'
			}
		],
		howTitle: 'কীভাবে কাজ করে',
		howSteps: [
			{
				title: 'টেলিগ্রামে যোগ দিন',
				text: 'বাটনে চাপ দিয়ে আমাদের টেলিগ্রাম চ্যানেলে যোগ দিন, লাইভ ক্লাস সেখানেই হয়। এটি ফ্রি।'
			},
			{
				title: 'লেসন ১ শুরু করুন',
				text: 'সাথে সাথে মডিউল ১ পান, তারপর এগোনোর সাথে সাথে ধাপে ধাপে নতুন লেসন।'
			},
			{
				title: 'কমিউনিটির সাথে প্র্যাকটিস করুন',
				text: 'চার্ট শেয়ার করুন, প্রশ্ন করুন এবং অন্যদের সাথে ডেমো অ্যাকাউন্টে প্র্যাকটিস করুন।'
			}
		],
		curriculumTitle: 'কোর্সের সিলেবাস',
		curriculumIntro:
			'১০টি মডিউল যা আপনাকে একদম নতুন থেকে ব্যবহারিক দক্ষতায় নিয়ে যাবে। (মডিউলগুলো ইংরেজিতে)',
		curriculumLink: 'পুরো সিলেবাস দেখুন',
		minutes: 'মিনিট',
		freePreview: 'ফ্রি প্রিভিউ',
		instructorTitle: 'আপনার ইন্সট্রাক্টর',
		includedTitle: 'কোর্সে যা থাকছে',
		includedItems: [
			{ title: 'সাজানো লেসন', text: 'লার্নিং আউটকাম, কুইজ ও চেকলিস্টসহ ১০টি মডিউল।' },
			{ title: 'ফ্রি টুলস', text: 'পজিশন সাইজ, রিস্ক/রিওয়ার্ড এবং পিপ ভ্যালু ক্যালকুলেটর।' },
			{
				title: 'টেমপ্লেট',
				text: 'একটি প্র্যাকটিস জার্নাল এবং প্রিন্টযোগ্য বিগিনার চিট-শিট প্যাক।'
			},
			{ title: 'কমিউনিটি', text: 'টেলিগ্রামে প্রতিদিন মিনি-লেসন, আপডেট এবং প্রশ্নোত্তর।' }
		],
		honestyTitle: 'আমাদের প্রতিশ্রুতি',
		honestyText:
			'আমরা দক্ষতা শেখাই, শর্টকাট নয়। কোনো সিগন্যাল বিক্রি নেই, কোনো "নিশ্চিত লাভ" নেই, এবং আমরা কখনো আপনার টাকা বা পাসওয়ার্ড চাইব না।',
		faqTitle: 'সাধারণ প্রশ্নোত্তর',
		finalTitle: 'নতুন একটি দক্ষতা শিখুন, সীমিত সময়ের জন্য ফ্রি',
		finalText:
			'লাইভ ক্লাসের জন্য টেলিগ্রাম চ্যানেলে যোগ দিন, সাথে সাথে মডিউল ১ পান এবং ধাপে ধাপে নতুন লেসন।'
	}
};

const dictionaries: Record<Lang, Dictionary> = { en, bn };

export const t = (lang: Lang): Dictionary => dictionaries[lang];
