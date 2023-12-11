import { e as createAstro, f as createComponent, r as renderTemplate, k as renderComponent, o as renderHead, l as addAttribute, q as renderSlot } from '../astro_8TRCkifC.mjs';
import { $ as $$BaseHead, g as getCollection } from './__Zjbe777r.mjs';

const $$Astro$1 = createAstro("https://example.com");
const $$CodeLayout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$CodeLayout;
  const { title, description, heroImage } = Astro2.props;
  return renderTemplate`<html lang="en"> <head>${renderComponent($$result, "BaseHead", $$BaseHead, { "title": title, "description": description })}${renderHead()}</head> <body> <main class="flex h-screen w-full text-sm"> <article> <div> ${heroImage && renderTemplate`<img${addAttribute(1020, "width")}${addAttribute(510, "height")}${addAttribute(heroImage, "src")}${addAttribute(title, "alt")}>`} </div> <h1>${title}</h1> <hr> ${renderSlot($$result, $$slots["default"])} </article> </main> </body></html>`;
}, "/Users/needim/projects/smashing-team/smashing.tools/src/layouts/CodeLayout.astro", void 0);

const $$Astro = createAstro("https://example.com");
async function getStaticPaths() {
  const posts = await getCollection("code");
  return posts.map((post) => ({
    params: { slug: post.slug },
    props: post
  }));
}
const $$slug = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$slug;
  const post = Astro2.props;
  const { Content } = await post.render();
  return renderTemplate`${renderComponent($$result, "CodeLayout", $$CodeLayout, { ...post.data, "slug": post.slug }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Content", Content, {})} ` })}`;
}, "/Users/needim/projects/smashing-team/smashing.tools/src/pages/code/[slug].astro", void 0);

const $$file = "/Users/needim/projects/smashing-team/smashing.tools/src/pages/code/[slug].astro";
const $$url = "/code/[slug]";

export { $$slug as default, $$file as file, getStaticPaths, $$url as url };
