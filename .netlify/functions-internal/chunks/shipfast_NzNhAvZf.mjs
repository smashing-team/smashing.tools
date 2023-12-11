import { f as createComponent, i as renderTemplate, p as maybeRenderHead, u as unescapeHTML } from './astro_ACwXZyGQ.mjs';
import 'kleur/colors';
import 'clsx';

const html = "<p>The NextJS boilerplate with all you need to build your SaaS, AI tool, blog, or any other web app. From idea to production in 5 minutes.</p>";

				const frontmatter = {"title":"ShipFast","description":"Ship your startup in days, not weeks","pubDate":"Jul 08 2022","heroImage":"shipfast.png"};
				const file = "/Users/needim/projects/smashing-team/smashing.tools/src/content/code/shipfast.md";
				const url = undefined;
				function rawContent() {
					return "\nThe NextJS boilerplate with all you need to build your SaaS, AI tool, blog, or any other web app. From idea to production in 5 minutes.\n";
				}
				function compiledContent() {
					return html;
				}
				function getHeadings() {
					return [];
				}

				const Content = createComponent((result, _props, slots) => {
					const { layout, ...content } = frontmatter;
					content.file = file;
					content.url = url;

					return renderTemplate`${maybeRenderHead()}${unescapeHTML(html)}`;
				});

export { Content, compiledContent, Content as default, file, frontmatter, getHeadings, rawContent, url };
