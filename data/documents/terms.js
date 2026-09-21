/**
 * Terms of Service
 *
 * ⚠ PENDING. No legal content has been written for this document. Everything that would
 * carry meaning — sections, dates, version — is absent, and `npm run check` fails if any of it
 * appears while `status` is 'pending'. See `data/documents/index.js`.
 *
 * The root agreement, so most other documents point back at it. Note that `related` is made
 * SYMMETRIC by the catalog — naming a document here also lists this one on that document's page.
 */
export const document = {
  id: 'terms',
  title: 'Terms of Service',
  description: 'The agreement between you and Nova for using its products.',
  category: 'terms',

  /* ⚠ NOT YET DETERMINED. Which products a document governs is a legal decision, not an
     inference from what the product does. Empty until somebody qualified fills it in; every
     product page says so plainly rather than guessing. */
  appliesTo: [],

  status: 'pending',
  effectiveDate: null,
  updatedDate: null,
  version: null,
  sections: [],
  versions: [],

  related: ['acceptable-use', 'privacy', 'account'],
};
