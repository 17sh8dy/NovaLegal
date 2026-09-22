/**
 * Search.
 *
 * ─────────────────────────────────────────────────────────────────────────────────────────
 * DELIBERATELY SMALL. The document count is small. A search index, a ranking function and a
 * server round trip would all be real engineering spent on a list that fits on one screen —
 * so this page RENDERS EVERY DOCUMENT server-side, and the script filters the list that is
 * already there. That gives three things at once:
 *
 *   · it works with JavaScript disabled (you get the full list, which is a fine answer);
 *   · it is instant, because nothing is fetched;
 *   · it degrades to exactly the right thing as the set grows — when this becomes two hundred,
 *     the same markup gains a real index behind it and the page is unchanged.
 *
 * The filterable text is emitted into a `data-search` attribute per row: title, description,
 * category, the products it applies to, and — once documents are published — their section
 * headings. So a reader typing "deletion" finds the section as well as the document.
 */

import { categories, documents, getCategory, getProduct } from '../../core/catalog.mjs';
import { breadcrumbs, esc, statusBadge } from '../components.mjs';
import { icon } from '../icons.mjs';
import { hero, page } from '../layout.mjs';

/**
 * Everything about a document worth matching against, as one lower-case string.
 *
 * Section headings are included so a search finds the part of a document rather than only its
 * name — which is how somebody looking for "how do I delete my account" actually searches.
 * Pending documents have no sections, so today this is title, description and category; the
 * behaviour arrives on its own as documents are published.
 */
function haystack(doc) {
  const category = getCategory(doc.category);
  const productNames = (doc.appliesTo ?? [])
    .map((id) => getProduct(id)?.name)
    .filter(Boolean);
  const headings = (doc.sections ?? []).map((section) => section.heading);

  return [doc.title, doc.description, category?.label, ...productNames, ...headings]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();
}

/** The section headings a query might have matched, shown under the result. */
const matchHints = (doc) =>
  (doc.sections ?? [])
    .map(
      (section) =>
        `<li class="result__hint" data-hint="${esc(section.heading.toLowerCase())}">
          <a href="${esc(doc.href)}#${esc(section.id)}">${esc(section.heading)}</a>
        </li>`,
    )
    .join('');

function result(doc) {
  const category = getCategory(doc.category);
  const hints = matchHints(doc);

  return `<li class="result" data-search="${esc(haystack(doc))}" data-category="${esc(doc.category)}">
    <a class="result__main" href="${esc(doc.href)}">
      <span class="result__head">
        <span class="result__title">${esc(doc.title)}</span>
        ${statusBadge(doc.pending)}
      </span>
      <span class="result__cat">${esc(category?.label ?? doc.category)}</span>
      <span class="result__desc">${esc(doc.description)}</span>
    </a>
    ${hints ? `<ul class="result__hints">${hints}</ul>` : ''}
  </li>`;
}

export function searchPage() {
  const filters = categories
    .map(
      (category) =>
        `<button class="chip" type="button" data-filter="${esc(category.id)}" aria-pressed="false">
          ${esc(category.label)}
        </button>`,
    )
    .join('');

  const main = `<div class="wrap narrow">
    <form class="search" role="search" action="/search" method="get" data-search-form>
      <label class="sr-only" for="q">Search Nova Legal</label>
      <span class="search__icon" aria-hidden="true">${icon('search', { size: 19 })}</span>
      <input
        class="search__input"
        id="q"
        name="q"
        type="search"
        placeholder="Search documents, categories and products"
        autocomplete="off"
        data-search-input
      />
      <!-- Submitting does nothing but reload this page, which is correct: the full list is
           already here, and without JavaScript that list IS the answer. -->
      <button class="search__go btn btn--primary" type="submit">Search</button>
    </form>

    <div class="chips" role="group" aria-label="Filter by category">
      <button class="chip chip--on" type="button" data-filter="all" aria-pressed="true">All</button>
      ${filters}
    </div>

    <p class="search__count" data-search-count aria-live="polite">
      ${esc(documents.length)} documents
    </p>

    <ul class="results" data-search-results>
      ${documents.map(result).join('')}
    </ul>

    <p class="empty" data-search-empty hidden>
      Nothing matched. Try a shorter word, or <a href="/">browse every document</a>.
    </p>
  </div>`;

  return page({
    title: 'Search',
    description: 'Search Nova Legal for terms, privacy, community and product documents.',
    path: '/search',
    hero: hero({
      crumbs: breadcrumbs([{ href: '/', label: 'Legal' }, { label: 'Search' }]),
      title: 'Search',
      lede: 'Every document on this site, filtered as you type.',
    }),
    main,
  });
}
