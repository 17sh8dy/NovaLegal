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

import { site, nav, footer as footerColumns } from '../../data/site.js';
import { esc, maybeLink } from './components.mjs';
import { icon, MARK } from './icons.mjs';

/**
 * Resolve the theme before the first paint.
 *
 * Three states, matching the rest of the Nova ecosystem: an explicit choice is stored and
 * stamped on `<html>`; the default is "system" and stamps nothing, so the CSS media query
 * decides. Wrapped in try/catch because `localStorage` throws outright in a browser configured
 * to block site data, and a legal document must render for that reader too.
 */
const THEME_SCRIPT = `try{var t=localStorage.getItem("nova-legal-theme");if(t==="light"||t==="dark")document.documentElement.setAttribute("data-theme",t)}catch(e){}document.documentElement.classList.add("js")`;

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
        <button class="theme-toggle" type="button" data-theme-toggle aria-label="Switch between light and dark">
          ${icon('nova', { size: 16 })}<span class="sr-only">Theme</span>
        </button>
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
          THE ONE SENTENCE THAT MUST STAY UNTIL THE DOCUMENTS ARE REAL.

          Every document on this site is a placeholder, and somebody arriving from a search
          engine on one page has no way to know that from the page alone. This says it in the
          one place that appears on every page. Remove it only when there is published content
          to remove it for.
        -->
        <p class="footer__pending">
          ${icon('draft', { size: 15 })}
          The documents on this site are being prepared. Nothing published here yet is in force.
        </p>
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
