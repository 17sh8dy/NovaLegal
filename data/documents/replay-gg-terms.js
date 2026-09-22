/**
 * Replay.GG Terms — short, and only what the code supports (capture options and the updater).
 * Verified 2026-09-21: recordings/clips stay on the machine; system audio, microphone and webcam
 * are options in settings; the updater checks GitHub releases every few hours and downloads only
 * on the user's say-so; Nova Account sign-in is optional.
 */
import { PUBLISHED } from './_common.js';

export const document = {
  id: 'replay-gg-terms',
  title: 'Replay.GG Terms',
  description: 'Terms specific to Replay.GG: recording, clips, and what you are responsible for.',
  category: 'terms',
  appliesTo: ['replay-gg'],
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
        'These terms are about Replay.GG, the desktop app that records gameplay and makes clips. They apply in addition to the [Terms of Service](/terms), the [Privacy Policy](/privacy) and the [Acceptable Use Policy](/acceptable-use). Where they differ for Replay.GG, these terms decide.',
      ],
    },
    {
      id: 'your-recordings',
      heading: 'Your recordings',
      body: [
        'Recordings and clips are saved on your computer. Nova does not receive them and does not claim ownership of them.',
        'Replay.GG can record system audio, a microphone and a webcam if you turn those options on. Only turn them on when you want them captured.',
      ],
    },
    {
      id: 'responsibility',
      heading: 'What you are responsible for',
      body: [
        'You are responsible for what you record and share. That includes having the right to record it, following the rules of the game or service you are recording, and telling other people when the law or those rules require it — for example when your microphone or a webcam captures other people’s voices or faces.',
        'Do not use Replay.GG to record or share material you do not have the right to use. See the [Acceptable Use Policy](/acceptable-use#recording).',
      ],
    },
    {
      id: 'updates-account',
      heading: 'Updates and account',
      body: [
        'Replay.GG checks GitHub’s release hosting for a newer version, and downloads an update only when you choose to.',
        'A Nova Account is optional. Replay.GG can be used without signing in.',
      ],
    },
    {
      id: 'age',
      heading: 'Minimum age',
      body: ['Replay.GG is 13+ recommended. See the [Terms of Service](/terms#age).'],
    },
  ],
  related: ['terms', 'privacy', 'acceptable-use'],
};
