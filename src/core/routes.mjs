/**
 * The route table — every page this site has, as data.
 *
 * ONE LIST, TWO CONSUMERS. `build.mjs` walks it to write static files, and `serve.mjs` looks
 * paths up in it to answer requests. That is why it is data rather than an `if` ladder in each:
 * a route that exists in development and not in the build (or the reverse) is the classic way a
 * static site ships a 404 nobody noticed, and here it is not expressible.
 *
 * Routes are GENERATED from the catalog, not written out. The document count times two (a page and a version history each), plus one route per product, plus one per category.
 * Adding a document adds its routes; there is no list to keep in step.
 */

import { categories, documents, getDocument, products } from './catalog.mjs';
import { homePage } from '../views/pages/home.mjs';
import { documentPage, versionsPage } from '../views/pages/document.mjs';
import { productPage, productsPage } from '../views/pages/product.mjs';
import { searchPage } from '../views/pages/search.mjs';
import { categoryPage, notFoundPage } from '../views/pages/status.mjs';

/** A document's related records, resolved once here so the view is handed objects. */
const relatedOf = (doc) => doc.related.map(getDocument).filter(Boolean);

/**
 * Every route: `{ path, render }`.
 *
 * `path` is the URL. `build.mjs` turns `/terms` into `dist/terms/index.html` so the site works
 * on any static host without rewrite rules, and `/` into `dist/index.html`.
 */
export function routes() {
  const list = [
    { path: '/', render: () => homePage() },
    { path: '/search', render: () => searchPage() },
    { path: '/products', render: () => productsPage(products) },
  ];

  for (const doc of documents) {
    list.push({ path: doc.href, render: () => documentPage(doc, { related: relatedOf(doc) }) });
    list.push({ path: `${doc.href}/versions`, render: () => versionsPage(doc) });
  }

  for (const product of products) {
    list.push({ path: `/products/${product.id}`, render: () => productPage(product) });
  }

  for (const category of categories) {
    list.push({ path: `/category/${category.id}`, render: () => categoryPage(category) });
  }

  return list;
}

/** The 404, which is a page rather than a route — every static host asks for it by name. */
export const notFound = () => notFoundPage();

/**
 * Resolve a request path to a renderer, or null.
 *
 * Trailing slashes are normalised so `/terms/` and `/terms` are the same page rather than one
 * of them being a 404 — which is what a reader gets when they copy a URL out of a PDF.
 */
export function match(pathname) {
  const clean = pathname.replace(/\/+$/, '') || '/';
  return routes().find((route) => route.path === clean) ?? null;
}
