import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SpotlightBackground } from "@/components/ui/spotlight-new";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ValCase | Valorant Case Açma Deneyimi",
  description:
    "Valorant API verileriyle güçlendirilmiş interaktif kasa açma deneyimi. Skins, ajanlar, haritalar, oyuncu kartları ve seviye kartları tek platformda.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <SpotlightBackground>{children}</SpotlightBackground>
      </body>
    </html>
  );
}
