/**
 * DMCA Notices
 *
 * Written 2026-10-02 at the owner's request, for Nova Forge. Deliberately NARROW and honest:
 *   · Nova Forge hosts no game files and accepts no user uploads (no accounts, no network client
 *     — see nova-forge-terms.js), so this is about links Nova Forge shows and nothing else;
 *   · NO designated agent has been named, so nothing here claims the protections that come with
 *     one, and no postal address or phone number is invented (data/site.js: the one contact
 *     address is the owner's);
 *   · the lists of what a notice and a counter-notice contain follow the statutory elements in
 *     17 U.S.C. § 512(c)(3) and § 512(g)(3), in plain words. Nothing here has been reviewed by an
 *     attorney, and the site says so on every page.
 * If Nova ever hosts content that people upload, THIS DOCUMENT MUST BE REWRITTEN FIRST.
 */

const DATE = '2026-10-02';

export const document = {
  id: 'dmca',
  title: 'DMCA Notices',
  description: 'How to send a copyright takedown notice or a counter-notice about Nova Forge.',
  category: 'community',
  appliesTo: ['nova-forge'],
  status: 'published',
  effectiveDate: DATE,
  updatedDate: DATE,
  version: '1.0',
  versions: [],
  sections: [
    {
      id: 'scope',
      heading: 'What this covers',
      body: [
        'Nova respects other people’s copyright. This page explains how to tell Nova about a copyright problem with **Nova Forge**.',
        'Nova Forge does not include, host or download games, mods or emulators, and it has no accounts or uploads, so there are no files of yours for Nova to take down. What it does show is links — to stores, guides, emulator websites and other sites. If you believe one of those links points to material that infringes your copyright, you can send a notice.',
      ],
    },
    {
      id: 'agent',
      heading: 'What Nova does and does not claim',
      body: [
        'Nova does not currently claim the legal protections available to services that register a designated agent with the U.S. Copyright Office. Notices are accepted at {{contact}}, and Nova will read them, but this page is not a promise of any particular outcome.',
      ],
    },
    {
      id: 'notice',
      heading: 'Sending a notice',
      body: [
        'Send an e-mail to {{contact}} that includes:',
        {
          ordered: [
            'Which copyrighted work you say is being infringed.',
            'Which link or text in Nova Forge you are complaining about, and where in the app it appears — enough detail for Nova to find it.',
            'Your name and contact details: a mailing address, a telephone number and an e-mail address.',
            'A statement that you believe in good faith that the use is not authorized by the copyright owner, its agent, or the law.',
            'A statement that the information in your notice is accurate and, under penalty of perjury, that you are the copyright owner or are authorized to act for them.',
            'Your physical or electronic signature.',
          ],
        },
        'A notice that is missing these may not be acted on.',
      ],
    },
    {
      id: 'response',
      heading: 'What happens next',
      body: [
        'Nova reads notices and acts where it reasonably can — for example by removing a link from a later version of Nova Forge. Because Nova Forge has no uploads or accounts, there is nothing to suspend and no one to warn beyond that.',
        'If Nova adds anything that hosts content people upload, this page will be rewritten before it goes live.',
      ],
    },
    {
      id: 'counter',
      heading: 'Sending a counter-notice',
      body: [
        'If a link you publish was removed from Nova Forge because of a notice and you believe that was a mistake, send an e-mail to {{contact}} that includes:',
        {
          ordered: [
            'Which link was removed and where it appeared before it was removed.',
            'A statement, under penalty of perjury, that you believe in good faith that it was removed because of a mistake or because it was misidentified.',
            'Your name and contact details: a mailing address, a telephone number and an e-mail address.',
            'Your physical or electronic signature.',
            'Any other statement the law requires of a counter-notice.',
          ],
        },
      ],
    },
    {
      id: 'false',
      heading: 'False notices',
      body: [
        'Knowingly claiming that material infringes, or that it was removed by mistake, when it does not, can have legal consequences for the person who says so (17 U.S.C. § 512(f)). If you are not sure, consider getting legal advice before you send one. Nothing on this page is legal advice.',
      ],
    },
  ],
  related: ['copyright', 'nova-forge-terms', 'terms'],
};
