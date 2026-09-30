/**
 * Signature Hakata-ori stripe (献上柄-inspired), used only where Fukuoka Insider speaks editorially:
 * Guides and the Fukuoka-life block. Purely decorative.
 */
export function HakataPanel({ className = "" }: { className?: string }) {
  return <div className={`fi-hakata ${className}`.trim()} aria-hidden="true" />;
}
