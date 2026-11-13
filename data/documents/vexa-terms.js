/**
 * Vexa Terms — short, and only what Vexa's code does.
 *
 * Verified 2026-11-12 by reading Vexa 0.5.0 (D:\Dev\Vexa\src, README "Known limitations"):
 *   - all data (settings, history, bookmarks, downloads list, open tabs, cookies/site data/cache)
 *     lives in the profile folder (%APPDATA%\Vexa); no analytics, crash reporting, update check,
 *     accounts or Nova server; address-bar suggestions come from local history + bookmarks only;
 *   - defaults: DuckDuckGo search, Do Not Track + Global Privacy Control headers on, third-party
 *     cookies blocked (network level — third-party frames can still use document.cookie);
 *   - private windows = in-memory session; clear browsing data + clear-on-exit; cookies/site data/
 *     cache can only be cleared for "All time";
 *   - passwords encrypted with Electron safeStorage (DPAPI/Keychain/libsecret), nothing saved if
 *     unavailable; Show/Copy in Settings does not re-ask for the Windows password;
 *   - sync = one file encrypted with the user's passphrase (scrypt + AES-256-GCM) in a folder they
 *     pick; passphrase kept in the OS keystore; a forgotten passphrase cannot be recovered;
 *   - unpacked extensions only; not loaded in private windows;
 *   - presents itself as Chrome on Google's own sign-in hosts; certificate errors never bypassed;
 *   - location only works with a Google API key the user pastes in (Chromium's location service);
 *   - "Make Vexa the default" registers with Windows; the user confirms in Windows' Default apps.
 * Updated 2026-11-13 for Vexa 0.5.5 (D:DevVexasrcmainexa-search.js, url.js):
 *   - "Vexa Search (Beta)" is an optional search engine in Settings; DuckDuckGo stays the default;
 *   - it runs inside Vexa from an index shipped with the app: searches are handled on the computer
 *     and are not sent to Nova or anyone else; results link to the original websites;
 *   - the index is built by Nova's own crawler, VexaBot (https://vexa.shadylabs.workers.dev/bot);
 *   - the "Content Coverage" wording below is the owner's own text (2026-11-13), used verbatim.
 * If any of that changes, THIS DOCUMENT MUST CHANGE WITH IT.
 */

const DATE = '2026-11-12';
const UPDATED = '2026-11-13';

export const document = {
  id: 'vexa-terms',
  title: 'Vexa Terms',
  description: 'Terms specific to Vexa, the Nova web browser: your data, websites, sync, passwords and extensions.',
  category: 'terms',
  appliesTo: ['vexa'],
  status: 'published',
  effectiveDate: DATE,
  updatedDate: UPDATED,
  version: '1.1',
  versions: [],
  sections: [
    {
      id: 'what',
      heading: 'What these terms cover',
      body: [
        'These terms are about Vexa, Nova’s desktop web browser, and its website. They apply in addition to the [Terms of Service](/terms), the [Privacy Policy](/privacy) and the [Acceptable Use Policy](/acceptable-use). Where they differ for Vexa, these terms decide.',
      ],
    },
    {
      id: 'your-data',
      heading: 'Your data stays on your computer',
      body: [
        'Vexa stores your settings, history, bookmarks, open tabs, downloads list, saved passwords, saved contact details, and the cookies, site data and cache that websites set, in a profile folder on your computer. Nova does not receive any of it.',
        'Vexa has no analytics, crash reporting, update check or account. It does not use a Nova Account. Address-bar suggestions come from your own history and bookmarks, not from a search service.',
        'Anyone who can use your computer account may be able to open that profile folder.',
      ],
    },
    {
      id: 'websites',
      heading: 'Websites and search engines',
      body: [
        'When you visit a website, that website receives what any browser sends it, such as your IP address, the page you asked for, and its own cookies. Searches you type in the address bar go to the search engine you choose in Settings (DuckDuckGo by default). If you choose Vexa Search, your searches are handled on your computer instead and are not sent to Nova or anyone else.',
        'Websites, search engines and other services are run by other people under their own terms and privacy policies. Nova does not control them and is not responsible for their content or for what they do with your information.',
        'On Google’s own sign-in pages, Vexa presents itself as the Chrome browser so that Google sign-in works. Google decides on its own whether to allow a sign-in, and this may stop working at any time.',
      ],
    },
    {
      id: 'vexa-search',
      heading: 'Vexa Search — Content Coverage',
      body: [
        'Vexa Search is an independently developed search engine with its own web crawler, indexing infrastructure, and ranking systems.',
        'During its early development and beta stages, Vexa Search will prioritize mainstream websites, technology, gaming, entertainment, education, news, and other general-purpose web content.',
        'Vexa Search does not prioritize adult-oriented websites or pornography. Such websites may not be intentionally indexed or supported, and coverage may change as the search engine develops.',
        'Users are always free to select alternative third-party search providers, including Google and Brave, through Vexa’s search settings.',
        'Vexa Search is offered in Vexa as an optional beta. It runs inside Vexa from an index included with the app, so the searches you make with it are handled on your computer and are not sent to Nova or anyone else. Results link to the original websites, which are run by other people (see “Websites and search engines” above). The index is built by Nova’s crawler, VexaBot, which follows each website’s robots.txt rules. Website owners can read how to control or block VexaBot at vexa.shadylabs.workers.dev/bot.',
      ],
    },
    {
      id: 'privacy-controls',
      heading: 'Privacy settings',
      body: [
        'By default Vexa asks websites not to track you (Do Not Track and Global Privacy Control) and blocks third-party cookies. Websites decide for themselves whether to honour those requests.',
        'Third-party cookie blocking works at the network level. A third-party frame inside a page can still read and write its own cookies through scripts, so the blocking does not stop every form of tracking.',
        'Private windows keep their history, cookies and site data only in memory and discard them when the window closes.',
        'You can clear history, the downloads list, cookies, site data, cache, site permissions, saved passwords and saved contact details in Settings, or have some of them cleared every time Vexa closes. Cookies, site data and the cache can only be cleared for all time, not for a shorter period.',
        'Websites must ask before using your camera, microphone, location, notifications and similar permissions, and Vexa remembers your answer per site. Location only works if you add your own Google API key in Settings, in which case Google’s location service receives the information it needs to estimate where you are.',
      ],
    },
    {
      id: 'passwords',
      heading: 'Passwords and contact details',
      body: [
        'Vexa can offer to save the passwords you sign in with, and the contact details you enter for autofill. It does not save payment cards.',
        'Saved passwords are encrypted with your operating system’s keystore (on Windows, under your Windows account) before they are written to disk. If your system cannot encrypt them, Vexa does not save them. Vexa has no separate master password: anyone using your unlocked computer account can show or copy saved passwords in Settings.',
        'You are responsible for keeping your computer account secure.',
      ],
    },
    {
      id: 'sync',
      heading: 'Sync',
      body: [
        'Sync is optional and uses no Nova server. When you turn it on, Vexa writes one file, encrypted with a passphrase you choose, to a folder you pick. To use it on another device, you make that folder available there yourself, for example with your own cloud storage service.',
        'Whoever stores that folder holds only the encrypted file. Your passphrase is kept on each of your computers in the operating system’s keystore. Nova cannot recover a forgotten passphrase, and without it the synced file cannot be read.',
        'Sync can overwrite changes: if you edit bookmarks, settings or contact details on two devices before they sync, the most recent change may replace the other. Keep your own backups of anything you care about.',
      ],
    },
    {
      id: 'extensions',
      heading: 'Extensions',
      body: [
        'Vexa can load extensions you choose from a folder on your computer. Extensions are written by other people. They can read and change the pages you visit and may send information elsewhere.',
        'Nova does not provide, check or vouch for any extension. You are responsible for what you install. Extensions do not run in private windows.',
      ],
    },
    {
      id: 'downloads',
      heading: 'Downloads and security warnings',
      body: [
        'Files you download come from the website that offered them. Nova does not check them, and you are responsible for what you download and open.',
        'Vexa never lets a page load over a connection with a certificate error. No browser can protect you from every harmful website or file.',
      ],
    },
    {
      id: 'default-browser',
      heading: 'Default browser',
      body: [
        'If you choose to make Vexa your default browser, it registers itself with your operating system for your user account only. On Windows, Windows asks you to confirm the choice yourself. Uninstalling Vexa removes that registration.',
      ],
    },
    {
      id: 'no-affiliation',
      heading: 'No affiliation',
      body: [
        'Vexa is built on Chromium and Electron, which are open-source projects made by other people. Vexa is independently developed and is not affiliated with, sponsored by or endorsed by Google, the Chromium project, the Electron project, or any website or search engine it works with. Names and trademarks belong to their owners.',
      ],
    },
    {
      id: 'as-is',
      heading: 'Early software',
      body: [
        'Vexa is early software and some features have known limitations, which are listed in its documentation. It is provided as described in the [Terms of Service](/terms).',
      ],
    },
    {
      id: 'age',
      heading: 'Minimum age',
      body: ['Vexa is 13+ recommended. See the [Terms of Service](/terms#age).'],
    },
  ],
  related: ['terms', 'privacy', 'cookies', 'acceptable-use'],
};
