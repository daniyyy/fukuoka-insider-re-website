/**
 * Splits a CJK heading into phrases after punctuation (by default ，：？！ and their ASCII forms; pass `marks` to change) and keeps each phrase
 * on one line when it fits, so titles break at punctuation instead of inside a word
 * (e.g. never 「禮／金」). Needs `.fi-phrase { display: inline-block; }`.
 */
export function Phrases({ text, marks = "，,：:？?！!" }: { text: string; marks?: string }) {
  const escaped = marks.replace(/[\\\]^-]/g, "\\$&");
  const parts = text.split(new RegExp(`(?<=[${escaped}])\\s*`)).filter(Boolean);
  return (
    <>
      {parts.map((part, index) => (
        <span className="fi-phrase" key={index}>{part}</span>
      ))}
    </>
  );
}
