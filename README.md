# NovaLegal

The legal centre for the Nova ecosystem: terms, privacy and product-specific documents, in one
place. Static, zero dependencies — Node reads `data/`, renders HTML, and either serves it
(`src/serve.mjs`) or writes it to `dist/` (`src/build.mjs`).

Nova is owned and operated by **17 Shady**, an individual — not a company. **No document here
has been reviewed by an attorney.** That notice is required to stay on every page; see
`src/views/layout.mjs` and [`/contact`](data/documents/contact.js).

## Where things are

```
data/
  site.js            name, operator, contact address, nav, footer — no invented facts
  categories.js       Terms / Privacy / Community / Accounts / Notices & contact
  products.js         the six in-scope Nova products (age, verified data facts, inScope flag)
  documents/
    _common.js         shared constants (publish date, product-id groups)
    <id>.js            one file per document
    index.js           the registry — add a document here
src/
  core/
    catalog.mjs        resolves + VALIDATES the whole document set (see below)
    markup.mjs          the tiny [link](target)/**bold**/{{contact}}/verbatim body language
    routes.mjs          generates every route from the catalog
  views/               HTML, as template-string functions — nothing else renders a page
test/
  legal.test.mjs        the guarantees below, as tests: `node --test test/*.test.mjs`
docs/
  FACT-SHEET.md          the verified/owner-stated/unknown inventory this content was built from
```

## The one rule: a document is `published` or `pending`, never in between

`src/core/catalog.mjs`'s `validate()` enforces this, and `npm run check` fails the build if it's
broken:

- **`pending`** may carry no `sections`, no `effectiveDate`/`updatedDate`/`version`/`versions` —
  only an optional one-sentence `note` about its own status (no links, no markup, checked for
  overclaims same as everything else). This is what a genuine placeholder looks like: the
  `pendingPanel()` component, never a paragraph that could be mistaken for policy.
- **`published`** must carry all of them, plus a non-empty `appliesTo` (which products it
  governs — a legal decision, never inferred from a product's name), and its `sections` are
  built from the small body language in `core/markup.mjs`:

  ```js
  sections: [{
    id: 'age', heading: 'Minimum age',
    body: [
      'A plain paragraph, with a [link](/terms#age) or {{contact}} or **emphasis**.',
      { list: ['a bullet', 'another bullet'] },
      { verbatim: 'Text that must reach every reader in this exact English, never translated.' },
    ],
  }],
  ```

  A link target is checked against what actually exists (a page on this site, `help:` for
  Nova.Help, `discord:`, or `mailto:` to the one contact address) — an arbitrary URL is refused,
  so a document can never quietly send someone somewhere nobody vetted.

- Every published document is also checked for **overclaims** — "compliant", "certified",
  "attorney-approved", "military-grade", naming GDPR/CCPA/COPPA by name, and similar — because
  nothing here may claim more than the code actually supports. See `docs/FACT-SHEET.md`.

Adding a document: write the file, register it in `data/documents/index.js`, run `npm run
check`. Its routes (the page and its version history) are generated automatically.

## Products

`data/products.js` lists every Nova product NovaLegal covers, each with a verified `data: […]`
list of what it actually stores or sends and a `minimumAge`. A product with `inScope: false`
(Online Earth, Nova Forge, as of 2026-09-21 — the owner's call) keeps its entry but gets no page,
card or document; bringing one into scope is deleting one line.

## Commands

```
npm start          # serve on :4500
npm run dev         # serve with --watch
npm run build        # write dist/
npm run check         # validate the document set, print coverage
npm test              # node --test test/*.test.mjs
```

## Translations

English is the original and controlling language of every document (the owner's decision,
2026-09-21). Spanish, French, German and Portuguese are produced by
[`D:/Dev/NovaI18n`](../NovaI18n) from the same source strings — see that repo's README for the
extract → translate → build → sync pipeline. `test/audit.mjs legal` there checks every language
at three widths for untranslated text and layout breakage.
