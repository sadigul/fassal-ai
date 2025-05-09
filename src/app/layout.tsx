import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: 'Fassal.ai – AI for Agriculture',
  description: 'Join farmers and buyers on Pakistan’s first AI-powered mandi app.',
  openGraph: {
    title: 'Fassal.ai – Smart Agriculture',
    description: 'Revolutionizing farming with data and AI.',
    url: 'https://fassal.ai',
    siteName: 'Fassal.ai',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Fassal.ai Preview',
      },
    ],
    type: 'website',
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
