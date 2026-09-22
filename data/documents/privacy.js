/**
 * Privacy Policy.
 *
 * Every statement here was checked against the code (docs/FACT-SHEET.md, 2026-09-21). If a
 * product starts collecting something new, this document changes in the same commit — and
 * nothing here may claim a compliance, a certification or a retention period.
 */
import { ALL_PRODUCTS, PUBLISHED } from './_common.js';

export const document = {
  id: 'privacy',
  title: 'Privacy Policy',
  description: 'What information Nova handles, why, and what happens to it.',
  category: 'privacy',
  appliesTo: ALL_PRODUCTS,
  status: 'published',
  effectiveDate: PUBLISHED,
  updatedDate: PUBLISHED,
  version: '1.0',
  versions: [],
  sections: [
    {
      id: 'who',
      heading: 'Who this covers',
      body: [
        'This policy covers Nova, Nova.Help, NovaLegal, Nova Cut (the app and its website), Replay.GG, and Atlas (the app and its website). Nova is owned and operated by 17 Shady, an individual.',
        'Nova collects as little as each product needs. What that is differs by product, so this policy separates what Nova-wide services hold from what each product does on its own.',
      ],
    },
    {
      id: 'at-a-glance',
      heading: 'At a glance',
      body: [
        {
          list: [
            '**Nova, NovaLegal and the Nova Cut and Atlas websites** have no analytics, no advertising and no third-party scripts. They store only your choices (such as theme and language) in your browser.',
            '**A Nova Account** is optional. If you create one, Nova stores the details listed in “Nova Account information” below.',
            '**Nova.Help** stores the support tickets you send it.',
            '**Nova Cut, Replay.GG and Atlas** keep your projects, recordings, files and settings on your computer.',
            '**Atlas** sends information to a third party only if you add an AI provider or use web search. See “Atlas and third-party services”.',
          ],
        },
      ],
    },
    {
      id: 'account-data',
      heading: 'Nova Account information',
      body: [
        'A Nova Account is optional. If you create one, Nova stores:',
        {
          list: [
            'your email address, and your name if you give one;',
            'your password, as a salted one-way hash. The password itself is not stored and Nova cannot read it;',
            'a record of each sign-in (session), including which Nova product it was for, a label, and when it expires;',
            'which Nova products you have used your account with;',
            'a record of each request to approve sign-in for a desktop app, including the product, the device name and the time;',
            'a profile picture, if you add one; and',
            'one small settings document per product, if a product saves its settings to your account.',
          ],
        },
        'Nova does not currently verify email addresses by sending email. Google sign-in is planned and is not available yet.',
        'The account is shared across Nova products, so signing in to one Nova product uses the same account as the others. Details are in the [Nova Account Terms](/account).',
      ],
    },
    {
      id: 'support-data',
      heading: 'Support tickets (Nova.Help)',
      body: [
        'You do not need an account to send a ticket. A ticket stores what you write, your email address, an optional name, any files you attach, the platform and version you give, the history of replies and status changes, and the IP address the ticket was sent from (used to limit abuse of the form).',
        'Tickets you send while signed in are linked to your account. Tickets you send as a guest are not.',
        'Please do not put passwords, recovery codes, payment card numbers or other people’s personal information in a ticket.',
      ],
    },
    {
      id: 'on-device',
      heading: 'Data that stays on your computer',
      body: [
        'Nova Cut, Replay.GG and Atlas are desktop apps. Their projects, recordings, clips, files, settings and, for Atlas, its memory and file index, are stored on your computer. Nova does not receive them.',
        'Nova Cut’s own settings state that it has no analytics or crash reporting. No analytics or crash-reporting code was found in Replay.GG or Atlas either.',
        'Replay.GG can record system audio, a microphone and a webcam if you turn those options on. Nova Cut and Replay.GG connect to a Nova service only when you sign in to a Nova Account.',
        'Replay.GG and Atlas contact GitHub’s release hosting to check for a newer version. An update is downloaded only when you choose to.',
      ],
    },
    {
      id: 'atlas-third-parties',
      heading: 'Atlas and third-party services',
      body: [
        'Atlas works on your computer with nothing connected. It sends information off your computer only in two cases: if you add an AI provider, and when it searches the web or opens a web page.',
        'What Atlas sends in those cases is described in [Atlas Terms](/atlas-terms). Those services keep, log and use what they receive under their own terms and privacy policies, which Nova does not control. Any API key you enter is stored in Windows Credential Manager on your computer, not on a Nova server.',
      ],
    },
    {
      id: 'browser',
      heading: 'Cookies and browser storage',
      body: [
        'Nova’s websites use a small number of cookies and browser-storage entries, listed in [Cookies & Browser Storage](/cookies).',
      ],
    },
    {
      id: 'hosting',
      heading: 'Where Nova holds information',
      body: [
        'Nova.Help and the account features of the Nova website run on Cloudflare. Account information, tickets and attachments are held in Cloudflare’s database and file storage on Nova’s behalf. The Nova.Help service has Cloudflare’s logging feature turned on, so Cloudflare may record request and error logs for it under Cloudflare’s own policies. Nova has not set a retention period for those logs.',
      ],
    },
    {
      id: 'use',
      heading: 'How information is used',
      body: [
        'Nova uses information to provide the service it was given for: to sign you in, to answer a ticket, and to limit abuse. Nothing in the audited code uses account or ticket information for advertising, and Nova does not share it with advertisers or data brokers.',
      ],
    },
    {
      id: 'keeping',
      heading: 'How long information is kept, and your choices',
      body: [
        'Nova has not set a fixed retention period for account information or tickets. Sign-in sessions and other temporary records expire on their own.',
        'You can change your name, email, password and picture, sign out other sessions, and delete your account yourself from the Nova website. You can ask for a ticket or other information to be removed by sending a support ticket. See [Account & Data Deletion](/account-deletion) and [Data & Retention](/data).',
        'There is no automatic download of your data. You can ask for it in a ticket, and Nova will handle the request by hand.',
      ],
    },
    {
      id: 'age',
      heading: 'Age',
      body: [
        'Nova’s products are recommended for people aged 13 and over. This is a recommendation, not a verified requirement — Nova does not check anyone’s age. If Nova learns that an account belongs to someone under the recommended age, it may close the account. See the [Terms of Service](/terms#age).',
      ],
    },
    {
      id: 'security',
      heading: 'Security',
      body: ['What Nova does to protect information is described in [Security](/security). No system is free of risk.'],
    },
    {
      id: 'changes',
      heading: 'Changes, languages and contact',
      body: [
        'This policy may change. Each version shows its number and date, and earlier versions are listed in the version history.',
        'English is the original version. Other languages are translations, and if they differ, the English controls.',
        'Contact: {{contact}}.',
      ],
    },
  ],
  related: ['cookies', 'data', 'security', 'account-deletion', 'account', 'atlas-terms', 'terms'],
};
