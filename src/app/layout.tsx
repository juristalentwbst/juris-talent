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
  title: "Juris Talent",
  description: "Québec-focused legal support talent matching agency."
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr" className={`${heading.variable} ${body.variable}`}>
      <body className="font-body antialiased">{children}</body>
    </html>
  );
}
