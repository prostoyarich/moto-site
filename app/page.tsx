"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { bikes } from "./data/bikes";

export default function HomePage() {
  const [filter, setFilter] = useState("All");
  const [favoriteSlugs, setFavoriteSlugs] = useState<string[]>([]);

  useEffect(() => {
    const savedFavorites = localStorage.getItem("ridx-favorites");
    if (savedFavorites) {
      try {
        const parsedFavorites: string[] = JSON.parse(savedFavorites);
        setFavoriteSlugs(parsedFavorites);
      } catch {
        localStorage.removeItem("ridx-favorites");
      }
    }
  }, []);

  const toggleFavorite = (slug: string) => {
    const updatedFavorites = favoriteSlugs.includes(slug)
      ? favoriteSlugs.filter((item) => item !== slug)
      : [...favoriteSlugs, slug];

    setFavoriteSlugs(updatedFavorites);
    localStorage.setItem("ridx-favorites", JSON.stringify(updatedFavorites));
  };

  const filteredBikes =
    filter === "All"
      ? bikes.slice(0, 4)
      : bikes.filter((bike) => bike.brand === filter).slice(0, 4);

  return (
    <main className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-white via-sky-100 to-blue-200" />
      <div className="absolute -top-28 -left-28 h-80 w-80 rounded-full bg-blue-300/30 blur-3xl" />
      <div className="absolute top-32 right-0 h-96 w-96 rounded-full bg-sky-200/40 blur-3xl" />
      <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-cyan-100/40 blur-3xl" />
      <div className="absolute top-1/2 left-1/4 h-72 w-72 rounded-full bg-red-100/30 blur-3xl" />

      <div className="relative z-10">
        <section className="mx-auto grid max-w-7xl items-center gap-10 px-4 pb-10 pt-8 md:grid-cols-2 md:px-8 md:pt-14">
          <div>
            <p className="mb-4 inline-block rounded-full border border-blue-200 bg-white/70 px-4 py-1 text-sm font-medium text-blue-700 shadow-sm backdrop-blur">
              Преміальні спортбайки RideX Motors
            </p>

            <h1 className="mb-6 text-4xl font-extrabold leading-tight text-gray-900 md:text-6xl">
              Відчуй швидкість,
              <span className="block bg-gradient-to-r from-red-600 via-orange-500 to-red-500 bg-clip-text text-transparent">
                стиль і характер
              </span>
            </h1>

            <p className="mb-8 max-w-xl text-lg leading-8 text-gray-700">
              Обирай сучасні мотоцикли від Yamaha, BMW, Kawasaki та Suzuki.
              Каталог створений для тих, хто любить драйв, технології та
              справжні емоції на дорозі.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/catalog"
                className="inline-flex items-center justify-center rounded-xl bg-red-600 px-7 py-3 text-base font-semibold text-white shadow-lg transition duration-300 hover:-translate-y-1 hover:bg-red-700 hover:shadow-xl"
              >
                Перейти в каталог
              </Link>

              <a
                href="#popular"
                className="inline-flex items-center justify-center rounded-xl border border-white/60 bg-white/80 px-7 py-3 text-base font-semibold text-gray-900 shadow-md backdrop-blur transition duration-300 hover:-translate-y-1 hover:bg-white"
              >
                Дивитись моделі
              </a>
            </div>

            <div className="mt-10 grid max-w-xl grid-cols-3 gap-4">
              <div className="rounded-2xl border border-white/50 bg-white/70 p-4 text-center shadow-md backdrop-blur transition hover:-translate-y-1">
                <p className="text-2xl font-extrabold text-red-600">8+</p>
                <p className="mt-1 text-sm text-gray-600">Моделей</p>
              </div>

              <div className="rounded-2xl border border-white/50 bg-white/70 p-4 text-center shadow-md backdrop-blur transition hover:-translate-y-1">
                <p className="text-2xl font-extrabold text-red-600">4</p>
                <p className="mt-1 text-sm text-gray-600">Бренди</p>
              </div>

              <div className="rounded-2xl border border-white/50 bg-white/70 p-4 text-center shadow-md backdrop-blur transition hover:-translate-y-1">
                <p className="text-2xl font-extrabold text-red-600">24/7</p>
                <p className="mt-1 text-sm text-gray-600">Підтримка</p>
              </div>
            </div>
          </div>

          <div className="flex justify-center md:justify-end">
            <div className="group relative w-full max-w-2xl overflow-hidden rounded-[30px] border border-white/50 bg-white/50 shadow-2xl backdrop-blur-md">
              <div className="absolute inset-0 bg-gradient-to-tr from-black/10 via-transparent to-white/20" />
              <img
                src="https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=80&w=1600"
                alt="Sport motorcycle"
                className="h-[280px] w-full object-cover transition duration-700 group-hover:scale-105 md:h-[430px]"
              />
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-4 md:px-8">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            <div className="rounded-3xl border border-white/50 bg-white/75 p-6 shadow-lg backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="mb-3 text-3xl">🏍</div>
              <h3 className="text-xl font-bold text-gray-900">Великий вибір</h3>
              <p className="mt-2 text-gray-600">
                У каталозі зібрані популярні спортбайки для міста, траси та драйву.
              </p>
            </div>

            <div className="rounded-3xl border border-white/50 bg-white/75 p-6 shadow-lg backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="mb-3 text-3xl">⚡</div>
              <h3 className="text-xl font-bold text-gray-900">Швидкий вибір</h3>
              <p className="mt-2 text-gray-600">
                Зручний каталог, детальні сторінки моделей і форма замовлення.
              </p>
            </div>

            <div className="rounded-3xl border border-white/50 bg-white/75 p-6 shadow-lg backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="mb-3 text-3xl">🔧</div>
              <h3 className="text-xl font-bold text-gray-900">Сучасний сервіс</h3>
              <p className="mt-2 text-gray-600">
                Ми допомагаємо підібрати мотоцикл під стиль їзди і бюджет.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-8 md:px-8">
          <div className="overflow-hidden rounded-[32px] border border-white/50 bg-gradient-to-r from-gray-950 via-gray-900 to-slate-800 text-white shadow-2xl">
            <div className="grid items-center gap-8 px-6 py-8 md:grid-cols-2 md:px-10 md:py-10">
              <div>
                <p className="mb-4 inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-1 text-sm font-medium text-white/90">
                  Топ модель тижня
                </p>

                <h2 className="text-3xl font-black md:text-5xl">
                  Kawasaki Ninja ZX-10R
                </h2>

                <p className="mt-5 max-w-xl text-base leading-7 text-white/80 md:text-lg">
                  Агресивний супербайк для тих, хто хоче максимум емоцій,
                  потужності та справжнього спортивного характеру.
                </p>

                <div className="mt-6 flex flex-wrap gap-4">
                  <Link
                    href="/catalog/kawasaki-zx10r"
                    className="rounded-xl bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700"
                  >
                    Деталі
                  </Link>

                  <Link
                    href="/orders?bike=Kawasaki%20Ninja%20ZX-10R"
                    className="rounded-xl border border-white/20 bg-white/10 px-6 py-3 font-semibold text-white transition hover:bg-white/20"
                  >
                    Замовити
                  </Link>
                </div>
              </div>

              <div className="overflow-hidden rounded-[28px] border border-white/10">
                <img
                  src="https://procar-lemberg.com/wp-content/uploads/2021/04/21my_ninja-zx-10r_gn1_stu.001.png"
                  alt="Kawasaki Ninja ZX-10R"
                  className="h-[260px] w-full object-cover md:h-[360px]"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pt-6 md:px-8">
          <div className="mb-6 flex flex-wrap items-center justify-center gap-3 rounded-2xl border border-white/40 bg-white/50 p-4 shadow-md backdrop-blur-md">
            {["All", "Yamaha", "BMW", "Kawasaki", "Suzuki"].map((brand) => (
              <button
                key={brand}
                onClick={() => setFilter(brand)}
                className={`rounded-xl px-5 py-2 text-sm font-medium transition duration-300 md:text-base ${
                  filter === brand
                    ? "bg-red-600 text-white shadow-md"
                    : "bg-white/80 text-gray-800 hover:-translate-y-0.5 hover:bg-white"
                }`}
              >
                {brand}
              </button>
            ))}
          </div>
        </section>

        <section
          id="popular"
          className="mx-auto max-w-7xl px-4 pb-16 pt-2 md:px-8"
        >
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
              Популярні моделі
            </h2>
            <p className="mt-3 text-gray-600">
              Обирай серед найцікавіших мотоциклів нашого каталогу
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-4">
            {filteredBikes.map((bike) => {
              const isFavorite = favoriteSlugs.includes(bike.slug);

              return (
                <article
                  key={bike.slug}
                  className="group relative overflow-hidden rounded-3xl border border-white/50 bg-white/85 text-black shadow-xl backdrop-blur-md transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
                >
                  <div className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">
                    <div className="absolute -top-10 -right-10 h-28 w-28 rounded-full bg-red-200/30 blur-2xl" />
                    <div className="absolute bottom-0 left-0 h-24 w-24 rounded-full bg-sky-200/30 blur-2xl" />
                  </div>

                  <button
                    onClick={() => toggleFavorite(bike.slug)}
                    className={`absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full shadow-md transition ${
                      isFavorite
                        ? "bg-red-600 text-white"
                        : "bg-white/90 text-gray-700 hover:bg-white"
                    }`}
                  >
                    {isFavorite ? "♥" : "♡"}
                  </button>

                  <div className="overflow-hidden">
                    <img
                      src={bike.image}
                      alt={bike.name}
                      className="h-56 w-full object-cover transition duration-500 group-hover:scale-110"
                    />
                  </div>

                  <div className="relative p-6">
                    <p className="mb-2 text-sm font-medium text-gray-500">{bike.brand}</p>

                    <h3 className="min-h-[56px] text-xl font-semibold text-gray-900">
                      {bike.name}
                    </h3>

                    <p className="mt-3 text-2xl font-bold text-red-600">{bike.price}</p>

                    <div className="mt-5 flex gap-3">
                      <Link
                        href={`/catalog/${bike.slug}`}
                        className="flex-1 rounded-xl bg-red-600 py-3 text-center font-medium text-white transition duration-300 hover:bg-red-700"
                      >
                        Деталі
                      </Link>

                      <Link
                        href={`/orders?bike=${encodeURIComponent(bike.name)}`}
                        className="flex-1 rounded-xl border border-gray-300 bg-white py-3 text-center font-medium text-gray-900 transition duration-300 hover:bg-gray-100"
                      >
                        Замовлення
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="mt-12 flex justify-center">
            <Link
              href="/catalog"
              className="inline-flex items-center justify-center rounded-2xl border border-red-200 bg-white/80 px-8 py-3 text-base font-semibold text-red-600 shadow-md backdrop-blur transition duration-300 hover:-translate-y-1 hover:bg-white"
            >
              Відкрити весь каталог
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}