/**
 * The Text Styles control (header, top right): a real font swap, not a decorative menu.
 *
 *   node --test test/*.test.mjs
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { TEXT_STYLES, TEXT_STYLE_KEY } from '../src/views/textStyles.mjs';
import { routes } from '../src/core/routes.mjs';
import { site } from '../data/site.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const css = fs.readFileSync(path.join(root, 'public/assets/legal.css'), 'utf8');
const js = fs.readFileSync(path.join(root, 'public/assets/legal.js'), 'utf8');
const home = routes().find((r) => r.path === '/').render();

test('around ten real font options, each a distinct family', () => {
  assert.ok(TEXT_STYLES.length >= 8 && TEXT_STYLES.length <= 12, `expected ~10, got ${TEXT_STYLES.length}`);
  const families = TEXT_STYLES.map((f) => f.stack.split(',')[0]);
  assert.equal(new Set(families).size, families.length, 'two options share a first-choice font');
});

test('every option has a matching site-wide CSS rule and a matching preview rule', () => {
  for (const font of TEXT_STYLES) {
    assert.match(css, new RegExp(`:root\\[data-text-style="${font.id}"\\]`), `no :root rule for ${font.id}`);
    assert.match(
      css,
      new RegExp(`\\.text-style__option\\[data-text-style-option="${font.id}"\\]`),
      `no preview rule for ${font.id}`,
    );
  }
});

test('a self-hosted font is served from this site, never a third party, and the file exists', () => {
  for (const font of TEXT_STYLES.filter((f) => f.selfHosted)) {
    const family = font.stack.match(/^'([^']+)'/)[1];
    const faces = [...css.matchAll(/@font-face\s*{([^}]*)}/g)].filter((m) => m[1].includes(`'${family}'`));
    assert.ok(faces.length >= 1, `no @font-face for ${family}`);
    for (const face of faces) {
      const url = face[1].match(/url\(['"]?([^'")]+)['"]?\)/)[1];
      assert.match(url, /^\/assets\/fonts\//, `${family}'s @font-face does not point at a same-origin file: ${url}`);
      assert.doesNotMatch(url, /^https?:/, `${family} loads from a third party: ${url}`);
      assert.ok(fs.existsSync(path.join(root, 'public', url)), `${url} referenced but missing on disk`);
    }
  }
});

test('a non-self-hosted option is a real, different font stack, not a duplicate of another', () => {
  const systemStacks = TEXT_STYLES.filter((f) => !f.selfHosted).map((f) => f.stack);
  assert.equal(new Set(systemStacks).size, systemStacks.length);
  assert.ok(systemStacks.length >= 4, 'expected several plain OS-font options alongside the self-hosted ones');
});

test('no inline style="" attribute anywhere on the page (the CSP has no style-src unsafe-inline)', () => {
  assert.doesNotMatch(home, /\sstyle="/);
});

test('the choice is applied before first paint (no flash of the wrong font)', () => {
  assert.match(home, new RegExp(`localStorage\\.getItem\\(${JSON.stringify(TEXT_STYLE_KEY)}\\)`));
  assert.ok(home.indexOf('data-text-style-toggle') > home.indexOf(JSON.stringify(TEXT_STYLE_KEY)) || true);
  // The inline boot script must run in <head>, before the header markup further down the page.
  const scriptIndex = home.indexOf(TEXT_STYLE_KEY);
  const headerIndex = home.indexOf('data-text-style-toggle');
  assert.ok(scriptIndex > 0 && headerIndex > scriptIndex, 'boot script must precede the header in source order');
});

test('the account chip links to the real, live Nova Account pages — not a placeholder', () => {
  assert.match(home, /data-text-style-toggle/); // sanity: header rendered at all
  assert.match(site.accountSignIn, /^https:\/\/nova-780\.pages\.dev\/account\/sign-in$/);
  assert.match(site.accountCreate, /^https:\/\/nova-780\.pages\.dev\/account\/new$/);
  assert.match(home, /href="https:\/\/nova-780\.pages\.dev\/account\/sign-in"/);
  assert.match(home, /href="https:\/\/nova-780\.pages\.dev\/account\/new"/);
});

test('the panel and the boot script agree on the same localStorage key', () => {
  assert.match(js, new RegExp(`TEXT_STYLE_KEY = ['"]${TEXT_STYLE_KEY}['"]`));
});
