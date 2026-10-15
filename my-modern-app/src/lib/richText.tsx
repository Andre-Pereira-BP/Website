import { ReactNode } from 'react';

/**
 * Minimal, safe formatting for news content written in the admin area.
 * Supported syntax (no raw HTML is ever rendered):
 *   blank line      → new paragraph
 *   "## Title"      → sub-heading
 *   "- item" lines  → bullet list
 *   **bold**        → bold
 *   [text](https://…) → link
 */

const INLINE = /(\*\*[^*]+\*\*|\[[^\]]+\]\((?:https?:\/\/|mailto:|\/)[^)\s]+\))/g;

function renderInline(text: string, keyPrefix: string): ReactNode[] {
  return text.split(INLINE).map((part, i) => {
    const key = `${keyPrefix}-${i}`;
    if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
      return <strong key={key}>{part.slice(2, -2)}</strong>;
    }
    const link = part.match(/^\[([^\]]+)\]\(([^)\s]+)\)$/);
    if (link) {
      const external = /^https?:\/\//.test(link[2]);
      return (
        <a key={key} href={link[2]} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
          {link[1]}
        </a>
      );
    }
    return part;
  });
}

export function RichText({ content, className = '' }: { content: string; className?: string }) {
  const blocks = content
    .replace(/\r\n/g, '\n')
    .split(/\n\s*\n/)
    .map((b) => b.trim())
    .filter(Boolean);

  return (
    <div className={className}>
      {blocks.map((block, i) => {
        const lines = block.split('\n');
        if (lines.every((l) => /^\s*[-•]\s+/.test(l))) {
          return (
            <ul key={i}>
              {lines.map((l, j) => (
                <li key={j}>{renderInline(l.replace(/^\s*[-•]\s+/, ''), `${i}-${j}`)}</li>
              ))}
            </ul>
          );
        }
        if (block.startsWith('## ')) {
          return <h3 key={i}>{renderInline(block.slice(3), `${i}`)}</h3>;
        }
        return (
          <p key={i}>
            {lines.map((line, j) => (
              <span key={j}>
                {j > 0 && <br />}
                {renderInline(line, `${i}-${j}`)}
              </span>
            ))}
          </p>
        );
      })}
    </div>
  );
}

/** Plain-text excerpt (used for meta descriptions). */
export const toPlainText = (content: string, max = 160) => {
  const text = content
    .replace(/\*\*/g, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/^##\s+/gm, '')
    .replace(/^\s*[-•]\s+/gm, '')
    .replace(/\s+/g, ' ')
    .trim();
  return text.length > max ? `${text.slice(0, max - 1).trimEnd()}…` : text;
};
