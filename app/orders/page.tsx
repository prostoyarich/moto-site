"use client";

import { useEffect, useState } from "react";

type OrderItem = {
  bike: string;
  name: string;
  phone: string;
  city: string;
  comment: string;
  createdAt: string;
};

export default function OrdersPage() {
  const [bike, setBike] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [comment, setComment] = useState("");
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const params = new URLSearchParams(window.location.search);
    setBike(params.get("bike") || "");

    const savedOrders = localStorage.getItem("ridx-orders");
    if (savedOrders) {
      try {
        setOrders(JSON.parse(savedOrders));
      } catch {
        localStorage.removeItem("ridx-orders");
      }
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newOrder: OrderItem = {
      bike,
      name,
      phone,
      city,
      comment,
      createdAt: new Date().toLocaleString("uk-UA"),
    };

    const updatedOrders = [newOrder, ...orders];
    setOrders(updatedOrders);
    localStorage.setItem("ridx-orders", JSON.stringify(updatedOrders));

    setName("");
    setPhone("");
    setCity("");
    setComment("");
    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);
    }, 2500);
  };

  return (
    <main className="min-h-screen px-4 py-6 md:px-8 md:py-8">
      <div className="mx-auto max-w-6xl">
        <section className="rounded-[32px] border border-white/50 bg-white/75 p-6 shadow-2xl backdrop-blur-md md:p-10">
          <div className="mb-8">
            <p className="mb-3 inline-flex rounded-full border border-red-200 bg-red-50 px-4 py-1 text-sm font-medium text-red-600">
              RideX Motors
            </p>

            <h1 className="text-4xl font-black text-gray-900 md:text-5xl">
              Оформлення замовлення
            </h1>

            <p className="mt-4 max-w-2xl text-base leading-7 text-gray-600 md:text-lg">
              Заповни форму нижче, і заявка буде збережена на цій сторінці.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
            <form
              onSubmit={handleSubmit}
              className="rounded-[28px] border border-white/50 bg-white/90 p-6 shadow-lg"
            >
              <div className="grid gap-5">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Обраний мотоцикл
                  </label>
                  <input
                    type="text"
                    value={bike}
                    onChange={(e) => setBike(e.target.value)}
                    placeholder="Наприклад: Yamaha R1"
                    className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-red-400"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Ім’я
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="Введіть ваше ім’я"
                    className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-red-400"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Телефон
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    placeholder="+380..."
                    className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-red-400"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Місто
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Ваше місто"
                    className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-red-400"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Коментар
                  </label>
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows={4}
                    placeholder="Додаткові побажання"
                    className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-red-400"
                  />
                </div>

                <button
                  type="submit"
                  className="rounded-2xl bg-red-600 px-6 py-3 font-semibold text-white shadow-lg transition hover:bg-red-700"
                >
                  Підтвердити замовлення
                </button>

                {submitted && (
                  <div className="rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
                    Замовлення успішно збережено.
                  </div>
                )}
              </div>
            </form>

            <section className="rounded-[28px] border border-white/50 bg-white/90 p-6 shadow-lg">
              <div className="mb-5 flex items-center justify-between gap-4">
                <h2 className="text-2xl font-bold text-gray-900">
                  Історія замовлень
                </h2>
                <span className="rounded-full bg-sky-100 px-3 py-1 text-sm font-semibold text-sky-700">
                  {orders.length}
                </span>
              </div>

              {orders.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-gray-200 bg-gray-50 p-6 text-gray-500">
                  Поки що замовлень немає.
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order, index) => (
                    <article
                      key={`${order.createdAt}-${index}`}
                      className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <h3 className="text-lg font-bold text-gray-900">
                            {order.bike || "Без вказаної моделі"}
                          </h3>
                          <p className="mt-1 text-sm text-gray-500">
                            {order.createdAt}
                          </p>
                        </div>

                        <span className="rounded-full bg-red-50 px-3 py-1 text-sm font-semibold text-red-600">
                          Нове
                        </span>
                      </div>

                      <div className="mt-4 grid gap-2 text-sm text-gray-700">
                        <p>
                          <span className="font-semibold">Ім’я:</span> {order.name}
                        </p>
                        <p>
                          <span className="font-semibold">Телефон:</span> {order.phone}
                        </p>
                        <p>
                          <span className="font-semibold">Місто:</span> {order.city || "—"}
                        </p>
                        <p>
                          <span className="font-semibold">Коментар:</span> {order.comment || "—"}
                        </p>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </section>
          </div>
        </section>
      </div>
    </main>
  );
}