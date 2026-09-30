import QRCode from "qrcode";

/** Server-rendered QR code for a fixed, trusted URL from config/site.ts. */
export async function QrCode({ value, label, className }: { value: string; label: string; className?: string }) {
  const svg = await QRCode.toString(value, { type: "svg", margin: 0, errorCorrectionLevel: "M", color: { dark: "#1b2926", light: "#00000000" } });
  return <span className={["fi-qr", className].filter(Boolean).join(" ")} role="img" aria-label={label} dangerouslySetInnerHTML={{ __html: svg }} />;
}
