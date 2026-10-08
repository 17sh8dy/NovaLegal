/**
 * Acceptable Use Policy.
 *
 * Kept to the conduct that applies to what Nova actually runs today (accounts, support tickets,
 * the websites, the software). Community-space rules are a separate, pending document because
 * no Nova product currently hosts content shared between people.
 */
import { ALL_PRODUCTS, PUBLISHED } from './_common.js';

export const document = {
  id: 'acceptable-use',
  title: 'Acceptable Use Policy',
  description: 'What may and may not be done with Nova products and services.',
  category: 'terms',
  appliesTo: ALL_PRODUCTS,
  status: 'published',
  effectiveDate: PUBLISHED,
  updatedDate: '2026-10-07',
  version: '1.0',
  versions: [],
  sections: [
    {
      id: 'use',
      heading: 'Using Nova',
      body: [
        'Use Nova products for what they are for: editing, recording, getting help, managing an account, and reading these documents. This policy is part of the [Terms of Service](/terms).',
      ],
    },
    {
      id: 'not-allowed',
      heading: 'What you may not do',
      body: [
        'You may not use a Nova product or service to:',
        {
          list: [
            'break the law, or help someone else break it;',
            'attack, overload, probe or try to get into Nova’s services, accounts or systems, or anyone else’s;',
            'sign in to, or try to sign in to, an account that is not yours;',
            'send malware, or use Nova to deliver it;',
            'harass, threaten or impersonate another person, or impersonate Nova;',
            'send sexual content involving minors. This is never allowed, in any context;',
            'use, record or share material you do not have the right to use;',
            'send passwords, payment card numbers or other people’s personal information in a support ticket;',
            'get around a technical limit or safety measure in a Nova product; or',
            'present a modified copy of Nova software as an official Nova release.',
          ],
        },
      ],
    },
    {
      id: 'prohibited-uses',
      heading: 'Prohibited uses in detail',
      body: [
        'These are examples of what the rule against breaking the law, or helping someone else break it, means in practice. They are prohibited uses of Nova products and services. The list is not complete: other unlawful or seriously harmful activity is prohibited too.',
        'The key words are “facilitate”, “enable” and “assist in carrying out”. Explaining, studying, reporting on or defending against something is not the same as using Nova to do it, and these rules are about the second.',
        'Sexual exploitation',
        {
          list: [
            'creating, requesting, possessing, distributing or facilitating child sexual abuse material or any sexual content involving minors;',
            'sexual exploitation or trafficking of any person;',
            'sexualizing a real person without their consent, or creating or sharing intimate imagery or sexual deepfakes of a person without their consent.',
          ],
        },
        'Violence and serious harm',
        {
          list: [
            'planning or facilitating serious violent crime, or giving instructions for harming or killing people;',
            'terrorism or violent extremist activity;',
            'threats, extortion or coercive abuse;',
            'encouraging or facilitating self-harm.',
          ],
        },
        'Illegal drugs and weapons',
        {
          list: [
            'manufacturing illegal drugs, facilitating illegal drug trafficking, or evading drug-law enforcement;',
            'helping to build or use illegal weapons, carrying out or assisting a violent attack, or turning software, devices, chemicals or other materials into weapons.',
          ],
        },
        'Cyber abuse',
        {
          list: [
            'creating, deploying or spreading malware, ransomware, spyware or other destructive software;',
            'stealing credentials, or phishing;',
            'getting into accounts, computers, networks or systems without authorization;',
            'stealing, destroying or encrypting someone else’s data;',
            'DDoS attacks or any other intentional disruption;',
            'bypassing authentication or other security controls without authorization, or evading detection after unauthorized access.',
          ],
        },
        'Fraud and deception',
        {
          list: [
            'scams and fraudulent schemes, and identity theft;',
            'forging documents or credentials for fraudulent purposes;',
            'impersonating someone to defraud or seriously harm them;',
            'manipulating financial systems illegally.',
          ],
        },
        'Privacy abuse',
        {
          list: [
            'stalking, targeted surveillance, or tracking someone without their knowledge or consent;',
            'doxxing, or obtaining or exposing private information without authorization;',
            'getting around privacy protections.',
          ],
        },
        'Misusing software that acts on a computer',
        {
          list: [
            'using a Nova product to bypass an operating system’s security mechanisms;',
            'using it to get around another application’s access controls;',
            'using it to automate unauthorized actions against third-party services, or to evade restrictions a service provider has set;',
            'using it to deliberately damage another person’s computer or data.',
          ],
        },
        'Explaining how something works, for education, research or defence, is allowed. Using a Nova product to carry it out is not. For Atlas, see the [Atlas Terms](/atlas-terms#prohibited-uses).',
      ],
    },
    {
      id: 'recording',
      heading: 'Recording and capturing',
      body: [
        'Replay.GG and Atlas can capture your screen, and Replay.GG can capture audio and a webcam. You are responsible for having the right to capture what appears on your screen and for telling people you record where the law or a service’s rules require it. See [Replay.GG Terms](/replay-gg-terms).',
      ],
    },
    {
      id: 'consequences',
      heading: 'What can happen',
      body: [
        'If a hosted service such as an account or Nova.Help is used in breach of this policy, Nova may limit or close access to it. See [Terms of Service](/terms#suspension).',
      ],
    },
    {
      id: 'report',
      heading: 'Reporting a problem',
      body: ['To report abuse or a security problem, write to {{contact}}. See [Security](/security).'],
    },
  ],
  related: ['terms', 'security', 'replay-gg-terms', 'community-guidelines'],
};
