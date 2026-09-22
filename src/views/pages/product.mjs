/**
 * Product legal pages — one per Nova product, generated from `data/products.js`.
 *
 * ⚠ THIS PAGE MUST NOT GUESS WHICH DOCUMENTS GOVERN A PRODUCT.
 *
 * That is the single rule the whole file is arranged around. It would be easy — and wrong — to
 * assume the Terms and the Privacy Policy apply to everything, or that Community Guidelines
 * apply to whatever has a Discord. Which documents legally govern which product is a
 * determination somebody qualified makes, recorded in each document's `appliesTo`.
 *
 * A document declares the products it governs; this page lists what declares it. A category
 * with nothing under it says so in a sentence rather than rendering an empty grid.
 */

import { documents, documentsFor, getProduct } from '../../core/catalog.mjs';
import { breadcrumbs, documentCard, esc, maybeLink } from '../components.mjs';
import { icon } from '../icons.mjs';
import { hero, page } from '../layout.mjs';

/**
 * One themed block on a product page.
 *
 * `docs` is whatever the catalog says applies to this product in that category. Empty renders
 * the honest note rather than nothing at all, because a heading with no content under it reads
 * as a page that failed to load.
 */
function block({ id, heading, blurb, docs, emptyNote }) {
  return `<section class="prod-block" id="${esc(id)}" aria-labelledby="pb-${esc(id)}">
    <h2 class="section-title" id="pb-${esc(id)}">${esc(heading)}</h2>
    ${blurb ? `<p class="prod-block__blurb">${esc(blurb)}</p>` : ''}
    ${
      docs.length
        ? `<div class="doc-grid">${docs.map((doc) => documentCard(doc, { compact: true })).join('')}</div>`
        : `<p class="empty">${esc(emptyNote)}</p>`
    }
  </section>`;
}

/** Factual product context from `data/products.js`, kept separate from legal content. */
function factualProductContent(product) {
  const overview = (product.overview ?? []).map((paragraph) => `<p>${esc(paragraph)}</p>`).join('');
  const capabilities = (product.capabilities ?? [])
    .map((capability) => `<li>${esc(capability)}</li>`)
    .join('');
  const surfaces = (product.surfaces ?? [])
    .map(
      (surface) => `<li><strong>${esc(surface.name)}</strong><span>${esc(surface.detail)}</span></li>`,
    )
    .join('');

  if (!overview && !capabilities && !surfaces && !product.account) return '';

  return `<section class="product-facts" aria-labelledby="about-product">
    <div class="product-facts__head">
      <h2 class="section-title" id="about-product">About ${esc(product.name)}</h2>
      <p>This is factual product context, not legal terms or a privacy statement.</p>
    </div>
    ${overview ? `<div class="product-facts__overview">${overview}</div>` : ''}
    <div class="product-facts__grid">
      ${
        capabilities
          ? `<section aria-labelledby="capabilities-heading"><h3 id="capabilities-heading">What it does</h3><ul class="product-facts__list">${capabilities}</ul></section>`
          : ''
      }
      ${
        surfaces
          ? `<section aria-labelledby="surfaces-heading"><h3 id="surfaces-heading">Product surfaces</h3><ul class="product-facts__surfaces">${surfaces}</ul></section>`
          : ''
      }
    </div>
    ${
      product.account
        ? `<div class="product-facts__account"><h3>Nova Account</h3><p>${esc(product.account)}</p></div>`
        : ''
    }
  </section>`;
}

export function productPage(product) {
  const applicable = documentsFor(product.id);
  const inCategory = (category) => applicable.filter((doc) => doc.category === category);

  const undetermined = 'No document of this kind applies to this product.';

  const main = `<div class="wrap">
    <section class="prod-intro">
      <div class="prod-intro__head">
        <span class="prod-intro__icon" aria-hidden="true">${icon(product.icon, { size: 26 })}</span>
        <div>
          <h2 class="prod-intro__name">${esc(product.name)}</h2>
          <p class="prod-intro__kind">${esc(product.kind)}</p>
        </div>
      </div>
      <p class="prod-intro__blurb">${esc(product.blurb)}</p>
      <p class="prod-intro__links">
        ${maybeLink(product.url, `${product.name} website`, { external: true, note: '(site pending)' })}
        <span class="sep" aria-hidden="true">·</span>
        ${maybeLink(product.help, `Help with ${product.name}`, { external: true })}
      </p>
    </section>

    ${factualProductContent(product)}

    <section class="prod-block" id="applicable" aria-labelledby="pb-applicable">
      <h2 class="section-title" id="pb-applicable">Applicable documents</h2>
      ${
        applicable.length
          ? `<div class="doc-grid">${applicable.map((doc) => documentCard(doc)).join('')}</div>`
          : `<p class="empty">No documents apply to ${esc(product.name)} yet. You can <a href="/">browse every document</a>.</p>`
      }
    </section>

    ${block({
      id: 'terms',
      heading: 'Product-specific terms',
      blurb: `Terms that apply to ${product.name} in particular, in addition to any general terms.`,
      docs: inCategory('terms').filter((doc) => doc.appliesTo.length === 1),
      emptyNote: `No terms specific to ${product.name} have been written.`,
    })}

    ${block({
      id: 'privacy',
      heading: 'Privacy',
      blurb: `What information ${product.name} handles, and what happens to it.`,
      docs: inCategory('privacy'),
      emptyNote: undetermined,
    })}

    ${block({
      id: 'community',
      heading: 'Community rules',
      blurb: 'Applies only to products with community spaces or shared content.',
      docs: inCategory('community'),
      emptyNote: `No community rules apply to ${product.name}: it does not host content shared between people.`,
    })}

    ${block({
      id: 'accounts',
      heading: 'Accounts',
      blurb: 'A Nova Account is optional in every Nova product, and is the same account across all of them.',
      docs: inCategory('accounts'),
      emptyNote: undetermined,
    })}

    <section class="prod-block" id="data" aria-labelledby="pb-data">
      <h2 class="section-title" id="pb-data">Data</h2>
      <p class="prod-block__blurb">
        What ${esc(product.name)} stores or sends. The full picture is in the
        <a href="/privacy">Privacy Policy</a>.
      </p>
      ${
        product.data?.length
          ? `<ul class="product-facts__list">${product.data.map((line) => `<li>${esc(line)}</li>`).join('')}</ul>`
          : '<p class="empty">No summary has been written for this product.</p>'
      }
    </section>

    <section class="prod-block" id="age" aria-labelledby="pb-age">
      <h2 class="section-title" id="pb-age">Recommended age</h2>
      <p class="prod-block__blurb">
        ${
          product.minimumAge
            ? `${esc(product.name)} is ${esc(product.minimumAge)}+ recommended. This is a recommendation, not an enforced or verified requirement; see the <a href="/terms#age">Terms of Service</a>.`
            : `No recommended age has been decided for ${esc(product.name)}.`
        }
      </p>
    </section>

    <p class="back-link"><a href="/products">${icon('chevron', { size: 14 })} All products</a></p>
  </div>`;

  return page({
    title: `${product.name} — legal`,
    description: `Legal information for ${product.name}.`,
    path: `/products/${product.id}`,
    hero: hero({
      crumbs: breadcrumbs([
        { href: '/', label: 'Legal' },
        { href: '/products', label: 'Products' },
        { label: product.name },
      ]),
      eyebrow: 'Product',
      title: product.name,
      lede: product.blurb,
    }),
    main,
  });
}

/** The product index — every Nova product, and the route to add the next one. */
export function productsPage(list) {
  const cards = list
    .map((product) => {
      const count = documentsFor(product.id).length;
      return `<a class="doc-card" href="/products/${esc(product.id)}">
        <span class="doc-card__head">
          <span class="doc-card__title">
            ${icon(product.icon, { size: 18 })} ${esc(product.name)}
          </span>
          <span class="badge badge--quiet">${esc(product.kind)}</span>
        </span>
        <span class="doc-card__desc">${esc(product.blurb)}</span>
        <span class="doc-card__foot">
          ${count ? `${esc(count)} applicable document${count === 1 ? '' : 's'}` : 'Applicable documents not yet determined'}
        </span>
        <span class="doc-card__go" aria-hidden="true">${icon('arrow', { size: 17 })}</span>
      </a>`;
    })
    .join('');

  const main = `<div class="wrap">
    <div class="doc-grid">${cards}</div>
    <p class="empty empty--quiet">
      Every Nova product has a page here. A new product is one entry in
      <code>data/products.js</code> — no route, template or navigation change.
      There are ${esc(documents.length)} documents in total; see
      <a href="/">the legal home</a>.
    </p>
  </div>`;

  return page({
    title: 'Products',
    description: 'Legal information for each Nova product.',
    path: '/products',
    hero: hero({
      crumbs: breadcrumbs([{ href: '/', label: 'Legal' }, { label: 'Products' }]),
      title: 'Products',
      lede: 'Legal information for each product in the Nova ecosystem.',
    }),
    main,
  });
}

export { getProduct };
