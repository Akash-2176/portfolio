// src/components/CommandHandler.js - REDESIGNED
// Color Palette: Cyan #00d9ff | Orange #ff6600 | Magenta #ff1493 | Background #000

const profileData = {
  name: 'AKASH',
  title: 'Product Engineer',
  bio: 'Full-stack systems. AI. Government infrastructure. Cloud. Mobile.',
  email: 'akash.2176@example.com',
  location: 'Namakkal, India',
  github: {
    username: 'Akash-2176',
    url: 'https://github.com/Akash-2176'
  },
  linkedin: {
    username: 'akashthewarrior2176',
    url: 'https://www.linkedin.com/in/akashthewarrior2176/'
  },
  strengths: [
    'Full Stack Web Development',
    'AI & Computer Vision',
    'Government Systems',
    'Cloud & DevOps',
    'Mobile Development',
    'Backend APIs'
  ]
};

const projectsData = [
  {
    id: 1,
    name: 'Police Tracking Portal',
    status: 'LIVE',
    short: 'GPS tracking system for public sector',
    stack: 'React | Express | AWS EC2/S3 | Kotlin | PostgreSQL',
    features: [
      'Live idol tracking with GPS mapping',
      'Mobile app for field teams',
      'Traffic prediction engine',
      'Route optimization'
    ],
    impact: 'Production government system',
    github: 'https://github.com/Akash-2176/namakkal-police-tracking'
  },
  {
    id: 2,
    name: 'Cell-ID Grabber',
    status: 'DONE',
    short: 'Android cellular metadata utility',
    stack: 'Kotlin | Android APIs | Telecom',
    features: [
      'MCC/MNC/LAC/CID extraction',
      'Network monitoring',
      'System API integration'
    ],
    impact: 'Native Android expertise',
    github: 'https://github.com/Akash-2176/cell-id-grabber'
  },
  {
    id: 3,
    name: 'Plant Disease AI',
    status: 'DONE',
    short: 'CNN-based agriculture detection',
    stack: 'Python | TensorFlow | CNN | Mobile',
    features: [
      'Live camera disease detection',
      'Model inference pipeline',
      'Multi-plant support'
    ],
    impact: 'AI deployment for agriculture',
    github: 'https://github.com/Akash-2176/plant-disease-ai'
  },
  {
    id: 4,
    name: 'AnimeGAN Cartoonizer',
    status: 'DONE',
    short: 'Image-to-image translation network',
    stack: 'Python | PyTorch | GANs',
    features: [
      'Photo to cartoon transformation',
      'Style transfer pipeline'
    ],
    impact: 'GAN architecture expertise',
    github: 'https://github.com/Akash-2176/animegan-cartoonizer'
  },
  {
    id: 5,
    name: 'CLI Portfolio',
    status: 'ACTIVE',
    short: 'Terminal-style portfolio interface',
    stack: 'React | Terminal UI | CSS',
    features: [
      'CRT monitor simulation',
      'Command navigation',
      'Auto-complete system'
    ],
    impact: 'Creative frontend engineering',
    github: 'https://github.com/Akash-2176/portfolio'
  },
  {
    id: 6,
    name: 'Laravel Scraper',
    status: 'DONE',
    short: 'REST API with data pipeline',
    stack: 'PHP | Laravel | SQLite | REST',
    features: [
      'CRUD APIs',
      'Web scraping pipeline',
      'Data indexing'
    ],
    impact: 'Backend architecture patterns',
    github: 'https://github.com/Akash-2176/laravel-scraper'
  },
  {
    id: 7,
    name: 'Project WIP',
    status: 'WIP',
    short: 'New project in development',
    stack: 'TBA',
    features: [],
    impact: 'Coming soon',
    github: null
  },
  {
    id: 8,
    name: 'Project WIP',
    status: 'WIP',
    short: 'New project in development',
    stack: 'TBA',
    features: [],
    impact: 'Coming soon',
    github: null
  }
];

const skillsData = {
  languages: 'Java | Kotlin | JavaScript | TypeScript | PHP | Python | SQL',
  webFrameworks: 'React | Next.js | Express | NestJS | Laravel | Serverless',
  ai_ml: 'CNN | GANs | Image Processing | TensorFlow | PyTorch | Classification',
  infrastructure: 'AWS Lambda | EC2 | S3 | Linux | PM2 | Docker | CI/CD',
  databases: 'MongoDB | PostgreSQL | SQLite | SQL',
  tools: 'Git | REST APIs | CLI | Mobile Dev | VS Code'
};

// ============================================
// COMMAND HANDLER
// ============================================

const CommandHandler = (cmd) => {
  if (!cmd || typeof cmd !== 'string') return 'ERROR: Invalid command';

  const trimmed = cmd.trim().toLowerCase();
  if (trimmed === 'clear') return '__CLEAR__';

  const parts = trimmed.split(' ');
  const command = parts[0];
  const flag = parts[1];

  switch (command) {
    case 'help':
    case '--help':
      return getHelpText();

    case 'whoami':
      return getWhoamiText();

    case 'about':
      return getAboutText();

    case 'projects':
      return flag === '--all' ? getProjectsDetailedText() : getProjectsListText();

    case 'skills':
      if (flag === '--lang') return formatSkillCategory('LANGUAGES', skillsData.languages.split(' | '));
      if (flag === '--web') return formatSkillCategory('WEB FRAMEWORKS', skillsData.webFrameworks.split(' | '));
      if (flag === '--ai') return formatSkillCategory('AI/ML', skillsData.ai_ml.split(' | '));
      if (flag === '--infra') return formatSkillCategory('INFRASTRUCTURE', skillsData.infrastructure.split(' | '));
      if (flag === '--db') return formatSkillCategory('DATABASES', skillsData.databases.split(' | '));
      if (flag === '--tools') return formatSkillCategory('TOOLS', skillsData.tools.split(' | '));
      return getSkillsOverviewText();

    case 'contact':
      return getContactText();

    case 'github':
      return `GitHub: ${profileData.github.url}`;

    case 'linkedin':
      return `LinkedIn: ${profileData.linkedin.url}`;

    case 'open':
      if (flag === 'github') {
        window.open(profileData.github.url, '_blank');
        return 'Opening GitHub...';
      }
      if (flag === 'linkedin') {
        window.open(profileData.linkedin.url, '_blank');
        return 'Opening LinkedIn...';
      }
      return 'Usage: open <github|linkedin>';

    case 'email':
      return `Email: ${profileData.email}`;

    case 'clear':
      return '__CLEAR__';

    default:
      return `UNKNOWN: '${command}' - Type 'help'`;
  }
};

// ============================================
// TEXT FORMATTERS
// ============================================

const getHelpText = () => {
  return `╔════════════════════════════════════════════════════════════╗
║                   AVAILABLE COMMANDS                       ║
╚════════════════════════════════════════════════════════════╝

📋 INFORMATION:
  whoami              → Display profile & introduction
  about               → Detailed bio & strengths
  skills              → Overview of all skills
    --languages       → Programming languages
    --frameworks      → Web frameworks
    --ai              → AI/ML expertise
    --infra           → Infrastructure & DevOps
    --databases       → Database systems
    --tools           → Tools & utilities
  projects            → List all projects
    --detailed        → Full project descriptions
  contact             → Display contact information
  education           → Educational background

🔗 EXTERNAL LINKS:
  github              → Open GitHub profile
  linkedin            → Open LinkedIn profile
  email               → Display email address

🛠️  UTILITIES:
  clear               → Clear terminal
  help                → Show this message

💡 TIP: Try 'whoami' or 'projects --detailed' to get started!`;
};

const getWhoamiText = () => {
  return `╔════════════════════════════════════════════════════════════╗
║                    WHO AM I?                               ║
╚════════════════════════════════════════════════════════════╝

👤 Name:              ${profileData.name} (${profileData.nickname})
💼 Title:             ${profileData.title}
📍 Location:          ${profileData.location}

🎯 ABOUT:
${profileData.bio}

🧠 KEY STRENGTHS:
${profileData.keyStrengths.map((s, i) => `  ${i + 1}. ${s}`).join('\n')}

🚀 QUICK STATS:
  • 6 Major Projects Shipped
  • Full Stack Development Across Web, Mobile, AI, & DevOps
  • Real-world Production Systems (Police Tracking, Agriculture AI)
  • AWS & Cloud Infrastructure Experience
  • 20+ Technologies & Frameworks

📞 Let's Connect:
  GitHub:   ${profileData.github.url}
  LinkedIn: ${profileData.linkedin.url}
  Email:    ${profileData.email}

Type 'projects --detailed' to see my work!`;
};

const getAboutText = () => {
  return `╔════════════════════════════════════════════════════════════╗
║                    ABOUT ME                                ║
╚════════════════════════════════════════════════════════════╝

Not a "tutorial clone" developer. I'm a problem-solving product engineer
with exposure across multiple domains:

🌐 FULL STACK WEB DEVELOPMENT
   React, Next.js, Express, Laravel, REST APIs, MongoDB, PostgreSQL

🤖 AI & COMPUTER VISION
   CNN, GANs, Image Processing, TensorFlow, PyTorch, Real-time ML

🏛️  GOVERNMENT / REAL-WORLD SYSTEMS
   Public sector platforms, production deployments, scale thinking

☁️  CLOUD & DEVOPS
   AWS (Lambda, EC2, S3), Linux, PM2, Docker, Production Operations

📱 MOBILE DEVELOPMENT
   Kotlin, Android APIs, Hardware Integration, Telecom Systems

🎨 UI/UX & CREATIVE FRONTEND
   Terminal UIs, CRT Effects, CSS Animations, Interactive Interfaces

🗄️  BACKEND & DATABASES
   APIs, Data Pipelines, Web Scraping, SQLite, MongoDB, PostgreSQL

What makes this different:
  • Not just CRUD apps or tutorials
  • Real tracking systems, AI applications, public utility tools
  • Production deployment struggles solved
  • Real clients & use-cases delivered

Type 'projects --detailed' to see what I've built!`;
};

const getProjectsListText = () => {
  let output = `╔════════════════════════════════════════════════════════════╗
║                    MY PROJECTS                            ║
╚════════════════════════════════════════════════════════════╝\n\n`;

  projectsData.forEach((proj, index) => {
    const statusBadge =
      proj.status === 'PRODUCTION' ? '🟢 PRODUCTION' :
      proj.status === 'ACTIVE' ? '🔵 ACTIVE' :
      proj.status === 'COMPLETE' ? '✓ COMPLETE' :
      '⏳ COMING SOON';

    output += `[${index + 1}] ${proj.name}\n`;
    output += `    Status: ${statusBadge}\n`;
    output += `    ${proj.description}\n`;
    if (proj.highlight) output += `    ${proj.highlight}\n`;
    output += `\n`;
  });

  output += `\n💡 TIP: Use 'projects --detailed' for full descriptions and links!`;
  return output;
};

const getProjectsDetailedText = () => {
  let output = `╔════════════════════════════════════════════════════════════╗
║                 DETAILED PROJECT INFO                      ║
╚════════════════════════════════════════════════════════════╝\n`;

  projectsData.forEach((proj, index) => {
    if (proj.status === 'PLACEHOLDER') return; // Skip placeholders in detailed view

    const statusBadge =
      proj.status === 'PRODUCTION' ? '🟢 PRODUCTION' :
      proj.status === 'ACTIVE' ? '🔵 ACTIVE' :
      'COMPLETE';

    output += `\n${'═'.repeat(60)}\n`;
    output += `[${index + 1}] ${proj.name} - ${statusBadge}\n`;
    output += `${'═'.repeat(60)}\n\n`;

    output += `📝 Description:\n  ${proj.description}\n\n`;

    output += `🛠️  Stack:\n  ${proj.stack.join(' • ')}\n\n`;

    output += `✨ Features:\n`;
    proj.features.forEach(f => {
      output += `  • ${f}\n`;
    });

    output += `\n💡 Impact:\n  ${proj.impact}\n`;

    if (proj.github) {
      output += `\n🔗 GitHub: ${proj.github}\n`;
    }

    if (proj.skills) {
      output += `\n🎯 Skills Demonstrated:\n  ${proj.skills.join(' • ')}\n`;
    }
  });

  return output;
};

const getSkillsOverviewText = () => {
  return `╔════════════════════════════════════════════════════════════╗
║                    MY SKILLS                              ║
╚════════════════════════════════════════════════════════════╝

Use flags to drill down:
  skills --languages    → Programming languages
  skills --frameworks   → Web & backend frameworks
  skills --ai           → AI/ML & deep learning
  skills --infra        → Infrastructure & DevOps
  skills --databases    → Database systems
  skills --tools        → Tools & utilities

📊 QUICK OVERVIEW:

🔤 Languages (7):
  ${skillsData.languages.join(', ')}

🌐 Web Frameworks (6):
  ${skillsData.webFrameworks.join(', ')}

🤖 AI/ML (7):
  ${skillsData.ai_ml.join(', ')}

☁️  Infrastructure (8):
  ${skillsData.infrastructure.join(', ')}

🗄️  Databases (4):
  ${skillsData.databases.join(', ')}

Try: 'skills --ai' or 'skills --frameworks' for details!`;
};

const getContactText = () => {
  return `╔════════════════════════════════════════════════════════════╗
║                   GET IN TOUCH                            ║
╚════════════════════════════════════════════════════════════╝

📧 Email:
  ${profileData.email}

💼 LinkedIn:
  ${profileData.linkedin.url}
  Command: 'linkedin' or 'open linkedin'

🐙 GitHub:
  ${profileData.github.url}
  Command: 'github' or 'open github'

📍 Location:
  ${profileData.location}

🚀 Ready to collaborate?
  Feel free to reach out on GitHub or LinkedIn!`;
};

const formatSkillCategory = (category, skills) => {
  return `╔════════════════════════════════════════════════════════════╗
║                  ${category.toUpperCase().padEnd(42)}║
╚════════════════════════════════════════════════════════════╝

${skills.map((skill, i) => `  ${(i + 1).toString().padStart(2)}. ${skill}`).join('\n')}

Total: ${skills.length} skills`;
};

// Utility to get command suggestions for autocomplete
export const getCommandSuggestions = (prefix) => {
  const commands = [
    'whoami', 'about', 'skills', 'projects', 'contact',
    'github', 'linkedin', 'email', 'education',
    'help', 'clear', 'open'
  ];
  const flags = [
    '--detailed', '--languages', '--frameworks', '--ai',
    '--infra', '--databases', '--tools', '--help'
  ];

  const allItems = [...commands, ...flags];
  if (!prefix) return commands;

  return allItems.filter(item =>
    item.toLowerCase().startsWith(prefix.toLowerCase())
  );
};

export const getCurrentPath = () => 'Root';

export default CommandHandler;
