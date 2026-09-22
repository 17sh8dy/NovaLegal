/**
 * Site-wide configuration.
 *
 * Anything a deployment needs to change — the origin, where the other Nova products live,
 * whether a contact route is actually staffed — lives here rather than in page copy, so a
 * claim can never outlive the fact behind it. The same rule Nova.Help's `data/site.js` follows.
 *
 * ─────────────────────────────────────────────────────────────────────────────────────────
 * `null` MEANS "NOT READY YET", AND IT IS THE HONEST DEFAULT.
 *
 * Most Nova products have no public site. Rather than inventing plausible addresses that would
 * later have to be hunted down and removed, every unbuilt one is `null` — and everything that
 * renders a link checks. A `null` destination renders as plain text or not at all, never as a
 * dead link and never as "coming soon".
 *
 * ⚠ WHAT IS AND IS NOT A FACT HERE. `operator` and `contactEmail` were stated by the owner
 * (2026-09-21) and are the only two. There is no company, no legal entity, no postal address,
 * no phone number, no registered agent and NO GOVERNING LAW: the owner has not chosen a state,
 * so no document may name one. Do not add any of them without being told.
 */

export const site = {
  name: 'Nova Legal',
  shortName: 'Nova Legal',
  tagline: 'Legal information for the Nova ecosystem',

  /** A short description of what readers can use this centre for. */
  lede: 'One place to find the status and legal information for Nova products.',

  description:
    'The legal centre for the Nova ecosystem. Terms, privacy, community and product-specific ' +
    'documents in one place.',

  /** Set at deploy time. `null` while there is no public address for this site. */
  origin: null,

  /**
   * Who operates Nova, as it appears in the documents. Stated by the owner: an individual who
   * uses the name "17 Shady". NOT a company, and never inferred from a handle or an address.
   */
  operator: '17 Shady',

  /**
   * Where a legal enquiry goes. Stated by the owner: the same address Nova.Help uses. There is
   * deliberately no second legal address, phone number or postal address.
   */
  contactEmail: 'getnovasupport@gmail.com',

  /** The community. The one link on this site that is real rather than a placeholder. */
  discord: 'https://discord.gg/XBhER9Z6EB',

  /** Nova.Help — the support portal. Separate from legal on purpose; see the footer. */
  help: 'https://nova-help.17sh8dy.workers.dev/',

  /**
   * The real, live Nova Account sign-in, creation and management pages, on the Nova website.
   * NovaLegal implements no accounts or sign-in of its own — these are a link OUT to the one
   * shared identity system, the same way `help` links out to Nova.Help. Verified live
   * 2026-09-24.
   */
  accountSignIn: 'https://nova-780.pages.dev/account/sign-in',
  accountCreate: 'https://nova-780.pages.dev/account/new',
  accountManage: 'https://nova-780.pages.dev/account',

  /**
   * `GET`, cross-site, `credentials: 'include'` — answers `{ signedIn: boolean }` so the header
   * chip can hide "Sign in" / "Create account" for someone already signed in, instead of always
   * showing them regardless. Requires Nova's own CORS allowlist (see that repo's
   * `functions/account/[[path]].mjs`, `legalOrigins()`) to include the origin this site is
   * actually served from — `http://localhost:4500` (this site's dev server) is allowed by
   * default there; a real deployed origin needs adding to Nova's `NOVA_LEGAL_ORIGINS`.
   */
  accountStatus: 'https://nova-780.pages.dev/account/status',
};

/** Primary navigation. Category ids resolve through `data/categories.js`. */
export const nav = [
  { href: '/', label: 'Legal home' },
  { href: '/terms', label: 'Terms' },
  { href: '/privacy', label: 'Privacy' },
  { href: '/cookies', label: 'Cookies' },
  { href: '/account', label: 'Accounts' },
  { href: '/products', label: 'Products' },
  { href: '/contact', label: 'Contact' },
];

/**
 * The footer, as columns.
 *
 * A `href` of `null` renders the label as plain text — used for destinations that do not exist
 * yet. Nothing here fabricates a URL.
 */
export const footer = [
  {
    heading: 'Nova',
    links: [
      { href: null, label: 'About Nova', note: 'site pending' },
      { href: '/products', label: 'Products' },
      { href: '/contact', label: 'Legal contact & notices' },
    ],
  },
  {
    heading: 'Legal',
    links: [
      { href: '/terms', label: 'Terms of Service' },
      { href: '/privacy', label: 'Privacy Policy' },
      { href: '/cookies', label: 'Cookies & Browser Storage' },
      { href: '/acceptable-use', label: 'Acceptable Use' },
      { href: '/account', label: 'Nova Account' },
      { href: '/atlas-terms', label: 'Atlas Terms' },
    ],
  },
  {
    heading: 'Help',
    links: [{ href: site.help, label: 'Nova.Help', external: true }],
  },
  {
    heading: 'Community',
    links: [{ href: site.discord, label: 'Join the Nova Discord', external: true }],
  },
];
