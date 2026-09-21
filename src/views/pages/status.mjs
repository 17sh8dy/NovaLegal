/**
 * The pages that are not a document: 404, and the category anchor fallback.
 *
 * A legal site gets linked to from tickets, emails and other people's sites, so its 404 is
 * reached more often than most — and by somebody who was told there would be a policy here.
 * It therefore does the one useful thing: lists where the documents actually are.
 */

import { categories, documents, documentsIn } from '../../core/catalog.mjs';
import { breadcrumbs, documentCard, esc } from '../components.mjs';
import { icon } from '../icons.mjs';
import { hero, page } from '../layout.mjs';

export function notFoundPage() {
  const main = `<div class="wrap narrow">
    <p class="prose">
      That address does not match any document on this site. It may have been renamed, or the
      link may be from somewhere that has not been updated.
    </p>
    <p class="prose">
      Everything Nova Legal holds is listed below, and
      <a href="/search">search</a> covers all of it.
    </p>

    <ul class="plain-list">
      ${documents
        .map(
          (doc) =>
            `<li><a href="${esc(doc.href)}">${esc(doc.title)}</a> — <span class="muted">${esc(doc.description)}</span></li>`,
        )
        .join('')}
    </ul>
  </div>`;

  return page({
    title: 'Not found',
    description: 'That page does not exist on Nova Legal.',
    path: '/404',
    noindex: true,
    hero: hero({
      eyebrow: 'Nova Legal',
      title: 'That page does not exist',
      lede: 'Here is everything that does.',
    }),
    main,
  });
}

/**
 * A category page.
 *
 * The homepage anchors (`/#privacy`) are the primary route into a category, and they are
 * enough for four categories on one screen. These pages exist anyway because a category is a
 * thing people link to directly and expect to be able to bookmark — and because the moment
 * there are twenty documents, the homepage stops being the right place to list them all.
 */
export function categoryPage(category) {
  const docs = documentsIn(category.id);

  const main = `<div class="wrap">
    <div class="doc-grid">${docs.map((doc) => documentCard(doc)).join('')}</div>
    <p class="back-link"><a href="/">${icon('chevron', { size: 14 })} All legal information</a></p>
  </div>`;

  return page({
    title: category.label,
    description: category.blurb,
    path: `/category/${category.id}`,
    hero: hero({
      crumbs: breadcrumbs([{ href: '/', label: 'Legal' }, { label: category.label }]),
      eyebrow: 'Category',
      title: category.label,
      lede: category.blurb,
    }),
    main,
  });
}

export { categories };
