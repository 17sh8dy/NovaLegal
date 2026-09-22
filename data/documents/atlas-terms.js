/**
 * Atlas Terms — the product-specific terms for Atlas (the app and its website).
 *
 * EVERY "what is sent" statement here comes from tracing the actual request code on 2026-09-21
 * (docs/FACT-SHEET.md §Atlas request trace):
 *   - cloud requests are built in packages/engine/src/engine.ts (converse / planWithAI /
 *     converseWithProvider) and sent by apps/desktop/src-tauri/src/cloud_intelligence.rs as ONE
 *     user message per request (`messages: [{ role: "user", content: prompt }]`, or the
 *     Anthropic/Gemini equivalent). There is no system-prompt field and no conversation history;
 *   - what a message can contain is composed in apps/web/src/app/AtlasApp.tsx
 *     (`askWithContext` ← `describeForEngine`): attachment names + locations, and file text only
 *     for a file the person explicitly asked Atlas to read; images are noted as "an image" only;
 *   - web evidence comes from packages/engine/src/web/evidence.ts `buildEvidencePrompt`.
 * If any of that code changes, THIS DOCUMENT MUST CHANGE WITH IT.
 */
import { PUBLISHED } from './_common.js';

export const document = {
  id: 'atlas-terms',
  title: 'Atlas Terms',
  description: 'Terms specific to Atlas: what it does on your computer, and what it sends to AI and search services.',
  category: 'terms',
  appliesTo: ['atlas'],
  status: 'published',
  effectiveDate: PUBLISHED,
  updatedDate: PUBLISHED,
  version: '1.0',
  versions: [],
  sections: [
    {
      id: 'what',
      heading: 'What these terms cover',
      body: [
        'These terms are about Atlas, the desktop assistant, and its website. They apply in addition to the [Terms of Service](/terms), the [Privacy Policy](/privacy) and the [Acceptable Use Policy](/acceptable-use). Where they differ for Atlas, these terms decide.',
        'Atlas is local-first: it works on your computer with nothing connected. Everything below about AI providers and web search applies only if you use those features.',
      ],
    },
    {
      id: 'on-your-computer',
      heading: 'What Atlas does on your computer',
      body: [
        'When you ask, Atlas can open apps and files, find files, create files and folders, control windows, and use the mouse and keyboard. Atlas acts on your computer with your permissions.',
        'You are responsible for what you ask Atlas to do and for confirming actions it asks you to confirm. Atlas has an emergency-stop control that halts what it is doing.',
        'Atlas can capture your screen. A screenshot is shown to you; it is not sent to an AI provider.',
      ],
    },
    {
      id: 'providers',
      heading: 'AI providers you connect',
      body: [
        'You can connect a cloud AI provider to Atlas. The options today are OpenAI, Anthropic, Google Gemini, Kimi (Moonshot AI), or a custom provider whose address you enter. Atlas can also use a model running on your own computer.',
        'You provide your own API key. Atlas stores it in Windows Credential Manager on your computer. Nova does not store it on a Nova server. Requests go from Atlas on your computer directly to the provider you chose; they do not pass through a Nova server.',
        'Providers charge for use of your key under their own terms. That is between you and the provider.',
      ],
    },
    {
      id: 'what-is-sent',
      heading: 'What Atlas sends to a cloud AI provider',
      body: [
        'Each request is a single message. As of this version, Atlas does not send earlier messages from your conversation, and does not send a separate system prompt. A request can contain:',
        {
          list: [
            '**Your message**, exactly as you wrote it.',
            '**Attachments you added to that message.** For each one, its name and its location on your computer. For an image or screenshot, only that it is an image; the image itself is not sent. The text of a file is included only if you asked Atlas to read that file.',
            '**A short fixed instruction**, when Atlas could not carry out something you asked and wants the provider to write a reply. It tells the provider that Atlas is a Windows desktop assistant that does actions itself.',
            '**A list of the actions Atlas can perform**, with your request, when Atlas asks the provider to turn a new kind of wording into a plan. The list describes Atlas’s abilities, not your data.',
            '**Web results**, when your question needs current information. See the next section.',
            '**A fixed sentence** asking for a longer answer, if you turned on “Think longer”.',
          ],
        },
        'The request also carries the model name you chose, and your API key so the provider can accept it. Testing a connection sends a fixed one-line test message.',
        'Atlas’s memory, its file index and your other files are not added to a request unless you attached them or wrote them in your message.',
      ],
    },
    {
      id: 'web',
      heading: 'Web search and web pages',
      body: [
        'Atlas can search the web when you ask, and it can also do so by itself when a question looks like it needs current information. To search, Atlas sends your search query, which is made from your message, to a search service. Atlas can use DuckDuckGo, Tavily (which needs your own Tavily API key, stored in Windows Credential Manager) and Wikipedia.',
        'Atlas may also open pages from the results and read their text. Those requests go from your computer to the website in question, which can see your IP address and that the request came from Atlas.',
        'If an AI provider is connected, Atlas then sends the provider the titles, website names, dates and text excerpts of the results and pages it read, with your question, so the provider can write an answer. Do not put private information in a message you expect to trigger a web search.',
      ],
    },
    {
      id: 'third-parties',
      heading: 'Third parties are not Nova',
      body: [
        'AI providers, search services and websites have their own terms and privacy policies. Nova does not control what they keep, log, use to improve their services, or share, and makes no promise about it. Read their policies before you connect them. Some providers set their own minimum age or usage rules.',
      ],
    },
    {
      id: 'answers',
      heading: 'Answers can be wrong',
      body: [
        'AI answers and web results can be wrong or out of date. Check anything important before you rely on it or act on it.',
      ],
    },
    {
      id: 'account-updates',
      heading: 'Account and updates',
      body: [
        'A Nova Account is optional and does not unlock Atlas features. Signing in links your Nova identity to Atlas without uploading Atlas’s data from your computer.',
        'Atlas checks GitHub’s release hosting for newer versions.',
      ],
    },
    {
      id: 'age',
      heading: 'Minimum age',
      body: ['Atlas is 13+ recommended. See the [Terms of Service](/terms#age).'],
    },
  ],
  related: ['terms', 'privacy', 'security', 'account'],
};
