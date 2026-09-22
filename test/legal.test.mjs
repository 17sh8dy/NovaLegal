/**
 * The guarantees NovaLegal's owner asked for, as tests — so they fail in a terminal rather than
 * being noticed by a reader.
 *
 *   node --test test/*.test.mjs
 */
import test from 'node:test';
import assert from 'node:assert/strict';

import { documents, products, validate } from '../src/core/catalog.mjs';
import { routes } from '../src/core/routes.mjs';
import { inline, resolveHref } from '../src/core/markup.mjs';
import { formatDate } from '../src/views/components.mjs';
import { site } from '../data/site.js';

const DISCLAIMER =
  'Nothing in NovaLegal has been approved or reviewed by an attorney. That does not mean you do not have to follow, agree to, and accept the terms, rules, or notices presented to you when using a Nova product.';

const rendered = () => routes().map((route) => ({ path: route.path, html: route.render() }));
const textOf = (html) => html.replace(/<[^>]+>/g, ' ').replace(/&amp;/g, '&').replace(/\s+/g, ' ');

test('the document set validates', () => {
  assert.deepEqual(validate(), []);
});

test('the attorney-review disclaimer appears verbatim on every page', () => {
  for (const { path, html } of rendered()) {
    assert.ok(textOf(html).includes(DISCLAIMER), `${path} is missing the exact disclaimer`);
  }
});

test('the English original of the disclaimer is protected from translation on /contact', () => {
  const page = rendered().find((r) => r.path === '/contact').html;
  assert.match(page, /<p class="verbatim" lang="en" translate="no">Nothing in NovaLegal has been approved/);
});

test('no invented entity, address, phone number, governing law or compliance claim', () => {
  const body = documents
    .flatMap((doc) => [doc.title, doc.description, doc.note ?? '', ...(doc.sections ?? []).flatMap((s) => [s.heading, ...s.body.flatMap((b) => (typeof b === 'string' ? [b] : (b.list ?? b.ordered ?? [b.verbatim])))])])
    .join('\n');
  for (const banned of [/\bLLC\b/, /\bInc\.?\b/, /\bCorp(?:oration)?\b/, /governing law/i, /jurisdiction/i, /\bvenue\b/i, /registered agent/i, /\+?\d{3}[-. )]\d{3}[-. ]\d{4}/, /attorney[- ]approved/i]) {
    assert.doesNotMatch(body, banned);
  }
});

test('the operator and the contact are exactly what the owner stated', () => {
  assert.equal(site.operator, '17 Shady');
  assert.equal(site.contactEmail, 'getnovasupport@gmail.com');
});

test('Online Earth and Nova Forge are out of scope: no page, no card, no document', () => {
  assert.deepEqual(products.map((p) => p.id).sort(), ['atlas', 'nova', 'nova-cut', 'nova-help', 'nova-legal', 'replay-gg']);
  for (const doc of documents) for (const id of doc.appliesTo) assert.ok(products.some((p) => p.id === id));
  assert.equal(routes().some((r) => r.path.includes('online-earth') || r.path.includes('nova-forge')), false);
});

test('every in-scope product has a 13+ recommended age (not an enforced one) and stored facts', () => {
  for (const product of products) {
    assert.equal(product.minimumAge, 13);
    assert.ok(product.data?.length, `${product.id} has no data facts`);
    const page = textOf(rendered().find((r) => r.path === `/products/${product.id}`).html);
    assert.match(page, /13\+ recommended/i);
    assert.doesNotMatch(page, /must be at least|is required to use|minimum age to use/i);
  }
});

test('subscriptions and copyright material are placeholders, with a plain status note', () => {
  for (const id of ['subscriptions', 'copyright', 'dmca', 'community-guidelines']) {
    const doc = documents.find((d) => d.id === id);
    assert.equal(doc.status, 'pending');
    assert.ok(doc.note);
    assert.equal(doc.sections.length, 0);
    assert.equal(doc.version, null);
  }
  const text = textOf(rendered().find((r) => r.path === '/subscriptions').html);
  assert.match(text, /planned and are not currently offered/);
  assert.doesNotMatch(text, /\$\s?\d|per month|per year|refund within/i);
});

test('terms-of-usage is a pointer to the canonical Terms, not a second set of terms', () => {
  const doc = documents.find((d) => d.id === 'terms-of-usage');
  assert.equal(doc.sections.length, 1);
  assert.ok(doc.sections[0].body.join(' ').includes('(/terms)'));
});

test('documents say what is not live: Google sign-in, password reset, payments', () => {
  const account = textOf(rendered().find((r) => r.path === '/account').html);
  assert.match(account, /Google sign-in is coming soon/);
  assert.match(account, /Password reset is not currently available/);
  assert.match(account, /A Nova Account is optional/);
  assert.doesNotMatch(account, /Nova Accounts? (?:is|are) (?:not available|unavailable)/i);
});

test('Atlas terms keep API keys off Nova servers and disclose what a request contains', () => {
  const atlas = textOf(rendered().find((r) => r.path === '/atlas-terms').html);
  assert.match(atlas, /Windows Credential Manager/);
  assert.match(atlas, /Nova does not store it on a Nova server/);
  assert.match(atlas, /do not pass through a Nova server/);
  for (const name of ['OpenAI', 'Anthropic', 'Google Gemini', 'Kimi', 'DuckDuckGo', 'Tavily']) assert.ok(atlas.includes(name), name);
  assert.match(atlas, /does not send earlier messages/);
});

test('account deletion states no retention period and no promised timing', () => {
  const text = textOf(rendered().filter((r) => ['/account-deletion', '/data'].includes(r.path)).map((r) => r.html).join(' '));
  assert.match(text, /has not (?:set|committed to) a fixed period/);
  assert.doesNotMatch(text, /\b\d+\s*(?:days?|weeks?|months?|years?)\b/i);
});

test('link markup: escapes HTML, allows only vetted targets', () => {
  assert.equal(inline('<b>x</b>'), '&lt;b&gt;x&lt;/b&gt;');
  assert.doesNotMatch(inline('[a](javascript:alert(1))'), /<a /);
  assert.doesNotMatch(inline('[a](https://evil.example/)'), /<a /);
  assert.match(inline('[Terms](/terms#age)'), /<a href="\/terms#age">Terms<\/a>/);
  assert.equal(resolveHref('/nope/too/deep'), null);
  assert.match(inline('{{contact}}'), /mailto:getnovasupport@gmail\.com/);
});

test('a date-only value is not shifted by the time zone', () => {
  assert.equal(formatDate('2026-09-21'), '21 September 2026');
});
