import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import TourCard from '../components/TourCard';
import { useTours } from '../hooks/useTours';
import { tourCategories } from '../data/tours';
import { Search, X, Sparkles } from 'lucide-react';

export default function Tours() {
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get('category') || '';
  const destinationFilter = searchParams.get('destination') || '';
  const [search, setSearch] = useState('');

  const { data: tours } = useTours(category ? { category } : {});

  let filtered = tours;
  if (destinationFilter) {
    filtered = filtered.filter((t) =>
      t.name.toLowerCase().includes(destinationFilter.toLowerCase()) ||
      t.highlights?.some((h) => h.toLowerCase().includes(destinationFilter.toLowerCase()))
    );
  }

  const displayTours = search
    ? filtered.filter((t) => t.name.toLowerCase().includes(search.toLowerCase()))
    : filtered;

  const clearFilters = () => {
    setSearchParams({});
    setSearch('');
  };

  const hasFilters = category || search || destinationFilter;

  return (
    <>
      {/* Header */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white pt-24 md:pt-32 pb-16 md:pb-24">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1920')] bg-cover bg-center opacity-10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-sm text-sm text-white/90 mb-6 font-medium">
            <Sparkles className="w-4 h-4" /> Curated Just For You
          </div>
          <h1 className="font-heading text-4xl md:text-5xl font-extrabold mb-4">Tour Packages</h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto mb-8">
            Explore Pakistan with our expertly crafted tour packages — from the mountains of the north
            to the valleys of KPK, we have the perfect trip for you
          </p>
          <div className="max-w-md mx-auto relative">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search tours..."
              className="w-full px-5 py-3 pl-12 rounded-xl bg-white/15 backdrop-blur-sm border border-white/20 text-white placeholder-white/50 outline-none focus:ring-2 focus:ring-white/40 transition-all"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
          </div>
        </div>
      </section>

      {/* Tours Grid */}
      <section className="py-10 md:py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filters */}
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <span className="text-sm font-medium text-slate-500">Filter:</span>
            {tourCategories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => {
                  const next = new URLSearchParams(searchParams);
                  if (cat.value) next.set('category', cat.value);
                  else next.delete('category');
                  setSearchParams(next);
                }}
                className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                  category === cat.value
                    ? 'bg-primary-600 text-white shadow-md'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
            {hasFilters && (
              <button
                onClick={clearFilters}
                className="px-4 py-1.5 rounded-lg text-sm font-semibold text-red-600 hover:bg-red-50 transition-all inline-flex items-center gap-1"
              >
                <X className="w-3.5 h-3.5" /> Clear
              </button>
            )}
          </div>

          {/* Grid */}
          {displayTours.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayTours.map((tour) => (
                  <TourCard key={tour._id} tour={tour} />
                ))}
              </div>
              <div className="mt-10 text-center text-sm text-slate-500">
                Showing <strong>{displayTours.length}</strong> tour{displayTours.length !== 1 ? 's' : ''}
                {hasFilters && ' matching your filters'}
              </div>
            </>
          ) : (
            <div className="text-center py-20 bg-white rounded-2xl border border-slate-200">
              <Search className="w-12 h-12 text-slate-300 mx-auto" />
              <h3 className="font-heading text-xl font-bold mt-4 mb-2 text-slate-900">No tours found</h3>
              <p className="text-slate-500 mb-6">
                Try adjusting your filters or search query
              </p>
              <button onClick={clearFilters} className="btn-primary">
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
