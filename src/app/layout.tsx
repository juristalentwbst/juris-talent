import type { Metadata } from "next";
import type { ReactNode } from "react";
import { EB_Garamond, Montserrat } from "next/font/google";
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
    default: "Juris Talent | Relève juridique et cabinets au Québec",
    template: "%s | Juris Talent"
  },
  description:
    "Juris Talent met en relation les étudiants en droit, les talents juridiques et les cabinets au Québec grâce à une plateforme claire, professionnelle et ciblée.",
  openGraph: {
    siteName: "Juris Talent",
    type: "website",
    url: "https://www.juristalent.ca/fr",
    title: "Juris Talent | Relève juridique et cabinets au Québec",
    description:
      "Juris Talent met en relation les étudiants en droit, les talents juridiques et les cabinets au Québec grâce à une plateforme claire, professionnelle et ciblée.",
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
      </body>
    </html>
  );
}
