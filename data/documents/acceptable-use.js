/**
 * Acceptable Use Policy.
 *
 * Kept to the conduct that applies to what Nova actually runs today (accounts, support tickets,
 * the websites, the software). Community-space rules are a separate, pending document because
 * no Nova product currently hosts content shared between people.
 */
import { ALL_PRODUCTS, PUBLISHED } from './_common.js';

export const document = {
  id: 'acceptable-use',
  title: 'Acceptable Use Policy',
  description: 'What may and may not be done with Nova products and services.',
  category: 'terms',
  appliesTo: ALL_PRODUCTS,
  status: 'published',
  effectiveDate: PUBLISHED,
  updatedDate: PUBLISHED,
  version: '1.0',
  versions: [],
  sections: [
    {
      id: 'use',
      heading: 'Using Nova',
      body: [
        'Use Nova products for what they are for: editing, recording, getting help, managing an account, and reading these documents. This policy is part of the [Terms of Service](/terms).',
      ],
    },
    {
      id: 'not-allowed',
      heading: 'What you may not do',
      body: [
        'You may not use a Nova product or service to:',
        {
          list: [
            'break the law, or help someone else break it;',
            'attack, overload, probe or try to get into Nova’s services, accounts or systems, or anyone else’s;',
            'sign in to, or try to sign in to, an account that is not yours;',
            'send malware, or use Nova to deliver it;',
            'harass, threaten or impersonate another person, or impersonate Nova;',
            'send sexual content involving minors. This is never allowed, in any context;',
            'use, record or share material you do not have the right to use;',
            'send passwords, payment card numbers or other people’s personal information in a support ticket;',
            'get around a technical limit or safety measure in a Nova product; or',
            'present a modified copy of Nova software as an official Nova release.',
          ],
        },
      ],
    },
    {
      id: 'recording',
      heading: 'Recording and capturing',
      body: [
        'Replay.GG and Atlas can capture your screen, and Replay.GG can capture audio and a webcam. You are responsible for having the right to capture what appears on your screen and for telling people you record where the law or a service’s rules require it. See [Replay.GG Terms](/replay-gg-terms).',
      ],
    },
    {
      id: 'consequences',
      heading: 'What can happen',
      body: [
        'If a hosted service such as an account or Nova.Help is used in breach of this policy, Nova may limit or close access to it. See [Terms of Service](/terms#suspension).',
      ],
    },
    {
      id: 'report',
      heading: 'Reporting a problem',
      body: ['To report abuse or a security problem, write to {{contact}}. See [Security](/security).'],
    },
  ],
  related: ['terms', 'security', 'replay-gg-terms', 'community-guidelines'],
};
