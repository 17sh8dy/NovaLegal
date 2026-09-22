/**
 * `npm start` — the development server.
 *
 * It renders from the SAME route table the build walks, so a page cannot exist here and be
 * missing from `dist/`. Nothing is cached, so editing a document in `data/` and refreshing
 * shows it — which is the whole point of having a dev server for a static site.
 *
 * There is no server in production. This exists to write the site, not to run it.
 */
import http from 'node:http';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { assertValid } from './core/catalog.mjs';
import { match, notFound } from './core/routes.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const publicDir = path.join(root, 'public');

const TYPES = {
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.woff2': 'font/woff2',
  '.json': 'application/json; charset=utf-8',
};

/**
 * The same security headers the built site should be served with.
 *
 * Set here too so a header that breaks a page — a CSP that blocks the one inline theme script,
 * say — is found while developing rather than after deploying. The CSP is tight because this
 * site loads nothing from anywhere: no fonts, no analytics, no third-party anything.
 */
const SECURITY = {
  'content-security-policy':
    "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self'; img-src 'self' data:; " +
    "base-uri 'none'; form-action 'self'; frame-ancestors 'none'",
  'referrer-policy': 'strict-origin-when-cross-origin',
  'x-content-type-options': 'nosniff',
  'x-frame-options': 'DENY',
};

/**
 * Serve a file out of `public/`, or answer false.
 *
 * ⚠ Mirrors `build.mjs` exactly: that copies the WHOLE of `public/` into `dist/`, so this must
 * be willing to serve anything under `public/`, not one hardcoded subdirectory. A previous
 * version only served `/assets/…`, which quietly 404'd every request for `/i18n/<lang>.json`
 * here in dev — the runtime never throws on that, it just stays in English, so the language
 * selector looked broken with no error anywhere. `dist/` was never affected; only this server
 * was. `npm test` now has a regression test for this (`test/serve.test.mjs`).
 *
 * The resolved path is checked to be INSIDE `public/` before anything is read — `..` in a URL
 * is the oldest way to walk a static server out of its own directory. A route always wins over
 * a static file (checked first, in `createServer`), so this can stay this permissive.
 */
async function serveStatic(res, pathname) {
  if (pathname === '/' || pathname.endsWith('/')) return false;

  const target = path.resolve(publicDir, `.${pathname}`);
  if (!target.startsWith(publicDir + path.sep)) return false;

  try {
    const body = await readFile(target);
    res.writeHead(200, {
      ...SECURITY,
      'content-type': TYPES[path.extname(target)] ?? 'application/octet-stream',
      'content-length': body.length,
      'cache-control': 'no-cache',
    });
    res.end(body);
    return true;
  } catch {
    return false;
  }
}

function send(res, html, status = 200) {
  const body = Buffer.from(html, 'utf8');
  res.writeHead(status, {
    ...SECURITY,
    'content-type': 'text/html; charset=utf-8',
    'content-length': body.length,
    'cache-control': 'no-store',
  });
  res.end(body);
}

export function createServer() {
  assertValid();

  return http.createServer(async (req, res) => {
    try {
      const url = new URL(req.url, 'http://localhost');
      if (await serveStatic(res, url.pathname)) return;

      const route = match(url.pathname);
      if (!route) return send(res, notFound(), 404);
      return send(res, route.render());
    } catch (error) {
      console.error(`[nova.legal] ${req.method} ${req.url}`, error);
      if (!res.headersSent) send(res, notFound(), 500);
    }
  });
}

/* Started only when run directly, so the test suite can import `createServer` without one
   listening on a port it did not ask for. */
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const port = Number(process.env.PORT ?? 4500);
  createServer().listen(port, () => {
    console.log(`Nova Legal — http://localhost:${port}`);
    console.log('Static build: npm run build');
  });
}
