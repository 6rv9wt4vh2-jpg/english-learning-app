import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "English RU — английский для русскоязычных",
  description: "Изучайте английский (A1–B1): словарь, SRS-карточки, уроки и аудирование.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}>
        <Nav />
        <main className="md:pl-56 pb-24 md:pb-10 min-h-screen">
          <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6 sm:py-8">{children}</div>
        </main>
      </body>
    </html>
  );
}
