/** Tracking consent. Nothing is sent to Meta until this is 'granted'. */
export type ConsentValue = 'granted' | 'denied';

const STORAGE_KEY = 'dml-consent';

export const consent = $state<{ value: ConsentValue | null; loaded: boolean }>({
	value: null,
	loaded: false
});

export function loadConsent() {
	try {
		const value = localStorage.getItem(STORAGE_KEY);
		consent.value = value === 'granted' || value === 'denied' ? value : null;
	} catch {
		consent.value = null;
	}
	consent.loaded = true;
}

export function setConsent(value: ConsentValue) {
	consent.value = value;
	try {
		localStorage.setItem(STORAGE_KEY, value);
	} catch {
		// Without storage the choice lasts for this page view only.
	}
}
