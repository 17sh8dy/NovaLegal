/**
 * The header account chip only shows "Sign in" / "Create account" when NovaLegal has reason to
 * think you aren't already signed in. NovaLegal is static — it cannot know a Nova Account
 * session, which lives on a different origin — so the real check happens client-side against
 * Nova's `GET /account/status` (see that repo's functions/account/[[path]].mjs, `legalOrigins`
 * and `statusCookie`). This file pins the parts NovaLegal is responsible for: the honest no-JS
 * default, that the fetch actually sends credentials cross-site, and that nothing here can
 * hide the guest links except a genuine `signedIn: true` answer.
 *
 *   node --test test/*.test.mjs
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { routes } from '../src/core/routes.mjs';
import { site } from '../data/site.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const js = fs.readFileSync(path.join(root, 'public/assets/legal.js'), 'utf8');
const home = routes().find((r) => r.path === '/').render();

test('the no-JS / not-yet-resolved default is "guest": Sign in and Create account visible, Account hidden', () => {
  const guestTags = [...home.matchAll(/<a[^>]*\bdata-account-guest\b[^>]*>/g)].map((m) => m[0]);
  assert.equal(guestTags.length, 2, 'expected the Sign in and Create account links');
  for (const tag of guestTags) assert.doesNotMatch(tag, /\bhidden\b/);

  const [signedInTag] = [...home.matchAll(/<a[^>]*\bdata-account-signed-in\b[^>]*>/g)].map((m) => m[0]);
  assert.match(signedInTag, /\bhidden\b/, 'the Account link must start hidden');
});

test('the status URL rendered on the page is Nova\'s real, live endpoint', () => {
  assert.match(site.accountStatus, /^https:\/\/nova-780\.pages\.dev\/account\/status$/);
  assert.match(home, /data-account-status-url="https:\/\/nova-780\.pages\.dev\/account\/status"/);
});

test('the fetch actually sends credentials and honours CORS, or this whole feature is a no-op', () => {
  const section = js.slice(js.indexOf('data-account-chip'), js.indexOf('Print', js.indexOf('data-account-chip')));
  assert.match(section, /fetch\(/);
  assert.match(section, /credentials:\s*['"]include['"]/);
  assert.match(section, /mode:\s*['"]cors['"]/);
});

test('a failed or false status check leaves the guest links alone — never a dead end', () => {
  const section = js.slice(js.indexOf('data-account-chip'), js.indexOf('Print', js.indexOf('data-account-chip')));
  // The only code path that flips `hidden` is gated behind `data.signedIn` being truthy.
  const guardedFlip = /if\s*\(!data \|\| !data\.signedIn\) return;[\s\S]*?guestLinks\[i\]\.hidden = true;/;
  assert.match(section, guardedFlip);
  assert.match(section, /\.catch\(/); // a network/CORS failure is caught, not left to throw
});
