<script lang="ts">
	import type { Lang, QuizQuestion } from '#lib/types.js';
	import { num } from '#lib/i18n.js';
	import { tick } from 'svelte';
	import { progress } from '#lib/progress.svelte.js';
	import { bounce, reveal, shake } from '#lib/motion.js';

	let form = $state<HTMLFormElement>();

	let { lang, slug, questions }: { lang: Lang; slug: string; questions: QuizQuestion[] } = $props();

	const copy = {
		en: {
			title: 'Mini quiz',
			intro: 'Check your understanding. There is no time limit.',
			correct: '(correct answer)',
			yours: '(your answer)',
			score: (s: string, total: string) => `You scored ${s} out of ${total}.`,
			retry: 'Try again',
			check: 'Check my answers'
		},
		bn: {
			title: 'ছোট্ট কুইজ',
			intro: 'কতটা বুঝলেন একটু যাচাই করে নিন। কোনো সময়ের তাড়া নেই।',
			correct: '(সঠিক উত্তর)',
			yours: '(আপনার উত্তর)',
			score: (s: string, total: string) => `${total}টার মধ্যে ${s}টা ঠিক হয়েছে।`,
			retry: 'আবার চেষ্টা করুন',
			check: 'উত্তর মিলিয়ে দেখুন'
		}
	};
	const c = $derived(copy[lang]);

	let answers = $state<Record<number, number>>({});
	let submitted = $state(false);

	const answeredAll = $derived(Object.keys(answers).length === questions.length);
	const score = $derived(questions.filter((q, i) => answers[i] === q.answerIndex).length);

	async function submit(event: SubmitEvent) {
		event.preventDefault();
		submitted = true;
		progress.setQuizScore(slug, score);
		await tick();
		form?.querySelectorAll('[data-answer="correct"]').forEach((el) => bounce(el));
		form?.querySelectorAll('[data-answer="wrong"]').forEach((el) => shake(el));
	}

	function retry() {
		answers = {};
		submitted = false;
	}
</script>

<section aria-labelledby="quiz-{slug}" class="rounded-2xl border border-line bg-surface p-5 sm:p-6">
	<h2 id="quiz-{slug}" class="text-xl font-bold text-ink">{c.title}</h2>
	<p class="mt-1 text-sm text-muted">{c.intro}</p>

	<form bind:this={form} onsubmit={submit} class="mt-5 space-y-6">
		{#each questions as q, qi (qi)}
			<fieldset>
				<legend class="font-semibold text-ink">{num(lang, qi + 1)}. {q.question}</legend>
				<div class="mt-3 space-y-2">
					{#each q.options as option, oi (oi)}
						{@const correct = submitted && oi === q.answerIndex}
						{@const wrong = submitted && answers[qi] === oi && oi !== q.answerIndex}
						<label
							data-answer={correct ? 'correct' : wrong ? 'wrong' : undefined}
							class={[
								'flex min-h-12 cursor-pointer items-start gap-3 rounded-xl border p-3',
								correct
									? 'border-emerald-500 bg-emerald-500/10'
									: wrong
										? 'border-red-500 bg-red-500/10'
										: 'border-line has-checked:border-gold-400/60 has-checked:bg-raised'
							]}
						>
							<input
								type="radio"
								name="q{qi}"
								value={oi}
								class="mt-0.5 size-5 shrink-0 accent-gold-400"
								checked={answers[qi] === oi}
								disabled={submitted}
								onchange={() => (answers[qi] = oi)}
							/>
							<span class="text-ink">
								{option}
								{#if correct}<span class="font-semibold text-emerald-300"> {c.correct}</span>{/if}
								{#if wrong}<span class="font-semibold text-red-300"> {c.yours}</span>{/if}
							</span>
						</label>
					{/each}
				</div>
				{#if submitted}
					<p class="mt-2 rounded-lg bg-surface-2 p-3 text-sm text-body">{q.explanation}</p>
				{/if}
			</fieldset>
		{/each}

		{#if submitted}
			<div
				{@attach reveal({ y: 16, scale: 0.95 })}
				class="flex flex-wrap items-center gap-4 rounded-xl bg-raised p-4"
				role="status"
			>
				<p class="font-semibold text-ink">
					{c.score(num(lang, score), num(lang, questions.length))}
				</p>
				<button
					type="button"
					onclick={retry}
					class="min-h-11 rounded-xl border border-gold-400/60 px-4 font-semibold text-gold-300"
				>
					{c.retry}
				</button>
			</div>
		{:else}
			<button
				type="submit"
				disabled={!answeredAll}
				class="btn-gold min-h-12 rounded-xl px-6 font-semibold disabled:cursor-not-allowed disabled:opacity-50"
			>
				{c.check}
			</button>
		{/if}
	</form>
</section>
