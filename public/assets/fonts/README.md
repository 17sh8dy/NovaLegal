# Text Styles fonts

Five fonts bundled here for the header's Text Styles control (`public/assets/legal.css`
`@font-face` block, `data-text-style` on `<html>`). All are **self-hosted** — none is fetched
from a third party at runtime — so the site's "no third-party fonts or scripts" claim (see
`data/documents/cookies.js`) stays true with this feature on.

Downloaded 2026-09-24 from the [Fontsource](https://fontsource.org/) mirror of each project's
own release, `-400-normal` (regular) and `-700-normal` (bold), WOFF2 only. Each is under the
**SIL Open Font License 1.1** — free to bundle and redistribute; the exact licence text for each
is the matching `*-LICENSE.txt` next to it, unmodified.

| File | Font | Why it's here |
|---|---|---|
| `opendyslexic-*.woff2` | [OpenDyslexic](https://opendyslexic.org/) | Purpose-built for dyslexia — weighted letter bottoms and asymmetric shapes to resist letter reversal/flipping. |
| `atkinson-hyperlegible-*.woff2` | [Atkinson Hyperlegible](https://brailleinstitute.org/freefont) | Designed by the Braille Institute for maximum character distinction at low vision. |
| `lexend-*.woff2` | [Lexend](https://www.lexend.com/) | Designed and studied for reading proficiency; used in several dyslexia/low-literacy tools. |
| `andika-*.woff2` | [Andika](https://software.sil.org/andika/) | SIL's literacy font — open counters, distinct look-alike letters (b/d/p/q, l/1/I). |
| `comic-neue-*.woff2` | [Comic Neue](https://comicneue.com/) | Open alternative to Comic Sans, which the British Dyslexia Association's style guide names as genuinely more distinguishable than most standard text fonts, despite its reputation. |

The other five Text Styles options (Arial, Verdana, Tahoma, Century Gothic, Trebuchet MS) are
plain OS font stacks — no file, nothing to bundle — chosen for the same reason: they're commonly
recommended for dyslexia/low-vision readability and are already on the reader's computer.
