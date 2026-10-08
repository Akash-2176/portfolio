// Content → blocks. Used by terminal commands and by the app windows/screens.
import { activities, company, profile } from '../data/profile';
import { projects } from '../data/projects';
import { experience, education } from '../data/experience';
import { skills } from '../data/skills';

export const LOGO = [
  ' █████╗  ██████╗██╗     ██╗',
  '██╔══██╗██╔════╝██║     ██║',
  '███████║██║     ██║     ██║',
  '██╔══██║██║     ██║     ██║',
  '██║  ██║╚██████╗███████╗██║',
  '╚═╝  ╚═╝ ╚═════╝╚══════╝╚═╝',
].join('\n');

export const findProject = (key) => {
  const n = Number(key);
  if (Number.isInteger(n) && n >= 1 && n <= projects.length) return projects[n - 1];
  return projects.find((p) => p.slug === String(key).toLowerCase());
};

export const welcomeBlocks = () => [
  { type: 'pre', text: LOGO },
  { type: 'spacer' },
  { type: 'text', text: [{ b: `${profile.name} — ${profile.title}` }] },
  { type: 'text', text: [`${company.role}, `, { href: company.url, label: company.name }] },
  { type: 'text', tone: 'dim', text: 'ACLI-OS v2.0 · interactive portfolio shell' },
  { type: 'spacer' },
  {
    type: 'text',
    text: ['Try ', { cmd: 'whoami' }, ', ', { cmd: 'projects' }, ', ', { cmd: 'experience' }, ' or ', { cmd: 'help' }, '.'],
  },
];

export const whoamiBlocks = () => [
  { type: 'heading', text: 'whoami' },
  {
    type: 'kv',
    items: [
      ['name', { b: profile.name }],
      ['role', profile.title],
      ['company', [`${company.role}, `, { href: company.url, label: company.name }]],
      ['location', profile.location],
      ['github', { href: profile.links.github }],
      ['linkedin', { href: profile.links.linkedin }],
    ],
  },
  { type: 'spacer' },
  { type: 'text', text: profile.bio },
  { type: 'heading', text: 'strengths' },
  { type: 'list', items: profile.strengths },
  { type: 'heading', text: 'beyond code' },
  { type: 'list', items: activities },
];

export const companyBlocks = () => [
  { type: 'heading', text: company.name },
  {
    type: 'kv',
    items: [
      ['role', { b: company.role }],
      ['studio', company.tagline],
      ['based', company.location],
      ['web', { href: company.url }],
      ['work', { href: `${company.url}/portfolio`, label: 'ezuraarc.com/portfolio' }],
    ],
  },
  { type: 'spacer' },
  {
    type: 'text',
    tone: 'dim',
    text: [
      '↳ studio projects: ',
      { cmd: 'projects 1', label: 'VC Police Portal' },
      ', ',
      { cmd: 'projects 2', label: 'The Madras CA' },
      ', ',
      { cmd: 'projects 3', label: 'Puppy Digital Mart' },
    ],
  },
];

export const projectsBlocks = () => [
  { type: 'heading', text: 'projects' },
  {
    type: 'table',
    head: ['#', 'name', 'status', 'for'],
    wideOnly: [3],
    rows: projects.map((p, i) => [
      String(i + 1),
      { cmd: `projects ${i + 1}`, label: p.name },
      { badge: p.status },
      { dim: p.org },
    ]),
  },
  { type: 'spacer' },
  { type: 'text', tone: 'dim', text: ['↳ click a name or run ', { cmd: 'projects 1' }, ' for details'] },
];

export const projectBlocks = (p) => [
  { type: 'heading', text: p.name },
  {
    type: 'kv',
    items: [
      ['status', { badge: p.status }],
      ['for', p.org],
      ...(p.ezura ? [['built by', { href: company.url, label: company.name }]] : []),
      ['summary', p.summary],
      ['stack', p.stack.join(' · ')],
      ['impact', p.impact],
      ...(p.links.length ? [['links', p.links.flatMap((l, i) => [i ? '  ' : '', { href: l.href, label: l.label }])]] : []),
    ],
  },
  { type: 'heading', text: 'features' },
  { type: 'list', items: p.features },
];

export const experienceBlocks = () =>
  experience.flatMap((job) => [
    { type: 'heading', text: job.company },
    ...(job.url ? [{ type: 'text', text: { href: job.url } }] : []),
    { type: 'text', text: [{ b: job.role }, job.period ? { dim: `  ${job.period}` } : ''] },
    { type: 'list', items: job.points },
  ]);

export const educationBlocks = () => [
  { type: 'heading', text: 'education' },
  ...education.flatMap((e, i) => [
    ...(i ? [{ type: 'spacer' }] : []),
    { type: 'kv', items: [['school', e.school], ['course', e.degree], ['period', e.period], ['score', e.detail]] },
  ]),
];

export const skillsBlocks = (flag) => {
  const groups = flag ? skills.filter((g) => g.flag === flag) : skills;
  return [
    ...groups.flatMap((g) => [{ type: 'heading', text: g.label }, { type: 'text', text: g.items.join(' · ') }]),
    ...(flag
      ? []
      : [
          { type: 'spacer' },
          { type: 'text', tone: 'dim', text: ['↳ filter with ', ...skills.flatMap((g, i) => [i ? ' ' : '', { cmd: `skills --${g.flag}`, label: `--${g.flag}` }])] },
        ]),
  ];
};

export const contactBlocks = () => [
  { type: 'heading', text: 'contact' },
  {
    type: 'kv',
    items: [
      ['email', { href: `mailto:${profile.email}`, label: profile.email }],
      ['github', { href: profile.links.github }],
      ['linkedin', { href: profile.links.linkedin }],
      ['studio', { href: company.url }],
      ['location', profile.location],
    ],
  },
];
