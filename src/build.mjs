/**
 * `npm run build` — render the whole site to `dist/`.
 *
 * Nova Legal is a legal-document site: the content changes rarely, has to be fast, and has to
 * be readable if every service behind it is down. So it is STATIC. There is no server in
 * production, no database, and no runtime to keep patched — `dist/` is plain HTML that any
 * host will serve, which is the same shape the Nova site already deploys.
 *
 * `assertValid()` runs FIRST. A build that would produce an incoherent legal site — a related
 * link pointing nowhere, a published document with no effective date, a pending document
 * carrying text that reads like policy — fails here, in a terminal, rather than shipping.
 *
 * Every route becomes `<path>/index.html`, so the site needs no rewrite rules and every URL
 * works with or without a trailing slash.
 */
import { cp, mkdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { assertValid, stats } from './core/catalog.mjs';
import { notFound, routes } from './core/routes.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outDir = path.join(root, 'dist');

/** `/` → `dist/index.html`; `/terms` → `dist/terms/index.html`. */
const fileFor = (routePath) =>
  routePath === '/'
    ? path.join(outDir, 'index.html')
    : path.join(outDir, ...routePath.split('/').filter(Boolean), 'index.html');

async function build() {
  assertValid();

  /* A clean directory every time. An incremental build would leave the page for a document
     that was renamed sitting in `dist/` — still reachable, still saying it is a legal
     document, and no longer in the source. */
  await rm(outDir, { recursive: true, force: true });
  await mkdir(outDir, { recursive: true });

  const all = routes();
  for (const route of all) {
    const file = fileFor(route.path);
    await mkdir(path.dirname(file), { recursive: true });
    await writeFile(file, route.render(), 'utf8');
  }

  // Static hosts look for this by name; it is not a route anyone navigates to.
  await writeFile(path.join(outDir, '404.html'), notFound(), 'utf8');

  await cp(path.join(root, 'public'), outDir, { recursive: true });

  console.log(`Built ${all.length + 1} pages into dist/`);
  console.log(
    `  ${stats.documents} documents (${stats.published} published, ${stats.pending} pending) · ` +
      `${stats.categories} categories · ${stats.products} products`,
  );
  if (stats.published === 0) {
    console.log(
      '\n  Note: no document has been published yet. Every page renders the "content pending"\n' +
        '  panel, which is correct — see data/documents/index.js.',
    );
  }
}

build().catch((error) => {
  console.error(`\n${error.message}\n`);
  process.exit(1);
});
