/**
 * The pieces every page is built from.
 *
 * HTML as strings, escaped at the point of interpolation — the same convention Nova.Help uses,
 * for the same reason: it is obvious where untrusted text enters, and there is no template
 * language between the author and the output.
 *
 * Two components here carry meaning rather than decoration, and are worth reading before
 * changing: `pendingPanel`, which is the visual difference between a placeholder and a policy;
 * and `documentMeta`, which must never invent a date.
 */

import { icon } from './icons.mjs';

/** Escape for HTML text and attribute values. Applied at every interpolation, always. */
export function esc(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export const escUrl = (value) => encodeURIComponent(String(value ?? ''));

export const classes = (...values) => values.filter(Boolean).join(' ');

/** A date, in the one format this site uses. `null` in, empty string out — never a guess. */
const dateFormat = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'UTC', // a date-only value must not slide to the previous day in a western time zone
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});

export function formatDate(iso) {
  if (!iso) return '';
  const date = new Date(`${iso}T00:00:00Z`);
  return Number.isNaN(date.valueOf()) ? '' : dateFormat.format(date);
}

/**
 * A status pill.
 *
 * `pending` and `published` are visually distinct — different colour, different weight, and
 * different WORDS — because a reader glancing at a legal page has to be able to tell whether
 * what they are looking at is in force. Colour alone would not be enough; the label carries it.
 */
export const statusBadge = (pending) =>
  pending
    ? `<span class="badge badge--pending">${icon('draft', { size: 14 })}Content pending</span>`
    : `<span class="badge badge--published">${icon('document', { size: 14 })}In force</span>`;

/**
 * ⚠ THE MOST IMPORTANT COMPONENT ON THE SITE.
 *
 * This is what a document body is replaced with while its legal content has not been written.
 * Three things about it are deliberate and should not be softened:
 *
 *   1. IT DOES NOT LOOK LIKE A DOCUMENT. Dashed border, tinted panel, its own icon. Nothing
 *      about it reads as a paragraph of policy that happens to be short.
 *   2. IT MAKES NO LEGAL STATEMENT, not even a harmless-sounding one. "Nova respects your
 *      privacy" in a placeholder is an invented policy; a reader cannot tell it was filler.
 *   3. IT SAYS WHAT IS TRUE INSTEAD: this document is being prepared, and nothing here is in
 *      force. That is honest, and it is the only claim this component is allowed to make.
 */
export const pendingPanel = ({ title = 'Content pending', note = null } = {}) => `
  <div class="pending" role="note" aria-label="This document is being prepared">
    <div class="pending__mark" aria-hidden="true">${icon('draft', { size: 22 })}</div>
    <div class="pending__body">
      <p class="pending__title">${esc(title)}</p>
      <p>
        This document is being prepared. There is no text here yet, and nothing on this page is
        in force or should be relied on.
      </p>
      ${note ? `<p class="pending__status"><strong>Current status:</strong> ${esc(note)}</p>` : ''}
      <p class="pending__fine">
        When it has been written it will be published here with an effective date and a version
        number.
      </p>
    </div>
  </div>`;

/** A message panel: `info`, `note`, `warn`. */
export function notice(kind, title, bodyHtml = '') {
  const glyph = kind === 'warn' ? 'draft' : 'info';
  return `<div class="notice notice--${esc(kind)}">
    <span class="notice__icon">${icon(glyph, { size: 19 })}</span>
    <div class="notice__body">
      ${title ? `<p class="notice__title">${esc(title)}</p>` : ''}
      ${bodyHtml}
    </div>
  </div>`;
}

/** A link, or plain text when there is nowhere to point. Never a dead link. */
export function maybeLink(href, label, { external = false, note = null } = {}) {
  if (!href) {
    return `<span class="link-pending">${esc(label)}${note ? ` <span class="link-pending__note">${esc(note)}</span>` : ''}</span>`;
  }
  const rel = external ? ' rel="noopener"' : '';
  return `<a href="${esc(href)}"${rel}>${esc(label)}${external ? icon('external', { size: 14 }) : ''}</a>`;
}

export function button(label, { href, type = 'button', variant = 'primary', iconName, external = false } = {}) {
  const cls = classes('btn', `btn--${variant}`);
  const inner = `${iconName ? icon(iconName, { size: 17 }) : ''}<span>${esc(label)}</span>`;
  if (href) {
    return `<a class="${cls}" href="${esc(href)}"${external ? ' rel="noopener"' : ''}>${inner}</a>`;
  }
  return `<button class="${cls}" type="${esc(type)}">${inner}</button>`;
}

/**
 * Breadcrumbs.
 *
 * A real `<nav>` with an ordered list, because the order is the meaning. The last item is the
 * current page and is not a link — `aria-current="page"` says so to a screen reader, and the
 * absence of a link says it to everybody else.
 */
export function breadcrumbs(items = []) {
  if (items.length < 2) return '';
  const parts = items
    .map((item, index) => {
      const last = index === items.length - 1;
      const inner = last
        ? `<span aria-current="page">${esc(item.label)}</span>`
        : `<a href="${esc(item.href)}">${esc(item.label)}</a>`;
      return `<li class="crumbs__item">${inner}</li>`;
    })
    .join('');
  return `<nav class="crumbs" aria-label="Breadcrumb"><ol>${parts}</ol></nav>`;
}

/** A document card, for a category listing or a related-documents block. */
export function documentCard(doc, { compact = false } = {}) {
  return `<a class="${classes('doc-card', compact && 'doc-card--compact')}" href="${esc(doc.href)}">
    <span class="doc-card__head">
      <span class="doc-card__title">${esc(doc.title)}</span>
      ${statusBadge(doc.pending)}
    </span>
    <span class="doc-card__desc">${esc(doc.description)}</span>
    <span class="doc-card__go" aria-hidden="true">${icon('arrow', { size: 17 })}</span>
  </a>`;
}

/**
 * Related documents.
 *
 * Relations are made symmetric by the catalog, so this block is never one-sided: a reader who
 * arrives at the Cookie Policy from the Privacy Policy can always get back.
 */
export function relatedDocuments(docs) {
  if (!docs.length) return '';
  return `<section class="related" aria-labelledby="related-heading">
    <h2 class="section-title" id="related-heading">Related documents</h2>
    <div class="doc-grid">${docs.map((doc) => documentCard(doc, { compact: true })).join('')}</div>
  </section>`;
}

/**
 * Document metadata — effective date, last updated, version.
 *
 * ⚠ EVERY FIELD IS OMITTED WHEN IT IS NOT KNOWN. There is no "—", no "TBD" and no "1.0" by
 * default: a legal document showing an invented version number is worse than one showing none,
 * because the invented one looks authoritative. A pending document therefore renders no
 * metadata at all, and says why instead.
 */
export function documentMeta(doc) {
  if (doc.pending) {
    return `<dl class="meta meta--pending">
      <div class="meta__row">
        <dt>Status</dt>
        <dd>Being prepared — not in force</dd>
      </div>
      <div class="meta__row">
        <dt>Version</dt>
        <dd>None published yet</dd>
      </div>
    </dl>`;
  }

  const rows = [
    doc.version && ['Version', doc.version],
    doc.effectiveDate && ['Effective', formatDate(doc.effectiveDate)],
    doc.updatedDate && ['Last updated', formatDate(doc.updatedDate)],
  ].filter(Boolean);

  return `<dl class="meta">${rows
    .map(([term, value]) => `<div class="meta__row"><dt>${esc(term)}</dt><dd>${esc(value)}</dd></div>`)
    .join('')}</dl>`;
}

/**
 * A table of contents, built from the document's own sections.
 *
 * Rendered only when there is something to point at. A pending document has no sections, so it
 * gets no empty rail — an outline of headings that do not exist is its own small lie.
 */
export function tableOfContents(doc) {
  if (!doc.sections?.length) return '';
  const items = doc.sections
    .map(
      (section) =>
        `<li><a href="#${esc(section.id)}" data-toc-link>${esc(section.heading)}</a></li>`,
    )
    .join('');
  return `<nav class="toc" aria-labelledby="toc-heading">
    <p class="toc__heading" id="toc-heading">On this page</p>
    <ol class="toc__list">${items}</ol>
  </nav>`;
}
