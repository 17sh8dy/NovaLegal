/**
 * Nova Account Terms.
 *
 * Facts verified 2026-09-21 in NovaHelp/packages/nova-accounts and Nova/functions:
 *   - optional; no product feature is gated;
 *   - account management (profile, email, password, sign out other sessions, delete) is live on
 *     the Nova website;
 *   - Google sign-in: code exists, NOT LIVE (no credentials configured on the deployment);
 *   - password reset: page exists, NO MAIL TRANSPORT is configured, so no email is sent. The
 *     owner asked (2026-09-21) that it be documented as not currently available;
 *   - two-step verification: not available (the account page says so).
 */
import { ACCOUNT_PRODUCTS, PUBLISHED } from './_common.js';

export const document = {
  id: 'account',
  title: 'Nova Account Terms',
  description: 'The terms for a Nova Account — one identity across every Nova product.',
  category: 'accounts',
  appliesTo: ACCOUNT_PRODUCTS,
  status: 'published',
  effectiveDate: PUBLISHED,
  updatedDate: PUBLISHED,
  version: '1.0',
  versions: [],
  sections: [
    {
      id: 'optional',
      heading: 'A Nova Account is optional',
      body: [
        'A Nova Account is one sign-in that works across Nova products: Nova, Nova.Help, Nova Cut, Replay.GG and Atlas. It is optional. You can use every product, and ask for support, without one, and an account does not unlock product features today.',
        'A paid plan may one day require an account. No paid plan is offered today. See [Subscriptions](/subscriptions).',
      ],
    },
    {
      id: 'stores',
      heading: 'What an account stores',
      body: [
        'Your email address, your name if you give one, a salted one-way hash of your password, your sign-in sessions, which Nova products you have used it with, records of desktop-app sign-in approvals, an optional profile picture, and one small settings document per product if a product saves settings to your account. The full list, and where it is held, is in the [Privacy Policy](/privacy#account-data).',
        'Signing in to a desktop app links that app to your account. It does not upload the app’s files. For Atlas, signing in does not upload Atlas’s memory or data from your computer.',
      ],
    },
    {
      id: 'your-part',
      heading: 'Your part',
      body: [
        {
          list: [
            'Give an email address you can use, and keep it accurate. Nova does not currently verify email addresses by sending email.',
            'Choose a password nobody else knows, and do not share it. Nova will never ask you for it.',
            'You are responsible for what happens under your account.',
            'A Nova Account is recommended for ages 13 and up. See the [Terms of Service](/terms#age).',
          ],
        },
      ],
    },
    {
      id: 'manage',
      heading: 'Managing your account',
      body: [
        'On the Nova website you can change your name, email address, password and picture, sign out your other sessions, and delete your account. See [Account & Data Deletion](/account-deletion).',
      ],
    },
    {
      id: 'not-available',
      heading: 'Not available yet',
      body: [
        {
          list: [
            '**Google sign-in** is coming soon. It is not available today.',
            '**Password reset** is not currently available. There is no email service connected to send a reset link, so a request for one does not send anything. If you are locked out, contact {{contact}}.',
            '**Two-step verification** is not available.',
          ],
        },
      ],
    },
    {
      id: 'ending',
      heading: 'Suspension and ending',
      body: [
        'Nova may suspend or close an account that is used in breach of the [Terms of Service](/terms) or the [Acceptable Use Policy](/acceptable-use). You may delete your account at any time.',
      ],
    },
  ],
  related: ['terms', 'privacy', 'account-deletion', 'subscriptions'],
};
