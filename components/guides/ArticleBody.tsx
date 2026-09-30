import { Fragment, type ReactNode } from "react";

import type { GuideBodyBlock } from "@/lib/content/types";

/** Renders **bold** spans inside article text without injecting HTML. */
function Inline({ text }: { text: string }) {
  const parts: ReactNode[] = text.split(/\*\*/u).map((part, index) =>
    index % 2 === 1 ? <strong key={index}>{part}</strong> : <Fragment key={index}>{part}</Fragment>,
  );
  return <>{parts}</>;
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
