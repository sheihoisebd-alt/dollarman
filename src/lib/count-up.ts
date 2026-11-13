/**
 * Svelte attachment: counts a figure such as "100k+" or "7+" up from zero the first time it
 * scrolls into view. The real text is in the HTML from the start (for search engines, and for
 * anyone with reduced motion), and the count always ends on exactly that text.
 */
import type { Attachment } from 'svelte/attachments';

export const countUp: Attachment<HTMLElement> = (node) => {
	const final = node.textContent?.trim() ?? '';
	const match = /^(\D*)([\d.,]+)(.*)$/.exec(final);
	if (!match || matchMedia('(prefers-reduced-motion: reduce)').matches) return;

	const [, prefix, digits, suffix] = match;
	const target = Number(digits.replace(/,/g, ''));
	const decimals = digits.includes('.') ? digits.split('.')[1].length : 0;
	let frame = 0;

	const run = () => {
		const start = performance.now();
		const duration = 1600;
		const tick = (now: number) => {
			const t = Math.min(1, (now - start) / duration);
			const eased = 1 - Math.pow(1 - t, 3);
			node.textContent = t < 1 ? `${prefix}${(target * eased).toFixed(decimals)}${suffix}` : final;
			if (t < 1) frame = requestAnimationFrame(tick);
		};
		frame = requestAnimationFrame(tick);
	};

	const observer = new IntersectionObserver(
		([entry]) => {
			if (!entry.isIntersecting) return;
			observer.disconnect();
			run();
		},
		{ threshold: 0.6 }
	);
	observer.observe(node);

	return () => {
		observer.disconnect();
		cancelAnimationFrame(frame);
		node.textContent = final;
	};
};
