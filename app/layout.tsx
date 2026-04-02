import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import { CurrencyProvider } from "./context/CurrencyContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RideX Motors",
  description: "Спортбайки та мотоцикли",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased text-black`}
      >
        <CurrencyProvider>
          <div className="min-h-screen bg-gradient-to-br from-white via-sky-100 to-blue-200">
            <Navbar />
            <main className="px-4 pb-10 pt-6 md:px-8">{children}</main>
            <footer className="px-4 py-6 text-center text-sm text-gray-600">
              © 2026 RideX Motors. Всі права захищені.
            </footer>
          </div>
        </CurrencyProvider>
      </body>
    </html>
  );
}