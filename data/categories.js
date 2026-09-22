/**
 * How the documents are grouped for browsing.
 *
 * A category is navigation, not law. It decides which card a document appears under on the
 * homepage and which heading it sits below in the side rail — nothing more. A document's
 * meaning comes from the document.
 *
 * Order here is order on screen. Adding a category is one entry; a category with no documents
 * is a validation error rather than an empty card, because an empty category on a legal site
 * reads as a missing document rather than as a heading nobody filled in.
 */

export const categories = [
  {
    id: 'terms',
    label: 'Terms',
    blurb: 'The terms for using Nova products, and terms specific to one product.',
    icon: 'document',
  },
  {
    id: 'privacy',
    label: 'Privacy',
    blurb: 'What information Nova handles, and what happens to it.',
    icon: 'shield',
  },
  {
    id: 'community',
    label: 'Community',
    blurb: 'What is expected of people using Nova products, and how content is handled.',
    icon: 'people',
  },
  {
    id: 'accounts',
    label: 'Accounts',
    blurb: 'The Nova Account — one identity across every Nova product.',
    icon: 'user',
  },
  {
    id: 'notices',
    label: 'Notices & contact',
    blurb: 'How to reach Nova about a legal matter, and what these documents are and are not.',
    icon: 'info',
  },
];

export const getCategory = (id) => categories.find((category) => category.id === id) ?? null;
