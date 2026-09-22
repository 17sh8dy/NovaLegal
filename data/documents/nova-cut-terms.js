/**
 * Nova Cut Terms — short, and only what the code supports.
 * Verified 2026-09-21: projects and media stay on the machine; Nova Cut's own settings say it has
 * no analytics or crash reporting; automatic update checking is "planned", not live; Nova Account
 * is optional.
 *
 * ⚠ OPEN QUESTION FOR THE OWNER: NovaCut/package.json says "license": "MIT" but the repository
 * has no LICENSE file, and ReplayGG's says "UNLICENSED". This document therefore says nothing
 * about the licence of Nova Cut's code beyond the neutral sentence in the Terms of Service.
 */
import { PUBLISHED } from './_common.js';

export const document = {
  id: 'nova-cut-terms',
  title: 'Nova Cut Terms',
  description: 'Terms specific to Nova Cut: your projects and exports, and what you are responsible for.',
  category: 'terms',
  appliesTo: ['nova-cut'],
  status: 'published',
  effectiveDate: PUBLISHED,
  updatedDate: PUBLISHED,
  version: '1.0',
  versions: [],
  sections: [
    {
      id: 'what',
      heading: 'What these terms cover',
      body: [
        'These terms are about Nova Cut, the video and photo editor, and its website. They apply in addition to the [Terms of Service](/terms), the [Privacy Policy](/privacy) and the [Acceptable Use Policy](/acceptable-use). Where they differ for Nova Cut, these terms decide.',
      ],
    },
    {
      id: 'your-work',
      heading: 'Your projects and media',
      body: [
        'Your projects, media and exports stay on your computer. Nova does not receive them and does not claim ownership of them. Nova Cut’s own settings state that it has no analytics or crash reporting.',
        'You are responsible for having the right to use the media you edit and export, and for keeping backups of work that matters to you.',
      ],
    },
    {
      id: 'ffmpeg',
      heading: 'FFmpeg',
      body: [
        'Nova Cut uses FFmpeg to export. FFmpeg is separate software with its own licence and is not part of Nova.',
      ],
    },
    {
      id: 'account',
      heading: 'Account',
      body: ['A Nova Account is optional. The editor can be used without signing in.'],
    },
    {
      id: 'age',
      heading: 'Minimum age',
      body: ['Nova Cut is 13+ recommended. See the [Terms of Service](/terms#age).'],
    },
  ],
  related: ['terms', 'privacy', 'acceptable-use'],
};
