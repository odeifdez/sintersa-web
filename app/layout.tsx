import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sintersa | Mudanzas premium para hogar y empresa",
  description:
    "Sintersa ofrece mudanzas particulares y corporativas con un estándar premium: puntualidad, protección avanzada y gestión integral.",
  metadataBase: new URL("https://sintersa.es"),
  openGraph: {
    title: "Sintersa | Mudanzas premium para hogar y empresa",
    description:
      "Empresa de mudanzas profesional con cobertura nacional, embalaje técnico y seguimiento personalizado.",
    url: "https://sintersa.es",
    siteName: "Sintersa",
    locale: "es_ES",
    type: "website"
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
