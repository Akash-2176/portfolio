// src/components/CommandFormatter.js

/**
 * Color codes for terminal output
 */
export const colors = {
  command: '#00ff00',      // Bright green
  argument: '#00d9ff',     // Cyan
  description: '#888888',  // Gray
  error: '#ff6666',        // Red
  success: '#66ff66',      // Light green
  highlight: '#ffaa00',    // Orange/gold
};

/**
 * Apply color to specific command output
 */
export const colorizeOutput = (text, type = 'default') => {
  const colorMap = {
    command: colors.command,
    argument: colors.argument,
    description: colors.description,
    error: colors.error,
    success: colors.success,
    highlight: colors.highlight,
  };

  return colorMap[type] || colors.description;
};

/**
 * Generate a styled command suggestion
 */
export const formatCommandSuggestion = (command, description) => {
  return {
    command,
    description,
    formatted: `${command.padEnd(15)} ${description}`,
  };
};

/**
 * Create a formatted box (for headers)
 */
export const createBox = (title, width = 60) => {
  const top = '╔' + '═'.repeat(width - 2) + '╗';
  const middle = '║' + title.padEnd(width - 2) + '║';
  const bottom = '╚' + '═'.repeat(width - 2) + '╝';
  return `${top}\n${middle}\n${bottom}`;
};

/**
 * Generate ASCII art divider
 */
export const createDivider = (length = 60, char = '═') => {
  return char.repeat(length);
};

/**
 * Format project card with styling
 */
export const formatProjectCard = (project) => {
  let card = '';
  card += `\n${createDivider(60)}\n`;
  card += `${project.name} [${project.status}]\n`;
  card += `${createDivider(60)}\n`;
  card += `${project.description}\n\n`;
  card += `Stack: ${project.stack.join(' • ')}\n`;
  return card;
};

/**
 * Create an ASCII banner (welcome message)
 */
export const generateWelcomeBanner = () => {
  return `
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║     ✓ AKASH'S INTERACTIVE TERMINAL PORTFOLIO             ║
║     Problem-Solving Product Engineer                     ║
║                                                           ║
║     Welcome to my Knowledge Garden (KG)                  ║
║     Type 'help' to explore, 'whoami' to start            ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
`;
};

/**
 * Sanitize HTML in terminal output (prevent XSS)
 */
export const sanitizeOutput = (text) => {
  if (typeof text !== 'string') return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};

/**
 * Apply colored syntax highlighting to command input
 */
export const highlightCommandSyntax = (input) => {
  const parts = input.trim().split(' ');
  if (parts.length === 0) return [];

  const command = parts[0];
  const args = parts.slice(1);

  return [
    { text: command, color: colors.command },
    ...args.map(arg => ({ text: arg, color: arg.startsWith('--') ? colors.argument : colors.description })),
  ];
};

/**
 * Create a visual command menu with keyboard hints
 */
export const createCommandMenu = (commands) => {
  let menu = '\n📋 AVAILABLE COMMANDS:\n\n';
  commands.forEach((cmd, i) => {
    menu += `  ${i + 1}. ${cmd.name.padEnd(20)} - ${cmd.description}\n`;
  });
  menu += '\n💡 Type a command name or number to execute\n';
  return menu;
};

/**
 * Format an error message with styling
 */
export const formatError = (message) => {
  return `✗ Error: ${message}`;
};

/**
 * Format a success message
 */
export const formatSuccess = (message) => {
  return `✓ Success: ${message}`;
};

/**
 * Create a progress bar (visual indicator)
 */
export const createProgressBar = (current, total, length = 30) => {
  const percentage = (current / total) * 100;
  const filled = Math.round((length * current) / total);
  const empty = length - filled;

  return `[${('█').repeat(filled)}${('░').repeat(empty)}] ${percentage.toFixed(0)}%`;
};

/**
 * Format command description for help/hints
 */
export const formatCommandDescription = (command, description, examples = []) => {
  let text = `\n${command}:\n  ${description}\n`;
  if (examples.length > 0) {
    text += '  Examples:\n';
    examples.forEach(ex => {
      text += `    • ${ex}\n`;
    });
  }
  return text;
};

export default {
  colors,
  colorizeOutput,
  formatCommandSuggestion,
  createBox,
  createDivider,
  formatProjectCard,
  generateWelcomeBanner,
  sanitizeOutput,
  highlightCommandSyntax,
  createCommandMenu,
  formatError,
  formatSuccess,
  createProgressBar,
  formatCommandDescription,
};
