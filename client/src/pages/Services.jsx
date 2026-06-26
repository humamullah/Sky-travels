const services = [
  {
    icon: '✈️',
    title: 'Flight Booking',
    desc: 'Best deals on domestic and international flights with top airlines worldwide.',
  },
  {
    icon: '🏨',
    title: 'Hotel Reservations',
    desc: 'Curated selection of hotels, resorts, and boutique stays for every budget.',
  },
  {
    icon: '🚐',
    title: 'Transportation',
    desc: 'Airport transfers, car rentals, and private chauffeur services.',
  },
  {
    icon: '🗺️',
    title: 'Tour Packages',
    desc: 'All-inclusive tour packages with expert guides and handpicked itineraries.',
  },
  {
    icon: '📋',
    title: 'Visa Assistance',
    desc: 'Complete visa processing support for destinations around the world.',
  },
  {
    icon: '🎯',
    title: 'Custom Itineraries',
    desc: 'Personalized travel plans tailored to your preferences and budget.',
  },
];

export default function Services() {
  return (
    <>
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h1>
          <p className="text-primary-100 text-lg max-w-2xl mx-auto">
            Comprehensive travel solutions tailored to make your journey seamless and memorable.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div
                key={service.title}
                className="p-6 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-shadow"
              >
                <span className="text-4xl">{service.icon}</span>
                <h3 className="text-xl font-semibold mt-4 mb-2">{service.title}</h3>
                <p className="text-slate-600 dark:text-slate-400">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
