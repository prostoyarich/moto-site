import Link from "next/link";
import { notFound } from "next/navigation";
import { bikes } from "../../data/bikes";
import PriceTag from "../../components/PriceTag";
import BikeGallery from "../../components/BikeGallery";

type BikePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return bikes.map((bike) => ({
    slug: bike.slug,
  }));
}

export default async function BikeDetailsPage({ params }: BikePageProps) {
  const { slug } = await params;
  const bike = bikes.find((item) => item.slug === slug);

  if (!bike) {
    notFound();
  }

  const similarBikes = bikes
    .filter((item) => item.brand === bike.brand && item.slug !== bike.slug)
    .slice(0, 3);

  const galleryImages =
    "images" in bike && Array.isArray(bike.images) && bike.images.length > 0
      ? bike.images
      : [bike.image];

  return (
    <main className="min-h-screen relative overflow-hidden px-4 py-6 md:px-8 md:py-10">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-white via-sky-100 to-blue-200" />
      <div className="absolute -top-24 -left-24 -z-10 h-80 w-80 rounded-full bg-blue-300/25 blur-3xl" />
      <div className="absolute top-32 right-0 -z-10 h-96 w-96 rounded-full bg-sky-200/35 blur-3xl" />
      <div className="absolute bottom-0 left-1/3 -z-10 h-72 w-72 rounded-full bg-cyan-100/35 blur-3xl" />
      <div className="absolute top-1/2 left-1/4 -z-10 h-64 w-64 rounded-full bg-red-100/25 blur-3xl" />

      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-wrap items-center gap-3 text-sm text-gray-600">
          <Link href="/" className="transition hover:text-red-600">
            Головна
          </Link>
          <span>→</span>
          <Link href="/catalog" className="transition hover:text-red-600">
            Каталог
          </Link>
          <span>→</span>
          <span className="font-semibold text-gray-900">{bike.name}</span>
        </div>

        <section className="overflow-hidden rounded-[34px] border border-white/50 bg-white/80 shadow-2xl backdrop-blur-md">
          <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="relative bg-white">
              <div className="absolute left-5 top-5 z-10 flex flex-wrap gap-3">
                <span className="rounded-full bg-green-500 px-4 py-1.5 text-xs font-semibold text-white shadow-md">
                  В наявності
                </span>
                <span className="rounded-full border border-white/50 bg-white/80 px-4 py-1.5 text-xs font-semibold text-gray-800 shadow-sm backdrop-blur">
                  {bike.brand}
                </span>
              </div>

              <BikeGallery images={galleryImages} alt={bike.name} />
            </div>

            <div className="p-8 md:p-10 lg:p-12">
              <p className="mb-3 inline-flex rounded-full border border-red-200 bg-red-50 px-4 py-1 text-sm font-medium text-red-600">
                Sportbike details
              </p>

              <h1 className="text-4xl font-black leading-tight text-gray-900 md:text-5xl">
                {bike.name}
              </h1>

              <PriceTag
                price={bike.price}
                className="mt-4 text-3xl font-bold text-red-600 md:text-4xl"
              />

              <p className="mt-6 max-w-2xl text-base leading-8 text-gray-700 md:text-lg">
                {bike.description}
              </p>

              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/50 bg-blue-50/80 p-5 shadow-sm backdrop-blur">
                  <p className="text-sm text-gray-500">🏍 Двигун</p>
                  <p className="mt-2 text-lg font-semibold text-gray-900">
                    {bike.engine}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/50 bg-blue-50/80 p-5 shadow-sm backdrop-blur">
                  <p className="text-sm text-gray-500">⚡ Потужність</p>
                  <p className="mt-2 text-lg font-semibold text-gray-900">
                    {bike.power}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/50 bg-blue-50/80 p-5 shadow-sm backdrop-blur">
                  <p className="text-sm text-gray-500">⚙️ Тип</p>
                  <p className="mt-2 text-lg font-semibold text-gray-900">
                    {bike.type}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/50 bg-blue-50/80 p-5 shadow-sm backdrop-blur">
                  <p className="text-sm text-gray-500">📅 Рік</p>
                  <p className="mt-2 text-lg font-semibold text-gray-900">
                    {bike.year}
                  </p>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href={`/orders?bike=${encodeURIComponent(bike.name)}`}
                  className="inline-flex items-center justify-center rounded-xl bg-red-600 px-7 py-3.5 font-semibold text-white shadow-lg transition duration-300 hover:-translate-y-0.5 hover:bg-red-700"
                >
                  Замовити
                </Link>

                <Link
                  href="/catalog"
                  className="inline-flex items-center justify-center rounded-xl border border-gray-300 bg-white px-7 py-3.5 font-semibold text-gray-900 shadow-sm transition duration-300 hover:bg-gray-100"
                >
                  Повернутись до каталогу
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="rounded-[28px] border border-white/50 bg-white/75 p-6 shadow-xl backdrop-blur-md">
            <div className="mb-3 text-3xl">🔥</div>
            <h2 className="text-xl font-bold text-gray-900">
              Чому обирають цю модель
            </h2>
            <p className="mt-3 leading-7 text-gray-600">
              Цей мотоцикл поєднує швидкість, точність керування та яскравий
              спортивний характер, який відчувається з першої поїздки.
            </p>
          </div>

          <div className="rounded-[28px] border border-white/50 bg-white/75 p-6 shadow-xl backdrop-blur-md">
            <div className="mb-3 text-3xl">🛡️</div>
            <h2 className="text-xl font-bold text-gray-900">
              Впевненість на дорозі
            </h2>
            <p className="mt-3 leading-7 text-gray-600">
              Сучасна конструкція, хороша керованість і спортивна геометрія
              роблять модель цікавою як для досвідчених райдерів, так і для
              тих, хто хоче перейти на щось серйозніше.
            </p>
          </div>

          <div className="rounded-[28px] border border-white/50 bg-white/75 p-6 shadow-xl backdrop-blur-md">
            <div className="mb-3 text-3xl">📞</div>
            <h2 className="text-xl font-bold text-gray-900">
              Потрібна консультація?
            </h2>
            <p className="mt-3 leading-7 text-gray-600">
              Ми допоможемо підібрати модель, пояснимо характеристики та
              проконсультуємо щодо оформлення замовлення.
            </p>

            <Link
              href={`/orders?bike=${encodeURIComponent(bike.name)}`}
              className="mt-5 inline-flex rounded-xl bg-gradient-to-r from-white to-sky-100 px-5 py-3 font-semibold text-gray-900 shadow-md transition hover:from-sky-50 hover:to-blue-100"
            >
              Оформити заявку
            </Link>
          </div>
        </section>

        <section className="mt-8 overflow-hidden rounded-[32px] border border-white/50 bg-gradient-to-r from-gray-950 via-slate-900 to-slate-800 text-white shadow-2xl">
          <div className="grid items-center gap-8 px-6 py-8 md:grid-cols-2 md:px-10 md:py-10">
            <div>
              <p className="mb-4 inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-1 text-sm font-medium text-white/90">
                RideX Motors
              </p>

              <h2 className="text-3xl font-black md:text-4xl">
                Готовий відчути цей байк у своєму стилі?
              </h2>

              <p className="mt-5 max-w-xl text-base leading-7 text-white/80 md:text-lg">
                Оформи заявку зараз, і наш менеджер допоможе тобі пройти шлях
                від вибору до замовлення без зайвого клопоту.
              </p>

              <div className="mt-6 flex flex-wrap gap-4">
                <Link
                  href={`/orders?bike=${encodeURIComponent(bike.name)}`}
                  className="rounded-xl bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700"
                >
                  Замовити зараз
                </Link>

                <Link
                  href="/catalog"
                  className="rounded-xl border border-white/20 bg-white/10 px-6 py-3 font-semibold text-white transition hover:bg-white/20"
                >
                  Інші моделі
                </Link>
              </div>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur">
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl bg-white/10 p-4">
                  <p className="text-sm text-white/70">Бренд</p>
                  <p className="mt-1 text-lg font-semibold">{bike.brand}</p>
                </div>

                <div className="rounded-2xl bg-white/10 p-4">
                  <p className="text-sm text-white/70">Модель</p>
                  <p className="mt-1 text-lg font-semibold">{bike.name}</p>
                </div>

                <div className="rounded-2xl bg-white/10 p-4">
                  <p className="text-sm text-white/70">Ціна</p>
                  <PriceTag
                    price={bike.price}
                    className="mt-1 text-lg font-semibold"
                  />
                </div>

                <div className="rounded-2xl bg-white/10 p-4">
                  <p className="text-sm text-white/70">Рік</p>
                  <p className="mt-1 text-lg font-semibold">{bike.year}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {similarBikes.length > 0 && (
          <section className="mt-12">
            <div className="mb-6 flex items-end justify-between gap-4">
              <div>
                <p className="text-sm font-medium uppercase tracking-wide text-red-600">
                  More bikes
                </p>
                <h2 className="mt-2 text-3xl font-bold text-gray-900">
                  Схожі моделі
                </h2>
              </div>

              <Link
                href="/catalog"
                className="rounded-xl border border-white/50 bg-white/80 px-5 py-3 font-semibold text-gray-900 shadow-sm transition hover:bg-white"
              >
                Увесь каталог
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {similarBikes.map((item) => (
                <article
                  key={item.slug}
                  className="group overflow-hidden rounded-[30px] border border-white/50 bg-white/85 shadow-xl backdrop-blur-md transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
                >
                  <div className="overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-56 w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          {item.brand}
                        </p>
                        <h3 className="mt-1 text-2xl font-bold text-gray-900">
                          {item.name}
                        </h3>
                      </div>

                      <div className="rounded-xl bg-red-50 px-3 py-2 text-sm font-bold text-red-600 shadow-sm">
                        <PriceTag price={item.price} />
                      </div>
                    </div>

                    <p className="mt-4 min-h-[72px] text-sm leading-6 text-gray-600">
                      {item.description}
                    </p>

                    <div className="mt-6 flex items-center gap-3">
                      <Link
                        href={`/catalog/${item.slug}`}
                        className="block flex-1 rounded-2xl bg-red-600 py-3 text-center font-semibold text-white transition duration-300 hover:bg-red-700"
                      >
                        Деталі
                      </Link>

                      <Link
                        href={`/orders?bike=${encodeURIComponent(item.name)}`}
                        className="block flex-1 rounded-2xl border border-gray-300 bg-white py-3 text-center font-semibold text-gray-900 transition duration-300 hover:bg-gray-100"
                      >
                        Замовлення
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}