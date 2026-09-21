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
 * ⚠ NOTHING IN THIS FILE IS A LEGAL STATEMENT. No company name, no legal entity, no address,
 * no jurisdiction. Those are facts nobody has confirmed, and a placeholder that reads like one
 * is worse than an obvious gap. See `data/documents/index.js`.
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
   * Where a legal enquiry goes. `null` hides the block that shows it rather than printing a
   * route nobody reads.
   *
   * ⚠ Deliberately unset. Which address handles legal correspondence is a decision, not a
   * detail, and inventing one here would put it on every page of the site.
   */
  contactEmail: null,

  /** The community. The one link on this site that is real rather than a placeholder. */
  discord: 'https://discord.gg/XBhER9Z6EB',

  /** Nova.Help — the support portal. Separate from legal on purpose; see the footer. */
  help: 'https://nova-help.17sh8dy.workers.dev/',
};

/** Primary navigation. Category ids resolve through `data/categories.js`. */
export const nav = [
  { href: '/', label: 'Legal home' },
  { href: '/terms', label: 'Terms' },
  { href: '/privacy', label: 'Privacy' },
  { href: '/community-guidelines', label: 'Community' },
  { href: '/account', label: 'Accounts' },
  { href: '/products', label: 'Products' },
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
    ],
  },
  {
    heading: 'Legal',
    links: [
      { href: '/terms', label: 'Terms of Service' },
      { href: '/privacy', label: 'Privacy Policy' },
      { href: '/acceptable-use', label: 'Acceptable Use' },
      { href: '/cookies', label: 'Cookies & Tracking' },
      { href: '/community-guidelines', label: 'Community Guidelines' },
      { href: '/copyright', label: 'Copyright & DMCA' },
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
