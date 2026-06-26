import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import DestinationCard from '../components/DestinationCard';
import SearchBar from '../components/SearchBar';
import { useDestinations } from '../hooks/useDestinations';
import { regions, types, budgetRanges } from '../data/destinations';
import { Mountain, Leaf, Star, Search, X } from 'lucide-react';

export default function Destinations() {
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get('search') || '';
  const region = searchParams.get('region') || '';
  const type = searchParams.get('type') || '';
  const budget = searchParams.get('budget') || '';

  const params = {};
  if (search) params.search = search;
  if (region) params.region = region;
  if (type) params.type = type;
  if (budget) params.budget = budget;

  const { data } = useDestinations(params);
  const destinations = data?.data || [];
  const total = data?.total || 0;

  const updateFilter = (key, value) => {
    const next = new URLSearchParams(searchParams);
    if (value) next.set(key, value);
    else next.delete(key);
    setSearchParams(next);
  };

  const clearFilters = () => setSearchParams({});

  const hasFilters = search || region || type || budget;

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-primary-900 to-slate-900 text-white pt-24 md:pt-32 pb-16 md:pb-24">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1920')] bg-cover bg-center opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/60 to-slate-900" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Explore Pakistan</h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto mb-8">
            Discover breathtaking destinations across Pakistan — from the towering peaks of the north
            to the vibrant cities of the south, curated by Star Walkers Tours & Travel
          </p>
          <div className="max-w-xl mx-auto">
            <SearchBar
              placeholder="Search destinations in Pakistan..."
              onSearch={(q) => updateFilter('search', q)}
            />
          </div>
          <div className="flex flex-wrap justify-center gap-3 mt-8 text-sm text-slate-400">
            <span className="flex items-center gap-1.5"><Mountain className="w-4 h-4" /> {total} Destinations</span>
            <span className="flex items-center gap-1.5"><Leaf className="w-4 h-4" /> 6 Regions</span>
            <span className="flex items-center gap-1.5"><Star className="w-4 h-4" /> Curated by Star Walkers</span>
          </div>
        </div>
      </section>

      <section className="py-8 md:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8">
            <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Filter by:</span>

            <div className="flex flex-wrap gap-2">
              {regions.map((r) => (
                <button
                  key={r.value}
                  onClick={() => updateFilter('region', r.value)}
                  className={`px-4 py-1.5 rounded-xl text-sm font-medium transition-all ${
                    region === r.value
                      ? 'bg-primary-600 text-white shadow-md'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
              {types.map((t) => (
                <button
                  key={t.value}
                  onClick={() => updateFilter('type', t.value)}
                  className={`px-4 py-1.5 rounded-xl text-sm font-medium transition-all ${
                    type === t.value
                      ? 'bg-primary-600 text-white shadow-md'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            <select
              value={budget}
              onChange={(e) => updateFilter('budget', e.target.value)}
              className="px-4 py-1.5 rounded-xl text-sm font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-0 outline-none cursor-pointer"
            >
              {budgetRanges.map((b) => (
                <option key={b.value} value={b.value}>{b.label}</option>
              ))}
            </select>

            {hasFilters && (
              <button
                onClick={clearFilters}
                className="px-4 py-1.5 rounded-xl text-sm font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-all"
              >
                <X className="w-3.5 h-3.5" /> Clear
              </button>
            )}
          </div>

          {destinations.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                {destinations.map((d) => (
                  <DestinationCard key={d._id} destination={d} />
                ))}
              </div>
              <div className="mt-10 text-center text-sm text-slate-500 dark:text-slate-400">
                Showing <strong>{destinations.length}</strong> of <strong>{total}</strong> destinations{hasFilters && ' matching your filters'}
              </div>
            </>
          ) : (
            <div className="text-center py-20">
              <Search className="w-12 h-12 text-slate-300 dark:text-slate-600" />
              <h3 className="text-xl font-bold mt-4 mb-2 text-slate-900 dark:text-white">No destinations found</h3>
              <p className="text-slate-500 dark:text-slate-400 mb-6">
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
