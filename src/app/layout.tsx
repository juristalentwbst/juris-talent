import type { Metadata } from "next";
import type { ReactNode } from "react";
import { EB_Garamond, Montserrat } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const heading = EB_Garamond({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap"
});

const body = Montserrat({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.juristalent.ca"),
  title: {
    default: "Juris Talent | Renfort légal et mise en relation au Québec",
    template: "%s | Juris Talent"
  },
  description:
    "Juris Talent est une agence de mise en relation entre talents juridiques et professionnels du droit au Québec.",
  openGraph: {
    siteName: "Juris Talent",
    type: "website",
    url: "https://www.juristalent.ca/fr",
    title: "Juris Talent | Renfort légal et mise en relation au Québec",
    description:
      "Juris Talent est une agence de mise en relation entre talents juridiques et professionnels du droit au Québec.",
    images: ["/logo/juris-talent-logo.png"]
  },
  alternates: {
    canonical: "/fr",
    languages: {
      fr: "/fr",
      en: "/en"
    }
  },
  icons: {
    icon: "/logo/juris-talent-logo.png",
    apple: "/logo/juris-talent-logo.png"
  }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr" className={`${heading.variable} ${body.variable}`}>
      <body className="font-body antialiased">
        <script
          dangerouslySetInnerHTML={{
            __html:
              "document.documentElement.lang=location.pathname.startsWith('/en')?'en':'fr';"
          }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
