/**
 * The Nova products this site holds legal information for.
 *
 * Adding a product to Nova Legal is ONE entry here plus, optionally, listing its id in a
 * document's `appliesTo`. No route file, no template, no navigation edit — `src/core/routes.mjs`
 * generates a page per entry and the homepage generates a card per entry.
 *
 * ─────────────────────────────────────────────────────────────────────────────────────────
 * ⚠ `appliesTo` IS A CONFIGURATION SLOT, NOT A LEGAL DETERMINATION.
 *
 * Which documents legally govern which product is a question for whoever reviews the actual
 * legal content — not something to infer from a product being a video editor. So a product
 * does NOT declare its documents here; documents declare their products, and until a document
 * is reviewed its `appliesTo` is `[]` and every product page honestly says the applicable set
 * has not been determined. Filling that in is a deliberate act by somebody qualified to do it.
 *
 * `inScope: false` keeps a product's data here but gives it no page, card or document. Online
 * Earth and Nova Forge are out of NovaLegal's scope by the owner's decision (2026-09-21); the
 * entries are kept, not deleted, so bringing one in is deleting one line.
 *
 * `minimumAge` is the owner's stated product-use age policy (2026-09-21): 13 for the six
 * in-scope products. It is a use policy, NOT a claim of legal compliance or a parental-consent
 * mechanism, and it is never inferred — a product without one says none has been decided.
 *
 * `data` is a short list of VERIFIED facts about what the product stores or sends, taken from
 * reading its code (see docs/FACT-SHEET.md). A claim that is not in the code is not in this list.
 *
 * `hasAccount` and `hasBrowserStorage` are what let `data/documents/_common.js` compute
 * ACCOUNT_PRODUCTS and BROWSER_PRODUCTS from this file instead of a second, hand-maintained
 * list — so adding a product here is the ONLY place its account/browser status needs stating;
 * nothing downstream needs to remember to also update a document's product groups.
 *
 * `blurb` is a plain description of what the product IS — a factual sentence taken from the
 * product's own material — and carries no legal meaning.
 */

export const products = [
  {
    id: 'nova',
    minimumAge: 13,
    hasAccount: true,
    hasBrowserStorage: true,
    data: [
      "Browsing the Nova website without signing in sets no cookies and uses no analytics or third-party scripts. If you choose a language, that choice is saved in your browser.",
      "Creating, signing in to and managing a Nova Account happens on this website. What an account stores is described in the Privacy Policy and the Nova Account document.",
    ],
    name: 'Nova',
    /** Shown under the name. Descriptive only. */
    blurb: 'The independent software studio and front door to the Nova ecosystem.',
    kind: 'Website',
    icon: 'nova',
    /** The product's own site. `null` until one exists; never invented. */
    url: null,
    /** Its section of the support portal. Real, and generated from Nova.Help's catalog. */
    help: 'https://nova-help.shadylabs.workers.dev/help/nova-site',
    overview: [
      'Nova is the public home for the ecosystem: a place to discover the products, their shared direction, and a Nova Account.',
      'Its featured products are Nova Cut and Atlas; the site also links people to support and the Nova community.',
    ],
    capabilities: [
      'Browse the Nova ecosystem and product information.',
      'Create, sign in to, and manage a Nova Account.',
      'Find links to product support and the Nova community.',
    ],
    surfaces: [
      { name: 'Nova website', detail: 'The public ecosystem and account website.' },
    ],
    account: 'A Nova Account connects the ecosystem, but does not gate the products. Product features remain available without signing in.',
  },
  {
    id: 'nova-help',
    minimumAge: 13,
    hasAccount: true,
    hasBrowserStorage: true,
    data: [
      "A support ticket stores what you write, your email address, an optional name, any files you attach, the platform and version you give, the ticket’s history, and the IP address it was sent from.",
      "Nova.Help sets at most two cookies: one keeps you signed in, and one lets you reopen a single ticket. It uses no analytics or third-party scripts.",
    ],
    name: 'Nova.Help',
    blurb: 'The support portal for Nova products and a Nova Account sign-in surface.',
    kind: 'Support website',
    icon: 'help',
    url: 'https://nova-help.shadylabs.workers.dev/',
    help: 'https://nova-help.shadylabs.workers.dev/',
    overview: [
      'Nova.Help is the support portal for the Nova ecosystem. It organizes product help, routes support issues, and provides a web surface for Nova Accounts.',
      'Installed Nova products use the shared account client to connect to Nova Accounts when someone chooses to sign in.',
    ],
    capabilities: [
      'Browse help for Nova products and issue categories.',
      'Start and manage Nova Account sign-in from the web.',
      'Use product support paths without requiring a Nova Account.',
    ],
    surfaces: [
      { name: 'Nova.Help website', detail: 'The support portal and account web surface.' },
      { name: 'Installed product connection', detail: 'The shared account client used by supported Nova desktop products.' },
    ],
    account: 'The complete support path is available to guests. Signing in connects an optional Nova Account; it does not unlock product features.',
  },
  {
    id: 'nova-cut',
    minimumAge: 13,
    hasAccount: true,
    hasBrowserStorage: true,
    data: [
      "Projects and media stay on your computer. Nova Cut’s own settings state that it has no analytics or crash reporting.",
      "The feature that connects Nova Cut to a Nova service is the optional Nova Account sign-in.",
    ],
    name: 'Nova Cut',
    blurb: 'A desktop-first non-linear video and photo editor.',
    kind: 'Desktop app & website',
    icon: 'film',
    url: null,
    help: 'https://nova-help.shadylabs.workers.dev/help/nova-cut',
    overview: [
      'Nova Cut is a professional non-linear editor for video and photos. Its shared core and rendering engine are designed for desktop today and other platforms over time.',
      'The editor keeps projects and media work on the machine, with native file access and FFmpeg-backed export in the desktop application.',
    ],
    capabilities: [
      'Edit multi-track video and audio on a timeline with trimming, splitting, snapping, and undo/redo.',
      'Preview compositions with GPU rendering and work with effects, transitions, keyframes, text, and audio controls.',
      'Export media with configurable resolution, frame rate, codec, quality, and hardware acceleration where available.',
    ],
    surfaces: [
      { name: 'Nova Cut desktop app', detail: 'The editing application for creating video and photo projects.' },
      { name: 'Nova Cut website', detail: 'The separate official website for product information, downloads, updates, and help.' },
    ],
    account: 'A Nova Account is optional. The editor remains usable without signing in.',
  },
  {
    id: 'nova-legal',
    name: 'NovaLegal',
    blurb: 'The legal centre for the Nova ecosystem: terms, privacy and product-specific documents.',
    kind: 'Website',
    icon: 'document',
    minimumAge: 13,
    hasAccount: false,
    hasBrowserStorage: true,
    url: null,
    help: 'https://nova-help.shadylabs.workers.dev/help/nova-site',
    overview: [
      'NovaLegal is a static website that publishes the terms, privacy and product documents for Nova products.',
    ],
    capabilities: [
      'Read, search and print the legal documents for each Nova product.',
      'Switch the language of the page.',
    ],
    surfaces: [{ name: 'NovaLegal website', detail: 'This site.' }],
    account: 'NovaLegal has no accounts of its own. Its header links to the shared Nova Account sign-in and creation pages on the Nova website; nothing about that account is stored here.',
    data: [
      'This site has no forms, no accounts and no analytics. It saves your theme, language and text-style choice in your browser.',
      'The header’s "Sign in" and "Create account" links go straight to the real Nova Account pages on the Nova website. NovaLegal does not implement sign-in itself and does not see or store anything about your account.',
    ],
  },
  {
    id: 'online-earth',
    inScope: false,
    name: 'Online Earth',
    blurb: 'A spatial platform for exploring the world and what is connected to it.',
    kind: 'Website & desktop app',
    icon: 'globe',
    url: null,
    help: 'https://nova-help.shadylabs.workers.dev/help/online-earth',
  },
  {
    id: 'replay-gg',
    minimumAge: 13,
    hasAccount: true,
    hasBrowserStorage: false,
    data: [
      "Recordings and clips are saved on your computer. System audio, microphone and webcam inputs exist as options in its settings.",
      "Replay.GG checks GitHub’s release hosting for a newer version, and downloads an update only when you choose to.",
    ],
    name: 'Replay.GG',
    blurb: 'A desktop app for recording gameplay and creating clips from PC games.',
    kind: 'Desktop app',
    icon: 'record',
    url: null,
    help: 'https://nova-help.shadylabs.workers.dev/help/replay-gg',
    overview: [
      'Replay.GG captures gameplay from a Windows desktop and organizes recordings and clips in a local media library.',
      'It can record a full session or maintain an instant-replay buffer so a recent moment can be saved after it happens.',
    ],
    capabilities: [
      'Record gameplay from a selected display and save full sessions.',
      'Save clips from an instant-replay buffer and create clips from recordings.',
      'Browse recordings and clips, with media metadata and thumbnails where available.',
    ],
    surfaces: [
      { name: 'Replay.GG desktop app', detail: 'The Windows gameplay capture, replay, clip, and media-library application.' },
    ],
    account: 'A Nova Account is optional. Replay.GG can be used without signing in.',
  },
  {
    id: 'atlas',
    minimumAge: 13,
    hasAccount: true,
    hasBrowserStorage: true,
    data: [
      "Atlas works on your computer with nothing connected. Its settings, memory and file index stay on your computer.",
      "Anything you send to an AI provider you add, or to a web search service, leaves your computer. Atlas Terms describes exactly what is sent.",
      "API keys you enter are stored in Windows Credential Manager on your computer, not on a Nova server.",
    ],
    name: 'Atlas',
    blurb: 'A local-first desktop assistant that helps operate a computer.',
    kind: 'Desktop app & website',
    icon: 'compass',
    url: null,
    help: 'https://nova-help.shadylabs.workers.dev/help/atlas',
    overview: [
      'Atlas is a local-first desktop assistant. It can work with files, applications, system information, voice, and its on-device memory through declared capabilities.',
      'The desktop app is designed to keep its work on the computer. An optional external model can add wider-world reasoning, but is not required for Atlas to function.',
    ],
    capabilities: [
      'Find local files, open registered applications, and report system status.',
      'Use declared skills to interact with desktop interfaces and perform approved actions.',
      'Use offline voice, local memory, and a local file index when available.',
    ],
    surfaces: [
      { name: 'Atlas desktop app', detail: 'The local-first assistant, summoned with a global shortcut.' },
      { name: 'Atlas website', detail: 'The separate marketing and download website for Atlas.' },
    ],
    account: 'A Nova Account is optional and does not unlock Atlas features. Signing in links the ecosystem identity without uploading this machine’s Atlas data.',
  },
  {
    id: 'nova-forge',
    inScope: false,
    name: 'Nova Forge',
    blurb: 'A desktop toolkit for organizing game configuration, mods, profiles, and saves.',
    kind: 'Desktop app',
    /** No dedicated icon drawn yet; falls back to the generic document glyph. */
    icon: 'draft',
    url: null,
    /** No Nova.Help section exists for it yet. */
    help: null,
  },
];

/** A product by id, or null. Never throws — the id usually came from a route. */
export const getProduct = (id) => products.find((product) => product.id === id) ?? null;
