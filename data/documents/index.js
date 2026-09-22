/**
 * The document registry — the whole of Nova Legal's content, as data.
 *
 * ═════════════════════════════════════════════════════════════════════════════════════════
 * ⚠  READ THIS BEFORE ADDING ANYTHING TO A DOCUMENT.
 * ═════════════════════════════════════════════════════════════════════════════════════════
 *
 * **A DOCUMENT IS EITHER `published` (COMPLETE, DATED, VERSIONED) OR `pending` (EMPTY).** There
 * is no half-state, and `src/core/catalog.mjs` enforces it — `npm run check` fails the build:
 *
 *   · a `status: 'pending'` document may NOT carry `sections`, an `effectiveDate`, an
 *     `updatedDate`, a `version` or any `versions`. It MAY carry one plain `note` (a sentence
 *     about its own status, e.g. "planned, not currently offered") — never a term;
 *   · a `status: 'published'` document MUST carry sections, both dates and a version, and a
 *     non-empty `appliesTo`; every link in its text must resolve; and it may not use words
 *     that claim compliance, certification, attorney review or absolute security;
 *   · every `related` id and every `appliesTo` product id must resolve.
 *
 * Published documents were written 2026-09-21 from the code, not from the product names — see
 * docs/FACT-SHEET.md. NONE has been reviewed by an attorney, and the site says so.
 *
 * The two states are visually unmistakable on the page: a pending document renders a marked
 * "Content pending" panel where its body would be, and never anything that could be read as a
 * legal statement.
 *
 * SO: to add real content later, write the `sections`, set the dates and the version, and flip
 * `status` to `'published'`. That is the whole change on this side.
 *
 * ─────────────────────────────────────────────────────────────────────────────────────────
 * THE SHAPE OF A DOCUMENT
 *
 *     id            the route: `/terms` is `id: 'terms'`. Kebab-case, unique.
 *     title         what it is called.
 *     description   one sentence. Descriptive, never a legal claim.
 *     category      a `data/categories.js` id. Decides where it is browsed from.
 *     appliesTo     product ids this document governs. `[]` = NOT YET DETERMINED, which the
 *                   product pages say in as many words. Filling this in is a legal decision.
 *     status        'pending' | 'published'.
 *     effectiveDate 'YYYY-MM-DD' | null. Never invented.
 *     updatedDate   'YYYY-MM-DD' | null.
 *     version       '1.0' | null.
 *     sections      [{ id, heading, body }] — `body` is an array of paragraph strings.
 *     versions      previous versions: [{ version, effectiveDate, archivedDate, href }].
 *     related       ids of documents a reader will want next.
 *
 * `related` is one-directional here and made SYMMETRIC by the catalog — naming B from A also
 * puts A on B's page. That is deliberate: a legal document set where the cross-references only
 * point one way is how a reader ends up in a dead end.
 *
 * ─────────────────────────────────────────────────────────────────────────────────────────
 * WHAT IS DELIBERATELY ABSENT
 *
 * No regional variants, no state-specific notices, no subprocessor list, no DPAs, no
 * enterprise or developer terms. The architecture supports adding them — a new document is one
 * file and one line here, and `region` is the field it would grow. Creating empty shells for
 * documents nobody has decided to write would be the same mistake as inventing their contents.
 */

import { document as terms } from './terms.js';
import { document as termsOfUsage } from './terms-of-usage.js';
import { document as privacy } from './privacy.js';
import { document as acceptableUse } from './acceptable-use.js';
import { document as cookies } from './cookies.js';
import { document as communityGuidelines } from './community-guidelines.js';
import { document as copyright } from './copyright.js';
import { document as dmca } from './dmca.js';
import { document as account } from './account.js';
import { document as accountDeletion } from './account-deletion.js';
import { document as data } from './data.js';
import { document as security } from './security.js';
import { document as atlasTerms } from './atlas-terms.js';
import { document as replayGgTerms } from './replay-gg-terms.js';
import { document as novaCutTerms } from './nova-cut-terms.js';
import { document as subscriptions } from './subscriptions.js';
import { document as contact } from './contact.js';

/** Order within a category is order on screen. */
export const documents = [
  terms,
  termsOfUsage,
  atlasTerms,
  replayGgTerms,
  novaCutTerms,
  acceptableUse,
  subscriptions,
  privacy,
  cookies,
  data,
  security,
  communityGuidelines,
  copyright,
  dmca,
  account,
  accountDeletion,
  contact,
];
