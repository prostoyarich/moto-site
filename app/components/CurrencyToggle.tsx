"use client";

import { useCurrency } from "../context/CurrencyContext";

export default function CurrencyToggle() {
  const { currency, setCurrency } = useCurrency();

  return (
    <div className="flex items-center gap-2 rounded-xl border border-white/50 bg-white/80 p-1 shadow-sm backdrop-blur-md">
      <button
        onClick={() => setCurrency("USD")}
        className={`rounded-lg px-3 py-1.5 text-sm font-semibold transition ${
          currency === "USD"
            ? "bg-red-600 text-white shadow-sm"
            : "text-gray-700 hover:bg-white"
        }`}
      >
        $
      </button>

      <button
        onClick={() => setCurrency("UAH")}
        className={`rounded-lg px-3 py-1.5 text-sm font-semibold transition ${
          currency === "UAH"
            ? "bg-red-600 text-white shadow-sm"
            : "text-gray-700 hover:bg-white"
        }`}
      >
        грн
      </button>
    </div>
  );
}