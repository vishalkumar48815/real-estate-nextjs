import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { SmoothCursor } from "@/components/ui/smooth-cursor";

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
      <body>
        <Navbar />
        {children}
        <SmoothCursor />
      </body>
    </html>
  );
}
