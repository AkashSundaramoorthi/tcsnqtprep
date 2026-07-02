import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://tcsnqtprep.vercel.app"),
  title: {
    default: "TCS NQT Prep Hub — Coding, Aptitude & Mock Exam",
    template: "%s | TCS NQT Prep Hub",
  },
  description:
    "The complete TCS NQT preparation platform. Practice 50 coding problems with an in-browser runner, revise 30 aptitude topics with method guides, and take a full 80-question mock exam with a live timer.",
  keywords: [
    "TCS NQT", "TCS National Qualifier Test", "TCS NQT preparation", "TCS NQT mock exam",
    "TCS NQT aptitude", "TCS NQT coding", "TCS NQT previous year questions",
    "TCS NQT 2024", "TCS NQT 2025", "TCS placement preparation",
  ],
  authors: [{ name: "TCS NQT Prep Hub" }],
  creator: "TCS NQT Prep Hub",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://tcsnqtprep.vercel.app",
    siteName: "TCS NQT Prep Hub",
    title: "TCS NQT Prep Hub — Coding, Aptitude & Mock Exam",
    description:
      "The complete TCS NQT preparation platform. 50 coding problems, 30 aptitude topics, 80-question mock exam.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "TCS NQT Prep Hub",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TCS NQT Prep Hub — Coding, Aptitude & Mock Exam",
    description:
      "The complete TCS NQT preparation platform. 50 coding problems, 30 aptitude topics, 80-question mock exam.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "XHoLfDeL8rp5fL9fWz3Al06oTIbVNMHYY9XU91KhODc",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#090e1a" />
      </head>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
