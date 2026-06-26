import { Link } from 'react-router-dom';

const highlights = [
  {
    icon: '🌍',
    title: 'Global Destinations',
    desc: 'Explore handpicked destinations across the globe with expert local guides.',
  },
  {
    icon: '🏨',
    title: 'Premium Stays',
    desc: 'Curated accommodations that blend comfort with authentic local experiences.',
  },
  {
    icon: '🚗',
    title: 'Seamless Travel',
    desc: 'End-to-end travel management from flights to ground transportation.',
  },
];

export default function Home() {
  return (
    <>
      <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-36">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Explore the World with{' '}
              <span className="text-accent-400">Atiq Travel</span>
            </h1>
            <p className="text-lg md:text-xl text-primary-100 mb-8 max-w-2xl">
              Discover breathtaking destinations, curated travel experiences, and
              personalized itineraries that make every journey unforgettable.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/destinations" className="btn-accent">
                Explore Destinations
              </Link>
              <Link
                to="/contact"
                className="border-2 border-white/30 hover:border-white/50 text-white font-medium py-2.5 px-6 rounded-lg transition-all"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-heading">Why Choose Atiq Travel?</h2>
          <p className="section-subheading">
            We go beyond booking tickets — we craft experiences that stay with you forever.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {highlights.map((item) => (
              <div
                key={item.title}
                className="p-8 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-shadow"
              >
                <span className="text-4xl">{item.icon}</span>
                <h3 className="text-xl font-semibold mt-4 mb-2">{item.title}</h3>
                <p className="text-slate-600 dark:text-slate-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50 dark:bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="section-heading">Ready for Your Next Adventure?</h2>
          <p className="section-subheading">
            Let us help you plan the perfect trip. Contact our team today.
          </p>
          <Link to="/contact" className="btn-primary inline-block">
            Start Planning
          </Link>
        </div>
      </section>
    </>
  );
}
