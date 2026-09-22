/**
 * The document shell — every page goes through `page()`.
 *
 * Four things in here are load-bearing:
 *
 * 1. THE SKIP LINK IS THE FIRST FOCUSABLE ELEMENT. A legal site is read by keyboard and by
 *    screen reader more than most, and it is the one kind of site where "just scroll past the
 *    navigation" is not a reasonable thing to ask.
 *
 * 2. THE SCRIPT IS DEFERRED AND OPTIONAL. Nothing here requires JavaScript: navigation is
 *    links, search has a no-JS fallback that lists everything, and every document renders in
 *    full server-side. The script adds live filtering and a table-of-contents highlight.
 *
 * 3. THE THEME IS RESOLVED BEFORE FIRST PAINT by a tiny inline script, so a reader who chose
 *    light does not get a flash of dark. It is the only inline script on the site, and it
 *    touches one attribute.
 *
 * 4. EVERY PAGE DECLARES ITS OWN TITLE AND DESCRIPTION. Legal pages get linked into emails and
 *    tickets constantly; a page whose title is just the site name is useless in a list of tabs.
 */

import { stats } from '../core/catalog.mjs';
import { site, nav, footer as footerColumns } from '../../data/site.js';
import { esc, maybeLink } from './components.mjs';
import { icon, MARK } from './icons.mjs';
import { TEXT_STYLE_KEY, TEXT_STYLES } from './textStyles.mjs';

/**
 * Resolve the theme AND the text style before the first paint.
 *
 * Same reasoning for both: an explicit choice is stored and stamped on `<html>` as an
 * attribute the CSS keys off, so a reader who chose OpenDyslexic or dark never sees a flash of
 * the default first. Wrapped in try/catch because `localStorage` throws outright in a browser
 * configured to block site data, and a legal document must render for that reader too.
 */
const THEME_SCRIPT =
  `try{var t=localStorage.getItem("nova-legal-theme");if(t==="light"||t==="dark")document.documentElement.setAttribute("data-theme",t)}catch(e){}` +
  `try{var f=localStorage.getItem(${JSON.stringify(TEXT_STYLE_KEY)});if(f)document.documentElement.setAttribute("data-text-style",f)}catch(e){}` +
  `document.documentElement.classList.add("js")`;

/**
 * The Text Styles control: a toggle button and its panel of font choices. See textStyles.mjs.
 *
 * ⚠ NO INLINE `style="…"`. The site's CSP is `style-src 'self'` with no `'unsafe-inline'`, so an
 * inline style attribute is silently dropped by the browser rather than merely inadvisable —
 * each option's preview font instead comes from a `.text-style__option[data-text-style-option="…"]`
 * rule in legal.css, one per id, which `test/text-styles.test.mjs` checks actually exists.
 */
function textStyleControl() {
  const options = TEXT_STYLES.map(
    (font) => `<button class="text-style__option" type="button" role="menuitemradio" aria-checked="false"
        data-text-style-option="${esc(font.id)}">${esc(font.label)}</button>`,
  ).join('');

  return `<div class="text-style" data-text-style-menu>
    <button class="theme-toggle" type="button" data-text-style-toggle aria-haspopup="true" aria-expanded="false"
        aria-controls="text-style-panel" aria-label="Text styles: change the font used across this site">
      ${icon('text-lines', { size: 16 })}<span class="sr-only">Text styles</span>
    </button>
    <div class="text-style__panel" id="text-style-panel" role="menu" aria-label="Text styles" data-text-style-panel>
      <p class="text-style__title">Text styles</p>
      <p class="text-style__note">
        Changes the font used across the whole site — a plain-language accessibility option for
        dyslexia, low vision, or just a font you find easier to read. Saved in your browser.
      </p>
      <div class="text-style__options" role="none">
        <button class="text-style__option text-style__option--default" type="button" role="menuitemradio" aria-checked="true"
            data-text-style-option="">Default</button>
        ${options}
      </div>
    </div>
  </div>`;
}

/**
 * The account chip: real, live links to the shared Nova Account system — NOT implemented here.
 * NovaLegal has no accounts of its own; see data/documents/contact.js and the account field on
 * the nova-legal entry in data/products.js.
 *
 * ⚠ NO-JS DEFAULT IS "GUEST". Without JavaScript, or before the status check resolves, this
 * shows Sign in / Create account — the same as if nobody were signed in. That is the ONLY
 * honest default a static page rendered ahead of time can give: it cannot know your Nova
 * Account session, which lives on a different origin. legal.js's `[data-account-…]` handler
 * asks Nova's `/account/status` (site.accountStatus) and swaps to the `data-account-signed-in`
 * link — initially `hidden` — the moment it learns you already are. On any failure (offline, a
 * script blocker, Nova unreachable) it silently leaves the guest links exactly as rendered,
 * because "assume signed out" is the failure mode that never blocks anyone from signing in.
 */
function accountControl() {
  return `<div class="account-chip" data-account-chip data-account-status-url="${esc(site.accountStatus)}">
    <a class="account-chip__link" data-account-guest href="${esc(site.accountSignIn)}" rel="noopener">
      ${icon('sign-in', { size: 16 })}<span>Sign in</span>
    </a>
    <a class="account-chip__link account-chip__link--quiet" data-account-guest href="${esc(site.accountCreate)}" rel="noopener">Create account</a>
    <a class="account-chip__link" data-account-signed-in href="${esc(site.accountManage)}" rel="noopener" hidden>
      ${icon('sign-in', { size: 16 })}<span>Account</span>
    </a>
  </div>`;
}

function header(currentPath) {
  const links = nav
    .map((item) => {
      const current =
        item.href === '/' ? currentPath === '/' : currentPath.startsWith(item.href);
      return `<a href="${esc(item.href)}"${current ? ' aria-current="page"' : ''}>${esc(item.label)}</a>`;
    })
    .join('');

  return `<header class="masthead">
    <div class="wrap masthead__inner">
      <a class="wordmark" href="/" aria-label="${esc(site.name)} — home">
        ${MARK}<span class="wordmark__text">Nova<span class="wordmark__sep"> </span>Legal</span>
      </a>

      <span class="masthead__lang-mobile" data-nova-lang-slot></span>
      <button class="masthead__toggle" type="button" aria-expanded="false" aria-controls="site-nav" data-nav-toggle>
        <span class="masthead__bars" aria-hidden="true"></span>
        <span class="sr-only">Menu</span>
      </button>

      <div class="masthead__end" id="site-nav">
        <nav class="masthead__nav" aria-label="Primary">${links}</nav>
        <span class="nova-lang-slot" data-nova-lang-slot></span>
        <a class="masthead__search" href="/search">${icon('search', { size: 17 })}<span>Search</span></a>
        ${textStyleControl()}
        <button class="theme-toggle" type="button" data-theme-toggle aria-label="Switch between light and dark">
          ${icon('nova', { size: 16 })}<span class="sr-only">Theme</span>
        </button>
        ${accountControl()}
      </div>
    </div>
  </header>`;
}

function footer() {
  const columns = footerColumns
    .map(
      (column) => `<div class="footer__col">
        <h2 class="footer__heading">${esc(column.heading)}</h2>
        <ul>${column.links
          .map(
            (link) =>
              `<li>${maybeLink(link.href, link.label, {
                external: Boolean(link.external),
                note: link.note ?? null,
              })}</li>`,
          )
          .join('')}</ul>
      </div>`,
    )
    .join('');

  return `<footer class="footer">
    <div class="wrap">
      <div class="footer__cols">${columns}</div>

      <div class="footer__base">
        <p class="footer__note">
          ${esc(site.name)} — ${esc(site.tagline)}.
        </p>
        <!--
          Placeholders remain (subscriptions, copyright), and a reader who lands on one from a
          search engine must not mistake it for policy. Published documents say "In force" in
          their own header, so this line says only what is true of the rest.
        -->
        ${
          stats.pending
            ? `<p class="footer__pending">${icon('draft', { size: 15 })}
          A document marked “Content pending” has not been written yet and is not in force.</p>`
            : ''
        }
        <p class="footer__attorney-notice">
          Nothing in NovaLegal has been approved or reviewed by an attorney. That does not mean
          you do not have to follow, agree to, and accept the terms, rules, or notices presented
          to you when using a Nova product.
        </p>
      </div>
    </div>
  </footer>`;
}

/**
 * Build a page.
 *
 * `main` and `hero` are HTML strings their callers have already escaped. `bodyClass` exists so
 * the document template can opt into the print stylesheet's layout without every other page
 * carrying it.
 */
export function page({
  title,
  description = site.description,
  path = '/',
  main,
  hero = '',
  bodyClass = '',
  noindex = false,
}) {
  const fullTitle = title ? `${title} — ${site.name}` : `${site.name} — ${site.tagline}`;

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${esc(fullTitle)}</title>
<meta name="description" content="${esc(description)}" />
${noindex ? '<meta name="robots" content="noindex, follow" />' : ''}
<meta name="color-scheme" content="light dark" />
<meta name="theme-color" content="#F5F6FB" media="(prefers-color-scheme: light)" />
<meta name="theme-color" content="#090B12" media="(prefers-color-scheme: dark)" />
<meta property="og:type" content="website" />
<meta property="og:site_name" content="${esc(site.name)}" />
<meta property="og:title" content="${esc(fullTitle)}" />
<meta property="og:description" content="${esc(description)}" />
<link rel="icon" href="/assets/favicon.svg" type="image/svg+xml" />
<script>${THEME_SCRIPT}</script>
<script src="/assets/nova-i18n-boot.js"></script>
<link rel="stylesheet" href="/assets/nova-i18n.css" />
<link rel="stylesheet" href="/assets/legal.css" />
<script src="/assets/legal.js" defer></script>
</head>
<body class="${esc(bodyClass)}">
<a class="skip-link" href="#main">Skip to content</a>
${header(path)}
${hero}
<main id="main" class="main" tabindex="-1">${main}</main>
${footer()}
<script src="/assets/nova-i18n.js" data-base="/i18n/" defer></script>
</body>
</html>`;
}

/** The heading band at the top of a page. Kept here so every page's top edge is identical. */
export function hero({ eyebrow, title, lede, meta = '', crumbs = '', aside = '' }) {
  return `<section class="hero">
    <div class="wrap">
      ${crumbs}
      <div class="hero__inner">
        <div class="hero__text">
          ${eyebrow ? `<p class="eyebrow">${esc(eyebrow)}</p>` : ''}
          <h1 class="hero__title">${esc(title)}</h1>
          ${lede ? `<p class="hero__lede">${esc(lede)}</p>` : ''}
          ${meta}
        </div>
        ${aside ? `<div class="hero__aside">${aside}</div>` : ''}
      </div>
    </div>
  </section>`;
}
