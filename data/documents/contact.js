/**
 * Legal Contact & Notices.
 *
 * ⚠ THE VERBATIM NOTICE BELOW IS REQUIRED AND MUST NOT BE EDITED, SHORTENED OR PARAPHRASED.
 * It is a `verbatim` block: never translated, and exempt from the overclaim check (it is the one
 * place those words are meant to appear, and it says the opposite of a claim). The same words are
 * in the site footer (src/views/layout.mjs) in a translatable form; this is the English original
 * that stays available in every language.
 *
 * ⚠ ONE ADDRESS, NO MORE. The owner stated getnovasupport@gmail.com (2026-09-21). There is no
 * legal department, no postal address, no phone number and no registered agent, and none may be
 * added here without being told.
 */
import { ALL_PRODUCTS, PUBLISHED } from './_common.js';

export const document = {
  id: 'contact',
  title: 'Legal Contact & Notices',
  description: 'How to reach Nova about a legal matter, and what these documents are and are not.',
  category: 'notices',
  appliesTo: ALL_PRODUCTS,
  status: 'published',
  effectiveDate: PUBLISHED,
  updatedDate: PUBLISHED,
  version: '1.0',
  versions: [],
  sections: [
    {
      id: 'contact',
      heading: 'Contact',
      body: [
        'Nova is owned and operated by 17 Shady, an individual. To contact Nova about a legal matter, a privacy request or a security problem, write to {{contact}}. This is the same address Nova.Help uses.',
        'Nova has no other legal contact: no postal address, phone number or legal department is published. For help using a product, use [Nova.Help](help:).',
      ],
    },
    {
      id: 'attorney-notice',
      heading: 'Attorney-review notice',
      body: [
        'This notice appears here in its original English wording in every language:',
        {
          verbatim:
            'Nothing in NovaLegal has been approved or reviewed by an attorney. That does not mean you do not have to follow, agree to, and accept the terms, rules, or notices presented to you when using a Nova product.',
        },
      ],
    },
    {
      id: 'status',
      heading: 'What these documents are',
      body: [
        'These documents describe how Nova’s products work today. They make no claim that Nova meets any particular law or standard. Where a document is marked “Content pending”, it has not been written and is not in force.',
      ],
    },
    {
      id: 'languages',
      heading: 'Languages',
      body: [
        'English is the original version of every document here. Versions in Spanish, French, German and Portuguese are translations for convenience, and if a translation differs from the English, the English controls.',
      ],
    },
    {
      id: 'copyright-notices',
      heading: 'Copyright notices',
      body: [
        'Nova does not yet have a formal process for copyright or takedown notices. See [Copyright](/copyright) and [DMCA Notices](/dmca).',
      ],
    },
  ],
  related: ['terms', 'privacy', 'copyright'],
};
