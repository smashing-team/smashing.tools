// This code was taken from https://github.com/shishkin/astro-pagefind/blob/main/packages/astro-pagefind/src/pagefind.ts because the astro version of the module is not compatible.

import { fileURLToPath } from 'node:url';

import type { AstroIntegration } from 'astro';
import { execSync } from 'child_process';
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
      'astro:build:done': () => {
        const cmd = `npx pagefind --site "dist"`;
        execSync(cmd, {
          stdio: [process.stdin, process.stdout, process.stderr],
        });
      },
    },
  };
}
