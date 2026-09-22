/**
 * Values every published document shares, so a date or a product set is changed in one place.
 *
 * ⚠ `PUBLISHED` is the date these documents were first written into the repository (2026-09-21).
 * It is the effective date shown to readers. If the site is deployed later and the owner wants
 * the effective date to be the deployment date, this is the one line to change.
 *
 * ─────────────────────────────────────────────────────────────────────────────────────────
 * EDITABILITY: THE PRODUCT GROUPS BELOW ARE COMPUTED, NOT MAINTAINED.
 *
 * They read straight from `data/products.js` — its `inScope`, `hasAccount` and
 * `hasBrowserStorage` flags — rather than repeating a second, hand-typed list of ids here. That
 * means adding a product, dropping one out of scope, or turning its account off, is ONE edit in
 * `products.js`; every document's `appliesTo: ALL_PRODUCTS` (or `ACCOUNT_PRODUCTS` /
 * `BROWSER_PRODUCTS`) picks it up on the next build with nothing else to remember. Imported
 * straight from `../products.js`, not from `../../src/core/catalog.mjs` — the catalog imports
 * the documents (via `index.js`), so importing it back here would be circular.
 */
import { products as allProducts } from '../products.js';

const inScope = allProducts.filter((product) => product.inScope !== false);

export const PUBLISHED = '2026-09-21';

/** Every product NovaLegal covers today. */
export const ALL_PRODUCTS = inScope.map((product) => product.id);

/** The products that have a Nova Account option. */
export const ACCOUNT_PRODUCTS = inScope.filter((product) => product.hasAccount).map((product) => product.id);

/** The products with a website (or app) that stores anything in a browser. */
export const BROWSER_PRODUCTS = inScope.filter((product) => product.hasBrowserStorage).map((product) => product.id);
