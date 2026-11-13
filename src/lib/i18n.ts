/**
 * Site chrome and home-page copy. Every page exists in both languages: Bangla is the default and
 * lives at the root (/course), English is the same page under /en (/en/course). Page-specific copy
 * sits next to each page; course and blog content is in src/content (English) and
 * src/content/bn (Bangla).
 *
 * KEEP THE HERO IN SYNC WITH THE FACEBOOK AD COPY (headline + CTA), so ad and landing page match.
 */
import type { Lang } from '#lib/types.js';

export type { Lang };

export const langFromPath = (pathname: string): Lang =>
	pathname === '/en' || pathname.startsWith('/en/') ? 'en' : 'bn';

/** The `[[lang]]` route param: "en", or missing for Bangla. */
export const langFromParam = (param: string | undefined): Lang => (param === 'en' ? 'en' : 'bn');

/** A pathname with any /en prefix removed: "/en/course" -> "/course", "/en" -> "/". */
export const stripLang = (pathname: string): string =>
	pathname === '/en' ? '/' : pathname.startsWith('/en/') ? pathname.slice(3) : pathname;

/** The same page in the given language: "/course" -> "/en/course" for English. */
export const localizePath = (lang: Lang, pathname: string): string => {
	const neutral = stripLang(pathname);
	if (lang === 'bn') return neutral;
	return neutral === '/' ? '/en' : `/en${neutral}`;
};

/** Locale for dates and numbers: Bangla digits and month names on Bangla pages. */
export const locale = (lang: Lang) => (lang === 'bn' ? 'bn-BD' : 'en-GB');

/** "5" -> "৫" on Bangla pages */
export const num = (lang: Lang, n: number, digits = 0) =>
	n.toLocaleString(lang === 'bn' ? 'bn-BD' : 'en-US', {
		minimumFractionDigits: 0,
		maximumFractionDigits: digits
	});

const en = {
	nav: {
		course: 'Free course',
		tools: 'Tools',
		blog: 'Blog',
		about: 'About',
		menu: 'Menu',
		switchLang: 'বাংলা',
		switchLangLabel: 'বাংলায় পড়ুন (Read in Bangla)',
		skip: 'Skip to content'
	},
	cta: {
		primary: 'Contact us on Telegram',
		short: 'Join free',
		join: 'Join the free course on Telegram',
		note: 'Free for a limited time. No card needed. Leave any time.'
	},
	/** Small words shared by many pages */
	common: {
		freeCourse: 'Free course',
		freeTools: 'Free tools',
		blog: 'Blog',
		min: 'min',
		minRead: 'min read',
		lessons: (n: string) => `${n} lessons`,
		modules: (n: string) => `${n} modules`,
		freePreview: 'Free preview',
		previous: 'Previous',
		next: 'Next',
		lastUpdated: 'Last updated',
		completed: 'Completed:',
		disclaimerNote:
			'This is for education only and is not financial advice. Trading involves risk.',
		readDisclaimer: 'Read our disclaimer'
	},
	footer: {
		riskWarning: 'Risk warning:',
		tagline: 'To learn ways to earn online for free, message us on Telegram below.',
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
		subtitle:
			'Start from zero and build a skill you can use for life. Step-by-step lessons, live classes on Telegram and a friendly community where you can ask anything. Free enrollment is open for a limited time.',
		heroPrompt: {
			before: 'To learn ways to ',
			highlight: 'earn online for free',
			after: ', message us on Telegram below.'
		},
		stats: {
			title: 'Our community in numbers',
			youtube: 'YouTube subscribers',
			telegram: 'Telegram members',
			students: 'Active students',
			years: 'Years of experience'
		},
		connect: {
			title: 'Connect with us',
			intro: 'Follow us wherever you like. Live classes and updates happen on Telegram.',
			telegram: 'Join our community and live classes',
			facebook: 'Follow us on Facebook',
			youtube: 'Subscribe to our official channel',
			tiktok: 'Short lessons and tips',
			instagram: 'Reels, tips and updates',
			email: 'Questions? Write to us',
			join: 'Join',
			follow: 'Follow',
			subscribe: 'Subscribe',
			write: 'Email us'
		},
		reviews: {
			title: 'Trusted by {n} students',
			ratingLabel: 'Average rating from student reviews',
			studentAt: 'Student at',
			verified: 'Verified',
			sample: 'Sample review',
			more: 'Show more reviews',
			less: 'Show fewer'
		},
		showcase: {
			featured: 'Featured',
			featuredTitle: 'DOLLAR MAN LEARNING',
			featuredText:
				'Learn step by step from zero: live classes on Telegram, simple lessons and a community that helps you.',
			watch: 'Watch intro',
			courseLink: 'See the course',
			courseTitle: 'DOLLAR MAN COURSE',
			courseText: 'Simple, step-by-step lessons for beginners. Build skills and confidence.',
			lessons: (n: string) => `${n} lessons`,
			hours: (n: string) => `${n} hrs`,
			toolsTitle: 'Free tools',
			toolsText: 'Calculators and templates, free to use.',
			photoAlt: 'Dollar Man, the course instructor'
		},
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
		video: {
			eyebrow: 'Take a look',
			title: 'Inside Dollar Man Learning',
			intro: 'See how the classes work before you join: real charts, simple words and live Q&A.',
			points: ['Step-by-step lessons', 'Live classes on Telegram', 'Focus on risk management'],
			play: 'Play the intro video',
			soon: 'Intro video coming soon',
			photoAlt: 'Dollar Man teaching a class'
		},
		instructorBadge: '7+ years of experience',
		markets: ['Forex', 'Gold', 'Crypto', 'Stocks'],
		instructorTitle: 'Your instructor',
		instructor: {
			name: 'Syed Mridul Hasan Shanto',
			role: 'Founder and lead instructor · Financial freedom advocate',
			photoAlt: 'Dollar Man, founder and lead instructor of Dollar Man Learning',
			bio: [
				'Dollar Man is a financial freedom advocate. He reached financial freedom himself by building one skill, step by step: trading. No shortcuts and no signal groups, just learning the basics, managing risk and practising with discipline.',
				'Now he teaches the same path to complete beginners, in simple words and for free, because he believes everyone deserves the chance to learn a skill that can change their life.'
			],
			note: 'His results are his own. Trading is risky and many beginners lose money. This course teaches skills, not guaranteed income.'
		},
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
		finalTitle: 'To learn ways to earn online for free, message us on Telegram below.',
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
		about: 'আমাদের কথা',
		menu: 'মেনু',
		switchLang: 'English',
		switchLangLabel: 'Read in English',
		skip: 'মূল লেখায় যান'
	},
	cta: {
		primary: 'টেলিগ্রামে যোগাযোগ করুন',
		short: 'ফ্রিতে যোগ দিন',
		join: 'টেলিগ্রামে ফ্রি কোর্সে যোগ দিন',
		note: 'সীমিত সময়ের জন্য ফ্রি। কোনো কার্ড লাগবে না, চাইলে যেকোনো সময় বের হয়ে যেতে পারবেন।'
	},
	common: {
		freeCourse: 'ফ্রি কোর্স',
		freeTools: 'ফ্রি টুলস',
		blog: 'ব্লগ',
		min: 'মিনিট',
		minRead: 'মিনিটে পড়া যাবে',
		lessons: (n: string) => `${n}টি লেসন`,
		modules: (n: string) => `${n}টি মডিউল`,
		freePreview: 'ফ্রি প্রিভিউ',
		previous: 'আগের মডিউল',
		next: 'পরের মডিউল',
		lastUpdated: 'সর্বশেষ আপডেট',
		completed: 'শেষ হয়েছে:',
		disclaimerNote: 'এই লেখা শুধু শেখার জন্য, কোনো আর্থিক পরামর্শ নয়। ট্রেডিংয়ে ঝুঁকি আছে।',
		readDisclaimer: 'আমাদের দায়মুক্তি পড়ুন'
	},
	footer: {
		riskWarning: 'ঝুঁকির সতর্কতা:',
		tagline: 'ফ্রিতে অনলাইন আয়ের পথ শিখতে নিচে দেওয়া টেলিগ্রামে মেসেজ করুন',
		disclaimer:
			'এখানকার সব কনটেন্ট শুধু শেখার জন্য, এটা কোনো আর্থিক পরামর্শ নয়। ট্রেডিংয়ে বড় ঝুঁকি আছে, টাকা হারাতে পারেন। আগে যা হয়েছে, সামনেও তা-ই হবে এমন কোনো নিশ্চয়তা নেই। ট্রেড শুরু করার আগে নিজের দেশের আইন জেনে নিন।',
		learn: 'শিখুন',
		company: 'আমাদের সম্পর্কে',
		legal: 'আইনি তথ্য',
		privacy: 'প্রাইভেসি পলিসি',
		terms: 'ব্যবহারের শর্ত',
		disclaimerLink: 'দায়মুক্তি',
		downloads: 'ডাউনলোড',
		cookieSettings: 'কুকি সেটিংস'
	},
	consent: {
		text: 'আপনি অনুমতি দিলে তবেই আমাদের বিজ্ঞাপন কেমন কাজ করছে তা মাপতে Meta Pixel চালু হবে। আপনার কোর্সের অগ্রগতি শুধু আপনার ফোন বা কম্পিউটারেই থাকে।',
		accept: 'অনুমতি দিন',
		decline: 'না, থাক',
		more: 'প্রাইভেসি পলিসি'
	},
	home: {
		offerBadge: 'সীমিত সময়ের অফার',
		eyebrow: 'নতুনদের জন্য ১০০% ফ্রি',
		subtitle:
			'একদম শূন্য থেকে শুরু করে এমন একটা দক্ষতা শিখুন যা সারাজীবন কাজে লাগবে। ধাপে ধাপে লেসন, টেলিগ্রামে লাইভ ক্লাস, আর এমন একটা কমিউনিটি যেখানে যা খুশি জিজ্ঞেস করা যায়। ফ্রিতে ভর্তি চলছে, তবে সীমিত সময়ের জন্য।',
		heroPrompt: {
			before: '',
			highlight: 'ফ্রিতে অনলাইন আয়ের পথ',
			after: ' শিখতে নিচে দেওয়া টেলিগ্রামে মেসেজ করুন'
		},
		stats: {
			title: 'সংখ্যায় আমাদের কমিউনিটি',
			youtube: 'ইউটিউব সাবস্ক্রাইবার',
			telegram: 'টেলিগ্রাম মেম্বার',
			students: 'অ্যাক্টিভ স্টুডেন্ট',
			years: 'বছরের অভিজ্ঞতা'
		},
		connect: {
			title: 'আমাদের সাথে যুক্ত থাকুন',
			intro: 'যেখানে সুবিধা, সেখানেই আমাদের ফলো করুন। লাইভ ক্লাস আর নতুন আপডেট পাবেন টেলিগ্রামে।',
			telegram: 'কমিউনিটি আর লাইভ ক্লাসে চলে আসুন',
			facebook: 'ফেসবুকে আমাদের ফলো করুন',
			youtube: 'আমাদের অফিসিয়াল চ্যানেলটা সাবস্ক্রাইব করে রাখুন',
			tiktok: 'ছোট ছোট লেসন আর কাজের টিপস',
			instagram: 'রিলস, টিপস আর আপডেট',
			email: 'কিছু জানার আছে? আমাদের লিখুন',
			join: 'যোগ দিন',
			follow: 'ফলো করুন',
			subscribe: 'সাবস্ক্রাইব',
			write: 'ইমেইল করুন'
		},
		reviews: {
			title: '{n} শিক্ষার্থীর আস্থা',
			ratingLabel: 'শিক্ষার্থীদের রিভিউ থেকে গড় রেটিং',
			studentAt: 'যে কোর্সে আছেন',
			verified: 'যাচাই করা',
			sample: 'নমুনা রিভিউ',
			more: 'আরও রিভিউ দেখুন',
			less: 'কম দেখান'
		},
		showcase: {
			featured: 'ফিচারড',
			featuredTitle: 'DOLLAR MAN LEARNING',
			featuredText:
				'একদম শূন্য থেকে ধাপে ধাপে শিখুন। টেলিগ্রামে লাইভ ক্লাস, সহজ লেসন আর সবসময় পাশে থাকা একটা কমিউনিটি।',
			watch: 'ভিডিও দেখুন',
			courseLink: 'কোর্স দেখুন',
			courseTitle: 'DOLLAR MAN কোর্স',
			courseText: 'নতুনদের জন্য সহজ ভাষায়, ধাপে ধাপে সাজানো লেসন। দক্ষতা বাড়বে, আত্মবিশ্বাসও।',
			lessons: (n: string) => `${n}টি লেসন`,
			hours: (n: string) => `${n} ঘণ্টা`,
			toolsTitle: 'ফ্রি টুলস',
			toolsText: 'ক্যালকুলেটর আর টেমপ্লেট, পুরোপুরি ফ্রি।',
			photoAlt: 'কোর্সের ইন্সট্রাক্টর ডলার ম্যান'
		},
		learnTitle: 'যা যা শিখবেন',
		learnIntro:
			'জীবনের প্রথম চার্ট দেখা থেকে শুরু করে নিজের হাতে লেখা একটা ট্রেডিং প্ল্যান পর্যন্ত। প্রতিটা বিষয় সহজ কথায় বোঝানো, সাথে হাতে-কলমে প্র্যাকটিসের কাজ।',
		learnItems: [
			{
				title: 'মার্কেট কীভাবে চলে',
				text: 'দাম কেন ওঠে-নামে, কারেন্সি পেয়ার কীভাবে কাজ করে, আর মার্কেট কখন খোলা থাকে।'
			},
			{
				title: 'চার্ট পড়া',
				text: 'ক্যান্ডেলস্টিক, টাইমফ্রেম, ট্রেন্ড, সাপোর্ট আর রেজিস্ট্যান্স।'
			},
			{
				title: 'রিস্ক ম্যানেজমেন্ট',
				text: 'স্টপ-লস, পজিশন সাইজ আর রিস্ক/রিওয়ার্ড। এই দক্ষতাগুলোই আপনার অ্যাকাউন্ট বাঁচিয়ে রাখে।'
			},
			{
				title: 'প্ল্যান আর ডিসিপ্লিন',
				text: 'একটা সহজ লিখিত প্ল্যান, ট্রেডিং জার্নাল, আর আবেগ সামলে রাখার অভ্যাস।'
			}
		],
		howTitle: 'কীভাবে শুরু করবেন',
		howSteps: [
			{
				title: 'টেলিগ্রামে যোগ দিন',
				text: 'বাটনে চাপ দিয়ে আমাদের টেলিগ্রাম চ্যানেলে চলে আসুন। লাইভ ক্লাস ওখানেই হয়, আর পুরোটাই ফ্রি।'
			},
			{
				title: 'প্রথম লেসন শুরু করুন',
				text: 'যোগ দিলেই মডিউল ১ পেয়ে যাবেন। এরপর যত এগোবেন, ধাপে ধাপে নতুন লেসন খুলবে।'
			},
			{
				title: 'সবার সাথে প্র্যাকটিস করুন',
				text: 'নিজের চার্ট শেয়ার করুন, প্রশ্ন করুন, আর অন্যদের সাথে ডেমো অ্যাকাউন্টে প্র্যাকটিস চালিয়ে যান।'
			}
		],
		curriculumTitle: 'কোর্সের সিলেবাস',
		curriculumIntro: '১০টা মডিউল, যা আপনাকে একদম নতুন থেকে হাতে-কলমে কাজ করার পর্যায়ে নিয়ে যাবে।',
		curriculumLink: 'পুরো সিলেবাস দেখুন',
		minutes: 'মিনিট',
		freePreview: 'ফ্রি প্রিভিউ',
		video: {
			eyebrow: 'একবার দেখে নিন',
			title: 'Dollar Man Learning-এর ভেতরে',
			intro: 'যোগ দেওয়ার আগেই দেখে নিন ক্লাস কেমন হয়: আসল চার্ট, সহজ কথা আর লাইভ প্রশ্নোত্তর।',
			points: ['ধাপে ধাপে লেসন', 'টেলিগ্রামে লাইভ ক্লাস', 'রিস্ক ম্যানেজমেন্টে জোর'],
			play: 'ইন্ট্রো ভিডিও চালান',
			soon: 'ইন্ট্রো ভিডিও শীঘ্রই আসছে',
			photoAlt: 'ক্লাস নিচ্ছেন ডলার ম্যান'
		},
		instructorBadge: '৭+ বছরের অভিজ্ঞতা',
		markets: ['ফরেক্স', 'গোল্ড', 'ক্রিপ্টো', 'স্টক'],
		instructorTitle: 'আপনার ইন্সট্রাক্টর',
		instructor: {
			name: 'ডলার ম্যান',
			role: 'প্রতিষ্ঠাতা ও প্রধান ইন্সট্রাক্টর · আর্থিক স্বাধীনতার পক্ষে কাজ করেন',
			photoAlt: 'ডলার ম্যান, Dollar Man Learning-এর প্রতিষ্ঠাতা ও প্রধান ইন্সট্রাক্টর',
			bio: [
				'ডলার ম্যান নিজে একটা দক্ষতা ধাপে ধাপে গড়ে তুলে আর্থিক স্বাধীনতায় পৌঁছেছেন, আর সেটা হলো ট্রেডিং। কোনো শর্টকাট নেই, কোনো সিগন্যাল গ্রুপ নেই। শুধু বেসিক ঠিকমতো শেখা, রিস্ক সামলানো আর নিয়ম মেনে প্র্যাকটিস।',
				'এখন তিনি একদম নতুনদের সেই একই পথ শেখান, সহজ ভাষায় আর ফ্রিতে। কারণ তাঁর বিশ্বাস, জীবন বদলে দিতে পারে এমন একটা দক্ষতা শেখার সুযোগ সবার পাওয়া উচিত।'
			],
			note: 'তাঁর ফলাফল একান্তই তাঁর নিজের। ট্রেডিংয়ে ঝুঁকি আছে, আর অনেক নতুন ট্রেডার টাকা হারান। এই কোর্স দক্ষতা শেখায়, নিশ্চিত আয়ের কথা দেয় না।'
		},
		includedTitle: 'কোর্সে যা যা পাচ্ছেন',
		includedItems: [
			{
				title: 'সাজানো লেসন',
				text: '১০টা মডিউল, প্রতিটায় কী শিখবেন তার তালিকা, কুইজ আর চেকলিস্ট।'
			},
			{
				title: 'ফ্রি টুলস',
				text: 'পজিশন সাইজ, রিস্ক/রিওয়ার্ড আর পিপ ভ্যালু ক্যালকুলেটর।'
			},
			{
				title: 'টেমপ্লেট',
				text: 'প্র্যাকটিসের জন্য একটা জার্নাল, আর প্রিন্ট করে রাখার মতো একটা চিট-শিট।'
			},
			{
				title: 'কমিউনিটি',
				text: 'টেলিগ্রামে প্রতিদিন ছোট লেসন, আপডেট আর প্রশ্নের উত্তর।'
			}
		],
		honestyTitle: 'আমাদের কথা',
		honestyText:
			'আমরা দক্ষতা শেখাই, শর্টকাট না। কোনো সিগন্যাল বিক্রি করি না, "নিশ্চিত লাভের" কথা বলি না, আর কখনো আপনার টাকা বা পাসওয়ার্ড চাইব না।',
		faqTitle: 'যা অনেকেই জানতে চান',
		finalTitle: 'ফ্রিতে অনলাইন আয়ের পথ শিখতে নিচে দেওয়া টেলিগ্রামে মেসেজ করুন',
		finalText:
			'লাইভ ক্লাসের জন্য টেলিগ্রাম চ্যানেলে চলে আসুন। সাথে সাথেই মডিউল ১ পাবেন, তারপর ধাপে ধাপে নতুন লেসন।'
	}
};

const dictionaries: Record<Lang, Dictionary> = { en, bn };

export const t = (lang: Lang): Dictionary => dictionaries[lang];
