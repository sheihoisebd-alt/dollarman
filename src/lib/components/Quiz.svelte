<script lang="ts">
	import type { QuizQuestion } from '#lib/types.js';
	import { progress } from '#lib/progress.svelte.js';

	let { slug, questions }: { slug: string; questions: QuizQuestion[] } = $props();

	let answers = $state<Record<number, number>>({});
	let submitted = $state(false);

	const answeredAll = $derived(Object.keys(answers).length === questions.length);
	const score = $derived(questions.filter((q, i) => answers[i] === q.answerIndex).length);

	function submit(event: SubmitEvent) {
		event.preventDefault();
		submitted = true;
		progress.setQuizScore(slug, score);
	}

	function retry() {
		answers = {};
		submitted = false;
	}
</script>

<section aria-labelledby="quiz-{slug}" class="rounded-2xl border border-line bg-surface p-5 sm:p-6">
	<h2 id="quiz-{slug}" class="text-xl font-bold text-ink">Mini quiz</h2>
	<p class="mt-1 text-sm text-muted">Check your understanding. There is no time limit.</p>

	<form onsubmit={submit} class="mt-5 space-y-6">
		{#each questions as q, qi (qi)}
			<fieldset>
				<legend class="font-semibold text-ink">{qi + 1}. {q.question}</legend>
				<div class="mt-3 space-y-2">
					{#each q.options as option, oi (oi)}
						{@const correct = submitted && oi === q.answerIndex}
						{@const wrong = submitted && answers[qi] === oi && oi !== q.answerIndex}
						<label
							class={[
								'flex min-h-12 cursor-pointer items-start gap-3 rounded-xl border p-3',
								correct
									? 'border-emerald-500 bg-emerald-500/10'
									: wrong
										? 'border-red-500 bg-red-500/10'
										: 'border-line has-checked:border-silver-300 has-checked:bg-raised'
							]}
						>
							<input
								type="radio"
								name="q{qi}"
								value={oi}
								class="mt-0.5 size-5 shrink-0 accent-silver-300"
								checked={answers[qi] === oi}
								disabled={submitted}
								onchange={() => (answers[qi] = oi)}
							/>
							<span class="text-ink">
								{option}
								{#if correct}<span class="font-semibold text-emerald-300">
										(correct answer)</span
									>{/if}
								{#if wrong}<span class="font-semibold text-red-300"> (your answer)</span>{/if}
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
			<div class="flex flex-wrap items-center gap-4 rounded-xl bg-raised p-4" role="status">
				<p class="font-semibold text-ink">You scored {score} out of {questions.length}.</p>
				<button
					type="button"
					onclick={retry}
					class="min-h-11 rounded-xl border border-silver-300 px-4 font-semibold text-silver-200"
				>
					Try again
				</button>
			</div>
		{:else}
			<button
				type="submit"
				disabled={!answeredAll}
				class="btn-metal min-h-12 rounded-xl px-6 font-semibold disabled:cursor-not-allowed disabled:opacity-50"
			>
				Check my answers
			</button>
		{/if}
	</form>
</section>
