import { useState } from 'react';
import { X } from 'lucide-react';

export default function PhotoGallery({ images = [] }) {
  const [selected, setSelected] = useState(null);

  if (!images || images.length === 0) return null;

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
        {images.slice(0, 5).map((img, i) => {
          const url = typeof img === 'string' ? img : img.url;
          const isSpan = i === 0;
          return (
            <button
              key={i}
              onClick={() => setSelected(url)}
              className={`relative overflow-hidden rounded-xl group ${
                isSpan ? 'col-span-2 row-span-2' : ''
              }`}
            >
              <img
                src={url}
                alt={`Gallery ${i + 1}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 min-h-[120px]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              {i === 4 && images.length > 5 && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">+{images.length - 5}</span>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {selected && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setSelected(null)}
        >
          <button
            onClick={() => setSelected(null)}
            className="absolute top-4 right-4 text-white/80 hover:text-white z-10"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={selected}
            alt="Full size"
            className="max-w-full max-h-[90vh] object-contain rounded-2xl"
          />
        </div>
      )}
    </>
  );
}
