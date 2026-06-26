const destinations = [
  {
    name: 'Paris, France',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600',
    desc: 'The City of Light awaits with its iconic Eiffel Tower, world-class cuisine, and romantic ambiance.',
    price: '$2,499',
  },
  {
    name: 'Bali, Indonesia',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600',
    desc: 'Tropical paradise with ancient temples, lush rice terraces, and pristine beaches.',
    price: '$1,899',
  },
  {
    name: 'Tokyo, Japan',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600',
    desc: 'A mesmerizing blend of ultra-modern technology and ancient traditions.',
    price: '$2,899',
  },
  {
    name: 'Santorini, Greece',
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=600',
    desc: 'White-washed buildings, stunning sunsets, and crystal-clear Aegean waters.',
    price: '$2,199',
  },
  {
    name: 'Dubai, UAE',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600',
    desc: 'Luxury shopping, futuristic architecture, and desert adventures await.',
    price: '$2,699',
  },
  {
    name: 'Maldives',
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=600',
    desc: 'Overwater bungalows, turquoise lagoons, and unparalleled marine life.',
    price: '$3,299',
  },
];

export default function Destinations() {
  return (
    <>
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Destinations</h1>
          <p className="text-primary-100 text-lg max-w-2xl mx-auto">
            Explore our handpicked selection of the world's most incredible destinations.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {destinations.map((dest) => (
              <div
                key={dest.name}
                className="rounded-xl overflow-hidden bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-shadow group"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={dest.image}
                    alt={dest.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold mb-2">{dest.name}</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
                    {dest.desc}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-primary-600 dark:text-primary-400 font-bold text-lg">
                      {dest.price}
                    </span>
                    <button className="text-sm font-medium text-primary-600 dark:text-primary-400 hover:underline">
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
