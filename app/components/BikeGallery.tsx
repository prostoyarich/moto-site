"use client";

import { useState } from "react";

type BikeGalleryProps = {
  images: string[];
  alt: string;
};

export default function BikeGallery({ images, alt }: BikeGalleryProps) {
  const validImages = images.filter(Boolean);
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (validImages.length === 0) {
    return null;
  }

  const prevImage = () => {
    setSelectedIndex((prev) =>
      prev === 0 ? validImages.length - 1 : prev - 1
    );
  };

  const nextImage = () => {
    setSelectedIndex((prev) =>
      prev === validImages.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="relative overflow-hidden bg-white">
      <div className="relative overflow-hidden">
        <img
          src={validImages[selectedIndex]}
          alt={alt}
          className="h-full min-h-[340px] w-full object-cover transition duration-500 hover:scale-105"
        />

        {validImages.length > 1 && (
          <>
            <button
              type="button"
              onClick={prevImage}
              className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-xl font-bold text-gray-900 shadow-md backdrop-blur transition hover:bg-white"
            >
              ‹
            </button>

            <button
              type="button"
              onClick={nextImage}
              className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-xl font-bold text-gray-900 shadow-md backdrop-blur transition hover:bg-white"
            >
              ›
            </button>

            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2 rounded-full bg-black/25 px-3 py-1 backdrop-blur">
              {validImages.map((_, index) => (
                <span
                  key={index}
                  className={`h-2.5 w-2.5 rounded-full ${
                    selectedIndex === index ? "bg-white" : "bg-white/40"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {validImages.length > 1 && (
        <div className="grid grid-cols-4 gap-3 border-t border-gray-100 bg-white p-4">
          {validImages.map((image, index) => {
            const isActive = selectedIndex === index;

            return (
              <button
                key={`${image}-${index}`}
                type="button"
                onClick={() => setSelectedIndex(index)}
                className={`overflow-hidden rounded-2xl border-2 transition ${
                  isActive
                    ? "border-red-500 shadow-md"
                    : "border-transparent hover:border-gray-300"
                }`}
              >
                <img
                  src={image}
                  alt={`${alt} ${index + 1}`}
                  className="h-20 w-full object-cover"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}