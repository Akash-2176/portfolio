import { company } from './profile';

export const experience = [
  {
    company: company.name,
    url: company.url,
    role: company.role,
    period: `${company.since} – Present`,
    points: [
      'Founded and lead a creative technology studio across design, engineering, brand and AI',
      'Shipped the VC Police Portal, The Madras CA and Puppy Digital Mart for clients',
      'Lead every build end to end, from discovery to launch and care',
    ],
  },
  {
    company: 'Intellect Design Arena',
    role: 'Backend Engineer Intern',
    period: 'Jan 2026 – Jul 2026',
    points: [
      'Cut response latency in critical services by 35% through PostgreSQL indexing and join restructuring',
      'Refactored legacy Spring Boot + Hibernate modules into modular service layers (+20% maintainability)',
      'Reached 85%+ test coverage across core services with JUnit unit and integration tests',
      'Built event-driven microservices on the API-first, cloud-ready eMACH.ai architecture',
    ],
  },
  {
    company: 'CloseFuture',
    role: 'Full Stack Developer',
    period: 'Jun 2025 – Oct 2025',
    points: [
      'Architected Supabase backend workflows for a brokerage platform serving 5,000+ active sessions',
      'Tuned API flows and schemas for sub-200ms latency on critical financial operations',
      'Built internal dashboards in Agile/Scrum, cutting troubleshooting time by 30%',
    ],
  },
  {
    company: 'Hertzworkz Pvt Ltd',
    role: 'Backend Developer',
    period: 'Sep 2024 – Mar 2025',
    points: [
      'Engineered Spring Boot + Hibernate REST APIs for e-commerce with JWT auth and role-based access',
      'Designed and documented 25+ OpenAPI endpoints, easing frontend–backend integration',
    ],
  },
];

export const education = [
  {
    school: 'KSR College of Engineering',
    degree: 'B.E. Computer Science Engineering',
    period: '2022 – 2026',
    detail: 'CGPA 7.5 / 10',
  },
  {
    school: 'Reliance Matric Hr Sec School',
    degree: 'Higher Secondary (HSC)',
    period: '2022',
    detail: '497 / 600 (82.8%)',
  },
];
