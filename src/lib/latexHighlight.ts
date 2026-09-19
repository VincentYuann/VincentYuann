// Lightweight zero-dependency LaTeX Syntax Tokenizer & Styler for Wabi-Sabi Portfolio

export type LatexTokenType =
  | 'comment'
  | 'keyword'
  | 'environment'
  | 'macro'
  | 'math'
  | 'bracket'
  | 'argument'
  | 'plain';

export interface LatexToken {
  type: LatexTokenType;
  text: string;
}

export function tokenizeLatexLine(line: string): LatexToken[] {
  const tokens: LatexToken[] = [];
  let i = 0;
  const len = line.length;

  while (i < len) {
    const char = line[i];

    // Comment (% to end of line)
    if (char === '%') {
      tokens.push({
        type: 'comment',
        text: line.slice(i),
      });
      break;
    }

    // Inline math $...$
    if (char === '$') {
      let nextDollar = line.indexOf('$', i + 1);
      if (nextDollar === -1) {
        tokens.push({ type: 'math', text: line.slice(i) });
        break;
      } else {
        tokens.push({ type: 'math', text: line.slice(i, nextDollar + 1) });
        i = nextDollar + 1;
        continue;
      }
    }

    // LaTeX Command \command
    if (char === '\\') {
      let j = i + 1;
      // Handle special single-char commands like \\, \%, \$, etc.
      if (j < len && !/[a-zA-Z]/.test(line[j])) {
        tokens.push({ type: 'macro', text: line.slice(i, j + 1) });
        i = j + 1;
        continue;
      }
      while (j < len && /[a-zA-Z*]/.test(line[j])) {
        j++;
      }
      const command = line.slice(i, j);
      if (
        command === '\\begin' ||
        command === '\\end' ||
        command === '\\documentclass' ||
        command === '\\usepackage' ||
        command === '\\section' ||
        command === '\\subsection' ||
        command === '\\subsubsection' ||
        command === '\\textbf' ||
        command === '\\textit' ||
        command === '\\href' ||
        command === '\\item' ||
        command === '\\resumeItem' ||
        command === '\\resumeSubheading' ||
        command === '\\resumeProjectHeading'
      ) {
        tokens.push({ type: 'keyword', text: command });
      } else {
        tokens.push({ type: 'macro', text: command });
      }
      i = j;
      continue;
    }

    // Curly / Square Brackets
    if (char === '{' || char === '}' || char === '[' || char === ']') {
      tokens.push({ type: 'bracket', text: char });
      i++;
      continue;
    }

    // Plain text chunk
    let j = i;
    while (j < len && line[j] !== '%' && line[j] !== '$' && line[j] !== '\\' && line[j] !== '{' && line[j] !== '}' && line[j] !== '[' && line[j] !== ']') {
      j++;
    }
    tokens.push({ type: 'plain', text: line.slice(i, j) });
    i = j;
  }

  return tokens;
}

export function getTokenClassName(type: LatexTokenType): string {
  switch (type) {
    case 'comment':
      return 'text-[#8E877C] dark:text-[#7A828E] italic';
    case 'keyword':
      return 'text-[#B84E3A] dark:text-[#E07A5F] font-semibold';
    case 'environment':
      return 'text-[#3B6E52] dark:text-[#52B788] font-medium';
    case 'macro':
      return 'text-[#C4883A] dark:text-[#E9C46A]';
    case 'math':
      return 'text-[#4A7C9B] dark:text-[#7EB0D5] font-mono';
    case 'bracket':
      return 'text-[#6E6458] dark:text-[#A0AEC0]';
    case 'argument':
      return 'text-[#2D2A26] dark:text-[#E2E8F0]';
    case 'plain':
    default:
      return 'text-[#2D2A26] dark:text-[#D5D9E0]';
  }
}
