"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { bikes } from "../data/bikes";

export default function FavoritesPage() {
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

  const favoriteBikes = bikes.filter((bike) =>
    favoriteSlugs.includes(bike.slug)
  );

  const removeFavorite = (slug: string) => {
    const updatedFavorites = favoriteSlugs.filter((item) => item !== slug);
    setFavoriteSlugs(updatedFavorites);
    localStorage.setItem("ridx-favorites", JSON.stringify(updatedFavorites));
  };

  const clearFavorites = () => {
    setFavoriteSlugs([]);
    localStorage.removeItem("ridx-favorites");
  };

  return (
    <main className="min-h-screen relative overflow-hidden px-4 py-6 md:px-8 md:py-8">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-white via-sky-100 to-blue-200" />
      <div className="absolute -top-20 -left-20 -z-10 h-72 w-72 rounded-full bg-blue-300/30 blur-3xl" />
      <div className="absolute top-40 right-0 -z-10 h-80 w-80 rounded-full bg-sky-200/40 blur-3xl" />
      <div className="absolute bottom-0 left-1/3 -z-10 h-72 w-72 rounded-full bg-cyan-100/40 blur-3xl" />

      <div className="mx-auto max-w-7xl">
        <section className="rounded-[32px] border border-white/50 bg-white/70 px-6 py-10 shadow-2xl backdrop-blur-md md:px-8 md:py-14">
          <p className="mb-4 inline-flex rounded-full border border-red-200 bg-red-50 px-4 py-1 text-sm font-medium text-red-600 shadow-sm">
            Favorites
          </p>

          <h1 className="text-4xl font-black leading-tight text-gray-900 sm:text-5xl lg:text-6xl">
            Обране
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-gray-700 sm:text-lg">
            Тут зібрані мотоцикли, які ти додав до обраного.
          </p>
        </section>

        {favoriteBikes.length > 0 && (
          <div className="mt-6 flex justify-end">
            <button
              onClick={clearFavorites}
              className="rounded-xl border border-red-200 bg-red-50 px-5 py-3 font-semibold text-red-600 transition hover:bg-red-100"
            >
              Очистити обране
            </button>
          </div>
        )}

        {favoriteBikes.length === 0 ? (
          <section className="mt-10 rounded-[28px] border border-white/50 bg-white/70 p-10 text-center shadow-xl backdrop-blur-md">
            <h2 className="text-2xl font-bold text-gray-900">
              Обране поки порожнє
            </h2>
            <p className="mt-3 text-gray-600">
              Додай кілька мотоциклів у вибране, щоб вони з’явилися тут.
            </p>

            <Link
              href="/catalog"
              className="mt-6 inline-flex rounded-xl bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700"
            >
              Перейти в каталог
            </Link>
          </section>
        ) : (
          <section className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
            {favoriteBikes.map((bike) => (
              <article
                key={bike.slug}
                className="overflow-hidden rounded-[30px] border border-white/50 bg-white/85 text-black shadow-xl backdrop-blur-md transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >
                <div className="overflow-hidden">
                  <img
                    src={bike.image}
                    alt={bike.name}
                    className="h-64 w-full object-cover transition duration-700 hover:scale-105"
                  />
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        {bike.brand}
                      </p>
                      <h2 className="mt-1 text-2xl font-bold text-gray-900">
                        {bike.name}
                      </h2>
                    </div>

                    <div className="rounded-xl bg-red-50 px-3 py-2 text-sm font-bold text-red-600 shadow-sm">
                      {bike.price}
                    </div>
                  </div>

                  <p className="mt-4 min-h-[72px] text-sm leading-6 text-gray-600">
                    {bike.description}
                  </p>

                  <div className="mt-6 flex items-center gap-3">
                    <Link
                      href={`/catalog/${bike.slug}`}
                      className="block flex-1 rounded-2xl bg-red-600 py-3 text-center font-semibold text-white transition duration-300 hover:bg-red-700"
                    >
                      Деталі
                    </Link>

                    <button
                      onClick={() => removeFavorite(bike.slug)}
                      className="block flex-1 rounded-2xl border border-gray-300 bg-white py-3 text-center font-semibold text-gray-900 transition duration-300 hover:bg-gray-100"
                    >
                      Прибрати
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </section>
        )}
      </div>
    </main>
  );
}