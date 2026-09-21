/**
 * The icon set — inline SVG, one stroke weight, no network fetch.
 *
 * Hand-drawn rather than pulled from a library so the whole set shares an optical size, and so
 * the site loads no third-party asset. Every icon inherits `currentColor` and is decorative:
 * each one is paired with text, and none is the only way to understand a control.
 */

const paths = {
  /* ── The Nova mark ── the four-point star from the Nova site, unchanged. */
  nova: '<path d="M12 .8c.62 6.5 4.7 10.58 11.2 11.2-6.5.62-10.58 4.7-11.2 11.2-.62-6.5-4.7-10.58-11.2-11.2C7.3 11.38 11.38 7.3 12 .8Z"/>',

  /* ── Categories ── */
  document: '<path d="M6 3.5h7.5L18 8v12.5H6z"/><path d="M13.5 3.5V8H18"/><path d="M9 12.5h6M9 16h6"/>',
  shield: '<path d="M12 3 19.5 6v6c0 4-3.2 7.3-7.5 9-4.3-1.7-7.5-5-7.5-9V6z"/>',
  people: '<circle cx="9" cy="9" r="3.2"/><path d="M3.5 19.5a5.5 5.5 0 0 1 11 0"/><path d="M16 6.4a3.2 3.2 0 0 1 0 6.2M17 14.6a5.5 5.5 0 0 1 3.5 4.9"/>',
  user: '<circle cx="12" cy="8.5" r="3.75"/><path d="M4.5 20.5a7.5 7.5 0 0 1 15 0"/>',

  /* ── Products ── */
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.6 2.5 15.4 0 18M12 3c-2.5 2.6-2.5 15.4 0 18"/>',
  compass: '<circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2.1 5-5 2.1 2.1-5z"/>',
  film: '<rect x="3" y="4.5" width="18" height="15" rx="2"/><path d="M8 4.5v15M16 4.5v15M3 12h18M3 8.25h5M3 15.75h5M16 8.25h5M16 15.75h5"/>',
  record: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3.5"/>',
  help: '<circle cx="12" cy="12" r="9"/><path d="M9.6 9.4a2.5 2.5 0 1 1 3.3 2.4c-.6.2-.9.8-.9 1.4v.4"/><path d="M12 17h.01"/>',

  /* ── UI ── */
  arrow: '<path d="M4.5 12h14M13 6.5l5.5 5.5L13 17.5"/>',
  chevron: '<path d="M9 5.5 15.5 12 9 18.5"/>',
  search: '<circle cx="11" cy="11" r="6.5"/><path d="m16 16 4.5 4.5"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5.2l3.2 2"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5.5M12 7.75h.01"/>',
  draft: '<path d="M6 3.5h7.5L18 8v12.5H6z" stroke-dasharray="3 2.4"/><path d="M13.5 3.5V8H18"/>',
  print: '<path d="M7 9V4h10v5"/><rect x="3.5" y="9" width="17" height="7" rx="1.6"/><path d="M7 14h10v6H7z"/>',
  external: '<path d="M14 5h5v5M19 5l-8 8M17 14v5H5V7h5"/>',
  discord:
    '<path d="M8.6 15.6c-1.4-.4-2.4-1.1-3-2 .3-2.7 1.1-5.1 2.4-7.1a9.7 9.7 0 0 1 2.6-.8l.5 1c1-.1 1.9-.1 2.9 0l.5-1c.9.2 1.8.4 2.6.8 1.3 2 2.1 4.4 2.4 7.1-.6.9-1.6 1.6-3 2l-.9-1.4"/><path d="M8.6 15.6c2.3.7 4.5.7 6.8 0"/><path d="M10 11.5h.01M14 11.5h.01"/>',
};

export const hasIcon = (name) => Object.hasOwn(paths, name);

/** Render an icon. Always decorative — pair it with text. */
export function icon(name, { size = 20, className = '' } = {}) {
  const body = paths[name] ?? paths.document;
  const classes = ['icon', className].filter(Boolean).join(' ');
  return `<svg class="${classes}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${body}</svg>`;
}

/**
 * The Nova mark, filled rather than stroked.
 *
 * The wordmark's star is a solid shape in the Nova site's own markup, so it is the one glyph
 * here that sets `fill` and clears `stroke` — matching it exactly matters more than internal
 * consistency for the one mark people recognise the family by.
 */
export const MARK = `<svg class="mark" viewBox="0 0 24 24" fill="currentColor" stroke="none" aria-hidden="true" focusable="false">${paths.nova}</svg>`;
