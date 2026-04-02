"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type OrderItem = {
  id: string;
  bike: string;
  name: string;
  phone: string;
  email: string;
  city: string;
  comment: string;
  status: string;
  orderNumber: string;
  createdAt: string;
};

export default function OrdersPage() {
  const searchParams = useSearchParams();
  const bikeFromUrl = searchParams.get("bike") || "Обрана модель";

  const [form, setForm] = useState({
    bike: bikeFromUrl,
    name: "",
    phone: "",
    email: "",
    city: "",
    comment: "",
    agree: false,
  });

  const [orders, setOrders] = useState<OrderItem[]>([]);

  useEffect(() => {
    const savedOrders = localStorage.getItem("ridx-orders");
    if (savedOrders) {
      try {
        const parsedOrders: OrderItem[] = JSON.parse(savedOrders);
        setOrders(parsedOrders);
      } catch {
        localStorage.removeItem("ridx-orders");
      }
    }
  }, []);

  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      bike: bikeFromUrl,
    }));
  }, [bikeFromUrl]);

  const saveOrders = (newOrders: OrderItem[]) => {
    setOrders(newOrders);
    localStorage.setItem("ridx-orders", JSON.stringify(newOrders));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const target = e.target as HTMLInputElement;
      setForm((prev) => ({
        ...prev,
        [name]: target.checked,
      }));
      return;
    }

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const generateOrderNumber = () => {
    return `RX-${Math.floor(100000 + Math.random() * 900000)}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.phone) {
      alert("Будь ласка, заповніть обов’язкові поля: ім’я та телефон.");
      return;
    }

    if (!form.agree) {
      alert("Будь ласка, підтвердіть згоду на обробку персональних даних.");
      return;
    }

    const newOrder: OrderItem = {
      id: crypto.randomUUID(),
      bike: form.bike,
      name: form.name,
      phone: form.phone,
      email: form.email || "Не вказано",
      city: form.city || "Не вказано",
      comment: form.comment || "Без коментаря",
      status: "Заявку прийнято",
      orderNumber: generateOrderNumber(),
      createdAt: new Date().toLocaleString("uk-UA"),
    };

    const updatedOrders = [newOrder, ...orders];
    saveOrders(updatedOrders);

    setForm({
      bike: bikeFromUrl,
      name: "",
      phone: "",
      email: "",
      city: "",
      comment: "",
      agree: false,
    });
  };

  const deleteOrder = (id: string) => {
    const updatedOrders = orders.filter((order) => order.id !== id);
    saveOrders(updatedOrders);
  };

  const clearAllOrders = () => {
    saveOrders([]);
  };

  return (
    <main className="min-h-screen relative overflow-hidden px-4 py-6 md:px-8 md:py-10">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-white via-sky-100 to-blue-200" />
      <div className="absolute -top-20 -left-20 -z-10 h-72 w-72 rounded-full bg-blue-300/30 blur-3xl" />
      <div className="absolute top-40 right-0 -z-10 h-80 w-80 rounded-full bg-sky-200/40 blur-3xl" />
      <div className="absolute bottom-0 left-1/3 -z-10 h-72 w-72 rounded-full bg-cyan-100/40 blur-3xl" />

      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex flex-wrap items-center gap-3 text-sm text-gray-600">
          <Link href="/" className="transition hover:text-red-600">
            Головна
          </Link>
          <span>→</span>
          <Link href="/catalog" className="transition hover:text-red-600">
            Каталог
          </Link>
          <span>→</span>
          <span className="font-semibold text-gray-900">Замовлення</span>
        </div>

        <section className="mb-8 overflow-hidden rounded-[32px] border border-white/50 bg-white/70 p-8 shadow-2xl backdrop-blur-md md:p-10">
          <div className="grid items-center gap-8 lg:grid-cols-2">
            <div>
              <p className="mb-4 inline-flex rounded-full border border-sky-200 bg-white/80 px-4 py-1 text-sm font-medium text-sky-700 shadow-sm">
                Order form
              </p>

              <h1 className="text-4xl font-black leading-tight text-gray-900 md:text-5xl">
                Оформлення
                <span className="block bg-gradient-to-r from-sky-600 to-blue-500 bg-clip-text text-transparent">
                  замовлення
                </span>
              </h1>

              <p className="mt-5 max-w-xl text-base leading-7 text-gray-700 md:text-lg">
                Заповни форму нижче, і заявка одразу з’явиться в історії замовлень.
              </p>
            </div>

            <div className="rounded-[28px] border border-white/50 bg-gradient-to-br from-white to-sky-100 p-6 shadow-xl">
              <p className="text-sm font-medium text-gray-500">Обрана модель</p>
              <h2 className="mt-2 text-3xl font-bold text-gray-900">
                {form.bike}
              </h2>
            </div>
          </div>
        </section>

        {orders.length > 0 && (
          <section className="mb-8 rounded-[32px] border border-white/50 bg-white/80 p-8 shadow-2xl backdrop-blur-md md:p-10">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-3xl font-black text-gray-900">
                  Історія замовлень
                </h2>
                <p className="mt-2 text-gray-600">
                  Усього заявок: <span className="font-bold">{orders.length}</span>
                </p>
              </div>

              <button
                onClick={clearAllOrders}
                className="rounded-xl border border-red-200 bg-red-50 px-5 py-3 font-semibold text-red-600 transition hover:bg-red-100"
              >
                Очистити всі
              </button>
            </div>

            <div className="space-y-5">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="rounded-[28px] border border-white/50 bg-blue-50/70 p-6 shadow-md"
                >
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <p className="inline-flex rounded-full bg-green-100 px-4 py-1 text-sm font-semibold text-green-700">
                        ✅ {order.status}
                      </p>
                      <h3 className="mt-3 text-2xl font-bold text-gray-900">
                        {order.bike}
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Номер: <span className="font-semibold">{order.orderNumber}</span>
                      </p>
                      <p className="text-sm text-gray-500">
                        Створено: {order.createdAt}
                      </p>
                    </div>

                    <button
                      onClick={() => deleteOrder(order.id)}
                      className="rounded-xl border border-gray-300 bg-white px-4 py-2 font-medium text-gray-800 transition hover:bg-gray-100"
                    >
                      Видалити
                    </button>
                  </div>

                  <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="rounded-2xl bg-white p-4 shadow-sm">
                      <p className="text-sm text-gray-500">Ім’я</p>
                      <p className="mt-1 font-semibold text-gray-900">{order.name}</p>
                    </div>

                    <div className="rounded-2xl bg-white p-4 shadow-sm">
                      <p className="text-sm text-gray-500">Телефон</p>
                      <p className="mt-1 font-semibold text-gray-900">{order.phone}</p>
                    </div>

                    <div className="rounded-2xl bg-white p-4 shadow-sm">
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="mt-1 font-semibold text-gray-900">{order.email}</p>
                    </div>

                    <div className="rounded-2xl bg-white p-4 shadow-sm">
                      <p className="text-sm text-gray-500">Місто</p>
                      <p className="mt-1 font-semibold text-gray-900">{order.city}</p>
                    </div>
                  </div>

                  <div className="mt-4 rounded-2xl bg-white p-4 shadow-sm">
                    <p className="text-sm text-gray-500">Коментар</p>
                    <p className="mt-1 font-semibold text-gray-900">{order.comment}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="overflow-hidden rounded-[32px] border border-white/50 bg-white/80 shadow-2xl backdrop-blur-md">
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="p-8 md:p-10">
              <div className="mb-6">
                <h2 className="text-3xl font-bold text-gray-900">
                  Заповни форму
                </h2>
                <p className="mt-2 text-gray-600">
                  Вкажи свої дані, щоб ми могли швидко обробити замовлення.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Мотоцикл
                  </label>
                  <input
                    type="text"
                    name="bike"
                    value={form.bike}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-blue-200 bg-gradient-to-r from-white to-sky-50 px-4 py-3 text-gray-800 outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Ім’я та прізвище *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Введіть ваше ім’я"
                      className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-sky-500"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Телефон *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+380..."
                      className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-sky-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="example@gmail.com"
                      className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-sky-500"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Місто
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={form.city}
                      onChange={handleChange}
                      placeholder="Ваше місто"
                      className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-sky-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Коментар
                  </label>
                  <textarea
                    name="comment"
                    value={form.comment}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Додаткові побажання..."
                    className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-sky-500"
                  />
                </div>

                <label className="flex items-start gap-3 rounded-2xl border border-white/50 bg-gradient-to-r from-white to-sky-50 p-4 shadow-sm">
                  <input
                    type="checkbox"
                    name="agree"
                    checked={form.agree}
                    onChange={handleChange}
                    className="mt-1 h-4 w-4 accent-sky-600"
                  />
                  <span className="text-sm text-gray-700">
                    Я погоджуюсь на обробку персональних даних.
                  </span>
                </label>

                <div className="flex flex-wrap gap-4 pt-2">
                  <button
                    type="submit"
                    className="inline-flex flex-1 items-center justify-center rounded-xl bg-gradient-to-r from-white to-sky-100 px-6 py-3 text-lg font-semibold text-gray-900 shadow-lg transition hover:from-sky-50 hover:to-blue-100"
                  >
                    Додати в історію замовлень
                  </button>

                  <Link
                    href="/catalog"
                    className="inline-flex flex-1 items-center justify-center rounded-xl border border-blue-200 bg-gradient-to-r from-white to-sky-100 px-6 py-3 text-lg font-semibold text-gray-900 shadow-lg transition hover:from-sky-50 hover:to-blue-100"
                  >
                    Назад до каталогу
                  </Link>
                </div>
              </form>
            </div>

            <div className="border-t border-white/40 bg-gradient-to-b from-sky-50 to-white p-8 lg:border-l lg:border-t-0 md:p-10">
              <h3 className="text-2xl font-bold text-gray-900">
                Чому варто замовити у нас?
              </h3>

              <div className="mt-6 space-y-4">
                <div className="rounded-2xl bg-white/80 p-5 shadow-md">
                  <p className="text-lg font-semibold text-sky-600">
                    ⚡ Швидке оформлення
                  </p>
                  <p className="mt-2 text-gray-600">
                    Заявка заповнюється всього за кілька хвилин.
                  </p>
                </div>

                <div className="rounded-2xl bg-white/80 p-5 shadow-md">
                  <p className="text-lg font-semibold text-sky-600">
                    📞 Оперативний зв’язок
                  </p>
                  <p className="mt-2 text-gray-600">
                    Ми швидко передзвонимо та уточнимо всі деталі.
                  </p>
                </div>

                <div className="rounded-2xl bg-white/80 p-5 shadow-md">
                  <p className="text-lg font-semibold text-sky-600">
                    🏍 Індивідуальний підбір
                  </p>
                  <p className="mt-2 text-gray-600">
                    Допоможемо підібрати модель під твій стиль і бюджет.
                  </p>
                </div>
              </div>

              <div className="mt-8 rounded-[24px] border border-blue-200 bg-gradient-to-r from-white to-sky-100 p-6 shadow-lg">
                <p className="text-sm text-gray-500">Потрібна консультація?</p>
                <p className="mt-2 text-xl font-bold text-gray-900">
                  Ми допоможемо обрати ідеальний мотоцикл
                </p>
                <Link
                  href="/catalog"
                  className="mt-5 inline-flex rounded-xl bg-gradient-to-r from-white to-sky-100 px-5 py-3 font-semibold text-gray-900 shadow-md transition hover:from-sky-50 hover:to-blue-100"
                >
                  Перейти в каталог
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}