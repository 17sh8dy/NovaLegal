/**
 * Cookies & Browser Storage.
 *
 * Verified 2026-09-21 by reading every site's code (docs/FACT-SHEET.md §3):
 *   - the language selector (NovaI18n runtime) sets a `nova.lang` cookie (1 year) AND writes
 *     localStorage, only when a language is chosen;
 *   - Nova.Help sets two cookies: a sign-in session and a per-ticket pass;
 *   - theme keys: nova-legal-theme, atlas-theme, oc-theme (Nova Cut site);
 *   - Atlas site also remembers the assistant name the visitor typed (atlas-assistant-name).
 * No analytics, advertising or third-party scripts were found on any site.
 */
import { BROWSER_PRODUCTS, PUBLISHED } from './_common.js';

export const document = {
  id: 'cookies',
  title: 'Cookies & Browser Storage',
  description: 'The storage and identifiers Nova products use in a browser, and what for.',
  category: 'privacy',
  appliesTo: BROWSER_PRODUCTS,
  status: 'published',
  effectiveDate: PUBLISHED,
  updatedDate: PUBLISHED,
  version: '1.0',
  versions: [],
  sections: [
    {
      id: 'summary',
      heading: 'The short version',
      body: [
        'Nova’s websites do not use analytics, advertising or tracking cookies, and load no third-party scripts. They use a few cookies and browser-storage entries to remember your choices and, if you sign in, to keep you signed in.',
        'Browsing a Nova website without signing in and without choosing a language stores nothing on your device.',
      ],
    },
    {
      id: 'choices',
      heading: 'Your choices, remembered',
      body: [
        {
          list: [
            '**Language** — when you choose a language, the site saves it in a cookie named nova.lang (kept for one year) and in your browser’s local storage, so the next page opens in that language. Used on Nova, Nova.Help, NovaLegal and the Nova Cut and Atlas websites.',
            '**Theme** — NovaLegal, the Nova Cut website and the Atlas website save your light or dark choice in local storage.',
            '**Text style** — NovaLegal saves your chosen font from the Text Styles menu (top right) in local storage, so it applies on your next visit. No choice is made for you, and nothing is sent anywhere — it only changes the font this browser renders the page in.',
            '**Assistant name** — the Atlas website saves the name you give the assistant in the demo, in local storage.',
          ],
        },
      ],
    },
    {
      id: 'sign-in',
      heading: 'Cookies for signing in and support',
      body: [
        'Nova.Help and the Nova website use up to two cookies:',
        {
          list: [
            '**A sign-in cookie**, set only if you sign in to a Nova Account. It holds a signed session token so you stay signed in, and it stops working when the session expires or you sign out.',
            '**A ticket cookie**, set only when you open a support ticket. It holds a signed pass for that one ticket and nothing else.',
          ],
        },
        'These are needed for those features to work. They are not used for advertising or to follow you across other sites.',
      ],
    },
    {
      id: 'control',
      heading: 'Controlling them',
      body: [
        'You can delete cookies and site storage in your browser’s settings. Doing so signs you out and resets your language and theme. Nova does not show a cookie banner.',
      ],
    },
    {
      id: 'more',
      heading: 'More',
      body: ['See the [Privacy Policy](/privacy). Contact: {{contact}}.'],
    },
  ],
  related: ['privacy'],
};
