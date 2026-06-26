import { Link } from 'react-router-dom';
import { Handshake, Star, Heart, Sprout, Globe } from 'lucide-react';

export default function About() {
  const stats = [
    { label: 'Destinations', value: '500+' },
    { label: 'Happy Travelers', value: '10k+' },
    { label: 'Years Experience', value: '8+' },
    { label: 'Expert Guides', value: '50+' },
  ];

  const values = [
    { icon: Handshake, title: 'Trust', desc: 'We build lasting relationships through transparency and reliable service.' },
    { icon: Star, title: 'Excellence', desc: 'Every detail matters. We strive for perfection in every itinerary.' },
    { icon: Heart, title: 'Passion', desc: 'Our love for travel drives us to create extraordinary experiences.' },
    { icon: Sprout, title: 'Sustainability', desc: 'We promote responsible travel that respects nature and local cultures.' },
  ];

  return (
    <>
      <section className="bg-gradient-to-br from-slate-900 via-primary-900 to-slate-900 text-white pt-24 md:pt-32 pb-16 md:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Star Walkers Tours & Travel</h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            Learn about our story, mission, and the passionate team behind your travel experiences.
          </p>
        </div>
      </section>

      <section className="-mt-10 relative z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 md:p-8 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-lg">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-2xl md:text-3xl font-extrabold text-primary-600 dark:text-primary-400">{s.value}</div>
                <div className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Story</h2>
              <div className="space-y-4 text-slate-600 dark:text-slate-400 leading-relaxed">
                <p>
                  Founded with a passion for exploration, <strong>Star Walkers Tours & Travel</strong> has been helping travelers
                  discover Pakistan's most beautiful destinations since 2015. What started as a small team of
                  travel enthusiasts has grown into a trusted tour operator serving thousands of happy travelers.
                </p>
                <p>
                  We believe that travel is more than just visiting new places — it's about creating connections,
                  experiencing different cultures, and making memories that last a lifetime. Every itinerary we
                  craft is designed with care, attention to detail, and a deep understanding of what makes a
                  journey truly special.
                </p>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 min-h-[300px] flex items-center justify-center">
              <Globe className="w-20 h-20 text-primary-600/30 dark:text-primary-400/30" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-slate-50 dark:bg-slate-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Our Values</h2>
          <p className="text-slate-500 dark:text-slate-400 text-center max-w-2xl mx-auto mb-12">
            These core principles guide everything we do at Star Walkers Tours & Travel.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <div key={v.title} className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center hover:shadow-md transition-shadow">
                <v.icon className="w-9 h-9 text-primary-600 dark:text-primary-400" />
                <h3 className="text-lg font-bold mt-4 mb-2">{v.title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Explore?</h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto mb-8">
            Let Star Walkers Tours & Travel help you plan your next adventure. Browse our tours or get in touch with our team.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/destinations" className="btn-primary">Explore Destinations</Link>
            <Link to="/resources" className="px-6 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
              Travel Resources
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
