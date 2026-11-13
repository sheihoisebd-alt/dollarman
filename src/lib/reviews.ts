/**
 * Student reviews shown above the FAQ on the home page.
 *
 * REPLACE THE SAMPLES WITH REAL REVIEWS before launch. Every entry with `sample: true` is labelled
 * "sample" on the page and never gets the "Verified" badge. For a real review: use the student's
 * own words (with their permission), set `sample: false`, and set `verified: true` only if you can
 * show they took the course. No income figures or profit claims: Meta's ad rules and honest
 * marketing both forbid them.
 *
 * Reviews are listed per language: Bangla pages show `reviews.bn`, English pages `reviews.en`.
 */
import type { Lang } from '#lib/types.js';

export type Review = {
	name: string;
	/** Which course or class they took, shown under "Student at" */
	course: string;
	text: string;
	rating: 1 | 2 | 3 | 4 | 5;
	verified: boolean;
	sample: boolean;
};

const bn: Review[] = [
	{
		name: 'Saiful Islam',
		course: 'Dollar Man Learning-এর ফ্রি কোর্স',
		text: 'ধাপে ধাপে বুঝিয়ে দেওয়ায় একজন বিগিনার হিসেবে শেখাটা অনেক সহজ হয়েছে। এখন রিস্ক ম্যানেজমেন্ট মেনে চলতে শিখেছি।',
		rating: 5,
		verified: false,
		sample: true
	},
	{
		name: 'Fahim Chowdhury',
		course: 'টেলিগ্রাম লাইভ ক্লাস',
		text: 'আগে অন্যের সিগন্যালের ওপর নির্ভর করতাম। এখন নিজে চার্ট পড়তে পারি আর বুঝি কেন একটা সিদ্ধান্ত নিচ্ছি।',
		rating: 5,
		verified: false,
		sample: true
	},
	{
		name: 'Arham Khan',
		course: 'Dollar Man Learning-এর ফ্রি কোর্স',
		text: 'বোঝানোগুলো একদম সহজ আর কাজের। লাইভ সেশনে প্রশ্ন করলে সাথে সাথে উত্তর পাই, তাই আত্মবিশ্বাস অনেক বেড়েছে।',
		rating: 5,
		verified: false,
		sample: true
	},
	{
		name: 'Zayan Ahmed',
		course: 'টেলিগ্রাম লাইভ ক্লাস',
		text: 'শুধু থিওরি না, আসল মার্কেটের উদাহরণ দিয়ে বোঝানো হয়। প্রতিটা মডিউলের শেষে চেকলিস্টটা খুব কাজের।',
		rating: 5,
		verified: false,
		sample: true
	},
	{
		name: 'Zavian Noor',
		course: 'Dollar Man Learning-এর ফ্রি কোর্স',
		text: 'মার্কেট স্ট্রাকচার আর রিস্ক ম্যানেজমেন্ট এখন অনেক পরিষ্কার। আসল চার্ট দিয়ে বোঝানো হয়, তাই শিখতেও ভালো লাগে।',
		rating: 4,
		verified: false,
		sample: true
	},
	{
		name: 'Ariyan Sheikh',
		course: 'টেলিগ্রাম লাইভ ক্লাস',
		text: 'লস হলে আগে খুব ইমোশনাল হয়ে যেতাম। সাইকোলজি লেসনগুলো আমাকে শান্ত আর ডিসিপ্লিনড থাকতে শিখিয়েছে।',
		rating: 5,
		verified: false,
		sample: true
	}
];

const en: Review[] = [
	{
		name: 'Saiful Islam',
		course: 'Dollar Man Learning free course',
		text: 'Everything is explained step by step, so learning as a beginner felt much easier. I now follow proper risk management.',
		rating: 5,
		verified: false,
		sample: true
	},
	{
		name: 'Fahim Chowdhury',
		course: 'Telegram live classes',
		text: 'I used to rely on other people’s signals. Now I can read a chart myself and understand why I am making a decision.',
		rating: 5,
		verified: false,
		sample: true
	},
	{
		name: 'Arham Khan',
		course: 'Dollar Man Learning free course',
		text: 'The explanations are simple and practical. When I ask in the live session I get an answer straight away, so my confidence has grown a lot.',
		rating: 5,
		verified: false,
		sample: true
	},
	{
		name: 'Zayan Ahmed',
		course: 'Telegram live classes',
		text: 'Not just theory: everything is explained with real market examples. The checklist at the end of each module is really useful.',
		rating: 5,
		verified: false,
		sample: true
	},
	{
		name: 'Zavian Noor',
		course: 'Dollar Man Learning free course',
		text: 'Market structure and risk management are much clearer now. Lessons use real charts, so learning is actually enjoyable.',
		rating: 4,
		verified: false,
		sample: true
	},
	{
		name: 'Ariyan Sheikh',
		course: 'Telegram live classes',
		text: 'I used to get very emotional after a loss. The psychology lessons taught me to stay calm and disciplined.',
		rating: 5,
		verified: false,
		sample: true
	}
];

export const reviews: Record<Lang, Review[]> = { bn, en };
