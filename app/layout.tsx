import type { Metadata } from "next";
// Self-hosted fonts (no Google Fonts request; CJK files are split by unicode-range,
// so a visitor only downloads the glyphs a page actually uses).
import "@fontsource/noto-sans-tc/400.css";
import "@fontsource/noto-sans-tc/500.css";
import "@fontsource/noto-serif-tc/600.css";
import "@fontsource/noto-sans-jp/400.css";
import "@fontsource/noto-sans-jp/500.css";
import "@fontsource/noto-serif-jp/600.css";
import "@fontsource/cormorant-garamond/500.css";
import "@fontsource/archivo/500.css";
import "@fontsource/archivo/600.css";
import "./globals.css";
import "./design-system.css";
import "./home.css";
import "./services.css";
import "./pages.css";

import { EventBeacon } from "@/components/analytics/EventBeacon";
import { MotionObserver } from "@/components/site/MotionObserver";

// Runs before first paint: enables entrance motion only for visitors who have not asked for reduced motion.
// If the page script never starts (blocked or failed), motion is switched off after 4s so nothing stays hidden.
const motionScript = `try{var d=document.documentElement;if(!window.matchMedia("(prefers-reduced-motion: reduce)").matches){d.classList.add("fi-motion");setTimeout(function(){if(!d.classList.contains("fi-motion-ready"))d.classList.remove("fi-motion")},4000)}}catch(e){}`;

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "/re";

export const metadata: Metadata = {
  title: "Fukuoka Insider Real Estate",
  description: "Multilingual real estate support for building your life in Fukuoka.",
  robots: { index: false, follow: false },
  icons: { icon: `${basePath}/favicon.svg`, apple: `${basePath}/apple-touch-icon.png` },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-Hant" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionScript }} />
      </head>
      <body>
        {children}
        <MotionObserver />
        <EventBeacon />
      </body>
    </html>
  );
}
