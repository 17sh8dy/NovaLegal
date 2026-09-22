/**
 * Terms of Service — the canonical Terms.
 *
 * ⚠ NO GOVERNING LAW. The owner has not chosen a state (2026-09-21), so this document names
 * none and has no "governing law" or "venue" section. Do not add one until the owner supplies
 * the state.
 *
 * ⚠ NOT ATTORNEY-REVIEWED. The disclaimers and the limit on liability below are standard
 * wording, included because a set of terms without them is incomplete — they are exactly the
 * clauses that most need a lawyer's eyes. See docs/FACT-SHEET.md.
 */
import { ALL_PRODUCTS, PUBLISHED } from './_common.js';

export const document = {
  id: 'terms',
  title: 'Terms of Service',
  description: 'The agreement between you and Nova for using its products.',
  category: 'terms',
  appliesTo: ALL_PRODUCTS,
  status: 'published',
  effectiveDate: PUBLISHED,
  updatedDate: PUBLISHED,
  version: '1.0',
  versions: [],
  sections: [
    {
      id: 'scope',
      heading: 'What these terms cover',
      body: [
        'These are the terms for using Nova’s websites and software: Nova, Nova.Help, NovaLegal, Nova Cut (the app and its website), Replay.GG, and Atlas (the app and its website).',
        'Nova is owned and operated by 17 Shady, an individual. Nova is not a company.',
        'Some products also have their own terms ([Atlas Terms](/atlas-terms), [Replay.GG Terms](/replay-gg-terms), [Nova Cut Terms](/nova-cut-terms)). Those apply in addition to this document, and if they differ for that product, the product’s own terms decide. The [Privacy Policy](/privacy), the [Nova Account Terms](/account) and the [Acceptable Use Policy](/acceptable-use) are also part of your agreement with Nova.',
      ],
    },
    {
      id: 'agreeing',
      heading: 'Agreeing to these terms',
      body: [
        'By using a Nova product you agree to these terms. If you do not agree, do not use it.',
        'Nova may update these terms. Each version shows its number and effective date, and earlier versions are listed in the version history. Using a product after a new version takes effect means you accept the new version.',
      ],
    },
    {
      id: 'age',
      heading: 'Recommended age',
      body: [
        'For the current Nova products:',
        {
          list: [
            'Nova — 13+ recommended',
            'Nova.Help — 13+ recommended',
            'NovaLegal — 13+ recommended',
            'Nova Cut — 13+ recommended',
            'Replay.GG — 13+ recommended',
            'Atlas — 13+ recommended',
          ],
        },
        'This is a recommendation, not an enforced age requirement: Nova does not verify anyone’s age, and nothing in these products technically checks or blocks it. It is not a statement that Nova meets any children’s-privacy law, and Nova does not currently have a parental-consent feature. If Nova learns that an account belongs to someone under the recommended age, it may close that account.',
        'Other Nova products, including any future games or AI products, may carry a different recommended age. That would be stated in the terms for that product before it applies.',
      ],
    },
    {
      id: 'accounts',
      heading: 'Accounts are optional',
      body: [
        'You do not need a Nova Account to use Nova’s products or to ask Nova.Help for support. An account is optional and does not unlock product features today.',
        'If you create one, give accurate details, keep your password to yourself, and remember that you are responsible for what happens under your account. The [Nova Account Terms](/account) explain what an account stores.',
        'A paid plan may one day require an account. No paid plan is offered today.',
      ],
    },
    {
      id: 'your-content',
      heading: 'Your files and content',
      body: [
        'What you create with Nova software stays yours. Nova does not claim ownership of your projects, recordings, files or messages.',
        'Nova Cut, Replay.GG and Atlas work on your own computer, and the files they handle stay there unless you choose to send them somewhere. The [Privacy Policy](/privacy) says exactly what leaves your computer and when.',
        'If you send something to Nova, such as a support ticket or a profile picture, you give Nova permission to store and use it to provide that service to you.',
        'You are responsible for having the right to use the material you work with, and for keeping your own backups.',
      ],
    },
    {
      id: 'acceptable-use',
      heading: 'Using Nova responsibly',
      body: ['Use Nova lawfully and in line with the [Acceptable Use Policy](/acceptable-use).'],
    },
    {
      id: 'software-licences',
      heading: 'Software licences',
      body: [
        'Where a Nova product is distributed with its own software licence, that licence governs your use of that product’s code. These terms do not take away any right that licence gives you.',
      ],
    },
    {
      id: 'third-parties',
      heading: 'Third-party services',
      body: [
        'Nova products can work with services Nova does not run: for example AI providers and web search services you choose to use with Atlas, GitHub’s release hosting for updates, Cloudflare’s hosting for Nova.Help and the Nova website, and links to Discord.',
        'Those services have their own terms and privacy policies, and Nova does not control them or what they keep. [Atlas Terms](/atlas-terms) describes the ones Atlas can use.',
      ],
    },
    {
      id: 'payments',
      heading: 'Payments and subscriptions',
      body: [
        'No Nova product currently charges money or accepts payment. Subscriptions and paid plans are planned but not offered.',
        'If a paid plan is introduced, it will have its own terms, published before they apply. Nothing in this document sets a price, a billing period, a refund rule or a cancellation rule. See [Subscriptions](/subscriptions).',
      ],
    },
    {
      id: 'availability',
      heading: 'Changes and availability',
      body: [
        'Nova is a small project run by one person. Nova may change, suspend or stop any product, feature or service, and does not promise that a website or service will always be available.',
      ],
    },
    {
      id: 'suspension',
      heading: 'Suspension and ending',
      body: [
        'You may stop using Nova at any time and may delete your account. See [Account & Data Deletion](/account-deletion).',
        'Nova may suspend or close access to a hosted service, such as an account or Nova.Help, if it is used in a way that breaks these terms or the Acceptable Use Policy.',
      ],
    },
    {
      id: 'disclaimers',
      heading: 'No warranty',
      body: [
        'Nova products and services are provided “as is” and “as available”. To the extent the law allows, Nova gives no warranty of any kind, including that a product will be error-free, uninterrupted or fit for a particular purpose.',
      ],
    },
    {
      id: 'liability',
      heading: 'Limit on liability',
      body: [
        'To the extent the law allows, Nova and 17 Shady are not liable for indirect or consequential loss, or for lost data, lost work or lost profits, arising from your use of a Nova product.',
        'Nothing in these terms limits a liability that the law does not allow to be limited.',
      ],
    },
    {
      id: 'language',
      heading: 'Languages',
      body: [
        'English is the original version of this document. Versions in other languages are translations for convenience. If a translation differs from the English, the English controls.',
      ],
    },
    {
      id: 'contact',
      heading: 'Contact',
      body: ['Questions about these terms: {{contact}}. See [Legal Contact & Notices](/contact).'],
    },
  ],
  related: ['terms-of-usage', 'acceptable-use', 'privacy', 'account', 'atlas-terms', 'replay-gg-terms', 'nova-cut-terms', 'subscriptions', 'contact'],
};
