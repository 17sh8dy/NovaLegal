/**
 * Nova Legal — progressive enhancement, and nothing else.
 *
 * ⚠ NOTHING ON THIS SITE REQUIRES THIS FILE. Every page renders complete without it:
 * navigation is links, the search page lists every document server-side, and each document's
 * full text is in the HTML. That is not an accident — a legal document that will not display
 * because a script failed is a legal document nobody was shown.
 *
 * So everything here is additive:
 *   · a theme toggle (the stored choice is applied inline in <head>, before first paint);
 *   · live filtering on the search page, over the list that is already there;
 *   · a table-of-contents highlight that follows the reader;
 *   · the mobile navigation;
 *   · the print button, which is `window.print()` and exists because people look for a button.
 */
(function () {
  'use strict';

  /* ── Theme ────────────────────────────────────────────────────────────────────────────
   *
   * Three states, matching the rest of the Nova ecosystem: light, dark, and system. The
   * toggle cycles through the two explicit ones and falls back to whatever the OS says when
   * nothing is stored. Every storage call is guarded — a browser set to block site data
   * throws on read, and the page must still work for that reader. */
  var THEME_KEY = 'nova-legal-theme';

  function storedTheme() {
    try {
      return localStorage.getItem(THEME_KEY);
    } catch (e) {
      return null;
    }
  }

  function setTheme(value) {
    document.documentElement.setAttribute('data-theme', value);
    try {
      localStorage.setItem(THEME_KEY, value);
    } catch (e) {
      /* The choice still applies for this page view; it simply will not be remembered. That
         is a far better outcome than an exception out of a click handler. */
    }
  }

  var themeToggle = document.querySelector('[data-theme-toggle]');
  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      var current = storedTheme();
      if (!current) {
        var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        current = prefersDark ? 'dark' : 'light';
      }
      setTheme(current === 'dark' ? 'light' : 'dark');
    });
  }

  /* ── Mobile navigation ──────────────────────────────────────────────────────────────── */

  var navToggle = document.querySelector('[data-nav-toggle]');
  var navPanel = document.getElementById('site-nav');
  if (navToggle && navPanel) {
    navToggle.addEventListener('click', function () {
      var open = navPanel.hasAttribute('data-open');
      if (open) navPanel.removeAttribute('data-open');
      else navPanel.setAttribute('data-open', '');
      navToggle.setAttribute('aria-expanded', String(!open));
    });
  }

  /* ── Print ──────────────────────────────────────────────────────────────────────────── */

  var printButton = document.querySelector('[data-print]');
  if (printButton) {
    printButton.addEventListener('click', function () {
      window.print();
    });
  }

  /* ── Search ───────────────────────────────────────────────────────────────────────────
   *
   * A filter over the list already in the DOM. There are eleven documents; an index and a
   * ranking function would be real engineering spent on something that fits on one screen.
   * When the set grows, this is the shape that gains a real index behind it — the markup and
   * the no-JS fallback do not change. */

  var input = document.querySelector('[data-search-input]');
  var results = document.querySelector('[data-search-results]');

  if (input && results) {
    var rows = Array.prototype.slice.call(results.querySelectorAll('.result'));
    var count = document.querySelector('[data-search-count]');
    var empty = document.querySelector('[data-search-empty]');
    var chips = Array.prototype.slice.call(document.querySelectorAll('[data-filter]'));
    var category = 'all';

    function apply() {
      var query = input.value.trim().toLowerCase();
      var terms = query ? query.split(/\s+/) : [];
      var shown = 0;

      rows.forEach(function (row) {
        var hay = row.getAttribute('data-search') || '';
        /* Every term must appear somewhere. AND rather than OR, because on a set this small OR
           matches nearly everything and stops being a filter. */
        var matches = terms.every(function (term) {
          return hay.indexOf(term) !== -1;
        });
        var inCategory = category === 'all' || row.getAttribute('data-category') === category;
        var visible = matches && inCategory;

        row.hidden = !visible;
        if (visible) shown += 1;

        /* Section hints: show only the ones that matched, so a result points at the part of
           the document the reader was actually looking for. */
        var hints = row.querySelectorAll('.result__hint');
        for (var i = 0; i < hints.length; i += 1) {
          var text = hints[i].getAttribute('data-hint') || '';
          hints[i].hidden = terms.length === 0 || !terms.some(function (term) {
            return text.indexOf(term) !== -1;
          });
        }
      });

      if (count) {
        count.textContent = shown === rows.length
          ? rows.length + ' documents'
          : shown + ' of ' + rows.length + ' documents';
      }
      if (empty) empty.hidden = shown !== 0;
    }

    input.addEventListener('input', apply);

    chips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        category = chip.getAttribute('data-filter');
        chips.forEach(function (other) {
          var on = other === chip;
          other.classList.toggle('chip--on', on);
          other.setAttribute('aria-pressed', String(on));
        });
        apply();
      });
    });

    /* `?q=` is honoured so a search can be linked to, even though the form submission is a
       no-op with JavaScript on. */
    var initial = new URLSearchParams(window.location.search).get('q');
    if (initial) {
      input.value = initial;
      apply();
    }

    input.focus({ preventScroll: true });
  }

  /* ── Table of contents ────────────────────────────────────────────────────────────────
   *
   * Highlights the section the reader is in. `IntersectionObserver` rather than a scroll
   * handler so it costs nothing while nobody is scrolling; absent in a very old browser, in
   * which case the contents list is a plain set of links, which is all it ever had to be. */

  var tocLinks = Array.prototype.slice.call(document.querySelectorAll('[data-toc-link]'));
  if (tocLinks.length && 'IntersectionObserver' in window) {
    var byId = {};
    tocLinks.forEach(function (link) {
      byId[link.getAttribute('href').slice(1)] = link;
    });

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          var link = byId[entry.target.id];
          if (!link) return;
          if (entry.isIntersecting) {
            tocLinks.forEach(function (other) {
              other.removeAttribute('data-current');
            });
            link.setAttribute('data-current', '');
          }
        });
      },
      /* Fires when a heading reaches the upper third, which is where a reader's eye is —
         not when it touches the very top, which highlights a section they have passed. */
      { rootMargin: '-80px 0px -66% 0px' },
    );

    Object.keys(byId).forEach(function (id) {
      var section = document.getElementById(id);
      if (section) observer.observe(section);
    });
  }
})();
