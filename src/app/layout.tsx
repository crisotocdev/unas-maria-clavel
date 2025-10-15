import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://unas-maria-clavel.vercel.app"),
  title: { default: "María Clavel | Uñas", template: "%s · María Clavel" },
  description: "Uñas en tonos beige y dorado. Agenda por WhatsApp.",
  openGraph: {
    title: "María Clavel | Uñas",
    description: "Diseños finos en tonos beige y dorado.",
    url: "https://unas-maria-clavel.vercel.app",
    siteName: "María Clavel",
    type: "website"
  }
};

export const viewport: Viewport = {
  themeColor: "#F2E6D8"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
