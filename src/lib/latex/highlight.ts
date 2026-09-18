export interface LatexToken {
  text: string;
  type: 'comment' | 'command' | 'env' | 'math' | 'delimiter' | 'text';
}

/**
 * Tokenize a single line of LaTeX code into highlighted tokens.
 * Lightweight, fast, zero external dependencies.
 */
export function tokenizeLatexLine(line: string): LatexToken[] {
  const tokens: LatexToken[] = [];
  let remaining = line;

  const commentRegex = /^%.*$/;
  const envRegex = /^\\(begin|end)\{([^}]+)\}/;
  const commandRegex = /^\\([a-zA-Z*]+|[,;:! %])/;
  const mathInlineRegex = /^\$[^$]*\$/;
  const delimiterRegex = /^[{}[\]]/;
  const textRegex = /^[^%\\${}[\]]+/;

  while (remaining.length > 0) {
    // 1. Comment (from % to end of line)
    const commentMatch = remaining.match(commentRegex);
    if (commentMatch) {
      tokens.push({ text: commentMatch[0], type: 'comment' });
      break;
    }

    // 2. Begin/End Environment
    const envMatch = remaining.match(envRegex);
    if (envMatch) {
      tokens.push({ text: envMatch[0], type: 'env' });
      remaining = remaining.slice(envMatch[0].length);
      continue;
    }

    // 3. LaTeX Command (e.g., \textbf, \section, \item)
    const cmdMatch = remaining.match(commandRegex);
    if (cmdMatch) {
      tokens.push({ text: cmdMatch[0], type: 'command' });
      remaining = remaining.slice(cmdMatch[0].length);
      continue;
    }

    // 4. Inline Math ($ ... $)
    const mathMatch = remaining.match(mathInlineRegex);
    if (mathMatch) {
      tokens.push({ text: mathMatch[0], type: 'math' });
      remaining = remaining.slice(mathMatch[0].length);
      continue;
    }

    // 5. Delimiters ({, }, [, ])
    const delimMatch = remaining.match(delimiterRegex);
    if (delimMatch) {
      tokens.push({ text: delimMatch[0], type: 'delimiter' });
      remaining = remaining.slice(delimMatch[0].length);
      continue;
    }

    // 6. Plain text until next token
    const textMatch = remaining.match(textRegex);
    if (textMatch) {
      tokens.push({ text: textMatch[0], type: 'text' });
      remaining = remaining.slice(textMatch[0].length);
      continue;
    }

    // Fallback: single character as text
    tokens.push({ text: remaining[0], type: 'text' });
    remaining = remaining.slice(1);
  }

  return tokens;
}

/**
 * Maps token types to clean Tailwind CSS styling
 */
export function getTokenClass(type: LatexToken['type']): string {
  switch (type) {
    case 'comment':
      return 'text-muted-foreground/70 italic';
    case 'command':
      return 'text-accent font-medium';
    case 'env':
      return 'text-foreground font-semibold';
    case 'math':
      return 'text-foreground/90 font-mono';
    case 'delimiter':
      return 'text-muted-foreground';
    case 'text':
    default:
      return 'text-foreground';
  }
}