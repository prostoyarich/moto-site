"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import CurrencyToggle from "./CurrencyToggle";

export default function Navbar() {
  const pathname = usePathname();

  const navItem = (href: string, label: string) => {
    const isActive =
      pathname === href || (href !== "/" && pathname.startsWith(href));

    return (
      <Link
        href={href}
        className={`rounded-xl px-4 py-2 text-sm font-medium transition md:text-base ${
          isActive
            ? "bg-white text-red-600 shadow-md"
            : "text-gray-800 hover:bg-white hover:text-red-600"
        }`}
      >
        {label}
      </Link>
    );
  };

  return (
    <header className="sticky top-0 z-50 px-4 pt-4 md:px-8">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/50 bg-white/70 px-6 py-4 shadow-lg backdrop-blur-md">
        <Link
          href="/"
          className="text-2xl font-black tracking-wide text-gray-900 transition hover:text-red-600"
        >
          RideX Motors
        </Link>

        <div className="flex items-center gap-3">
          <nav className="flex items-center gap-2 md:gap-3">
            {navItem("/", "Головна")}
            {navItem("/catalog", "Каталог")}
            {navItem("/favorites", "Обране")}
            {navItem("/orders", "Замовлення")}
          </nav>

          <CurrencyToggle />
        </div>
      </div>
    </header>
  );
}