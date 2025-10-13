// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { Playfair_Display, Inter } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-serif" });
const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "María Clavel | Uñas",
  description:
    "Manicure profesional y diseños personalizados. Agenda tu hora con María Clavel.",
  themeColor: "#F2E6D8",
  openGraph: {
    title: "María Clavel | Uñas",
    description:
      "Manicure profesional y diseños personalizados. Agenda tu hora con María Clavel.",
    url: "https://tu-dominio.com",
    siteName: "María Clavel",
    images: [{ url: "/og.jpg", width: 1000, height: 630, alt: "María Clavel" }],
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body
        className={`${playfair.variable} ${inter.variable} bg-beige text-espresso antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
