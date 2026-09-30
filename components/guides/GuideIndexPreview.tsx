"use client";

import { useState } from "react";

/** Shows the first few index rows and reveals the rest on request (rows are rendered on the server). */
export function GuideIndexPreview({ rows, initial = 6, moreLabel }: { rows: React.ReactNode[]; initial?: number; moreLabel: string }) {
  const [open, setOpen] = useState(false);
  const visible = open ? rows : rows.slice(0, initial);
  return (
    <>
      <ul className="fi-guide-index">{visible}</ul>
      {!open && rows.length > initial ? (
        <div className="fi-guide-index__more">
          <button className="fi-button fi-button--outline" type="button" onClick={() => setOpen(true)}>
            {moreLabel.replace("{n}", String(rows.length))}
          </button>
        </div>
      ) : null}
    </>
  );
}
