/**
 * Security — VERIFIED FACTS ONLY.
 *
 * Every claim below was read in code (2026-09-21). Nothing is described as "secure",
 * "encrypted" or "private" beyond what the code demonstrably does, and the closing section says
 * plainly that no system is risk-free. There is no bug-bounty, no independent audit and no
 * incident-response promise, so none is claimed.
 */
import { ALL_PRODUCTS, PUBLISHED } from './_common.js';

export const document = {
  id: 'security',
  title: 'Security',
  description: 'What Nova does to protect accounts and information, and how to report a problem.',
  category: 'privacy',
  appliesTo: ALL_PRODUCTS,
  status: 'published',
  effectiveDate: PUBLISHED,
  updatedDate: PUBLISHED,
  version: '1.0',
  versions: [],
  sections: [
    {
      id: 'what',
      heading: 'What Nova does',
      body: [
        {
          list: [
            'Passwords are stored only as salted one-way hashes (scrypt). Nova cannot read your password and will never ask you for it.',
            'Sign-in sessions use signed tokens. Signing out ends the session on the server, and you can sign out your other sessions from your account.',
            'Support ticket IDs are random. Opening a ticket needs both the ticket ID and the email address it was sent with.',
            'Profile pictures are checked by their actual file contents, and only small PNG, JPEG or WebP images are accepted.',
            'Sign-in and password-related requests are rate limited.',
            'API keys you enter in Atlas are stored in Windows Credential Manager on your computer, and are read by Atlas’s native side rather than by its web interface.',
            'The Nova websites load no third-party scripts.',
          ],
        },
      ],
    },
    {
      id: 'limits',
      heading: 'What Nova does not claim',
      body: [
        'No system is free of risk. Nova cannot promise that any product or service is safe from every problem, and it has no independent security audit to point to.',
        'Files on your own computer are protected only as well as your computer is. Anything you send to a third-party service is subject to that service’s security.',
      ],
    },
    {
      id: 'report',
      heading: 'Reporting a security problem',
      body: [
        'If you find a security problem, write to {{contact}} with what you found and how to reproduce it. Please do not put it in a public place first, and do not access other people’s data to demonstrate it.',
        'Nova cannot promise a response time.',
      ],
    },
  ],
  related: ['privacy', 'data', 'account', 'acceptable-use'],
};
