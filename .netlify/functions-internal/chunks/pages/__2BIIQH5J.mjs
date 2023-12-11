import { A as AstroError, e as UnknownContentCollectionError, f as createComponent, r as renderUniqueStylesheet, g as renderScriptElement, h as createHeadAndContent, i as renderTemplate, j as renderComponent, u as unescapeHTML, k as createAstro, l as addAttribute, m as renderHead, n as createTransitionScope, o as renderSlot, p as maybeRenderHead, q as renderTransition } from '../astro_zv2eHxRD.mjs';
import { p as prependForwardSlash } from '../astro/assets-service_VQ3atKFe.mjs';
/* empty css                               */
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

const contentEntryGlob = /* #__PURE__ */ Object.assign({"/src/content/code/markdown-style-guide.md": () => import('../markdown-style-guide_SX1QHTZV.mjs'),"/src/content/code/second-post.md": () => import('../second-post_GKkSyf56.mjs'),"/src/content/code/shipfast.md": () => import('../shipfast_FaXO_X5r.mjs'),"/src/content/code/third-post.md": () => import('../third-post_f23BUkff.mjs'),"/src/content/code/using-mdx.mdx": () => import('../using-mdx_ry-L41nk.mjs')});
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
lookupMap = {"code":{"type":"content","entries":{"shipfast":"/src/content/code/shipfast.md","third-post":"/src/content/code/third-post.md","second-post":"/src/content/code/second-post.md","markdown-style-guide":"/src/content/code/markdown-style-guide.md","using-mdx":"/src/content/code/using-mdx.mdx"}}};

function createGlobLookup(glob) {
	return async (collection, lookupId) => {
		const filePath = lookupMap[collection]?.entries[lookupId];

		if (!filePath) return undefined;
		return glob[collection][filePath];
	};
}

const renderEntryGlob = /* #__PURE__ */ Object.assign({"/src/content/code/markdown-style-guide.md": () => import('../markdown-style-guide_a_K7_jjK.mjs'),"/src/content/code/second-post.md": () => import('../second-post_hveozdGa.mjs'),"/src/content/code/shipfast.md": () => import('../shipfast_JPkpswx2.mjs'),"/src/content/code/third-post.md": () => import('../third-post_oOd9e0av.mjs'),"/src/content/code/using-mdx.mdx": () => import('../using-mdx_1cf11WGS.mjs')});
const collectionToRenderEntryMap = createCollectionToGlobResultMap({
	globResult: renderEntryGlob,
	contentDir,
});

const getCollection = createGetCollection({
	contentCollectionToEntryMap,
	dataCollectionToEntryMap,
	getRenderEntryImport: createGlobLookup(collectionToRenderEntryMap),
});

const SITE_TITLE = "smashing.tools";
const SITE_DESCRIPTION = "Curated list of tools for designers and developers";

const $$Astro$3 = createAstro("https://example.com");
const $$ViewTransitions = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$ViewTransitions;
  const { fallback = "animate" } = Astro2.props;
  return renderTemplate`<meta name="astro-view-transitions-enabled" content="true"><meta name="astro-view-transitions-fallback"${addAttribute(fallback, "content")}>`;
}, "/Users/needim/projects/smashing-team/smashing.tools/node_modules/.pnpm/astro@4.0.4_typescript@5.3.3/node_modules/astro/components/ViewTransitions.astro", void 0);

const $$Astro$2 = createAstro("https://example.com");
const $$BaseHead = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$BaseHead;
  const canonicalURL = new URL(Astro2.url.pathname, Astro2.site);
  const { title, description, image = "/blog-placeholder-1.jpg" } = Astro2.props;
  return renderTemplate`<!-- Global Metadata --><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"${addAttribute(Astro2.generator, "content")}><!-- Canonical URL --><link rel="canonical"${addAttribute(canonicalURL, "href")}><!-- Primary Meta Tags --><title>${title}</title><meta name="title"${addAttribute(title, "content")}><meta name="description"${addAttribute(description, "content")}><!-- Open Graph / Facebook --><meta property="og:type" content="website"><meta property="og:url"${addAttribute(Astro2.url, "content")}><meta property="og:title"${addAttribute(title, "content")}><meta property="og:description"${addAttribute(description, "content")}><meta property="og:image"${addAttribute(new URL(image, Astro2.url), "content")}><!-- Twitter --><meta property="twitter:card" content="summary_large_image"><meta property="twitter:url"${addAttribute(Astro2.url, "content")}><meta property="twitter:title"${addAttribute(title, "content")}><meta property="twitter:description"${addAttribute(description, "content")}><meta property="twitter:image"${addAttribute(new URL(image, Astro2.url), "content")}>${renderComponent($$result, "ViewTransitions", $$ViewTransitions, {})}`;
}, "/Users/needim/projects/smashing-team/smashing.tools/src/components/BaseHead.astro", void 0);

const $$Astro$1 = createAstro("https://example.com");
const $$AppLayout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$AppLayout;
  const { title, description } = Astro2.props;
  return renderTemplate`<html lang="en"> <head>${renderComponent($$result, "BaseHead", $$BaseHead, { "title": title, "description": description })}${renderHead()}</head> <body> <main class="flex h-screen w-full overflow-y-hidden text-sm"> <div class="absolute inset-0 z-50 flex w-56 shrink-0 -translate-x-full flex-col justify-items-start border-r bg-gray-2 shadow-none duration-300 lg:relative lg:translate-x-0 lg:shadow-none"> <div class="mb-3 flex shrink-0 grow-0 flex-col px-5 py-3"> <div class="flex items-center justify-between"> <div>logo</div> <div>search</div> </div> </div> <div class="mb-0.5 flex shrink grow flex-col overflow-y-auto"${addAttribute(createTransitionScope($$result, "qswr3w3s"), "data-astro-transition-persist")}> <div> <div class="px-5">filters</div> <select> <option value=""></option> <option value="?language=tr">tr</option> <option value="?language=en">en</option> </select> </div> </div> </div> <div class="flex grow flex-col px-6 py-4"> ${renderSlot($$result, $$slots["default"])} </div> </main>  </body> </html>`;
}, "/Users/needim/projects/smashing-team/smashing.tools/src/layouts/AppLayout.astro", "self");

const $$Astro = createAstro("https://example.com");
const prerender = false;
const $$ = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$;
  const category = Astro2.url.pathname.split("/")[1];
  console.log(category);
  const language = Astro2.url.searchParams.get("language");
  const posts = (await getCollection("code", (post) => post.data.language === language)).sort((a, b) => a.data.pubDate.valueOf() - b.data.pubDate.valueOf());
  return renderTemplate`${renderComponent($$result, "AppLayout", $$AppLayout, { "title": SITE_TITLE, "description": SITE_DESCRIPTION }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="mb-8 flex items-start justify-between"> <div> <h1 class="text-xl font-semibold">Smashing Tools</h1> <p class="text-gray-9">${SITE_DESCRIPTION}</p> </div> <div>right nav</div> </div> <ul role="list" class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"> ${posts.map((post) => renderTemplate`<li class="col-span-1 divide-y divide-gray-2 rounded-lg border bg-gray-1 hover:bg-gray-2"> <a${addAttribute(`/code/${post.slug}/`, "href")} class="flex w-full items-center justify-between space-x-4 p-2"> <img class="h-14 w-14 shrink-0 bg-gray-300"${addAttribute(post.data.heroImage, "src")}${addAttribute(post.data.title, "alt")}${addAttribute(renderTransition($$result2, "hfhcpzbr", "slide", `image-${post.slug}`), "data-astro-transition-scope")}> <div class="flex-1 truncate"> <div class="flex items-center space-x-3"> <h3 class="text-md truncate font-medium text-gray-900"${addAttribute(renderTransition($$result2, "5yynm65q", "", `title-${post.slug}`), "data-astro-transition-scope")}> ${post.data.title} </h3> <span class="inline-flex shrink-0 items-center rounded-full bg-green-50 px-1.5 py-0.5 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
Design
</span> </div> <p class="mt-1 truncate text-sm text-gray-500"${addAttribute(post.data.description, "title")}> ${post.data.description} </p> </div> </a> </li>`)} </ul> ` })}`;
}, "/Users/needim/projects/smashing-team/smashing.tools/src/pages/[...category].astro", "self");

const $$file = "/Users/needim/projects/smashing-team/smashing.tools/src/pages/[...category].astro";
const $$url = "/[...category]/";

const ____category_ = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$,
    file: $$file,
    prerender,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { $$BaseHead as $, SITE_TITLE as S, ____category_ as _, SITE_DESCRIPTION as a, $$AppLayout as b, getCollection as g };
