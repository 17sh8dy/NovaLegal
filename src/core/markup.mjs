/**
 * The tiny inline markup a document body may use, and the block shapes around it.
 *
 * A document is DATA, so its text has to be able to carry a cross-reference without carrying
 * HTML. Three things are allowed, and nothing else:
 *
 *     [label](target)      a link
 *     **bold**             emphasis
 *     {{contact}}          the contact e-mail address, as a link (one source: data/site.js)
 *
 * `target` is one of:
 *
 *     /terms  /terms#age  /products/atlas  /search  /      a page on this site
 *     help:  help:/help/atlas                              Nova.Help (data/site.js `help`)
 *     discord:                                             the Nova Discord
 *     mailto:<the contact address>                         nothing else
 *
 * Anything else — an arbitrary https:// URL, a `javascript:` URI — is refused by `validate()`,
 * so a legal document cannot quietly send a reader somewhere nobody vetted, and a link cannot
 * outlive the page it points at.
 *
 * BLOCKS. A section's `body` is an array of:
 *
 *     'a paragraph'                       → <p>
 *     { list: ['…', '…'] }                → <ul>
 *     { ordered: ['…', '…'] }             → <ol>
 *     { verbatim: 'exact English text' }  → <p lang="en" translate="no">
 *
 * `verbatim` is text that must reach the reader in exactly these words in every language (the
 * attorney-review notice). It is never translated and is exempt from the overclaim check,
 * because that notice is the one place these words are supposed to appear.
 */

import { site } from '../../data/site.js';
import { esc } from '../views/components.mjs';

const LINK = /\[([^\]]+)\]\(([^)\s]+)\)/g;

/** A link target's real href, or null if it is not one this site allows. */
export function resolveHref(target) {
  if (target === '/' || /^\/[a-z0-9-]+(?:\/[a-z0-9-]+)?(?:#[a-z0-9-]+)?$/.test(target)) return target;
  if (target === 'help:') return site.help;
  if (target.startsWith('help:/')) return new URL(target.slice(6), site.help).href;
  if (target === 'discord:') return site.discord;
  if (site.contactEmail && target === `mailto:${site.contactEmail}`) return target;
  return null;
}

const expandContact = (text) =>
  site.contactEmail ? text.replaceAll('{{contact}}', `[${site.contactEmail}](mailto:${site.contactEmail})`) : text;

/** Every link target in a string, for validation. */
export function linkTargets(text) {
  return [...expandContact(String(text)).matchAll(LINK)].map((match) => match[2]);
}

/** The text of a block, as an array of strings (for validation and search). */
export function blockText(block) {
  if (typeof block === 'string') return [block];
  if (Array.isArray(block?.list)) return block.list;
  if (Array.isArray(block?.ordered)) return block.ordered;
  if (typeof block?.verbatim === 'string') return [block.verbatim];
  return [];
}

/** Escaped HTML for one string of body text. Escapes first, then adds only the allowed markup. */
export function inline(text) {
  const safe = esc(expandContact(String(text)));
  return safe
    .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (whole, label, target) => {
      const href = resolveHref(target.replaceAll('&amp;', '&'));
      if (!href) return label; // never a dead or unvetted link
      const external = /^https?:/.test(href) ? ' rel="noopener"' : '';
      return `<a href="${esc(href)}"${external}>${label}</a>`;
    })
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
}

/** One body block as HTML. */
export function blockHtml(block) {
  if (typeof block === 'string') return `<p>${inline(block)}</p>`;
  if (Array.isArray(block.list)) return `<ul>${block.list.map((item) => `<li>${inline(item)}</li>`).join('')}</ul>`;
  if (Array.isArray(block.ordered)) return `<ol>${block.ordered.map((item) => `<li>${inline(item)}</li>`).join('')}</ol>`;
  if (typeof block.verbatim === 'string') {
    return `<p class="verbatim" lang="en" translate="no">${esc(block.verbatim)}</p>`;
  }
  return '';
}
