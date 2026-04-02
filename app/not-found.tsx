import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-10">
      <section className="w-full max-w-3xl rounded-[32px] border border-white/50 bg-white/80 p-8 text-center shadow-2xl backdrop-blur-md md:p-12">
        <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-red-500">
          404
        </p>

        <h1 className="text-4xl font-black text-gray-900 md:text-5xl">
          Сторінку не знайдено
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-gray-600">
          Схоже, ця дорога нікуди не веде. Повернись до каталогу і обери інший байк.
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