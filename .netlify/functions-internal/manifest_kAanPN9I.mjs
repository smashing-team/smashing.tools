import '@astrojs/internal-helpers/path';
import 'cookie';
import 'kleur/colors';
import 'string-width';
import './chunks/astro_OItnkEQ2.mjs';
import 'clsx';
import { compile } from 'path-to-regexp';

if (typeof process !== "undefined") {
  let proc = process;
  if ("argv" in proc && Array.isArray(proc.argv)) {
    if (proc.argv.includes("--verbose")) ; else if (proc.argv.includes("--silent")) ; else ;
  }
}

function getRouteGenerator(segments, addTrailingSlash) {
  const template = segments.map((segment) => {
    return "/" + segment.map((part) => {
      if (part.spread) {
        return `:${part.content.slice(3)}(.*)?`;
      } else if (part.dynamic) {
        return `:${part.content}`;
      } else {
        return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      }
    }).join("");
  }).join("");
  let trailing = "";
  if (addTrailingSlash === "always" && segments.length) {
    trailing = "/";
  }
  const toPath = compile(template + trailing);
  return toPath;
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    })
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  return {
    ...serializedManifest,
    assets,
    componentMetadata,
    clientDirectives,
    routes
  };
}

const manifest = deserializeManifest({"adapterName":"@astrojs/netlify/functions","routes":[{"file":"about/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/about","type":"page","pattern":"^\\/about\\/$","segments":[[{"content":"about","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/about.astro","pathname":"/about","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"always"}}},{"file":"code/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/code","type":"page","pattern":"^\\/code\\/$","segments":[[{"content":"code","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/code/index.astro","pathname":"/code","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"always"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"always"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.NhnjSWv8.js"}],"styles":[{"type":"external","src":"/_astro/_category_.ddL3AMdl.css"},{"type":"inline","content":".astro-route-announcer{position:absolute;left:0;top:0;clip:rect(0 0 0 0);-webkit-clip-path:inset(50%);clip-path:inset(50%);overflow:hidden;white-space:nowrap;width:1px;height:1px}@keyframes astroFadeInOut{0%{opacity:1}to{opacity:0}}@keyframes astroFadeIn{0%{opacity:0}}@keyframes astroFadeOut{to{opacity:0}}@keyframes astroSlideFromRight{0%{transform:translate(100%)}}@keyframes astroSlideFromLeft{0%{transform:translate(-100%)}}@keyframes astroSlideToRight{to{transform:translate(100%)}}@keyframes astroSlideToLeft{to{transform:translate(-100%)}}@media (prefers-reduced-motion){::view-transition-group(*),::view-transition-old(*),::view-transition-new(*){animation:none!important}[data-astro-transition-scope]{animation:none!important}}\n"}],"routeData":{"route":"/[...category]","type":"page","pattern":"^(?:\\/(.*?))?\\/$","segments":[[{"content":"...category","dynamic":true,"spread":true}]],"params":["...category"],"component":"src/pages/[...category].astro","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"always"}}}],"site":"https://example.com","base":"/","trailingSlash":"always","compressHTML":true,"componentMetadata":[["\u0000astro:content",{"propagation":"in-tree","containsHead":false}],["/Users/needim/projects/smashing-team/smashing.tools/src/pages/[...category].astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/[...category]@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astrojs-ssr-virtual-entry",{"propagation":"in-tree","containsHead":false}],["/Users/needim/projects/smashing-team/smashing.tools/src/pages/code/[...slug].astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/code/[...slug]@_@astro",{"propagation":"in-tree","containsHead":false}],["/Users/needim/projects/smashing-team/smashing.tools/src/pages/code/index.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/code/index@_@astro",{"propagation":"in-tree","containsHead":false}],["/Users/needim/projects/smashing-team/smashing.tools/src/layouts/AppLayout.astro",{"propagation":"in-tree","containsHead":false}],["/Users/needim/projects/smashing-team/smashing.tools/src/pages/about.astro",{"propagation":"in-tree","containsHead":true}],["/Users/needim/projects/smashing-team/smashing.tools/src/layouts/BlogPost.astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/about@_@astro",{"propagation":"in-tree","containsHead":false}]],"renderers":[],"clientDirectives":[["idle","(()=>{var i=t=>{let e=async()=>{await(await t())()};\"requestIdleCallback\"in window?window.requestIdleCallback(e):setTimeout(e,200)};(self.Astro||(self.Astro={})).idle=i;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var r=(i,c,s)=>{let n=async()=>{await(await i())()},t=new IntersectionObserver(e=>{for(let o of e)if(o.isIntersecting){t.disconnect(),n();break}});for(let e of s.children)t.observe(e)};(self.Astro||(self.Astro={})).visible=r;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000empty-middleware":"_empty-middleware.mjs","\u0000@astrojs-manifest":"manifest_kAanPN9I.mjs","/Users/needim/projects/smashing-team/smashing.tools/node_modules/@astrojs/react/vnode-children.js":"chunks/vnode-children_3wEZly-Z.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"chunks/generic_MEEbNpmR.mjs","\u0000@astro-page:src/pages/about@_@astro":"chunks/about_sO7pXvZ3.mjs","\u0000@astro-page:src/pages/code/index@_@astro":"chunks/index_bjIo2-xS.mjs","\u0000@astro-page:src/pages/code/[...slug]@_@astro":"chunks/_.._gLwNpd29.mjs","\u0000@astro-page:src/pages/[...category]@_@astro":"chunks/_.._FeRgvHYO.mjs","/Users/needim/projects/smashing-team/smashing.tools/src/content/code/markdown-style-guide.md?astroContentCollectionEntry=true":"chunks/markdown-style-guide_SX1QHTZV.mjs","/Users/needim/projects/smashing-team/smashing.tools/src/content/code/second-post.md?astroContentCollectionEntry=true":"chunks/second-post_GKkSyf56.mjs","/Users/needim/projects/smashing-team/smashing.tools/src/content/code/shipfast.md?astroContentCollectionEntry=true":"chunks/shipfast_FaXO_X5r.mjs","/Users/needim/projects/smashing-team/smashing.tools/src/content/code/third-post.md?astroContentCollectionEntry=true":"chunks/third-post_f23BUkff.mjs","/Users/needim/projects/smashing-team/smashing.tools/src/content/code/using-mdx.mdx?astroContentCollectionEntry=true":"chunks/using-mdx_ry-L41nk.mjs","/Users/needim/projects/smashing-team/smashing.tools/src/content/code/markdown-style-guide.md?astroPropagatedAssets":"chunks/markdown-style-guide_dRZsdr-s.mjs","/Users/needim/projects/smashing-team/smashing.tools/src/content/code/second-post.md?astroPropagatedAssets":"chunks/second-post_gG_KA0wf.mjs","/Users/needim/projects/smashing-team/smashing.tools/src/content/code/shipfast.md?astroPropagatedAssets":"chunks/shipfast_VTIOtT5u.mjs","/Users/needim/projects/smashing-team/smashing.tools/src/content/code/third-post.md?astroPropagatedAssets":"chunks/third-post_vaQDtkQ6.mjs","/Users/needim/projects/smashing-team/smashing.tools/src/content/code/using-mdx.mdx?astroPropagatedAssets":"chunks/using-mdx_XpM2zJjs.mjs","/Users/needim/projects/smashing-team/smashing.tools/src/content/code/markdown-style-guide.md":"chunks/markdown-style-guide_C7zV8Tph.mjs","/Users/needim/projects/smashing-team/smashing.tools/src/content/code/second-post.md":"chunks/second-post_HxsCAYqR.mjs","/Users/needim/projects/smashing-team/smashing.tools/src/content/code/shipfast.md":"chunks/shipfast_D9Ceg_kd.mjs","/Users/needim/projects/smashing-team/smashing.tools/src/content/code/third-post.md":"chunks/third-post_r-kRCpdD.mjs","/Users/needim/projects/smashing-team/smashing.tools/src/content/code/using-mdx.mdx":"chunks/using-mdx_zcGz_cMb.mjs","/astro/hoisted.js?q=0":"_astro/hoisted.NhnjSWv8.js","/astro/hoisted.js?q=1":"_astro/hoisted.aY0IEK-h.js","@astrojs/react/client.js":"_astro/client.gSoe9Upx.js","astro:scripts/before-hydration.js":""},"assets":["/_astro/inter-greek-wght-normal.8iAzSMjZ.woff2","/_astro/inter-cyrillic-ext-wght-normal.yBM_KeYt.woff2","/_astro/inter-cyrillic-wght-normal.ZiSV2vHp.woff2","/_astro/inter-latin-wght-normal.YFatk6uG.woff2","/_astro/inter-vietnamese-wght-normal.PxkLsD1V.woff2","/_astro/inter-latin-ext-wght-normal.jdaSF5G5.woff2","/_astro/inter-greek-ext-wght-normal.-QGCzYqo.woff2","/_astro/_category_.ddL3AMdl.css","/favicon.svg","/shipfast.png","/smashing.tools-logo.svg","/_astro/client.gSoe9Upx.js","/_astro/hoisted.NhnjSWv8.js","/_astro/hoisted.aY0IEK-h.js","/about/index.html","/code/index.html"]});

export { manifest };
