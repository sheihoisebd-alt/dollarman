/**
 * Course progress, stored only in this browser (localStorage). Nothing is sent to a server.
 * A module counts as complete when every checklist item is ticked.
 */
type ModuleProgress = { checked: number[]; quizScore?: number };

const STORAGE_KEY = 'dml-progress';

class Progress {
	modules = $state<Record<string, ModuleProgress>>({});
	loaded = $state(false);

	load() {
		try {
			this.modules = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}');
		} catch {
			this.modules = {};
		}
		this.loaded = true;
	}

	isChecked(slug: string, index: number) {
		return this.modules[slug]?.checked.includes(index) ?? false;
	}

	toggle(slug: string, index: number) {
		const current = this.modules[slug] ?? { checked: [] };
		const checked = current.checked.includes(index)
			? current.checked.filter((i) => i !== index)
			: [...current.checked, index];
		this.modules[slug] = { ...current, checked };
		this.save();
	}

	setQuizScore(slug: string, score: number) {
		this.modules[slug] = { checked: this.modules[slug]?.checked ?? [], quizScore: score };
		this.save();
	}

	isComplete(slug: string, checklistLength: number) {
		return checklistLength > 0 && (this.modules[slug]?.checked.length ?? 0) >= checklistLength;
	}

	reset() {
		this.modules = {};
		this.save();
	}

	private save() {
		try {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(this.modules));
		} catch {
			// Storage blocked (e.g. private mode): progress lasts for this visit only.
		}
	}
}

export const progress = new Progress();
