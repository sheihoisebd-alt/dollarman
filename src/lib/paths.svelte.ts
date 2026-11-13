/**
 * Language-aware links. Every internal link goes through `href()`, so a Bangla page links to Bangla
 * pages (/course) and an English page to English ones (/en/course).
 */
import { resolve } from '$app/paths';
import { page } from '$app/state';
import type { Path } from '$app/types';
import { langFromPath, localizePath, type Lang } from '#lib/i18n.js';

/** Internal link in the given language, with the base path applied. `path` starts with "/". */
export const href = (lang: Lang, path: string): string =>
	// resolve() takes a plain pathname without its leading slash (a leading slash means a route ID)
	resolve(localizePath(lang, path).slice(1) as Path);

/** The language of the page being shown (reactive inside components). */
export const currentLang = (): Lang => langFromPath(page.url.pathname);
