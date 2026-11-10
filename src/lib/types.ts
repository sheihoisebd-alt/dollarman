// Shared content types (safe to import from client code).

export type Module = {
	slug: string;
	position: number;
	title: string;
	summary: string;
	durationMin: number;
	preview: boolean;
	outcomes: string[];
	lessons: string[];
	checklist: string[];
};
export type QuizQuestion = {
	question: string;
	options: string[];
	answerIndex: number;
	explanation: string;
};
export type Tool = {
	slug: string;
	kind: 'calculator' | 'download';
	title: string;
	description: string;
	href: string;
	fileFormat: string | null;
};
export type Post = {
	slug: string;
	title: string;
	description: string;
	published: string;
	updated: string | null;
	readingMin: number;
	tags: { slug: string; name: string }[];
};
export type Faq = { question: string; answer: string };
export type Lang = 'en' | 'bn';
