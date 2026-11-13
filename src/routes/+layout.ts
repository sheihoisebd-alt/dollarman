import { langFromParam } from '#lib/i18n.js';
import type { LayoutLoad } from './$types';

// Every page is static HTML unless a route opts out (the /api endpoints do).
export const prerender = true;

// Bangla at the root, English under /en: every page reads `data.lang`.
export const load: LayoutLoad = ({ params }) => ({ lang: langFromParam(params.lang) });
