"use client";

import { useCurrency } from "../context/CurrencyContext";

type PriceTagProps = {
  price: string;
  className?: string;
};

export default function PriceTag({
  price,
  className = "",
}: PriceTagProps) {
  const { formatPrice } = useCurrency();

  return <p className={className}>{formatPrice(price)}</p>;
}