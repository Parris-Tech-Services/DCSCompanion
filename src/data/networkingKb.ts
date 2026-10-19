import type { DcsKbTopic } from './dcsKnowledgeBase';
import { networkingCurriculum } from './networking/networkingCurriculum';

// Quick-reference cards for the ten MSP networking topics (DHCP through
// AD/Microsoft 365). Full lessons live in the learning apps; the shared
// content is in ./networking/networkingCurriculum.ts.
export const networkingKb: DcsKbTopic[] = networkingCurriculum.map((m) => ({
  id: m.id,
  category: 'Networking',
  title: `Networking: ${m.title}`,
  summary: [
    `${m.summary} ${m.whyItMatters}`,
    '',
    'Key terms:',
    ...m.keyTerms.map((k) => `• ${k.term}: ${k.definition}`),
    '',
    'Commands:',
    ...m.commands.map((c) => `• ${c.command} (${c.purpose})`),
    '',
    'Watch out for:',
    ...m.commonMistakes.map((x) => `• ${x}`),
  ].join('\n'),
  links: m.sources.map((s) => ({ label: s.title, url: s.url })),
  tags: ['networking', m.shortTitle.toLowerCase(), ...m.keyTerms.map((k) => k.term.toLowerCase())],
}));
