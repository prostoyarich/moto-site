"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function ThanksPage() {
  const searchParams = useSearchParams();
  const bike = searchParams.get("bike") || "обраного мотоцикла";

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-10">
      <section className="w-full max-w-3xl rounded-[32px] border border-white/50 bg-white/80 p-8 text-center shadow-2xl backdrop-blur-md md:p-12">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-4xl">
          ✅
        </div>

        <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-green-600">
          RideX Motors
        </p>

        <h1 className="text-4xl font-black text-gray-900 md:text-5xl">
          Дякуємо за замовлення
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-gray-700">
          Ваша заявка на <span className="font-semibold">{bike}</span> успішно
          оформлена. Наш менеджер скоро зв’яжеться з вами для уточнення деталей.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/catalog"
            className="rounded-xl bg-red-600 px-6 py-3 font-semibold text-white shadow-lg transition hover:bg-red-700"
          >
            До каталогу
          </Link>

          <Link
            href="/"
            className="rounded-xl border border-gray-300 bg-white px-6 py-3 font-semibold text-gray-900 transition hover:bg-gray-100"
          >
            На головну
          </Link>
        </div>
      </section>
    </main>
  );
}