/**
 * Account & Data Deletion.
 *
 * ⚠ CORRECTS AN ASSUMPTION. The owner expected deletion to be manual-only "unless the code proves
 * otherwise". It does: Nova/functions/_lib/manage.mjs + NovaHelp/packages/nova-accounts
 * `deleteAccount` implement self-service deletion on the Nova website, and it is live (the route
 * exists on nova-780.pages.dev). What it removes and keeps below is read from that code
 * (`deleteBody`, `anonymiseTicketsFor`, `purgeAvatars`). There is NO self-service data export.
 * There is NO fixed retention or deletion period, and none may be written here.
 */
import { ACCOUNT_PRODUCTS, PUBLISHED } from './_common.js';

export const document = {
  id: 'account-deletion',
  title: 'Account & Data Deletion',
  description: 'How to close a Nova Account, and what happens to information when you do.',
  category: 'accounts',
  appliesTo: ACCOUNT_PRODUCTS,
  status: 'published',
  effectiveDate: PUBLISHED,
  updatedDate: PUBLISHED,
  version: '1.0',
  versions: [],
  sections: [
    {
      id: 'delete',
      heading: 'Deleting your account yourself',
      body: [
        'If you have a Nova Account with a password, you can delete it on the Nova website: sign in, open your account, and choose “Delete account”. You confirm with your password and by typing your email address. There is no grace period, and an account cannot be brought back.',
        'Deleting removes your Nova Account and your sign-in on every Nova product, your name and profile picture, and anything a Nova product saved to your account.',
      ],
    },
    {
      id: 'tickets',
      heading: 'Support tickets',
      body: [
        'Tickets you sent while signed in are kept, so the support history is not lost. When you delete your account, your name, email address and IP address are removed from them and they are no longer linked to you. What you wrote in a ticket, and any files you attached, stay as they were.',
        'Tickets you sent as a guest are not linked to an account. To have one removed, send a request as described below.',
      ],
    },
    {
      id: 'requests',
      heading: 'Other requests: deletion or a copy of your data',
      body: [
        'There is no automatic way to download your data or to delete a ticket. To ask for either, open a support ticket on [Nova.Help](help:) or write to {{contact}}, and say what you want.',
        'These requests are handled by a person, by hand. Nova does not promise a response time, does not promise immediate deletion, and does not promise a copy in any particular format. Nova will do what is technically possible and what the law allows.',
      ],
    },
    {
      id: 'retention',
      heading: 'How long things are kept',
      body: [
        'Nova has not committed to a fixed period for keeping or deleting information. See [Data & Retention](/data).',
        'Files on your own computer, such as Nova Cut projects, Replay.GG recordings and Atlas’s memory, are not held by Nova. Uninstalling a product or deleting its data on your computer removes them.',
      ],
    },
    {
      id: 'email',
      heading: 'Confirmation email',
      body: [
        'Nova does not currently send email from its live services, so you should not expect a confirmation message after deleting your account.',
      ],
    },
  ],
  related: ['account', 'data', 'privacy', 'contact'],
};
