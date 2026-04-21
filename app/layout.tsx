import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Venkata Lohith Kokkanti — Software Engineer",
  description:
    "Software Engineer specializing in distributed systems, microservices architecture, and ML infrastructure. 3+ years building high-throughput systems at scale.",
  keywords: [
    "Software Engineer",
    "Distributed Systems",
    "Microservices",
    "ML Infrastructure",
    "Backend Engineer",
    "Venkata Lohith Kokkanti",
  ],
  authors: [{ name: "Venkata Lohith Kokkanti" }],
  openGraph: {
    title: "Venkata Lohith Kokkanti — Software Engineer",
    description:
      "Building systems that scale to millions, survive 3am incidents, and occasionally impress me.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="noise-overlay">{children}</body>
    </html>
  );
}
