# NovaLegal fact sheet (internal — not published)

Audit date: 2026-09-21. Purpose: the only facts legal text may rest on.
Tags: **VERIFIED** = read in code/config · **USER** = stated by Brandon · **UNKNOWN** = needs an answer, must not be written as fact.

## 1. Owner / operator
- USER: owned and operated by one individual (Brandon). No company/LLC/entity exists to name.
- UNKNOWN: the exact legal/display name for documents. (Not in any repo as a legal name; not to be inferred from the `17sh8dy` handle or e-mail.)
- UNKNOWN: governing-law state, venue.

## 2. Contact
- USER: getnovasupport@gmail.com (also used by Nova.Help). VERIFIED: already in Nova's privacy page. `NovaLegal/data/site.js` has `contactEmail: null` (deliberately unset) — to be set to this address.
- No phone, postal address, legal department or agent exists. None will be written.

## 3. Products — what the code actually shows
| Product | Kind | Verified behaviour relevant to legal text |
|---|---|---|
| Nova (site) | static site, Cloudflare Pages | No analytics/third-party scripts found. localStorage: `nova.lang` (language choice). Links to Discord, GitHub, Nova.Help. Own privacy/terms pages exist (see §9). |
| Nova.Help | Cloudflare Worker + D1 + R2, live at nova-help.shadylabs.workers.dev | Stores tickets: product/area/subject/description, requester email + name, platform, app version, attachments (R2), event history, **source IP per ticket**. Cookies: a signed per-ticket pass cookie and a session cookie (only two). No analytics/third-party scripts ("every asset served from this site"). Cloudflare `observability` is enabled on the Worker (Cloudflare platform logs). Account system lives here. |
| Nova Account | shared identity (in NovaHelp/packages/nova-accounts) | Stores: email, display name, scrypt password hash (salted), account status; sessions (with product, label, expiry); linked products; device-authorization records; password-reset token hashes; **optional profile picture** (PNG/JPEG/WebP ≤256 KB, in R2); per-product **sync document** (opaque JSON blob per account+product). Accounts are optional; no product feature is gated. |
| Google sign-in | code exists | **Not live**: the deployed Worker has only `NOVA_HELP_SECRET`; `NOVA_GOOGLE_CLIENT_ID/SECRET` are unset, so the button never appears. Matches "coming soon". |
| Password-reset e-mail | code exists | UNKNOWN/likely not sent from the deployed Worker (no mail transport there per project notes). Nova.Help privacy page says "this site sends no mail" while local Node build can e-mail support on ticket filing — needs reconciling. |
| Atlas (desktop, Tauri) | Windows | Local-first. No telemetry/analytics/crash reporter found (diagnostics stay on the machine, per source). API keys for cloud providers stored in **Windows Credential Manager** (`secrets.rs`), read by the Rust side, never held by the webview. Cloud providers implemented: OpenAI-compatible (OpenAI, Kimi/Moonshot, custom base URL), Anthropic, Gemini; each only after the user adds a provider + key. Requests go directly from the app to the provider. Web search: DuckDuckGo HTML endpoint, or **Tavily** (its own key, also in Credential Manager) — a third party the brief did not list. Page fetching from result URLs. Local model via Ollama (localhost). Update check against GitHub releases. Nova Account connection only via Nova.Help (device grant); does not upload Atlas data (per product copy). |
| Atlas website | static, Cloudflare | localStorage: `atlas-theme`, `atlas-assistant-name`, `nova.lang`. No analytics found. **No legal links at all.** |
| Nova Cut (desktop, Electron) | Windows | Projects/media stay on the machine; ffmpeg export. Settings shows an info row "Analytics and crash reports" (text not yet checked line-by-line); no telemetry/crash-reporter code found by search. Auto-update is `planned`, not live. Optional Nova Account via device grant. |
| Nova Cut website | static | localStorage: `oc-theme`, `nova.lang`. No analytics found. **No legal links at all.** |
| Replay.GG | Electron, Windows | Local recording/clip library. Auto-updater (electron-updater) checks GitHub releases of 17sh8dy/Replay.GG every ~6 h; downloads only when the user asks. No analytics found. Optional Nova Account. |
| NovaLegal | static, zero-dep Node | localStorage: `nova-legal-theme`, `nova.lang`. No analytics. The required attorney-review disclaimer exists verbatim in `src/views/layout.mjs:108` (site-wide footer). |

Also in NovaLegal's registry but **not on your list**: **Online Earth**, **Nova Forge**. Left untouched; I will not create obligations for them unless you say so.

## 4. Payments / subscriptions
- USER: planned, not offered. VERIFIED: no payment provider, price or billing code found in the audited repos. → placeholder document only, no terms.

## 5. Geographic availability
- USER: operated from the US; not geo-locked. VERIFIED: no country blocking found.

## 6. Age
- USER: recommended ≈12–13+ for many products; some future games/AI apps may be 17+. Nothing formally decided per product. Existing Nova privacy page says "not directed at children"; Nova ToS says "old enough to enter an agreement where you live". → UNKNOWN per product.

## 7. Copyright/DMCA
- USER: no formal system now. VERIFIED: NovaLegal has `copyright` and `dmca` documents registered as pending. Nova's ToS §7 refers to a copyright process — text not yet checked against reality.

## 8. Current NovaLegal state
- 12 documents registered, **all `pending`** (no content, by design; `catalog.mjs`/`npm run check` reject sections on a pending doc). `appliesTo: []` everywhere. Categories: Terms, Privacy, Community, Accounts.
- Products in `data/products.js` carry factual blurbs. Two (Online Earth, Nova Forge) have no descriptions.
- Footer links (`/terms`, `/privacy` …) all resolve to "content pending" panels.
- Translations: es/fr/de/pt for all *current* strings (341/341) — legal bodies do not exist yet.
- `home/status` copy says "None published yet".

## 9. Contradictions found in the ecosystem today
1. **Nova `terms-of-service.html` §3**: "Nova does not currently require or offer an account." — but Nova Accounts exist and the Nova privacy page describes them.
2. **Nova `privacy.html`**: "collects nothing … unless you make a Nova Account" is true for the Nova site alone, but reads as if it covers all Nova services; Nova.Help stores tickets, e-mail, IP, attachments and a Cloudflare-hosted database.
3. **Nova.Help privacy page**: "this site sends no mail" vs. the code path that e-mails getnovasupport@gmail.com on ticket filing (local server only, not deployed).
4. **Nova.Help privacy page** calls itself "not a legal privacy policy for the Nova group" — consistent with NovaLegal only if NovaLegal links to it.
5. Nova ships **three** overlapping pages (`privacy`, `terms-of-service`, `terms-of-use`) and NovaLegal registers `terms` **and** `terms-of-usage`.
6. Atlas Website and Nova Cut website have **no** links to any legal page; Nova links to its own local copies, not NovaLegal.
7. NovaLegal has no public origin/URL yet (`origin: null`), so cross-site links to it cannot be written until it is deployed.

## 10. Retention / deletion (all UNKNOWN as policy)
- Code: sessions and reset tokens expire; ticket retention, account deletion and data export are handled "by a person via a ticket" (Nova.Help page). No automated deletion or retention period found. No retention period will be written.
