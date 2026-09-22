/**
 * Terms of Usage — a pointer, deliberately NOT a second set of terms.
 *
 * The owner asked (2026-09-21) for one canonical Terms document. This page is kept so the URL
 * keeps working, and does nothing except say where the terms are. It must never grow terms of
 * its own: two competing sets is exactly the contradiction this replaced.
 */
import { ALL_PRODUCTS, PUBLISHED } from './_common.js';

export const document = {
  id: 'terms-of-usage',
  title: 'Terms of Usage',
  description: 'Information about the terms for using Nova products.',
  category: 'terms',
  appliesTo: ALL_PRODUCTS,
  status: 'published',
  effectiveDate: PUBLISHED,
  updatedDate: PUBLISHED,
  version: '1.0',
  versions: [],
  sections: [
    {
      id: 'where',
      heading: 'Where the terms are',
      body: [
        'Nova has one set of terms for using its products: the [Terms of Service](/terms). This page does not add to them or change them.',
        'Some products also have their own terms: [Atlas Terms](/atlas-terms), [Replay.GG Terms](/replay-gg-terms) and [Nova Cut Terms](/nova-cut-terms).',
      ],
    },
  ],
  related: ['terms'],
};
