/**
 * A regression test for the dev-server bug found 2026-09-24: `serveStatic` only answered
 * `/assets/…`, so every request for `/i18n/<lang>.json` 404'd here even though `dist/` (from
 * `build.mjs`, which copies the whole of `public/`) was fine. The runtime doesn't throw on a
 * missing catalog — it just silently stays in English — so this looked like a language-switcher
 * bug from the browser, with nothing in the console to point at the real cause.
 *
 *   node --test test/*.test.mjs
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from '../src/serve.mjs';

async function withServer(run) {
  const server = createServer();
  await new Promise((resolve) => server.listen(0, resolve));
  const { port } = server.address();
  try {
    await run(`http://127.0.0.1:${port}`);
  } finally {
    await new Promise((resolve) => server.close(resolve));
  }
}

test('every file under public/ is served, not only public/assets/', () =>
  withServer(async (base) => {
    for (const [path, type] of [
      ['/assets/nova-i18n.js', 'text/javascript'],
      ['/assets/legal.css', 'text/css'],
      ['/i18n/es.json', 'application/json'],
      ['/i18n/fr.json', 'application/json'],
      ['/i18n/de.json', 'application/json'],
      ['/i18n/pt.json', 'application/json'],
    ]) {
      const res = await fetch(base + path);
      assert.equal(res.status, 200, `${path} should be 200`);
      assert.match(res.headers.get('content-type') ?? '', new RegExp(type));
    }
  }),
);

test('a served language catalog actually has translated strings', () =>
  withServer(async (base) => {
    const es = await (await fetch(base + '/i18n/es.json')).json();
    assert.ok(Object.keys(es.strings ?? {}).length > 100, 'es.json should hold real translations');
  }),
);

test('a page still renders, and a route wins over any same-named static path', () =>
  withServer(async (base) => {
    const res = await fetch(base + '/terms');
    assert.equal(res.status, 200);
    assert.match(await res.text(), /Terms of Service/);
  }),
);

test('path traversal out of public/ is refused', () =>
  withServer(async (base) => {
    const res = await fetch(base + '/i18n/../../package.json');
    assert.notEqual(res.status, 200);
  }),
);

test('a genuinely missing path is a 404, not a crash', () =>
  withServer(async (base) => {
    const res = await fetch(base + '/i18n/xx.json');
    assert.equal(res.status, 404);
  }),
);
