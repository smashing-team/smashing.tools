import * as adapter from '@astrojs/netlify/netlify-functions.js';
import { renderers } from './renderers.mjs';
import { manifest } from './manifest_8DPaK1r-.mjs';

const _page0  = () => import('./chunks/generic_julP0Z1_.mjs');
const _page1  = () => import('./chunks/_slug__BWkKuudA.mjs');
const _page2  = () => import('./chunks/_slug__5WBYxf-0.mjs');
const _page3  = () => import('./chunks/404_F1XKkA6b.mjs');
const _page4  = () => import('./chunks/_.._6K812zXx.mjs');const pageMap = new Map([["node_modules/.pnpm/astro@4.0.4_typescript@5.3.3/node_modules/astro/dist/assets/endpoint/generic.js", _page0],["src/pages/design/[slug].astro", _page1],["src/pages/code/[slug].astro", _page2],["src/pages/404.astro", _page3],["src/pages/[...category].astro", _page4]]);
const _manifest = Object.assign(manifest, {
	pageMap,
	renderers,
});
const _args = {};

const _exports = adapter.createExports(_manifest, _args);
const handler = _exports['handler'];

const _start = 'start';
if(_start in adapter) {
	adapter[_start](_manifest, _args);
}

export { handler, pageMap };
