import { k as createAstro, f as createComponent, i as renderTemplate, j as renderComponent, p as createTransitionScope, m as maybeRenderHead } from '../astro_9ur4oi-I.mjs';
import { g as getCollection, $ as $$Header, a as $$GridList, S as SITE_TITLE, b as SITE_DESCRIPTION, c as $$AppLayout } from './_category__1-tKzx0v.mjs';
/* empty css                               */

const $$Astro = createAstro("https://example.com");
const prerender = false;
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const items = [
    ...await getCollection("code"),
    ...await getCollection("design")
  ].sort((a, b) => a.data.pubDate.valueOf() - b.data.pubDate.valueOf());
  return renderTemplate`${renderComponent($$result, "AppLayout", $$AppLayout, { "title": SITE_TITLE, "description": SITE_DESCRIPTION }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Header", $$Header, { "data-astro-transition-persist": createTransitionScope($$result2, "wwdvwa7n") })} ${maybeRenderHead()}<pre>${JSON.stringify(Astro2.params)}</pre> <pre>${JSON.stringify(Astro2.props)}</pre> ${renderComponent($$result2, "GridList", $$GridList, { "items": items })} ` })}`;
}, "/Users/needim/projects/smashing-team/smashing.tools/src/pages/index.astro", "self");

const $$file = "/Users/needim/projects/smashing-team/smashing.tools/src/pages/index.astro";
const $$url = "";

export { $$Index as default, $$file as file, prerender, $$url as url };
