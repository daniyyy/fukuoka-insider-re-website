/** Split an answer into paragraphs and bullet lists for rendering. */
export type AnswerBlock = { type: "p"; text: string } | { type: "ul"; items: string[] };
export function answerBlocks(answer: string): AnswerBlock[] {
  const blocks: AnswerBlock[] = [];
  for (const raw of answer.split("\n")) {
    const line = raw.trim();
    if (!line) continue;
    if (line.startsWith("- ")) {
      const last = blocks.at(-1);
      if (last?.type === "ul") last.items.push(line.slice(2));
      else blocks.push({ type: "ul", items: [line.slice(2)] });
    } else blocks.push({ type: "p", text: line });
  }
  return blocks;
}

/** Plain text for structured data (FAQPage JSON-LD). */
export const answerPlainText = (answer: string) => answerBlocks(answer).map((block) => (block.type === "p" ? block.text : block.items.map((item) => `・${item}`).join("\n"))).join("\n");
