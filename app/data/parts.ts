export type Part = {
  name: string;
  category: string;
  price: string;
  image: string;
  slug: string;
  description: string;
  brand: string;
  compatibility: string;
};

export const parts: Part[] = [
  {
    name: "Pirelli Diablo Rosso IV",
    category: "Шини",
    price: "$450",
    image:
      "https://images.unsplash.com/photo-1558980394-0c66c7b1d5a9?auto=format&fit=crop&w=1200&q=80",
    slug: "pirelli-diablo-rosso-iv",
    description:
      "Преміальні спортивні шини з відмінним зчепленням, стабільністю та впевненістю на високій швидкості.",
    brand: "Pirelli",
    compatibility: "Sport / Superbike",
  },
  {
    name: "Michelin Power 6",
    category: "Шини",
    price: "$430",
    image:
      "https://images.unsplash.com/photo-1517846693594-1567da72af75?auto=format&fit=crop&w=1200&q=80",
    slug: "michelin-power-6",
    description:
      "Сучасні спортивні шини для щоденного використання та активної їзди з чудовим балансом комфорту і контролю.",
    brand: "Michelin",
    compatibility: "Street / Sport",
  },
  {
    name: "Yamaha R1 Engine Block",
    category: "Двигуни",
    price: "$3200",
    image:
      "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=1200&q=80",
    slug: "yamaha-r1-engine-block",
    description:
      "Оригінальний двигун для Yamaha R1 з високою продуктивністю та надійністю для спортивного використання.",
    brand: "Yamaha",
    compatibility: "Yamaha R1",
  },
  {
    name: "Kawasaki ZX-10R Motor",
    category: "Двигуни",
    price: "$3400",
    image:
      "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=1200&q=80",
    slug: "kawasaki-zx10r-motor",
    description:
      "Потужний мотор для Kawasaki ZX-10R, створений для тих, хто цінує швидкість, тягу та стабільну роботу.",
    brand: "Kawasaki",
    compatibility: "ZX-10R",
  },
  {
    name: "Brembo Brake Kit",
    category: "Гальма",
    price: "$900",
    image:
      "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80",
    slug: "brembo-brake-kit",
    description:
      "Преміальна гальмівна система для впевненого гальмування, чіткої реакції та максимальної безпеки.",
    brand: "Brembo",
    compatibility: "Universal Sportbike",
  },
  {
    name: "Galfer Wave Discs",
    category: "Гальма",
    price: "$620",
    image:
      "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1200&q=80",
    slug: "galfer-wave-discs",
    description:
      "Хвилясті гальмівні диски з покращеним охолодженням та ефективністю при інтенсивному навантаженні.",
    brand: "Galfer",
    compatibility: "Multiple models",
  },
  {
    name: "DID Racing Chain",
    category: "Трансмісія",
    price: "$250",
    image:
      "https://images.unsplash.com/photo-1609630875705-3c9d9dcb12f7?auto=format&fit=crop&w=1200&q=80",
    slug: "did-racing-chain",
    description:
      "Надійний гоночний ланцюг з високим ресурсом і стабільною передачею потужності.",
    brand: "DID",
    compatibility: "Sport / Racing",
  },
  {
    name: "Renthal Rear Sprocket",
    category: "Трансмісія",
    price: "$140",
    image:
      "https://images.unsplash.com/photo-1622185135505-2d7958936d67?auto=format&fit=crop&w=1200&q=80",
    slug: "renthal-rear-sprocket",
    description:
      "Легка та міцна задня зірка для покращення роботи трансмісії й більш точного відгуку.",
    brand: "Renthal",
    compatibility: "Universal Sportbike",
  },
  {
    name: "Akrapovic Slip-On Exhaust",
    category: "Вихлоп",
    price: "$1100",
    image:
      "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1200&q=80",
    slug: "akrapovic-slip-on-exhaust",
    description:
      "Преміальна вихлопна система з яскравим звучанням, меншою вагою та спортивним стилем.",
    brand: "Akrapovic",
    compatibility: "Multiple models",
  },
  {
    name: "SC-Project CR-T Exhaust",
    category: "Вихлоп",
    price: "$980",
    image:
      "https://images.unsplash.com/photo-1603386329225-868f9b1ee6b1?auto=format&fit=crop&w=1200&q=80",
    slug: "sc-project-crt-exhaust",
    description:
      "Компактний спортивний вихлоп для тих, хто хоче максимум стилю, звуку та характеру.",
    brand: "SC-Project",
    compatibility: "Street / Sport",
  },
  {
    name: "Öhlins Front Fork Kit",
    category: "Підвіска",
    price: "$1800",
    image:
      "https://images.unsplash.com/photo-1611241443709-0f7f0f6f7b2f?auto=format&fit=crop&w=1200&q=80",
    slug: "ohlins-front-fork-kit",
    description:
      "Професійний комплект підвіски для стабільності, точності входу в поворот і повного контролю.",
    brand: "Öhlins",
    compatibility: "Superbike / Racing",
  },
  {
    name: "K&N Performance Air Filter",
    category: "Фільтри",
    price: "$95",
    image:
      "https://images.unsplash.com/photo-1605559424843-9e4c228bf1b2?auto=format&fit=crop&w=1200&q=80",
    slug: "kn-performance-air-filter",
    description:
      "Продуктивний повітряний фільтр для кращого потоку повітря та стабільної роботи двигуна.",
    brand: "K&N",
    compatibility: "Universal",
  },
];