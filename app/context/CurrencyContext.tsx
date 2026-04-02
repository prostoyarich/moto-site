"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

type Currency = "USD" | "UAH";

type CurrencyContextType = {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  formatPrice: (price: string) => string;
};

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currency, setCurrency] = useState<Currency>("USD");

  useEffect(() => {
    const savedCurrency = localStorage.getItem("ridx-currency") as Currency | null;
    if (savedCurrency === "USD" || savedCurrency === "UAH") {
      setCurrency(savedCurrency);
    }
  }, []);

  const handleSetCurrency = (value: Currency) => {
    setCurrency(value);
    localStorage.setItem("ridx-currency", value);
  };

  const formatPrice = (price: string) => {
    const usd = Number(price.replace(/\$/g, "").replace(/\s/g, ""));
    const rate = 40;

    if (currency === "UAH") {
      return `${Math.round(usd * rate).toLocaleString("uk-UA")} грн`;
    }

    return `$${usd.toLocaleString("en-US")}`;
  };

  const value = useMemo(
    () => ({
      currency,
      setCurrency: handleSetCurrency,
      formatPrice,
    }),
    [currency]
  );

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);

  if (!context) {
    throw new Error("useCurrency must be used within CurrencyProvider");
  }

  return context;
}