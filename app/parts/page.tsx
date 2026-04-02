"use client";

import { useMemo, useState } from "react";
import { parts } from "../data/parts";

export default function PartsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const categories = useMemo(
    () => ["All", ...new Set(parts.map((part) => part.category))],
    []
  );

  const filteredParts = parts.filter((part) => {
    const matchesSearch =
      part.name.toLowerCase().includes(search.toLowerCase()) ||
      part.brand.toLowerCase().includes(search.toLowerCase()) ||
      part.compatibility.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || part.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="text-white">
      {/* HERO */}
      <section className="relative overflow-hidden rounded-[32px] border border-white/10 bg-black/30 px-8 py-14 shadow-2xl backdrop-blur-md">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-10 top-6 h-40 w-40 rounded-full bg-red-600/15 blur-3xl" />
          <div className="absolute right-0 top-0 h-52 w-52 rounded-full bg-red-500/10 blur-3xl" />
          <div className="absolute bottom-0 left-1/3 h-36 w-36 rounded-full bg-white/5 blur-3xl" />
        </div>

        <div className="relative z-10 max-w-3xl">
          <p className="mb-4 inline-flex rounded-full border border-red-500/30 bg-red-500/10 px-4 py-1 text-sm text-red-300 shadow-[0_0_20px_rgba(239,68,68,0.18)]">
            RideX Parts
          </p>

          <h1 className="text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
            Деталі
            <span className="block text-red-500 drop-shadow-[0_0_20px_rgba(239,68,68,0.45)]">
              для мотоциклів
            </span>
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-gray-200 sm:text-lg">
            Шини, двигуни, гальма, вихлоп, підвіска та інші компоненти для
            сучасних спортбайків. Усе зібрано в одному каталозі.
          </p>
        </div>
      </section>

      {/* FILTERS */}
      <section className="mt-10 rounded-[28px] border border-white/10 bg-black/30 p-6 shadow-xl backdrop-blur-md">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-2xl font-bold">Пошук деталей</h2>
            <p className="mt-2 text-gray-300">
              Шукай за назвою, брендом або сумісністю.
            </p>
          </div>

          <div className="w-full max-w-md">
            <input
              type="text"
              placeholder="Пошук деталей..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-black/50 px-4 py-3 text-white outline-none transition placeholder:text-gray-400 focus:border-red-500 focus:shadow-[0_0_20px_rgba(239,68,68,0.18)]"
            />
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          {categories.map((item) => (
            <button
              key={item}
              onClick={() => setCategory(item)}
              className={`rounded-xl px-4 py-2 text-sm font-medium transition duration-300 ${
                category === item
                  ? "bg-red-600 text-white shadow-lg shadow-red-900/30"
                  : "bg-white/10 text-gray-200 hover:bg-white/20"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </section>

      {/* EMPTY */}
      {filteredParts.length === 0 && (
        <section className="mt-10 rounded-[28px] border border-white/10 bg-black/30 p-10 text-center shadow-xl backdrop-blur-md">
          <p className="text-2xl font-semibold text-white">
            Нічого не знайдено
          </p>
          <p className="mt-2 text-gray-300">
            Спробуй змінити пошуковий запит або категорію.
          </p>
        </section>
      )}

      {/* CARDS */}
      <section className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
        {filteredParts.map((part) => (
          <article
            key={part.slug}
            className="group relative overflow-hidden rounded-[30px] border border-white/10 bg-white text-black shadow-2xl transition duration-500 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(0,0,0,0.45)]"
          >
            <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">
              <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-red-500/20 blur-2xl" />
              <div className="absolute -left-8 bottom-0 h-24 w-24 rounded-full bg-red-400/10 blur-2xl" />
            </div>

            <div className="relative">
              <div className="absolute inset-x-0 top-0 z-10 flex items-start justify-between p-4">
                <span className="rounded-full border border-white/30 bg-red-600/90 px-3 py-1 text-xs font-semibold text-white shadow-md backdrop-blur-sm">
                  {part.category}
                </span>

                <span className="rounded-full bg-white/85 px-3 py-1 text-xs font-bold text-zinc-900 shadow-md backdrop-blur-sm">
                  {part.brand}
                </span>
              </div>

              <div className="overflow-hidden">
                <img
                  src={part.image}
                  alt={part.name}
                  className="h-72 w-full object-cover transition duration-700 group-hover:scale-105"
                />
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <h3 className="text-2xl font-black leading-tight text-zinc-900">
                    {part.name}
                  </h3>
                  <p className="mt-2 text-sm text-gray-500">
                    Сумісність: {part.compatibility}
                  </p>
                </div>

                <div className="shrink-0 rounded-2xl bg-zinc-900 px-3 py-2 text-sm font-bold text-white shadow-lg">
                  {part.price}
                </div>
              </div>

              <p className="mt-4 min-h-[78px] text-sm leading-6 text-gray-600">
                {part.description}
              </p>

              <div className="mt-5 rounded-2xl bg-zinc-100 px-4 py-3 text-sm">
                <p className="text-gray-500">Бренд</p>
                <p className="mt-1 font-semibold text-zinc-900">{part.brand}</p>
              </div>

              <button className="mt-6 block w-full rounded-2xl bg-red-600 py-3 text-center font-semibold text-white shadow-lg shadow-red-900/20 transition duration-300 hover:bg-red-700">
                Купити
              </button>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}