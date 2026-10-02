/**
 * Nova Forge Terms — short, and only what Nova Forge's code does.
 *
 * Verified 2026-10-02 by reading the app (D:\Dev\NovaForge\app): it stores profiles, the mod list
 * a person keeps, and save backups in a folder on their computer; it contains no network client,
 * analytics, crash reporting or account code; the only things it "sends" are links it asks Windows
 * to open in the browser; it never installs, patches or downloads a game, mod or emulator; it can
 * start an emulator the person installed (Cemu.exe / Ryujinx.exe only) and a mod's own launcher;
 * save backup is a read-only copy and restore is not implemented.
 * If any of that changes, THIS DOCUMENT MUST CHANGE WITH IT.
 */

const DATE = '2026-10-02';

export const document = {
  id: 'nova-forge-terms',
  title: 'Nova Forge Terms',
  description: 'Terms specific to Nova Forge: game files, emulators, mods, and saves.',
  category: 'terms',
  appliesTo: ['nova-forge'],
  status: 'published',
  effectiveDate: DATE,
  updatedDate: DATE,
  version: '1.0',
  versions: [],
  sections: [
    {
      id: 'what',
      heading: 'What these terms cover',
      body: [
        'These terms are about Nova Forge, the desktop app for organizing game profiles, mods and saves. They apply in addition to the [Terms of Service](/terms), the [Privacy Policy](/privacy) and the [Acceptable Use Policy](/acceptable-use). Where they differ for Nova Forge, these terms decide.',
      ],
    },
    {
      id: 'no-games',
      heading: 'Nova Forge provides no games',
      body: [
        'Nova Forge does not include, sell, host, provide or download any game, game file, key, firmware or emulator — not even free ones. You need your own legally obtained copy of any game you use it with.',
        'Where Nova Forge shows a link to buy or download a game, that link goes to the publisher’s or store’s own page. Nova does not receive anything from it.',
      ],
    },
    {
      id: 'your-files',
      heading: 'Your files and what you are responsible for',
      body: [
        'You are responsible for the files you point Nova Forge at. By using them you state that you have the right to — for example because you bought the game and made the copy yourself, from your own console where that applies.',
        'Some games can only be used on a computer from a copy made from your own console. Whether making or using such a copy is allowed where you live is your responsibility. Nova Forge does not provide copies, keys or firmware, and does not check that you own what you point it at.',
      ],
    },
    {
      id: 'emulators',
      heading: 'Emulators',
      body: [
        'Nova Forge is not an emulator. It suggests emulators that are still maintained, and can start one you have installed yourself by asking Windows to run it with the game file you chose.',
        'Emulators are made by other people and come with their own terms. Nova is not affiliated with them and is not responsible for how they work. Nova Forge does not recommend projects that have been discontinued.',
      ],
    },
    {
      id: 'mods',
      heading: 'Mods',
      body: [
        'Nova Forge keeps a list of mods you choose to track, and where you keep their files. It does not install, patch or change any mod or game file. If a mod comes with its own launcher, Nova Forge can start that program for you, and nothing more.',
        'Nova does not host, check or vouch for any mod. You are responsible for whether you may use a mod and for what it does. Mods can cause crashes or damage saves.',
      ],
    },
    {
      id: 'saves',
      heading: 'Saves and backups',
      body: [
        'A backup is a copy of the save folder you chose, made on your computer. Nova Forge only reads from your save folder; it never writes to it. Restoring a backup is not available yet.',
        'Keep your own backups of anything you care about. Modding and moving files carry a risk of losing saves.',
      ],
    },
    {
      id: 'links',
      heading: 'Links to other sites',
      body: [
        'Nova Forge shows links to stores, guides, emulator websites and other Nova products. Opening one starts your browser; what that site does is its own business. Nova does not control and is not responsible for other sites.',
      ],
    },
    {
      id: 'copyright',
      heading: 'Copyright concerns',
      body: [
        'If you believe a link Nova Forge shows points to material that infringes your copyright, see [DMCA Notices](/dmca).',
      ],
    },
    {
      id: 'age',
      heading: 'Minimum age',
      body: ['Nova Forge is 13+ recommended. See the [Terms of Service](/terms#age).'],
    },
  ],
  related: ['terms', 'privacy', 'acceptable-use', 'dmca'],
};
