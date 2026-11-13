/**
 * Site-wide motion, built on Motion (motion.dev). Each export is a Svelte attachment:
 *
 *   <ul {@attach revealChildren()}>   cards spring in one after another
 *   <h2 {@attach reveal()}>           one element rises into place
 *   <div {@attach tilt()}>            a card leans towards the pointer (desktop)
 *   <details {@attach smoothDetails}> an accordion that opens and closes smoothly
 *
 * Rules that keep it safe:
 * - Nothing animates for people who ask for reduced motion.
 * - On the first page load, anything already on screen is left alone, so the static HTML never
 *   flashes or hides. Only content below the fold waits to be revealed. After a client-side
 *   navigation, everything animates in (there is no static HTML to protect then).
 */
import { animate, inView, stagger } from 'motion';
import type { Attachment } from 'svelte/attachments';

const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

let navigated = false;
/** Called on client-side navigation: from then on, on-screen content animates in too. */
export const markNavigated = () => {
	navigated = true;
};

const onScreen = (el: Element) => {
	const r = el.getBoundingClientRect();
	return r.top < innerHeight && r.bottom > 0;
};

/** Whether this element should play an entrance animation at all. */
const shouldReveal = (el: Element) => !reduced() && (navigated || !onScreen(el));

const SPRING = { type: 'spring', bounce: 0.28, duration: 0.9 } as const;

/** CSS transitions would fight Motion's frame-by-frame updates; pause them while it runs. */
function withoutTransitions(
	els: HTMLElement[],
	run: () => { then: (done: () => void, failed?: () => void) => unknown }
) {
	const saved = els.map((el) => el.style.transition);
	els.forEach((el) => (el.style.transition = 'none'));
	const restore = () => els.forEach((el, i) => (el.style.transition = saved[i]));
	run().then(restore, restore);
}

type From = { y?: number; x?: number; scale?: number; rotate?: number };

/** One element rises (or slides) into place when it scrolls into view. */
export const reveal =
	({
		y = 36,
		x = 0,
		scale = 1,
		rotate = 0,
		delay = 0
	}: From & { delay?: number } = {}): Attachment<HTMLElement> =>
	(node) => {
		if (!shouldReveal(node)) return;
		animate(node, { opacity: 0, y, x, scale, rotate }, { duration: 0 });
		return inView(
			node,
			() => {
				withoutTransitions([node], () =>
					animate(node, { opacity: 1, y: 0, x: 0, scale: 1, rotate: 0 }, { ...SPRING, delay })
				);
			},
			{ amount: 0.2 }
		);
	};

/** The children of a list or grid spring in one after another. */
export const revealChildren =
	({
		y = 40,
		x = 0,
		scale = 0.96,
		gap = 0.08
	}: From & { gap?: number } = {}): Attachment<HTMLElement> =>
	(node) => {
		if (!shouldReveal(node)) return;
		const kids = Array.from(node.children) as HTMLElement[];
		if (!kids.length) return;
		animate(kids, { opacity: 0, y, x, scale }, { duration: 0 });
		return inView(
			node,
			() => {
				withoutTransitions(kids, () =>
					animate(kids, { opacity: 1, y: 0, x: 0, scale: 1 }, { ...SPRING, delay: stagger(gap) })
				);
			},
			{ amount: 0.1 }
		);
	};

/** Small things (icons, stars, badges) pop in one by one when their container is seen. */
export const popChildren =
	(selector: string, gap = 0.09): Attachment<HTMLElement> =>
	(node) => {
		if (reduced()) return;
		const items = Array.from(node.querySelectorAll<HTMLElement | SVGElement>(selector));
		if (!items.length) return;
		animate(items, { opacity: 0, scale: 0.3 }, { duration: 0 });
		return inView(
			node,
			() => {
				animate(
					items,
					{ opacity: 1, scale: 1 },
					{ type: 'spring', bounce: 0.55, duration: 0.6, delay: stagger(gap, { startDelay: 0.25 }) }
				);
			},
			{ amount: 0.15 }
		);
	};

/** A card leans gently towards the pointer, like holding a photo (mouse and pen only). */
export const tilt =
	(max = 6): Attachment<HTMLElement> =>
	(node) => {
		if (reduced() || !matchMedia('(hover: hover) and (pointer: fine)').matches) return;
		const move = (e: PointerEvent) => {
			const r = node.getBoundingClientRect();
			const px = (e.clientX - r.left) / r.width - 0.5;
			const py = (e.clientY - r.top) / r.height - 0.5;
			animate(
				node,
				{ rotateY: px * max * 2, rotateX: -py * max * 2, transformPerspective: 1000 },
				{ type: 'spring', bounce: 0, duration: 0.5 }
			);
		};
		const leave = () =>
			animate(node, { rotateY: 0, rotateX: 0 }, { type: 'spring', bounce: 0.3, duration: 0.8 });
		node.addEventListener('pointermove', move);
		node.addEventListener('pointerleave', leave);
		return () => {
			node.removeEventListener('pointermove', move);
			node.removeEventListener('pointerleave', leave);
		};
	};

/**
 * <details> that opens and closes smoothly. The body is everything after <summary>. Without
 * JavaScript (or with reduced motion) it is a normal, instant <details>.
 */
export const smoothDetails: Attachment<HTMLDetailsElement> = (node) => {
	const summary = node.querySelector('summary');
	if (!summary) return;
	const body = () => Array.from(node.children).filter((el) => el !== summary) as HTMLElement[];

	const click = (e: MouseEvent) => {
		if (reduced()) return;
		e.preventDefault();
		const parts = body();
		const clear = () =>
			parts.forEach((el) => {
				for (const prop of ['height', 'opacity', 'overflow']) el.style.removeProperty(prop);
			});
		parts.forEach((el) => (el.style.overflow = 'hidden'));
		if (node.open) {
			const heights = parts.map((el) => el.offsetHeight);
			Promise.all(
				parts.map((el, i) =>
					animate(el, { height: [heights[i], 0], opacity: [1, 0] }, { duration: 0.25 })
				)
			).then(() => {
				node.open = false;
				clear();
			});
		} else {
			node.open = true;
			Promise.all(
				parts.map((el) =>
					animate(
						el,
						{ height: [0, el.scrollHeight], opacity: [0, 1] },
						{ type: 'spring', bounce: 0.15, duration: 0.5 }
					)
				)
			).then(clear);
		}
	};
	summary.addEventListener('click', click);
	return () => summary.removeEventListener('click', click);
};

/** Briefly shakes an element side to side (a wrong answer). */
export const shake = (el: Element) =>
	!reduced() && animate(el, { x: [0, -10, 9, -7, 5, -2, 0] }, { duration: 0.5 });

/** A quick happy bounce (a right answer, a ticked item). */
export const bounce = (el: Element) =>
	!reduced() &&
	animate(el, { scale: [1, 1.05, 1] }, { type: 'spring', bounce: 0.6, duration: 0.45 });
