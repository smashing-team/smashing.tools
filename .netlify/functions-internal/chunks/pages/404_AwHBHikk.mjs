import { e as createAstro, f as createComponent, r as renderTemplate } from '../astro_8TRCkifC.mjs';

const $$Astro = createAstro("https://example.com");
const $$404 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$404;
  return renderTemplate`TODO: not found page`;
}, "/Users/needim/projects/smashing-team/smashing.tools/src/pages/404.astro", void 0);

const $$file = "/Users/needim/projects/smashing-team/smashing.tools/src/pages/404.astro";
const $$url = "/404";

export { $$404 as default, $$file as file, $$url as url };
