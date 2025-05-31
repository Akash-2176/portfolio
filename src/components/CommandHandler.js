// src/components/CommandHandler.js

const fileSystem = {
  '/': {
    name: '/',
    type: 'dir',
    children: {
      name: {
        type: 'dir',
        children: { 'about.txt': 'Akash aka Boss — Software Engineer in the making 👨‍💻' }
      },
      interest: {
        type: 'dir',
        children: { 'list.txt': 'Cybersecurity, AI, Real-time Systems, CLI wizardry 🧙‍♂️' }
      },
      projects: {
        type: 'dir',
        children: {
          'projects.txt': '1. Cell-ID-Grabber\n2. EmpowerHer\n3. AI Expense Tracker\n4. Cartoonizer'
        }
      },
      skills: {
        type: 'dir',
        children: {
          'skills.txt': 'JavaScript, React, Python, Node.js, MongoDB, AI/ML, Kotlin, Networking'
        }
      },
      easter: {
        type: 'dir',
        children: {
          'secret.txt': '🥚 There is no cloud. Just someone else\'s computer.'
        }
      }
    }
  }
};

let pathSegments = [];

function getCurrentDir() {
  let current = fileSystem['/'];
  for (const segment of pathSegments) {
    current = current.children[segment];
  }
  return current;
}

const CommandHandler = (cmd) => {
  if (cmd === 'clear') return '__CLEAR__';

  const parts = cmd.split(' ');
  const command = parts[0];
  const arg = parts[1];

  switch (command) {
    case '--help':
      return `Available commands:\n - cd [dir]\n - cd ..\n - ls\n - cat <file>\n - clear`;

    case 'cd':
      if (!arg) return 'Missing directory name.';
      if (arg === '..') {
        if (pathSegments.length === 0) return 'Already at root.';
        pathSegments.pop();
        return 'Moved up one directory.';
      }

      const currentDir = getCurrentDir();
      const target = currentDir.children[arg];
      if (target && target.type === 'dir') {
        pathSegments.push(arg);
        return `Entered directory: ${arg}`;
      }
      return `Directory not found: ${arg}`;

    case 'ls': {
      const dir = getCurrentDir();
      return Object.keys(dir.children).join('\n');
    }

    case 'cat': {
      if (!arg) return 'Specify a file to open.';
      const dir = getCurrentDir();
      const file = dir.children[arg];
      if (typeof file === 'string') {
        return file;
      }
      return `File not found: ${arg}`;
    }

    default: {
      const dir = getCurrentDir();
      const file = dir.children[cmd];
      return typeof file === 'string'
        ? file
        : `Command not found: '${cmd}'\nTry '--help'.`;
    }
  }
};

export const getCurrentPath = () =>
  '/' + pathSegments.join('/');

export default CommandHandler;
