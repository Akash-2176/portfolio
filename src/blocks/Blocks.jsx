import { createContext, useContext } from 'react';
import { play } from '../system/sound';
import './blocks.css';

// Blocks are plain data returned by commands, so the same output renders in any shell.
//   { type: 'heading' | 'text' | 'pre' | 'list' | 'kv' | 'table' | 'spacer', ... }
// Tables may set `wideOnly: [colIndex]` to drop columns on narrow screens.
// Inline values: string | Inline[] | { cmd } | { href } | { badge } | { b } | { dim } | { accent }

const RunContext = createContext(null);
export const RunProvider = RunContext.Provider;

const BADGE_TONE = { LIVE: 'ok', ACTIVE: 'accent', DONE: 'dim' };

export const Inline = ({ value }) => {
  const run = useContext(RunContext);
  if (value == null || value === false) return null;
  if (typeof value === 'string' || typeof value === 'number') return value;
  if (Array.isArray(value)) return value.map((v, i) => <Inline key={i} value={v} />);
  if (value.cmd) {
    const label = value.label ?? value.cmd;
    if (!run) return <code className="blk-cmd">{label}</code>;
    return (
      <button type="button" className="blk-cmd" onClick={() => run(value.cmd)} title={`Run: ${value.cmd}`}>
        {label}
      </button>
    );
  }
  if (value.href) {
    const external = /^https?:/.test(value.href);
    return (
      <a
        className="blk-link"
        href={value.href}
        onClick={() => play('click')}
        {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
      >
        {value.label ?? value.href.replace(/^(https?:\/\/|mailto:)(www\.)?/, '')}
      </a>
    );
  }
  if (value.badge) {
    const tone = value.tone ?? BADGE_TONE[value.badge] ?? 'dim';
    return <span className={`blk-badge tone-${tone}`}>● {value.badge}</span>;
  }
  if (value.b) return <strong>{value.b}</strong>;
  if (value.dim) return <span className="tone-dim">{value.dim}</span>;
  if (value.accent) return <span className="tone-accent">{value.accent}</span>;
  return null;
};

const Block = ({ block }) => {
  switch (block.type) {
    case 'heading':
      return <div className="blk-heading">{block.text}</div>;
    case 'pre':
      return <pre className="blk-pre">{block.text}</pre>;
    case 'list':
      return (
        <ul className="blk-list">
          {block.items.map((item, i) => (
            <li key={i}>
              <Inline value={item} />
            </li>
          ))}
        </ul>
      );
    case 'kv':
      return (
        <dl className="blk-kv">
          {block.items.map(([k, v]) => (
            <div key={k}>
              <dt>{k}</dt>
              <dd>
                <Inline value={v} />
              </dd>
            </div>
          ))}
        </dl>
      );
    case 'table':
      return (
        <div className="blk-table-wrap">
          <table className="blk-table">
            {block.head && (
              <thead>
                <tr>
                  {block.head.map((h, j) => (
                    <th key={h} className={block.wideOnly?.includes(j) ? 'wide-only' : undefined}>{h}</th>
                  ))}
                </tr>
              </thead>
            )}
            <tbody>
              {block.rows.map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) => (
                    <td key={j} className={block.wideOnly?.includes(j) ? 'wide-only' : undefined}>
                      <Inline value={cell} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case 'spacer':
      return <div className="blk-spacer" />;
    case 'text':
    default:
      return (
        <p className={`blk-text${block.tone ? ` tone-${block.tone}` : ''}`}>
          <Inline value={block.text} />
        </p>
      );
  }
};

// `reveal` staggers blocks in line-by-line, like a terminal printing output.
export const Blocks = ({ blocks, reveal = false }) => (
  <div className={`blocks${reveal ? ' blocks-reveal' : ''}`}>
    {blocks.map((block, i) => (
      <div key={i} className="blk" style={{ '--i': i }}>
        <Block block={block} />
      </div>
    ))}
  </div>
);
