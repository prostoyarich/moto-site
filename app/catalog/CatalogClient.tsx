"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { bikes } from "../data/bikes";
import { useCurrency } from "../context/CurrencyContext";

export default function CatalogClient() {
  const { formatPrice } = useCurrency();

  const [search, setSearch] = useState("");
  const [brandFilter, setBrandFilter] = useState("All");
  const [sortBy, setSortBy] = useState("default");
  const [isOpen, setIsOpen] = useState(false);
  const [favoriteSlugs, setFavoriteSlugs] = useState<string[]>([]);

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const params = new URLSearchParams(window.location.search);

    setSearch(params.get("search") || "");
    setBrandFilter(params.get("brand") || "All");
    setSortBy(params.get("sort") || "default");
  }, []);

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

  const brands = useMemo(() => {
    return ["All", ...new Set(bikes.map((bike) => bike.brand))];
  }, []);

  const parsePrice = (price: string) => {
    return Number(price.replace(/\$/g, "").replace(/\s/g, ""));
  };

  const sortOptions = [
    { value: "default", label: "За замовчуванням" },
    { value: "price-asc", label: "Ціна: від дешевих" },
    { value: "price-desc", label: "Ціна: від дорогих" },
    { value: "name-asc", label: "Назва: A-Z" },
    { value: "year-desc", label: "Спочатку новіші" },
  ];

  const sortLabel =
    sortOptions.find((option) => option.value === sortBy)?.label ||
    "За замовчуванням";

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const params = new URLSearchParams();

    if (search.trim()) params.set("search", search);
    if (brandFilter !== "All") params.set("brand", brandFilter);
    if (sortBy !== "default") params.set("sort", sortBy);

    const queryString = params.toString();
    const nextUrl = queryString ? `/catalog?${queryString}` : "/catalog";

    window.history.replaceState(null, "", nextUrl);
  }, [search, brandFilter, sortBy]);

  const filteredAndSortedBikes = useMemo(() => {
    let result = [...bikes];

    if (brandFilter !== "All") {
      result = result.filter((bike) => bike.brand === brandFilter);
    }

    if (search.trim()) {
      const query = search.toLowerCase();
      result = result.filter(
        (bike) =>
          bike.name.toLowerCase().includes(query) ||
          bike.brand.toLowerCase().includes(query) ||
          bike.type.toLowerCase().includes(query)
      );
    }

    if (sortBy === "price-asc") {
      result.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
    } else if (sortBy === "name-asc") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "year-desc") {
      result.sort((a, b) => Number(b.year) - Number(a.year));
    }

    return result;
  }, [search, brandFilter, sortBy]);

  const resetFilters = () => {
    setSearch("");
    setBrandFilter("All");
    setSortBy("default");
    setIsOpen(false);
  };

  return (
    <main className="min-h-screen relative overflow-hidden px-4 py-6 md:px-8 md:py-8">
      <div className="mx-auto max-w-7xl">
        <section className="relative overflow-hidden rounded-[32px] border border-white/50 bg-white/60 px-6 py-10 shadow-2xl backdrop-blur-md md:px-8 md:py-14">
          <div className="relative z-10 max-w-3xl">
            <p className="mb-4 inline-flex rounded-full border border-red-200 bg-red-50 px-4 py-1 text-sm font-medium text-red-600 shadow-sm">
              Full catalog
            </p>

            <h1 className="text-4xl font-black leading-tight text-gray-900 sm:text-5xl lg:text-6xl">
              Каталог
              <span className="block text-red-600">мотоциклів</span>
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-gray-700 sm:text-lg">
              Обери модель, яка підходить саме тобі. Тут зібрані всі доступні
              спортбайки RideX Motors в одному місці.
            </p>
          </div>
        </section>

        <section className="mt-8 rounded-[30px] border border-white/50 bg-white/75 p-5 shadow-xl backdrop-blur-md md:p-6">
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.2fr_1.6fr_1fr]">
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Пошук
              </label>

              <div className="flex items-center gap-3 rounded-2xl border border-white/60 bg-white/90 px-4 py-3 shadow-sm">
                <span className="text-gray-400">🔍</span>
                <input
                  type="text"
                  placeholder="Наприклад: Yamaha, Ninja, Suzuki..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-transparent text-gray-900 outline-none placeholder:text-gray-400"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Бренд
              </label>

              <div className="flex flex-wrap gap-3 rounded-2xl border border-white/60 bg-white/80 p-3 shadow-sm">
                {brands.map((brand) => {
                  const isActive = brandFilter === brand;

                  return (
                    <button
                      key={brand}
                      onClick={() => setBrandFilter(brand)}
                      className={`rounded-xl px-4 py-2 text-sm font-medium transition duration-300 md:text-base ${
                        isActive
                          ? "bg-red-600 text-white shadow-md"
                          : "bg-white text-gray-800 hover:-translate-y-0.5 hover:bg-gray-50"
                      }`}
                    >
                      {brand}
                    </button>
                  );
                })}
              </div>
            </div>

            <div ref={dropdownRef} className="relative">
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Сортування
              </label>

              <button
                onClick={() => setIsOpen((prev) => !prev)}
                className="flex w-full items-center justify-between rounded-2xl border border-white/60 bg-white/90 px-4 py-3 text-gray-900 shadow-sm transition hover:bg-white"
              >
                <span className="flex items-center gap-2">
                  <span className="text-gray-400">⚙️</span>
                  {sortLabel}
                </span>

                <span
                  className={`transition duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                >
                  ▼
                </span>
              </button>

              {isOpen && (
                <div className="absolute z-50 mt-2 w-full overflow-hidden rounded-2xl border border-white/50 bg-white shadow-xl backdrop-blur-md">
                  {sortOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setSortBy(option.value);
                        setIsOpen(false);
                      }}
                      className={`block w-full px-4 py-3 text-left text-sm transition ${
                        sortBy === option.value
                          ? "bg-red-50 font-semibold text-red-600"
                          : "text-gray-800 hover:bg-gray-50"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/50 bg-gradient-to-r from-white to-sky-50 px-4 py-3 shadow-sm">
            <p className="text-sm text-gray-600">
              Знайдено моделей:{" "}
              <span className="font-bold text-gray-900">
                {filteredAndSortedBikes.length}
              </span>
            </p>

            <button
              onClick={resetFilters}
              className="rounded-xl border border-blue-200 bg-white px-4 py-2 text-sm font-medium text-gray-800 transition hover:bg-sky-50"
            >
              Скинути фільтри
            </button>
          </div>
        </section>

        <section className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
          {filteredAndSortedBikes.map((bike, index) => {
            const isFavorite = favoriteSlugs.includes(bike.slug);

            return (
              <article
                key={bike.slug}
                className="group relative overflow-hidden rounded-[30px] border border-white/50 bg-white/85 text-black shadow-xl backdrop-blur-md transition duration-500 hover:-translate-y-2 hover:shadow-2xl"
                style={{
                  animation: `fadeUp 0.6s ease forwards`,
                  animationDelay: `${index * 70}ms`,
                  opacity: 0,
                }}
              >
                <button
                  onClick={() => toggleFavorite(bike.slug)}
                  className={`absolute right-4 top-4 z-20 flex h-11 w-11 items-center justify-center rounded-full shadow-md transition ${
                    isFavorite
                      ? "bg-red-600 text-white"
                      : "bg-white/90 text-gray-700 hover:bg-white"
                  }`}
                >
                  {isFavorite ? "♥" : "♡"}
                </button>

                <div className="relative">
                  <span className="absolute left-4 top-4 z-10 rounded-full bg-green-500 px-3 py-1 text-xs font-semibold text-white shadow-md">
                    В наявності
                  </span>

                  <div className="overflow-hidden">
                    <img
                      src={bike.image}
                      alt={bike.name}
                      className="h-64 w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                  </div>
                </div>

                <div className="relative p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">{bike.brand}</p>
                      <h2 className="mt-1 text-2xl font-bold text-gray-900">
                        {bike.name}
                      </h2>
                    </div>

                    <div className="rounded-xl bg-red-50 px-3 py-2 text-sm font-bold text-red-600 shadow-sm">
                      {formatPrice(bike.price)}
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

                    <Link
                      href={`/orders?bike=${encodeURIComponent(bike.name)}`}
                      className="block flex-1 rounded-2xl border border-gray-300 bg-white py-3 text-center font-semibold text-gray-900 transition duration-300 hover:bg-gray-100"
                    >
                      Замовлення
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </section>

        {filteredAndSortedBikes.length === 0 && (
          <section className="mt-10 rounded-[28px] border border-white/50 bg-white/70 p-10 text-center shadow-xl backdrop-blur-md">
            <h2 className="text-2xl font-bold text-gray-900">
              Нічого не знайдено
            </h2>
            <p className="mt-3 text-gray-600">
              Спробуй змінити пошуковий запит або обрати інший бренд.
            </p>
          </section>
        )}
      </div>

      <style jsx global>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(22px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </main>
  );
}