/**
 * Atlas Terms — the product-specific terms for Atlas (the app and its website).
 *
 * EVERY "what is sent" statement here comes from tracing the actual request code on 2026-09-21 (and, for project work,
 * documentation research and what Atlas reads on your computer, on 2026-10-08 — Atlas 1.0.8: packages/engine/src/agent/loop.ts,
 * skills/docs-skills.ts, web/untrusted.ts, skills/pc-health-skills.ts, skills/file-intel-skills.ts, and the Rust side in pc_health.rs / web.rs)
 * (docs/FACT-SHEET.md §Atlas request trace):
 *   - cloud requests are built in packages/engine/src/engine.ts (converse / planWithAI /
 *     converseWithProvider) and sent by apps/desktop/src-tauri/src/cloud_intelligence.rs as ONE
 *     user message per request (`messages: [{ role: "user", content: prompt }]`, or the
 *     Anthropic/Gemini equivalent). There is no system-prompt field and no conversation history;
 *   - what a message can contain is composed in apps/web/src/app/AtlasApp.tsx
 *     (`askWithContext` ← `describeForEngine`): attachment names + locations, and file text only
 *     for a file the person explicitly asked Atlas to read; images are noted as "an image" only;
 *   - web evidence comes from packages/engine/src/web/evidence.ts `buildEvidencePrompt`.
 * Atlas 2.0 (2026-10-18) additions come from docs/CLOUD-SAFETY-AND-STATS.md, docs/SECURITY-HARDENING-2.0.md and
 * docs/MODEL-GATEWAY.md in the Atlas repo, and from engine.ts `identityFacts` / `styled`.
 * Atlas 2.0.2 (2026-10-19) additions (terminal windows, saved workflows, Universal Agent) come from docs/CAPABILITY-SYSTEM-2.0.2.md and
 * packages/engine/src/universal/loop.ts. The claim that terminal text reaches a provider only through the Universal Agent was checked on
 * 2026-10-19: the dev agent (DEV_AGENT_DOMAINS) and UI agent (UI_AGENT_SKILLS) cannot use terminal skills, and the planner/chat prompts carry no skill output.
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
  updatedDate: '2026-10-19',
  version: '2.1',
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
        'Scripts and projects. Atlas can write whole project folders (such as a small game or tool) into a folder you choose. It can also run a PowerShell script, but only after it shows you the entire script and you approve it, and it refuses scripts that would be dangerous or that reach outside the folders you have allowed. Atlas builds these projects itself, without an AI model.',
        'Project work with a model. If you connect an AI model and ask Atlas to work on a software project, it can read files in that project folder, edit them, and run the project’s own build and test commands, one step at a time, with the approvals described here. Atlas reports a project change as verified only if a build or test passed after its last change; otherwise it says it could not verify it.',
        '**Terminal windows.** Atlas can open a visible PowerShell window to run a script you approved, and read back what that window shows so it can tell you the result. The same rules as for scripts apply: Atlas shows you the entire script first, blocks scripts that its safety checks identify as dangerous (including ones that raise permissions, download things, delete things or reach credentials), and stays inside the folders you have allowed. What a terminal window shows is not sent to an AI provider by any other Atlas feature; it can only be sent if you have turned on the Universal Agent (below) and it reads the window while working on a task for you.',
        '**Saved workflows.** You can ask Atlas to remember a series of steps under a name (for example “remember that as echo test”) and run it again later. Atlas shows you the steps and saves them only after you say yes. They are stored on your computer only. Atlas refuses to save a step that looks like it contains a password, key or token. Running a saved workflow asks for your approval again for each step, exactly as if you had just made the request; saving never approves anything in advance.',
        '**Universal Agent (experimental).** If you turn it on in Settings, Atlas can work a multi-step job out one step at a time with an AI model, choosing from what it can do. **It is off by default, including after you upgrade, and nothing is sent to a model for this purpose while it is off.** ⚠️ It is in early development and may perform unintended actions or tasks you did not ask for. When Atlas starts it, it requires your confirmation before each action it attempts to run, whatever your execution mode, and every action still goes through the same permissions, Allowed Folders, previews and confirmations. It cannot create workflows, routines, watches or other agents. Its closing report keeps what Atlas recorded and confirmed apart from what the model said. These safeguards reduce risk but cannot guarantee that the agent will always interpret your request correctly or avoid unintended results.',
        'Looking at your computer. When you ask, Atlas can read information about your computer: processor, memory, graphics card and disk use, installed and running programs, device drivers, recent error entries in the Windows event log, network adapter totals, and settings in the Windows registry. It only reads. Atlas has no tool that changes the registry, and it does not read the parts of the registry that hold security or sign-in data. It can also check what kind of file something really is and whether Windows trusts its digital signature (to decide that, Windows may contact the organization that issued the signing certificate), read the text of PDF and Word documents, and search inside files, in folders you have allowed.',
        'Working in other programs. When you name a window, Atlas first tries to press buttons, type and scroll through that program’s accessibility interface, which does not move your mouse or take over your keyboard. If a program does not allow that, Atlas says why and asks before it uses your real mouse and keyboard. It does not type into password fields this way.',
        'Folders, engines and plugins. Atlas only works inside folders you have allowed. If you ask for a folder it cannot reach yet, it asks first, and it adds the folder only if you click “Add It?”. To offer help with game projects, Atlas checks whether Unreal Engine, Unity, Godot or Blender is installed by looking in the Windows registry and in the usual install folders. It never downloads, installs or starts them. Atlas also reads a plugins folder in its own app data. A plugin is only a description of project files, and it cannot run code.',
        'You are responsible for what you ask Atlas to do and for confirming actions it asks you to confirm. Atlas has an emergency-stop control that halts what it is doing.',
        'Atlas can capture your screen. A screenshot is shown to you; it is not sent to an AI provider.',
        'Checking its own work. After Atlas creates, deletes or changes something, it can read the result back and tell you whether it was confirmed. Longer jobs run as step-by-step tasks that you can see in Settings, stop with the emergency-stop key, and pick up again; Atlas asks before repeating a step whose outcome it could not confirm.',
        'Atlas’s own files are protected. Atlas’s file tools refuse to read or change the folders where Atlas keeps its settings, downloaded updates and the program itself. Changes that widen what Atlas may reach or trust (a folder, a saved key, a cloud provider’s address, the search address, the stop key) are confirmed in a Windows box that Atlas’s own screen cannot answer for you. This is a safeguard against mistakes and against a misbehaving page; it is not a promise that nothing can ever go wrong on a computer you share with other programs.',
      ],
    },
    {
      id: 'prohibited-uses',
      heading: 'Prohibited uses',
      body: [
        'You may not use Atlas to facilitate, enable or assist in carrying out illegal or seriously harmful activity. The full list is in the [Acceptable Use Policy](/acceptable-use#prohibited-uses). For Atlas, in short, that means using Atlas to:',
        {
          list: [
            '**Sexually exploit people.** Create, request, possess, distribute or facilitate child sexual abuse material or any sexual content involving minors; exploit or traffic anyone; or sexualize a real person or create intimate imagery or sexual deepfakes of them without their consent.',
            '**Cause serious harm.** Plan or facilitate serious violent crime, terrorism or violent extremism, threats, extortion or coercive abuse, or give instructions for harming or killing people or encouraging self-harm.',
            '**Make or traffic illegal drugs or weapons.** Manufacture illegal drugs, facilitate drug trafficking or evade drug-law enforcement; help build or use illegal weapons or carry out a violent attack; or weaponize software, devices, chemicals or other materials.',
            '**Attack computers, accounts or data.** Create or deploy malware, ransomware, spyware or other destructive software; steal credentials or phish; get into accounts, computers, networks or systems without authorization; steal, destroy or encrypt someone else’s data; run DDoS attacks or other intentional disruption; bypass authentication or security controls without authorization; or evade detection afterwards.',
            '**Commit fraud.** Run scams or fraudulent schemes, commit identity theft, forge documents or credentials, impersonate someone to defraud or seriously harm them, or manipulate financial systems illegally.',
            '**Abuse privacy.** Stalk or target someone for surveillance, track someone without their knowledge or consent, dox them, obtain or expose private information without authorization, or get around privacy protections.',
            '**Misuse Atlas itself.** Bypass an operating system’s security mechanisms, get around another application’s access controls, automate unauthorized actions against third-party services, deliberately damage another person’s computer or data, or evade restrictions a service provider has set.',
          ],
        },
        'Atlas can use the mouse and keyboard, run scripts you approve, and act in other programs. The rules above apply to everything it does on your behalf, and you are responsible for what you ask it to do.',
        'Understanding is not the same as doing. Asking Atlas to explain how ransomware works, what the risks of a dangerous substance are, or how a defence against an attack works is fine. Using Atlas to deploy ransomware, or to help make an illegal drug, is not.',
        'Atlas declines some clear requests of this kind. That is a limited safeguard, not a promise that it catches everything, and it does not replace your responsibility to follow these terms and the law.',
      ],
    },
    {
      id: 'providers-and-rules',
      heading: 'Models, providers and these rules',
      body: [
        'These restrictions apply regardless of whether Atlas uses a Nova-provided model, a locally hosted model, a third-party model, a cloud-based model, a custom provider, or another supported integration. Connecting Atlas to a different model or provider does not change them or exempt you from them.',
        'In order: Nova’s rules apply first. Atlas’s own safeguards apply next, as far as they go. A provider’s rules then apply on top, and you are responsible for following both the provider’s policies and Nova’s terms.',
        'Nova cannot promise that every model you connect will follow Nova’s policies. A third-party provider may also impose additional restrictions, and may refuse or limit requests that these terms would allow.',
      ],
    },
    {
      id: 'providers',
      heading: 'AI providers you connect',
      body: [
        'You can connect a cloud AI provider to Atlas. The options today are OpenAI, Anthropic, Google Gemini, Kimi (Moonshot AI), or a custom provider whose address you enter. Atlas can also use a model running on your own computer.',
        'You provide your own API key. Atlas stores it in Windows Credential Manager on your computer. Nova does not store it on a Nova server. Requests go from Atlas on your computer directly to the provider you chose; they do not pass through a Nova server.',
        'Atlas sends a request only to the address saved for the provider you chose, and does not follow redirects to another address. Atlas holds that address itself, not the page you see. Adding a provider, changing its address or saving a key is confirmed in a Windows box.',
        'Providers charge for use of your key under their own terms. That is between you and the provider.',
        'Spending limits. Atlas can count your requests and tokens per provider, let you set monthly caps, and pause a provider when it says your account is out of money or when requests arrive in a runaway loop. Token counts are the provider’s own where it reports them, and an estimate otherwise. Atlas never switches to a different provider by itself, and resuming a paused provider or raising a cap is confirmed in a Windows box. These are safeguards, not a guarantee against charges: the provider’s own limits and bill are what count.',
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
            '**A short statement of Atlas’s use rules**, in the same cases and whenever Atlas asks a provider to plan actions or work towards a goal for you. It says Atlas does not help carry out illegal or seriously harmful activity, that explaining and teaching about sensitive subjects is fine, and that this applies whichever model is in use. An ordinary question is sent without it.',
            '**A list of the actions Atlas can perform**, with your request, when Atlas asks the provider to turn a new kind of wording into a plan. The list describes Atlas’s abilities, not your data.',
            '**Web results**, when your question needs current information. See the next section.',
            '**A short statement of who Atlas is**, with ordinary conversation and with questions about Atlas itself (for example “what can you do”). It says Atlas is a Windows desktop assistant that carries out actions itself, roughly how many tools it has, and that what it remembers is kept on your computer. It contains no memory, file names or system readings. Your name is added only when the model runs on your own computer, never for a cloud provider.',
            '**A style note**, if you chose a way for Atlas to talk to you in Settings.',
            '**A fixed sentence** asking for a longer answer, if you turned on “Think longer”.',
            '**Project work**, when you ask Atlas to work on a software project. Each step also includes your goal, the folder you named, and what the earlier steps of that task produced: text of files Atlas read, search results, build and test output, and notes from documentation it read, shortened to fit. This is not earlier conversation. With a model running on your own computer, none of it leaves your computer.',
            '**Universal Agent tasks**, when you have turned the Universal Agent on and it is working on a goal. Each step includes your goal, the names and short descriptions of the few Atlas abilities that fit that step, and what the earlier steps produced, shortened to fit: for example text of files Atlas read, search results, text from web pages, and text read from a terminal window. This is not earlier conversation. With a model running on your own computer, none of this leaves your computer, except that any web search it runs still sends its query to the search service, as described in the next section.',
          ],
        },
        'Ordinary conversation (greetings, thanks and small talk) goes to the model you connected when that model can hold a conversation; if it cannot be reached Atlas answers by itself. If a model supports tool calling or answers held to a format, the list of actions is sent in that form instead of as plain text, limited to the few abilities that fit your request. It describes Atlas’s abilities, not your data, and you can switch off cloud planning of actions in Settings.',
        'The request also carries the model name you chose, and your API key so the provider can accept it. Testing a connection sends a fixed one-line test message.',
        'Atlas’s memory, its file index and your other files are not added to a request unless you attached them, wrote them in your message, or asked Atlas to work on a project that contains them.',
      ],
    },
    {
      id: 'web',
      heading: 'Web search and web pages',
      body: [
        'Your own search address. In Settings you can give Atlas the address of a SearXNG search server. When you do, Atlas sends your search query there first, and uses its built-in services only if that server does not answer. You are responsible for the server you point Atlas at. An address on the internet must be https, an address on your own network asks you first, and Atlas never follows it to a different address.',
        'Atlas can search the web when you ask, and it can also do so by itself when a question looks like it needs current information. To search, Atlas sends your search query, which is made from your message, to a search service. Atlas can use DuckDuckGo, Tavily (which needs your own Tavily API key, stored in Windows Credential Manager) and Wikipedia.',
        'Atlas may also open pages from the results and read their text. Those requests go from your computer to the website in question, which can see your IP address and that the request came from Atlas.',
        'Documentation research. When you ask Atlas to look something up in the documentation, or while it works on a software project with a model connected, Atlas can search for and read documentation pages by itself. It follows each website’s robots.txt, leaves file paths, keys, tokens and email addresses out of what it searches for, and only reads public web addresses (never your own network). Atlas treats everything on a page as information to read, never as instructions to follow. The notes it takes from pages are kept in memory only while Atlas is running.',
        'The Universal Agent can also search the web and open public pages for a general question you give it, not only for documentation. The same limits apply: it follows each website’s robots.txt, leaves file paths, keys, tokens and email addresses out of what it searches for, only reads public web addresses, and treats everything on a page as information to read, never as instructions to follow. A web search sends its query to an external search service even when your AI model runs on your own computer. If an AI provider is connected, the results and page text the agent read are sent to that provider with your goal. Do not put private information in a request you expect to trigger a web search.',
        'If an AI provider is connected, Atlas then sends the provider the titles, website names, dates and text excerpts of the results and pages it read, with your question, so the provider can write an answer. Do not put private information in a message you expect to trigger a web search.',
      ],
    },
    {
      id: 'statistics',
      heading: 'Statistics on your computer',
      body: [
        'Atlas keeps a small set of counts on your computer so the Stats page in Settings can show you what it has done: how many requests went to each model, estimated tokens, searches, actions done or failed, stops and time open. They are counts, never the content of your messages, files, searches or paths. They are stored in a file on your computer, Atlas has no way to send them anywhere, and they are not tied to a Nova Account. “Reset statistics” in Settings, or deleting Atlas’s data folder, clears them.',
        'Keeping the counts on your computer does not change what a cloud provider you connect receives; see above.',
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
        'Your Nova sign-in on this computer is kept in Windows Credential Manager, and Atlas moves an older saved sign-in there the first time it starts.',
        'Atlas checks GitHub’s release hosting for newer versions. From Atlas 2.0, an update must carry a digital signature from Atlas’s release key and match the installer’s checksum, and Atlas will only look for updates in its own project’s releases. An update that does not verify is not installed. Atlas 2.0 is the first version that checks this, so installing it is the one step where that check cannot protect you; after that, it applies to every update.',
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
