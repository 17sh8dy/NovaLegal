/**
 * The homepage: browse legal information.
 *
 * The whole page is generated from `data/` — adding a category or a document puts it here with
 * no change to this file. That is the same property Nova.Help's homepage has, and it is what
 * stops navigation drifting away from content.
 *
 * The hero lede explains what the centre is for without claiming that any legal document is
 * approved or in force. The prominent pending notice immediately below it carries that status.
 */

import { site } from '../../../data/site.js';
import { categories, documents, documentsIn, products, stats } from '../../core/catalog.mjs';
import { esc, documentCard, notice } from '../components.mjs';
import { icon as glyph } from '../icons.mjs';
import { page } from '../layout.mjs';

function categorySection(category) {
  const docs = documentsIn(category.id);
  return `<section class="category" id="${esc(category.id)}" aria-labelledby="cat-${esc(category.id)}">
    <div class="category__head">
      <span class="category__icon" aria-hidden="true">${glyph(category.icon, { size: 21 })}</span>
      <div>
        <h2 class="category__title" id="cat-${esc(category.id)}">${esc(category.label)}</h2>
        <p class="category__blurb">${esc(category.blurb)}</p>
      </div>
    </div>
    <div class="doc-grid">${docs.map((doc) => documentCard(doc)).join('')}</div>
  </section>`;
}

function productStrip() {
  const cards = products
    .map(
      (product) => `<a class="prod-card" href="/products/${esc(product.id)}">
        <span class="prod-card__icon" aria-hidden="true">${glyph(product.icon, { size: 20 })}</span>
        <span class="prod-card__name">${esc(product.name)}</span>
        <span class="prod-card__kind">${esc(product.kind)}</span>
      </a>`,
    )
    .join('');

  return `<section class="category" id="products" aria-labelledby="cat-products">
    <div class="category__head">
      <span class="category__icon" aria-hidden="true">${glyph('nova', { size: 21 })}</span>
      <div>
        <h2 class="category__title" id="cat-products">Products</h2>
        <p class="category__blurb">
          Legal information for each Nova product, and which documents apply to it.
        </p>
      </div>
    </div>
    <div class="prod-grid">${cards}</div>
  </section>`;
}

export function homePage() {
  const main = `
  <div class="wrap">
    ${notice(
      'warn',
      'Nova Legal is being built',
      `<p>
        The structure of this site is finished; the legal documents themselves have not been
        written. Every document below is a placeholder, and <strong>nothing on this site is in
        force or should be relied on</strong>. Each document will be published here with an
        effective date and a version number once it has been written and reviewed.
      </p>`,
    )}

    <section class="browse" aria-labelledby="browse-heading">
      <h2 class="sr-only" id="browse-heading">Browse legal information</h2>
      ${categories.map(categorySection).join('')}
      ${productStrip()}
    </section>

    <section class="closing" aria-labelledby="closing-heading">
      <h2 class="section-title" id="closing-heading">Looking for something else?</h2>
      <div class="closing__grid">
        <a class="closing__card" href="/search">
          <span class="closing__icon" aria-hidden="true">${glyph('search', { size: 20 })}</span>
          <span class="closing__title">Search Nova Legal</span>
          <span class="closing__desc">Find a document by name, category or subject.</span>
        </a>
        <a class="closing__card" href="${esc(site.help)}" rel="noopener">
          <span class="closing__icon" aria-hidden="true">${glyph('help', { size: 20 })}</span>
          <span class="closing__title">Nova.Help</span>
          <span class="closing__desc">
            Help with a Nova product, or open a support ticket. Legal is not support.
          </span>
        </a>
        <a class="closing__card" href="${esc(site.discord)}" rel="noopener">
          <span class="closing__icon" aria-hidden="true">${glyph('discord', { size: 20 })}</span>
          <span class="closing__title">Join the Nova Discord</span>
          <span class="closing__desc">The Nova community.</span>
        </a>
      </div>
    </section>
  </div>`;

  const heroBlock = `<section class="hero hero--home">
    <div class="wrap">
      <h1 class="hero__display">Legal information for the Nova ecosystem</h1>
      <p class="hero__lede">${esc(site.lede)}</p>
      <p class="hero__counts">
        ${esc(stats.documents)} documents across ${esc(stats.categories)} categories and
        ${esc(stats.products)} products.
        ${stats.published === 0 ? 'None published yet.' : `${esc(stats.published)} published.`}
      </p>
    </div>
  </section>`;

  return page({
    title: null,
    description: site.description,
    path: '/',
    hero: heroBlock,
    main,
    bodyClass: 'is-home',
  });
}
