import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SkillKwiz - Professional Skill Assessment Solutions",
  description:
    "SkillKwiz provides innovative, AI-powered skill assessment solutions for modern recruitment and data-driven employee development.",
  keywords: ["skill assessment", "recruitment tools", "employee development", "hiring solutions", "SkillKwiz"],
  authors: [{ name: "SkillKwiz Team" }],
  openGraph: {
    title: "SkillKwiz - Skill Assessment Solutions",
    description: "Innovative skill assessment solutions for recruitment and employee development.",
    url: "https://skillkwiz.com",
    siteName: "SkillKwiz",
    images: [
      {
        url: "/images/logo.png",
        width: 1200,
        height: 630,
        alt: "SkillKwiz Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SkillKwiz - Skill Assessment Solutions",
    description: "Innovative skill assessment solutions for recruitment and employee development.",
    images: ["/images/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "SkillKwiz",
    "url": "https://skillkwiz.com",
    "description": "Innovative skill assessment solutions for recruitment and employee development.",
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-[#00418d] text-white p-4 rounded-md z-50"
        >
          Skip to content
        </a>
        <div className="flex min-h-screen flex-col">
          <SiteHeader />
          <main id="main-content" className="flex-grow">
            {children}
          </main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
