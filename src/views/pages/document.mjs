/**
 * A legal document.
 *
 * The most important page on the site, and the one whose failure mode is worst: a placeholder
 * that a reader mistakes for policy. Four things keep that from happening, and none of them
 * should be softened.
 *
 *   1. THE BODY IS `pendingPanel()` WHEN THE DOCUMENT IS PENDING. Not a short paragraph of
 *      plausible text — a marked panel that says the document is being prepared and that
 *      nothing on the page is in force.
 *   2. NO METADATA IS INVENTED. A pending document shows "not in force" and "no version
 *      published yet" rather than a date or a "1.0". See `documentMeta`.
 *   3. THE STATUS IS IN THE HERO, not buried at the bottom. It is the first thing under the
 *      title, in words as well as colour.
 *   4. THE PENDING BANNER IS ALSO IN THE FOOTER OF EVERY PAGE, so somebody who arrives from a
 *      search engine, scrolls, and never looks up still sees it.
 *
 * ── Layout ────────────────────────────────────────────────────────────────────────────────
 * A two-column reading layout: the document body in a measure-limited column, and a sticky
 * rail holding the table of contents, the metadata and the version link. Below ~900px the rail
 * moves above the body rather than shrinking, because a table of contents squeezed into a
 * phone's margin is worse than one you scroll past.
 */

import { site } from '../../../data/site.js';
import { categoryOf, getDocument, products } from '../../core/catalog.mjs';
import {
  breadcrumbs,
  documentMeta,
  esc,
  formatDate,
  pendingPanel,
  relatedDocuments,
  statusBadge,
  tableOfContents,
} from '../components.mjs';
import { icon } from '../icons.mjs';
import { hero, page } from '../layout.mjs';

/** A published section. Paragraph strings in, escaped paragraphs out — never raw HTML. */
const section = (entry) => `<section class="doc-section" id="${esc(entry.id)}">
  <h2 class="doc-section__heading">
    ${esc(entry.heading)}
    <a class="doc-section__anchor" href="#${esc(entry.id)}" aria-label="Link to this section">#</a>
  </h2>
  ${entry.body.map((paragraph) => `<p>${esc(paragraph)}</p>`).join('')}
</section>`;

/**
 * Which products this document governs.
 *
 * `[]` is the honest current state of every document and is rendered as a sentence, not as an
 * empty list — an empty list reads as a rendering bug, and "this applies to nothing" would be
 * a legal claim nobody has made.
 */
function appliesTo(doc) {
  if (!doc.appliesTo?.length) {
    return `<p class="rail__note">
      Which Nova products this document applies to has not been determined yet.
    </p>`;
  }
  const items = doc.appliesTo
    .map((id) => products.find((product) => product.id === id))
    .filter(Boolean)
    .map((product) => `<li><a href="/products/${esc(product.id)}">${esc(product.name)}</a></li>`)
    .join('');
  return `<ul class="rail__list">${items}</ul>`;
}

export function documentPage(doc, { related }) {
  const category = categoryOf(doc);

  const body = doc.pending
    ? pendingPanel()
    : doc.sections.map(section).join('');

  const rail = `<aside class="rail" aria-label="Document details">
    ${tableOfContents(doc)}

    <div class="rail__block">
      <h2 class="rail__heading">Details</h2>
      ${documentMeta(doc)}
    </div>

    <div class="rail__block">
      <h2 class="rail__heading">Applies to</h2>
      ${appliesTo(doc)}
    </div>

    <div class="rail__block">
      <h2 class="rail__heading">Versions</h2>
      ${
        doc.versions?.length
          ? `<p class="rail__note">${esc(doc.versions.length)} earlier version${doc.versions.length === 1 ? '' : 's'}.</p>`
          : '<p class="rail__note">No versions published yet.</p>'
      }
      <a class="rail__link" href="${esc(doc.href)}/versions">
        Version history ${icon('chevron', { size: 14 })}
      </a>
    </div>

    <div class="rail__block rail__block--actions">
      <button class="btn btn--quiet" type="button" data-print>
        ${icon('print', { size: 17 })}<span>Print</span>
      </button>
    </div>
  </aside>`;

  const main = `<div class="wrap doc-layout">
    <article class="doc" aria-labelledby="doc-title">
      <!-- The title is repeated here, visually hidden, so the printed page and the
           screen-reader outline both begin with the document rather than with the site. -->
      <h1 class="sr-only" id="doc-title">${esc(doc.title)}</h1>
      <header class="doc__print-head" aria-hidden="true">
        <p class="doc__print-site">${esc(site.name)}</p>
        <p class="doc__print-title">${esc(doc.title)}</p>
        <p class="doc__print-meta">
          ${
            doc.pending
              ? 'Being prepared — not in force'
              : `Version ${esc(doc.version)} · Effective ${esc(formatDate(doc.effectiveDate))}`
          }
        </p>
      </header>
      ${body}
      ${relatedDocuments(related)}
    </article>
    ${rail}
  </div>`;

  return page({
    title: doc.title,
    description: doc.description,
    path: doc.href,
    bodyClass: 'is-doc',
    hero: hero({
      crumbs: breadcrumbs([
        { href: '/', label: 'Legal' },
        { href: `/#${category?.id ?? ''}`, label: category?.label ?? 'Documents' },
        { label: doc.title },
      ]),
      eyebrow: category?.label,
      title: doc.title,
      lede: doc.description,
      meta: `<div class="hero__status">${statusBadge(doc.pending)}</div>`,
    }),
    main,
  });
}

/**
 * Version history.
 *
 * ⚠ NO DEMO DATA. Every document currently has `versions: []`, and this page renders the empty
 * state — which is true. The populated layout is real code and is exercised by
 * `test/versions.test.mjs` against a fixture document, so it is built and proven without any
 * invented version appearing on the site. Inventing a "Version 0.9, archived March 2026" to
 * make the page look complete would put a false fact in front of a reader for the sake of a
 * screenshot.
 */
export function versionsPage(doc) {
  const category = categoryOf(doc);

  const current = doc.pending
    ? pendingPanel({ title: 'No version published yet' })
    : `<div class="version version--current">
        <div class="version__mark">${icon('document', { size: 18 })}</div>
        <div class="version__body">
          <p class="version__label">Current — version ${esc(doc.version)}</p>
          <dl class="version__meta">
            <div><dt>Effective</dt><dd>${esc(formatDate(doc.effectiveDate))}</dd></div>
            <div><dt>Last updated</dt><dd>${esc(formatDate(doc.updatedDate))}</dd></div>
          </dl>
          <a class="version__link" href="${esc(doc.href)}">Read this version ${icon('chevron', { size: 14 })}</a>
        </div>
      </div>`;

  const previous = doc.versions?.length
    ? `<ol class="versions">${doc.versions
        .map(
          (entry) => `<li class="version">
            <div class="version__mark">${icon('clock', { size: 18 })}</div>
            <div class="version__body">
              <p class="version__label">Version ${esc(entry.version)}</p>
              <dl class="version__meta">
                ${entry.effectiveDate ? `<div><dt>Effective</dt><dd>${esc(formatDate(entry.effectiveDate))}</dd></div>` : ''}
                ${entry.archivedDate ? `<div><dt>Archived</dt><dd>${esc(formatDate(entry.archivedDate))}</dd></div>` : ''}
              </dl>
              ${
                entry.href
                  ? `<a class="version__link" href="${esc(entry.href)}">Read this version ${icon('chevron', { size: 14 })}</a>`
                  : '<p class="version__note">This version is not published here.</p>'
              }
            </div>
          </li>`,
        )
        .join('')}</ol>`
    : `<p class="empty">
        No earlier versions. When this document is revised, the version it replaces will be
        listed here with the dates it was in force.
      </p>`;

  const main = `<div class="wrap narrow">
    <section class="section">
      <h2 class="section-title">Current version</h2>
      ${current}
    </section>

    <section class="section">
      <h2 class="section-title">Previous versions</h2>
      ${previous}
    </section>

    <p class="back-link"><a href="${esc(doc.href)}">${icon('chevron', { size: 14 })} Back to ${esc(doc.title)}</a></p>
  </div>`;

  return page({
    title: `${doc.title} — version history`,
    description: `Version history for ${doc.title}.`,
    path: `${doc.href}/versions`,
    hero: hero({
      crumbs: breadcrumbs([
        { href: '/', label: 'Legal' },
        { href: doc.href, label: doc.title },
        { label: 'Version history' },
      ]),
      eyebrow: category?.label,
      title: 'Version history',
      lede: doc.title,
    }),
    main,
  });
}

export { getDocument };
