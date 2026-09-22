/**
 * The Text Styles control — an alternative font for the whole site, for a reader who finds the
 * default harder to read (dyslexia, low vision, or no reason stated at all; nobody has to say).
 *
 * ⚠ THE SINGLE SOURCE FOR THE OPTION LIST. `layout.mjs` renders one button per entry here.
 * `public/assets/legal.css` has a matching `[data-text-style="<id>"]` rule for each `id`, which
 * a static CSS file cannot generate from this array — so `test/text-styles.test.mjs` reads both
 * files and asserts every id has its rule, every self-hosted font has a same-origin `@font-face`
 * (never a third-party URL) and every stack this module names is really used somewhere in the
 * CSS. Add a font by adding one entry here and one matching block in the CSS; the test catches
 * the two falling out of step.
 *
 * `selfHosted: true` means the family is one of the five bundled in `public/assets/fonts/`
 * (see that folder's README for what each is and its licence). The other five are plain OS font
 * stacks — nothing to bundle, already on the reader's computer, and still a genuine, different
 * typeface — chosen because they're the ones commonly named for dyslexia/low-vision readability.
 */
export const TEXT_STYLES = [
  { id: 'opendyslexic', label: 'OpenDyslexic', stack: "'OpenDyslexic', sans-serif", selfHosted: true },
  { id: 'atkinson', label: 'Atkinson Hyperlegible', stack: "'Atkinson Hyperlegible', sans-serif", selfHosted: true },
  { id: 'lexend', label: 'Lexend', stack: "'Lexend', sans-serif", selfHosted: true },
  { id: 'andika', label: 'Andika', stack: "'Andika', sans-serif", selfHosted: true },
  { id: 'comic-neue', label: 'Comic Neue', stack: "'Comic Neue', sans-serif", selfHosted: true },
  { id: 'arial', label: 'Arial', stack: "Arial, 'Helvetica Neue', Helvetica, sans-serif" },
  { id: 'verdana', label: 'Verdana', stack: 'Verdana, Geneva, sans-serif' },
  { id: 'tahoma', label: 'Tahoma', stack: 'Tahoma, Geneva, Verdana, sans-serif' },
  { id: 'century-gothic', label: 'Century Gothic', stack: "'Century Gothic', CenturyGothic, AppleGothic, sans-serif" },
  { id: 'trebuchet', label: 'Trebuchet MS', stack: "'Trebuchet MS', 'Lucida Grande', sans-serif" },
];

/** The localStorage key the runtime reads/writes — kept here so `layout.mjs`'s boot script and
    `legal.js` cannot quietly drift onto two different keys. */
export const TEXT_STYLE_KEY = 'nova-legal-text-style';
