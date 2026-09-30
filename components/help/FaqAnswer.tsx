import Link from "next/link";

import { ArrowIcon } from "@/components/site/Icons";
import type { FaqLink } from "@/lib/content/faq";
import { answerBlocks } from "@/lib/content/faq-format";

/** Answer body shared by the Help page, service pages and anywhere else a FAQ is expanded. */
export function FaqAnswer({ answer, links }: { answer: string; links: FaqLink[] }) {
  return (
    <div className="fi-faq-item__a">
      {answerBlocks(answer).map((block, index) =>
        block.type === "p" ? <p key={index}>{block.text}</p> : (
          <ul key={index}>{block.items.map((item) => <li key={item}>{item}</li>)}</ul>
        ),
      )}
      {links.length ? (
        <p className="fi-faq-item__links">
          {links.map((link) => <Link className="fi-text-link" href={link.href} key={link.href}>{link.label}<ArrowIcon /></Link>)}
        </p>
      ) : null}
    </div>
  );
}
