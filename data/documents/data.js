/**
 * Data & Retention.
 *
 * ⚠ THE HONEST ANSWER TO "HOW LONG" IS "NOT SET". The owner confirmed (2026-09-21) that no
 * fixed retention or deletion period has been committed to, and told us not to invent one. The
 * only automatic expiries in the code are for sign-in sessions, password-reset tokens and
 * sign-in approvals — and their lengths are deliberately not quoted here, because a number in a
 * legal document becomes a promise the code has to keep.
 */
import { ALL_PRODUCTS, PUBLISHED } from './_common.js';

export const document = {
  id: 'data',
  title: 'Data & Retention',
  description: 'How long information is kept, where it is held, and how it is removed.',
  category: 'privacy',
  appliesTo: ALL_PRODUCTS,
  status: 'published',
  effectiveDate: PUBLISHED,
  updatedDate: PUBLISHED,
  version: '1.0',
  versions: [],
  sections: [
    {
      id: 'where',
      heading: 'Where information is held',
      body: [
        {
          list: [
            '**On your computer** — Nova Cut projects and media, Replay.GG recordings and clips, and Atlas’s settings, memory and file index. Nova does not hold these.',
            '**In your browser** — your theme and language choices, and a sign-in or ticket cookie if you use those features.',
            '**On Nova’s hosting (Cloudflare)** — Nova Account information, profile pictures, and Nova.Help tickets and attachments.',
            '**With third parties you choose to use** — for example an AI provider or web search service used through Atlas. See [Atlas Terms](/atlas-terms).',
          ],
        },
      ],
    },
    {
      id: 'how-long',
      heading: 'How long it is kept',
      body: [
        'Nova has not set a fixed period for keeping account information, tickets or attachments. They are kept until they are deleted or removed as described in [Account & Data Deletion](/account-deletion).',
        'Some records expire on their own, such as sign-in sessions and password-reset requests.',
        'Cloudflare may keep operational logs for Nova.Help under its own policies. Nova has not set a retention period for them.',
      ],
    },
    {
      id: 'removal',
      heading: 'How information is removed',
      body: [
        'You can delete a Nova Account yourself. Other removal requests are handled by hand through a support ticket or by email to {{contact}}. Nova does not promise a time frame, and does not promise that every copy will be removed at once, for example from backups or from logs held by a service provider.',
      ],
    },
  ],
  related: ['privacy', 'account-deletion', 'security'],
};
