import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { SpeedInsights } from "@vercel/speed-insights/next"

export const metadata: Metadata = {
  title: "Real-estate-App",
  description: "Buy or rent you dream place.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
      <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-192x192.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-512x512.png" />
      </head>
        <body>
          <SpeedInsights />
          <Navbar />
          {children}
        </body>
    </html>
  );
}
