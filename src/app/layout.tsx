import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Omuringa Investment CC | Security & Business Services Namibia",
    template: "%s | Omuringa Investment CC",
  },
  description:
    "Omuringa Investment CC provides professional security services, business support, and security training through Omuringa Security Training Academy in Keetmanshoop, Namibia.",
  keywords: [
    "security services Namibia",
    "security company Keetmanshoop",
    "security training Namibia",
    "security training Keetmanshoop",
    "business registration Namibia",
    "Omuringa Investment CC",
    "Omuringa Security Training Academy",
    "guard services Namibia",
    "event security Namibia",
  ],
  authors: [{ name: "Omuringa Investment CC" }],
  creator: "Omuringa Investment CC",
  openGraph: {
    type: "website",
    locale: "en_NA",
    url: process.env.NEXT_PUBLIC_APP_URL,
    siteName: "Omuringa Investment CC",
    title: "Omuringa Investment CC | Security & Business Services Namibia",
    description:
      "Professional security services, business support, and security training in Namibia.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <meta name="theme-color" content="#166534" />
      </head>
      <body className={inter.className}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
