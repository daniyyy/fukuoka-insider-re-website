import Link from "next/link";
import { Fragment, type ReactNode } from "react";

import type { GuideBodyBlock } from "@/lib/content/types";

/** Renders **bold** spans and [text](/in-site/path) links inside article text without injecting HTML. */
function Inline({ text }: { text: string }) {
  const parts: ReactNode[] = text.split(/\*\*/u).map((part, index) => {
    const content = <Links text={part} />;
    return index % 2 === 1 ? <strong key={index}>{content}</strong> : <Fragment key={index}>{content}</Fragment>;
  });
  return <>{parts}</>;
}

/** Only in-site links (starting with a single "/") are turned into links; anything else stays plain text. */
function Links({ text }: { text: string }) {
  const nodes: ReactNode[] = [];
  const pattern = /\[([^\]]+)\]\((\/[^)\s]*)\)/gu;
  let last = 0;
  for (const match of text.matchAll(pattern)) {
    const start = match.index ?? 0;
    if (start > last) nodes.push(text.slice(last, start));
    nodes.push(<Link href={match[2]} key={`${start}-${match[2]}`}>{match[1]}</Link>);
    last = start + match[0].length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return <>{nodes}</>;
}

export function ArticleBody({ blocks }: { blocks: GuideBodyBlock[] }) {
  return (
    <div className="fi-prose">
      {blocks.map((block, index) => {
        if (block.type === "heading") {
          const Tag = block.level === 3 ? "h3" : "h2";
          return <Tag id={block.id} key={`${block.id}-${index}`}><Inline text={block.text} /></Tag>;
        }
        if (block.type === "list") {
          const List = block.ordered ? "ol" : "ul";
          return <List key={`list-${index}`}>{block.items.map((item, itemIndex) => <li key={itemIndex}><Inline text={item} /></li>)}</List>;
        }
        if (block.type === "quote") return <blockquote key={`quote-${index}`}><Inline text={block.text} /></blockquote>;
        return <p key={`paragraph-${index}`}><Inline text={block.text} /></p>;
      })}
    </div>
  );
}
