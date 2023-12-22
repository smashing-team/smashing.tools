// This code was taken from https://github.com/shishkin/astro-pagefind/blob/main/packages/astro-pagefind/src/pagefind.ts because the astro version of the module is not compatible.

import { fileURLToPath } from 'node:url';

import type { AstroIntegration } from 'astro';
import { execSync } from 'child_process';
import fs from 'fs';
import sirv from 'sirv';

export default function pagefind(): AstroIntegration {
  let outDir: string;
  return {
    name: 'pagefind',
    hooks: {
      'astro:config:setup': ({ config }) => {
        // hybrid mode change url path
        outDir = fileURLToPath(config.outDir);
      },
      'astro:server:setup': ({ server }) => {
        const serve = sirv(outDir, {
          dev: true,
          etag: true,
        });
        server.middlewares.use((req, res, next) => {
          if (req.url?.startsWith('/pagefind/')) {
            serve(req, res, next);
          } else {
            next();
          }
        });
      },
      'astro:build:start': async () => {
        const paths = ['starter-kit', 'ui-kit'];
        paths.forEach((path) => {
          const kits = fs.readdirSync(`src/content/${path}`);

          kits.forEach((kit) => {
            const kitPath = `src/content/${path}/${kit}`;
            const kitContent = fs.readFileSync(kitPath, 'utf8');
            const createdAt = fs.statSync(kitPath).birthtime;
            const splitted = kitContent.split('---');
            if (!splitted[1]?.includes('createdAt')) {
              splitted[1] += `createdAt: ${createdAt.toISOString()}\n`;
              const modified = splitted.join('---');
              fs.writeFileSync(kitPath, modified);
            }
          });
        });
      },
      'astro:build:done': () => {
        const cmd = `npx pagefind --site "dist"`;
        execSync(cmd, {
          stdio: [process.stdin, process.stdout, process.stderr],
        });
      },
    },
  };
}
