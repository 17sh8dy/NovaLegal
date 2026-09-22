/**
 * `npm run check` — validate the document set without building or booting.
 *
 * This is what somebody editing `data/` runs. It prints every structural problem at once and
 * exits non-zero, so a broken legal document set fails in a terminal rather than in front of
 * a reader.
 *
 * It also prints the PUBLICATION STATE, which is the number that actually matters on this
 * site: how many documents are real, and how many are still placeholders. While that second
 * number is non-zero, every page carries the "being prepared" banner — and this is where you
 * check that it should.
 */
import { categories, documents, products, stats, validate } from './core/catalog.mjs';

const errors = validate();

if (errors.length) {
  console.error(`Nova Legal's document set has ${errors.length} problem(s):\n`);
  for (const error of errors) console.error(`  - ${error}`);
  process.exit(1);
}

console.log('Document set is valid.\n');
console.log(`  documents    ${stats.documents}  (${stats.published} published, ${stats.pending} pending)`);
console.log(`  categories   ${stats.categories}`);
console.log(`  products     ${stats.products}\n`);

for (const category of categories) {
  const inCategory = documents.filter((doc) => doc.category === category.id);
  const published = inCategory.filter((doc) => !doc.pending).length;
  console.log(
    `  ${category.label.padEnd(12)} ${String(inCategory.length).padStart(2)} documents  ` +
      `${String(published).padStart(2)} published`,
  );
}

/* Which products have had their applicable document set determined. Zero is the expected
   answer today, and it is worth SEEING rather than assuming — this is the field most likely to
   be quietly guessed at when the real documents arrive. */
console.log('');
const undetermined = products.filter(
  (product) => !documents.some((doc) => (doc.appliesTo ?? []).includes(product.id)),
);
if (undetermined.length) {
  console.log(
    `  applicable documents not yet determined for: ${undetermined.map((p) => p.id).join(', ')}`,
  );
  console.log('    (set on each DOCUMENT, in its `appliesTo` — it is a legal decision, not an inference)');
}

if (stats.pending) {
  console.log(
    `\n  ${stats.pending} document(s) are placeholders. The footer notes that` +
      '\n  those are not in force. See data/documents/index.js.',
  );
}
