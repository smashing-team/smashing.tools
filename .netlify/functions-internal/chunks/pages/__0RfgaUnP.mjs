import { A as AstroError, e as UnknownContentCollectionError, f as createComponent, r as renderUniqueStylesheet, g as renderScriptElement, h as createHeadAndContent, i as renderTemplate, j as renderComponent, u as unescapeHTML, k as createAstro, l as addAttribute, m as maybeRenderHead, n as renderTransition, o as renderHead, p as createTransitionScope, q as renderSlot } from '../astro_9ur4oi-I.mjs';
import { p as prependForwardSlash } from '../astro/assets-service_RtEWBINs.mjs';
/* empty css                               */
import { jsxs, jsx } from 'react/jsx-runtime';
import 'react';
/* empty css                               */

function createCollectionToGlobResultMap({
  globResult,
  contentDir
}) {
  const collectionToGlobResultMap = {};
  for (const key in globResult) {
    const keyRelativeToContentDir = key.replace(new RegExp(`^${contentDir}`), "");
    const segments = keyRelativeToContentDir.split("/");
    if (segments.length <= 1)
      continue;
    const collection = segments[0];
    collectionToGlobResultMap[collection] ??= {};
    collectionToGlobResultMap[collection][key] = globResult[key];
  }
  return collectionToGlobResultMap;
}
const cacheEntriesByCollection = /* @__PURE__ */ new Map();
function createGetCollection({
  contentCollectionToEntryMap,
  dataCollectionToEntryMap,
  getRenderEntryImport
}) {
  return async function getCollection(collection, filter) {
    let type;
    if (collection in contentCollectionToEntryMap) {
      type = "content";
    } else if (collection in dataCollectionToEntryMap) {
      type = "data";
    } else {
      console.warn(
        `The collection **${collection}** does not exist or is empty. Ensure a collection directory with this name exists.`
      );
      return;
    }
    const lazyImports = Object.values(
      type === "content" ? contentCollectionToEntryMap[collection] : dataCollectionToEntryMap[collection]
    );
    let entries = [];
    if (!Object.assign({"BASE_URL": "/", "MODE": "production", "DEV": false, "PROD": true, "SSR": true, "SITE": "https://example.com", "ASSETS_PREFIX": undefined}, {})?.DEV && cacheEntriesByCollection.has(collection)) {
      entries = [...cacheEntriesByCollection.get(collection)];
    } else {
      entries = await Promise.all(
        lazyImports.map(async (lazyImport) => {
          const entry = await lazyImport();
          return type === "content" ? {
            id: entry.id,
            slug: entry.slug,
            body: entry.body,
            collection: entry.collection,
            data: entry.data,
            async render() {
              return render({
                collection: entry.collection,
                id: entry.id,
                renderEntryImport: await getRenderEntryImport(collection, entry.slug)
              });
            }
          } : {
            id: entry.id,
            collection: entry.collection,
            data: entry.data
          };
        })
      );
      cacheEntriesByCollection.set(collection, entries);
    }
    if (typeof filter === "function") {
      return entries.filter(filter);
    } else {
      return entries;
    }
  };
}
async function render({
  collection,
  id,
  renderEntryImport
}) {
  const UnexpectedRenderError = new AstroError({
    ...UnknownContentCollectionError,
    message: `Unexpected error while rendering ${String(collection)} → ${String(id)}.`
  });
  if (typeof renderEntryImport !== "function")
    throw UnexpectedRenderError;
  const baseMod = await renderEntryImport();
  if (baseMod == null || typeof baseMod !== "object")
    throw UnexpectedRenderError;
  const { default: defaultMod } = baseMod;
  if (isPropagatedAssetsModule(defaultMod)) {
    const { collectedStyles, collectedLinks, collectedScripts, getMod } = defaultMod;
    if (typeof getMod !== "function")
      throw UnexpectedRenderError;
    const propagationMod = await getMod();
    if (propagationMod == null || typeof propagationMod !== "object")
      throw UnexpectedRenderError;
    const Content = createComponent({
      factory(result, baseProps, slots) {
        let styles = "", links = "", scripts = "";
        if (Array.isArray(collectedStyles)) {
          styles = collectedStyles.map((style) => {
            return renderUniqueStylesheet(result, {
              type: "inline",
              content: style
            });
          }).join("");
        }
        if (Array.isArray(collectedLinks)) {
          links = collectedLinks.map((link) => {
            return renderUniqueStylesheet(result, {
              type: "external",
              src: prependForwardSlash(link)
            });
          }).join("");
        }
        if (Array.isArray(collectedScripts)) {
          scripts = collectedScripts.map((script) => renderScriptElement(script)).join("");
        }
        let props = baseProps;
        if (id.endsWith("mdx")) {
          props = {
            components: propagationMod.components ?? {},
            ...baseProps
          };
        }
        return createHeadAndContent(
          unescapeHTML(styles + links + scripts),
          renderTemplate`${renderComponent(
            result,
            "Content",
            propagationMod.Content,
            props,
            slots
          )}`
        );
      },
      propagation: "self"
    });
    return {
      Content,
      headings: propagationMod.getHeadings?.() ?? [],
      remarkPluginFrontmatter: propagationMod.frontmatter ?? {}
    };
  } else if (baseMod.Content && typeof baseMod.Content === "function") {
    return {
      Content: baseMod.Content,
      headings: baseMod.getHeadings?.() ?? [],
      remarkPluginFrontmatter: baseMod.frontmatter ?? {}
    };
  } else {
    throw UnexpectedRenderError;
  }
}
function isPropagatedAssetsModule(module) {
  return typeof module === "object" && module != null && "__astroPropagation" in module;
}

// astro-head-inject

const contentDir = '/src/content/';

const contentEntryGlob = /* #__PURE__ */ Object.assign({"/src/content/code/shipfast.mdx": () => import('../shipfast_V_Y6uYn2.mjs'),"/src/content/design/untitledui.mdx": () => import('../untitledui_SSbY1HD4.mjs')});
const contentCollectionToEntryMap = createCollectionToGlobResultMap({
	globResult: contentEntryGlob,
	contentDir,
});

const dataEntryGlob = /* #__PURE__ */ Object.assign({});
const dataCollectionToEntryMap = createCollectionToGlobResultMap({
	globResult: dataEntryGlob,
	contentDir,
});
createCollectionToGlobResultMap({
	globResult: { ...contentEntryGlob, ...dataEntryGlob },
	contentDir,
});

let lookupMap = {};
lookupMap = {"code":{"type":"content","entries":{"shipfast":"/src/content/code/shipfast.mdx"}},"design":{"type":"content","entries":{"untitledui":"/src/content/design/untitledui.mdx"}}};

function createGlobLookup(glob) {
	return async (collection, lookupId) => {
		const filePath = lookupMap[collection]?.entries[lookupId];

		if (!filePath) return undefined;
		return glob[collection][filePath];
	};
}

const renderEntryGlob = /* #__PURE__ */ Object.assign({"/src/content/code/shipfast.mdx": () => import('../shipfast_XBrMAc7U.mjs'),"/src/content/design/untitledui.mdx": () => import('../untitledui_LJZJkgVp.mjs')});
const collectionToRenderEntryMap = createCollectionToGlobResultMap({
	globResult: renderEntryGlob,
	contentDir,
});

const getCollection = createGetCollection({
	contentCollectionToEntryMap,
	dataCollectionToEntryMap,
	getRenderEntryImport: createGlobLookup(collectionToRenderEntryMap),
});

const $$Astro$5 = createAstro("https://example.com");
const $$ViewTransitions = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$ViewTransitions;
  const { fallback = "animate" } = Astro2.props;
  return renderTemplate`<meta name="astro-view-transitions-enabled" content="true"><meta name="astro-view-transitions-fallback"${addAttribute(fallback, "content")}>`;
}, "/Users/needim/projects/smashing-team/smashing.tools/node_modules/.pnpm/astro@4.0.4_typescript@5.3.3/node_modules/astro/components/ViewTransitions.astro", void 0);

const $$Astro$4 = createAstro("https://example.com");
const $$BaseHead = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$BaseHead;
  const canonicalURL = new URL(Astro2.url.pathname, Astro2.site);
  const { title, description, image = "/blog-placeholder-1.jpg" } = Astro2.props;
  return renderTemplate`<!-- Global Metadata --><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"${addAttribute(Astro2.generator, "content")}><!-- Canonical URL --><link rel="canonical"${addAttribute(canonicalURL, "href")}><!-- Primary Meta Tags --><title>${title}</title><meta name="title"${addAttribute(title, "content")}><meta name="description"${addAttribute(description, "content")}><!-- Open Graph / Facebook --><meta property="og:type" content="website"><meta property="og:url"${addAttribute(Astro2.url, "content")}><meta property="og:title"${addAttribute(title, "content")}><meta property="og:description"${addAttribute(description, "content")}><meta property="og:image"${addAttribute(new URL(image, Astro2.url), "content")}><!-- Twitter --><meta property="twitter:card" content="summary_large_image"><meta property="twitter:url"${addAttribute(Astro2.url, "content")}><meta property="twitter:title"${addAttribute(title, "content")}><meta property="twitter:description"${addAttribute(description, "content")}><meta property="twitter:image"${addAttribute(new URL(image, Astro2.url), "content")}>${renderComponent($$result, "ViewTransitions", $$ViewTransitions, {})}`;
}, "/Users/needim/projects/smashing-team/smashing.tools/src/components/BaseHead.astro", void 0);

const $$Astro$3 = createAstro("https://example.com");
const $$GridList = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$GridList;
  const { items } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<ul role="list" class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"> ${items.map((item) => renderTemplate`<li class="col-span-1 divide-y divide-gray-2 rounded-lg border bg-gray-1 hover:bg-gray-2"> <a${addAttribute(`/${item.collection}/${item.slug}/`, "href")} class="flex w-full items-center justify-between space-x-4 p-2"> <img class="h-14 w-14 shrink-0 bg-gray-300"${addAttribute(item.data.heroImage, "src")}${addAttribute(item.data.title, "alt")}${addAttribute(renderTransition($$result, "g5yvqhth", "slide", `image-${item.slug}`), "data-astro-transition-scope")}> <div class="flex-1 truncate"> <div class="flex items-center space-x-3"> <h3 class="truncate font-medium"${addAttribute(renderTransition($$result, "2dmolpj3", "", `title-${item.slug}`), "data-astro-transition-scope")}> ${item.data.title} </h3> <span class="inline-flex shrink-0 items-center rounded-full bg-green-50 px-1.5 py-0.5 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
Design
</span> </div> <p class="mt-1 truncate text-sm text-gray-500"${addAttribute(item.data.description, "title")}> ${item.data.description} </p> </div> </a> </li>`)} </ul>`;
}, "/Users/needim/projects/smashing-team/smashing.tools/src/components/GridList.astro", "self");

const SITE_TITLE = "smashing.tools";
const SITE_DESCRIPTION = "Curated list of tools for designers and developers";
const CATEGORIES = [
  {
    category: void 0,
    title: "All"
  },
  {
    category: "code",
    title: "Code tools"
  },
  {
    category: "design",
    title: "Design tools"
  }
];

const $$Astro$2 = createAstro("https://example.com");
const $$Header = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Header;
  return renderTemplate`${maybeRenderHead()}<div class="mb-8 flex items-start justify-between"> <div> <h1 class="text-xl font-semibold">Smashing Tools</h1> <p class="text-gray-9">${SITE_DESCRIPTION}</p> </div> <div>right nav</div> </div>`;
}, "/Users/needim/projects/smashing-team/smashing.tools/src/components/Header.astro", void 0);

function Sidebar() {
  return /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 z-50 flex w-56 shrink-0 -translate-x-full flex-col justify-items-start border-r bg-gray-2 shadow-none duration-300 lg:relative lg:translate-x-0 lg:shadow-none", children: [
    /* @__PURE__ */ jsx("div", { className: "mb-3 flex shrink-0 grow-0 flex-col px-5 py-3", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsx("div", { children: "logo" }),
      /* @__PURE__ */ jsx("div", { children: "search" })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "mb-0.5 flex shrink grow flex-col overflow-y-auto", children: /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("div", { className: "px-5", children: "filters" }),
      /* @__PURE__ */ jsxs("select", { children: [
        /* @__PURE__ */ jsx("option", { value: "", children: "all" }),
        /* @__PURE__ */ jsx("option", { value: "/code", children: "code" }),
        /* @__PURE__ */ jsx("option", { value: "/design", children: "design" })
      ] })
    ] }) })
  ] });
}

const $$Astro$1 = createAstro("https://example.com");
const $$AppLayout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$AppLayout;
  return renderTemplate`<html lang="en"> <head>${renderComponent($$result, "BaseHead", $$BaseHead, { "title": SITE_TITLE, "description": SITE_DESCRIPTION })}${renderHead()}</head> <body> <main class="flex h-screen w-full overflow-y-hidden text-sm"> ${renderComponent($$result, "Sidebar", Sidebar, { "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/react/Sidebar", "client:component-export": "Sidebar", "data-astro-transition-persist": createTransitionScope($$result, "i62f2t34") })} <div class="flex grow flex-col px-6 py-4"> ${renderSlot($$result, $$slots["default"])} </div> </main>  </body> </html>`;
}, "/Users/needim/projects/smashing-team/smashing.tools/src/layouts/AppLayout.astro", "self");

const $$Astro = createAstro("https://example.com");
const prerender = false;
const $$ = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$;
  const { category } = Astro2.params;
  const activeCategory = CATEGORIES.find((cat) => cat.category === category);
  if (!activeCategory)
    return Astro2.redirect("/404");
  const items = [
    ...await getCollection("code"),
    ...await getCollection("design")
  ].sort((a, b) => a.data.pubDate.valueOf() - b.data.pubDate.valueOf());
  return renderTemplate`${renderComponent($$result, "AppLayout", $$AppLayout, { "title": SITE_TITLE, "description": SITE_DESCRIPTION }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Header", $$Header, { "data-astro-transition-persist": createTransitionScope($$result2, "jz2qkbrb") })} ${maybeRenderHead()}<pre>${JSON.stringify(Astro2.params)}</pre> ${renderComponent($$result2, "GridList", $$GridList, { "items": items })} ` })}`;
}, "/Users/needim/projects/smashing-team/smashing.tools/src/pages/[...category].astro", "self");

const $$file = "/Users/needim/projects/smashing-team/smashing.tools/src/pages/[...category].astro";
const $$url = "/[...category]";

const ____category_ = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$,
    file: $$file,
    prerender,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { $$BaseHead as $, ____category_ as _, getCollection as g };
