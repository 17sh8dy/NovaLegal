/**
 * The catalog — the document set, resolved, cross-linked and validated.
 *
 * Everything that renders reads from here rather than from `data/` directly, so there is one
 * answer to "what documents exist", "what is related to what" and "is this set coherent".
 *
 * ═════════════════════════════════════════════════════════════════════════════════════════
 * `validate()` IS THE POINT OF THIS FILE.
 * ═════════════════════════════════════════════════════════════════════════════════════════
 *
 * Nova Legal will eventually hold real legal documents, and the failure mode of a site like
 * this is not a crash — it is a page that quietly looks finished. A placeholder that reads
 * like a policy, a document published without an effective date, a "version 1.0" nobody
 * approved, a related link pointing at a document that was renamed.
 *
 * None of those are things to remember. They are all here, and `npm run check` exits non-zero:
 *
 *   1. A PENDING DOCUMENT MAY CARRY NO CONTENT AND NO METADATA. No sections, no dates, no
 *      version, no version history. This is the rule that makes "we have not written the legal
 *      text yet" a fact about the repository rather than a promise about it.
 *   2. A PUBLISHED DOCUMENT MUST CARRY ALL OF IT. An undated, unversioned legal document is
 *      not publishable, so the site cannot express one.
 *   3. Every id is unique, every category resolves, every `related` id resolves, every
 *      `appliesTo` product resolves.
 *   4. Dates are real calendar dates, and `updatedDate` is not before `effectiveDate`.
 *   5. No category is empty — an empty heading on a legal site reads as a missing document.
 *
 * `assertValid()` runs at the top of both the build and the dev server, so a broken set fails
 * in a terminal rather than in front of a reader.
 */

import { categories, getCategory } from '../../data/categories.js';
import { products as allProducts } from '../../data/products.js';
import { documents as rawDocuments } from '../../data/documents/index.js';
import { blockText, linkTargets, resolveHref } from './markup.mjs';

/* Products marked `inScope: false` stay in data/products.js (nothing is deleted) but get no
   page, no card and no document. See the note at the top of that file. */
export const products = allProducts.filter((product) => product.inScope !== false);
export const getProduct = (id) => products.find((product) => product.id === id) ?? null;

/* Claims a published document may not make. NovaLegal has not been reviewed by an attorney and
   no compliance or certification has been established, so these words cannot appear — not even
   by accident in a later edit. The attorney-review notice itself is a `verbatim` block and is
   exempt: it says the opposite. */
const OVERCLAIMS = [
  [/\b(?:gdpr|ccpa|cpra|coppa|hipaa|ferpa)\b/i, 'names a specific privacy law (no compliance has been established)'],
  [/\bcompliant\b/i, 'uses "compliant" (no legal compliance has been established)'],
  [/\bcertified\b|\bcertification\b/i, 'claims a certification'],
  [/attorney[- ](?:approved|reviewed|vetted)|lawyer[- ](?:approved|reviewed|vetted)/i, 'claims attorney review'],
  [/military[- ]grade|bank[- ]level|100\s?% secure|unhackable|completely secure/i, 'makes an absolute security claim'],
  [/\bend[- ]to[- ]end encrypt/i, 'claims end-to-end encryption'],
];

const DATE = /^\d{4}-\d{2}-\d{2}$/;

const isRealDate = (value) => {
  if (!DATE.test(String(value ?? ''))) return false;
  const date = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(date.valueOf()) && date.toISOString().slice(0, 10) === value;
};

/**
 * Relations, made symmetric.
 *
 * A document naming another in `related` also appears on that document's page. Written by hand
 * in one direction only, because maintaining both halves is exactly the kind of bookkeeping
 * that rots — and a legal document set whose cross-references point one way is how a reader
 * ends up in a dead end with no route back to the agreement that governs what they just read.
 */
function relate(list) {
  const edges = new Map(list.map((doc) => [doc.id, new Set(doc.related ?? [])]));

  for (const doc of list) {
    for (const other of doc.related ?? []) {
      if (edges.has(other)) edges.get(other).add(doc.id);
    }
  }
  // A document is never related to itself, however the data got there.
  for (const [id, set] of edges) set.delete(id);
  return edges;
}

const edges = relate(rawDocuments);

/**
 * Every document, decorated with what a page needs and nothing it does not.
 *
 * `href` is derived from the id rather than stored, so a route and an id cannot disagree.
 */
export const documents = rawDocuments.map((doc) => ({
  ...doc,
  href: `/${doc.id}`,
  related: [...(edges.get(doc.id) ?? [])].sort(),
  /* The one field every template branches on. Kept as a boolean so no view has to remember
     which string means "do not present this as law". */
  pending: doc.status !== 'published',
}));

const byId = new Map(documents.map((doc) => [doc.id, doc]));

export const getDocument = (id) => byId.get(String(id ?? '')) ?? null;

/** The documents in a category, in registry order. */
export const documentsIn = (categoryId) =>
  documents.filter((doc) => doc.category === categoryId);

/**
 * The documents that govern a product.
 *
 * Returns `[]` when nothing has been determined yet, which is the current state of every
 * product — and the product page renders that as an honest statement rather than as an empty
 * list that looks like a rendering bug.
 */
export const documentsFor = (productId) =>
  documents.filter((doc) => (doc.appliesTo ?? []).includes(productId));

/** A document's category record, for breadcrumbs. */
export const categoryOf = (doc) => getCategory(doc.category);

export { categories, getCategory };

/** Counts, for `npm run check` and the homepage. */
export const stats = {
  get documents() {
    return documents.length;
  },
  get published() {
    return documents.filter((doc) => !doc.pending).length;
  },
  get pending() {
    return documents.filter((doc) => doc.pending).length;
  },
  get categories() {
    return categories.length;
  },
  get products() {
    return products.length;
  },
};

/**
 * Every structural problem with the document set, as sentences. Empty means it is coherent.
 *
 * Returns rather than throws, so `npm run check` can print all of them at once — somebody
 * editing `data/` should see every problem in one run, not the first one repeatedly.
 */
export function validate() {
  const errors = [];
  const seen = new Set();
  const categoryIds = new Set(categories.map((c) => c.id));
  const productIds = new Set(products.map((p) => p.id));

  for (const doc of rawDocuments) {
    const where = `document "${doc.id ?? '(no id)'}"`;

    if (!doc.id || !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(doc.id)) {
      errors.push(`${where}: id must be lower-case kebab-case; it becomes the URL.`);
    }
    if (seen.has(doc.id)) errors.push(`${where}: duplicate id.`);
    seen.add(doc.id);

    if (!doc.title) errors.push(`${where}: needs a title.`);
    if (!doc.description) errors.push(`${where}: needs a one-sentence description.`);
    if (!categoryIds.has(doc.category)) {
      errors.push(`${where}: category "${doc.category}" is not in data/categories.js.`);
    }

    for (const productId of doc.appliesTo ?? []) {
      if (!productIds.has(productId)) {
        errors.push(`${where}: appliesTo names "${productId}", which is not a Nova product.`);
      }
    }
    for (const relatedId of doc.related ?? []) {
      if (!rawDocuments.some((other) => other.id === relatedId)) {
        errors.push(`${where}: related names "${relatedId}", which does not exist.`);
      }
      if (relatedId === doc.id) errors.push(`${where}: related names itself.`);
    }

    if (doc.status !== 'pending' && doc.status !== 'published') {
      errors.push(`${where}: status must be 'pending' or 'published'.`);
      continue;
    }

    /* ── RULE 1: a pending document carries nothing that could be read as law ────────────
     *
     * This is the rule the whole site is built around. A pending document with a date and a
     * version number looks published, and a reader has no way to tell that the words above it
     * were a placeholder. So the data cannot express it. */
    if (doc.status === 'pending') {
      const claims = [
        doc.sections?.length && 'sections',
        doc.effectiveDate && 'an effectiveDate',
        doc.updatedDate && 'an updatedDate',
        doc.version && 'a version',
        doc.versions?.length && 'a version history',
      ].filter(Boolean);

      if (claims.length) {
        errors.push(
          `${where}: is 'pending' but carries ${claims.join(', ')}. ` +
            'A pending document must carry NOTHING that reads as published legal content. ' +
            "Write the sections and set the dates, then set status to 'published'.",
        );
      }
      /* The one thing a placeholder MAY say: a plain sentence about its own status ("planned,
         not currently offered"). It is a status line, not a term, so it may not contain links
         or markup and is checked for overclaims like any other text. */
      if (doc.note !== undefined) {
        if (typeof doc.note !== 'string' || !doc.note.trim()) {
          errors.push(`${where}: note must be a non-empty string.`);
        } else {
          if (/[\[\]{}*]/.test(doc.note)) errors.push(`${where}: a pending note is plain text — no markup.`);
          for (const [pattern, why] of OVERCLAIMS) {
            if (pattern.test(doc.note)) errors.push(`${where}: the note ${why}.`);
          }
        }
      }
      continue;
    }

    if (doc.note !== undefined) {
      errors.push(`${where}: only a 'pending' document carries a note; a published one says it in its sections.`);
    }

    /* A document that governs nothing cannot be published: "which products" is the first thing
       a reader needs, and an empty list would read as "applies to nobody". */
    if (!doc.appliesTo?.length) {
      errors.push(`${where}: is 'published' with an empty appliesTo. Say which products it governs.`);
    }

    /* ── RULE 2: a published document carries all of it ──────────────────────────────── */
    if (!doc.sections?.length) errors.push(`${where}: is 'published' with no sections.`);
    if (!doc.version) errors.push(`${where}: is 'published' with no version.`);
    if (!isRealDate(doc.effectiveDate)) {
      errors.push(`${where}: is 'published' without a real effectiveDate (YYYY-MM-DD).`);
    }
    if (!isRealDate(doc.updatedDate)) {
      errors.push(`${where}: is 'published' without a real updatedDate (YYYY-MM-DD).`);
    }
    if (isRealDate(doc.effectiveDate) && isRealDate(doc.updatedDate) && doc.updatedDate < doc.effectiveDate) {
      errors.push(`${where}: updatedDate is before effectiveDate.`);
    }

    const sectionIds = new Set();
    for (const section of doc.sections ?? []) {
      if (!section.id || !section.heading) {
        errors.push(`${where}: every section needs an id and a heading (the id is its anchor).`);
      }
      if (sectionIds.has(section.id)) {
        errors.push(`${where}: two sections share the id "${section.id}"; anchors must be unique.`);
      }
      sectionIds.add(section.id);
      if (!Array.isArray(section.body) || !section.body.length) {
        errors.push(`${where}: section "${section.id}" has no body.`);
        continue;
      }

      for (const block of section.body) {
        const at = `${where}, section "${section.id}"`;
        const shaped =
          typeof block === 'string' ||
          (block && typeof block === 'object' &&
            [Array.isArray(block.list), Array.isArray(block.ordered), typeof block.verbatim === 'string'].filter(Boolean).length === 1);
        if (!shaped) {
          errors.push(`${at}: a body block must be a string, { list }, { ordered } or { verbatim }.`);
          continue;
        }
        const texts = blockText(block);
        if (!texts.length || texts.some((t) => typeof t !== 'string' || !t.trim())) {
          errors.push(`${at}: a body block has empty text.`);
        }
        for (const text of texts) {
          for (const target of linkTargets(text)) {
            if (!resolveHref(target)) {
              errors.push(`${at}: link target "${target}" is not allowed (see src/core/markup.mjs).`);
              continue;
            }
            const [path, fragment] = target.split('#');
            if (path.startsWith('/') && path !== '/' && !['/search', '/products'].includes(path)) {
              const [, first, second] = path.split('/');
              if (first === 'products') {
                if (!productIds.has(second)) errors.push(`${at}: link "${target}" names a product that is not in scope.`);
              } else {
                const linked = rawDocuments.find((other) => other.id === first);
                if (!linked || second) errors.push(`${at}: link "${target}" does not resolve to a document.`);
                else if (fragment && !(linked.sections ?? []).some((s) => s.id === fragment)) {
                  errors.push(`${at}: link "${target}" points at a section that does not exist.`);
                }
              }
            }
          }
          if (typeof block === 'object' && block.verbatim !== undefined) continue;
          for (const [pattern, why] of OVERCLAIMS) {
            if (pattern.test(text)) errors.push(`${at}: text ${why}: "${text.slice(0, 70)}…"`);
          }
        }
      }
    }

    for (const previous of doc.versions ?? []) {
      if (!previous.version) errors.push(`${where}: a previous version has no version number.`);
      if (previous.effectiveDate && !isRealDate(previous.effectiveDate)) {
        errors.push(`${where}: version ${previous.version} has an unreal effectiveDate.`);
      }
      if (previous.version === doc.version) {
        errors.push(`${where}: version ${previous.version} is listed as both current and previous.`);
      }
    }
  }

  /* ── RULE 5: no empty category ─────────────────────────────────────────────────────── */
  for (const category of categories) {
    if (!rawDocuments.some((doc) => doc.category === category.id)) {
      errors.push(
        `category "${category.id}" has no documents. An empty heading on a legal site reads ` +
          'as a missing document rather than as a heading nobody filled in.',
      );
    }
  }

  return errors;
}

/** Fail loudly, at boot, rather than serving an incoherent legal site. */
export function assertValid() {
  const errors = validate();
  if (!errors.length) return;
  throw new Error(
    `Nova Legal's document set has ${errors.length} problem(s):\n  - ${errors.join('\n  - ')}`,
  );
}
