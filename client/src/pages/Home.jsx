import { Link } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import DestinationCarousel from '../components/DestinationCarousel';
import TourCard from '../components/TourCard';
import { useTours } from '../hooks/useTours';
import { Sparkles, Map, MessageCircle } from 'lucide-react';

export default function Home() {
  const { data: tourData } = useTours({ featured: true, limit: 6 });
  const tours = tourData || [];

  return (
    <>
      <HeroSection />
      <DestinationCarousel />

      {/* Popular KPK Tours */}
      <section className="py-16 md:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-50 text-primary-600 text-sm font-bold mb-4">
              <Sparkles className="w-4 h-4" />
              Featured Packages
            </div>
            <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-primary-600 uppercase tracking-tight">
              Popular KPK Tours
            </h2>
            <p className="text-slate-500 mt-3 max-w-xl mx-auto">
              Handpicked tour packages for unforgettable experiences across Khyber Pakhtunkhwa
            </p>
          </div>

          {tours.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {tours.map((tour) => (
                <TourCard key={tour._id} tour={tour} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
              <Map className="w-10 h-10 text-slate-300 mx-auto" />
              <p className="mt-4 text-slate-500">Tour packages loading...</p>
            </div>
          )}

          <div className="mt-10 text-center">
            <Link
              to="/tours"
              className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 px-8 rounded-lg transition-all shadow-lg shadow-primary-600/20"
            >
              View All Packages
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-primary-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-white mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-primary-100 text-lg max-w-2xl mx-auto mb-8">
            Let Star Walkers Tours & Travel plan your perfect trip. Our experts are here to help you every step of the way.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://wa.me/923369169265"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold py-3 px-8 rounded-lg transition-all shadow-lg shadow-[#25D366]/30"
            >
              <MessageCircle className="w-5 h-5" />
              <div className="flex flex-col leading-tight">
                <span className="text-[10px] font-semibold opacity-90">Book Now</span>
                <span className="text-sm font-bold">+92 336 9169265</span>
              </div>
            </a>
            <Link
              to="/tours"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold py-3 px-8 rounded-lg border border-white/20 transition-all"
            >
              View Tour Packages
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
