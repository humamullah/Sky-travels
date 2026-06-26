import { useParams, Link } from 'react-router-dom';
import { MapPin, BookOpen, FolderOpen, Image, Sparkles, Star, Lightbulb, ShieldCheck, AlertTriangle, Car, Plane, Train, Wallet, ClipboardList, Frown, Globe } from 'lucide-react';
import { useDestination, useRelatedDestinations } from '../hooks/useDestinations';
import DestinationCard from '../components/DestinationCard';
import PhotoGallery from '../components/PhotoGallery';
import BudgetCalculator from '../components/BudgetCalculator';

const difficultyColors = {
  easy: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  moderate: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
  challenging: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
};

export default function DestinationDetail() {
  const { slug } = useParams();
  const { data, isLoading, error } = useDestination(slug);
  const { data: related } = useRelatedDestinations(slug, 3);
  const destination = data?.data;

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="animate-pulse space-y-6">
          <div className="h-80 md:h-[55vh] bg-slate-200 dark:bg-slate-700 rounded-2xl" />
          <div className="h-10 bg-slate-200 dark:bg-slate-700 rounded-lg w-1/2" />
          <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded-lg w-3/4" />
          <div className="grid grid-cols-2 gap-4">
            <div className="h-40 bg-slate-200 dark:bg-slate-700 rounded-xl" />
            <div className="h-40 bg-slate-200 dark:bg-slate-700 rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !destination) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-20 text-center">
        <Frown className="w-12 h-12 text-slate-300 dark:text-slate-600" />
        <h2 className="text-2xl font-bold mt-4 mb-2 text-slate-900 dark:text-white">Destination not found</h2>
        <p className="text-slate-500 mb-6">The destination you're looking for doesn't exist or has been removed.</p>
        <Link to="/destinations" className="btn-primary">Browse All Destinations</Link>
      </div>
    );
  }

  const {
    name, slug: destSlug, location, province, region, type, description,
    images, category, bestTime, difficulty, budgetRange,
    highlights, tips, safetyNotes, howToReach, rating, featured, popular, gallery,
  } = destination;

  const heroImage = images?.[0]?.url || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200';
  const galleryImages = gallery || images?.map((i) => i.url) || [];

  return (
    <>
      <div className="relative h-[45vh] md:h-[60vh] pt-20 overflow-hidden">
        <img src={heroImage} alt={name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-2 text-sm text-slate-300 mb-3">
              <Link to="/destinations" className="hover:text-white transition-colors">Destinations</Link>
              <span>/</span>
              <span className="text-white capitalize">{region}</span>
              <span>/</span>
              <span className="text-accent-400">{name}</span>
            </div>
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white">{name}</h1>
              {featured && (
                <span className="px-3 py-1 rounded-lg bg-accent-500 text-slate-900 text-sm font-bold">Featured</span>
              )}
              {popular && (
                <span className="px-3 py-1 rounded-lg bg-rose-500 text-white text-sm font-bold">Popular</span>
              )}
            </div>
            <p className="text-lg md:text-xl text-slate-300 flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              {location}{province ? `, ${province}` : ''}
              <span className="text-slate-500">|</span>
              <span className="capitalize">{type}</span>
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-12">
            <section>
              <h2 className="text-2xl md:text-3xl font-bold mb-4 flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-primary-600 dark:text-primary-400" /> Overview
              </h2>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed whitespace-pre-line text-base">
                {description}
              </p>
              <div className="flex flex-wrap gap-3 mt-5">
                <div className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-sm text-slate-600 dark:text-slate-400 capitalize flex items-center gap-1.5">
                  <Globe className="w-4 h-4 flex-shrink-0" /> Region: <strong className="text-slate-800 dark:text-slate-200">{region}</strong>
                </div>
                <div className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-sm text-slate-600 dark:text-slate-400 capitalize flex items-center gap-1.5">
                  <FolderOpen className="w-4 h-4 flex-shrink-0" /> Type: <strong className="text-slate-800 dark:text-slate-200">{type}</strong>
                </div>
                <div className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-sm text-slate-600 dark:text-slate-400 capitalize flex items-center gap-1.5">
                  <Star className="w-4 h-4 flex-shrink-0 fill-amber-400 text-amber-400" /> Rating: <strong className="text-slate-800 dark:text-slate-200">{rating} / 5</strong>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-bold mb-4 flex items-center gap-2">
                <Image className="w-6 h-6 text-primary-600 dark:text-primary-400" /> Photo Gallery
              </h2>
              <PhotoGallery images={galleryImages} />
            </section>

            {highlights && highlights.length > 0 && (
              <section>
                <h2 className="text-2xl md:text-3xl font-bold mb-4 flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-primary-600 dark:text-primary-400" /> Highlights
                </h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {highlights.map((h, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 hover:shadow-sm transition-shadow"
                    >
                      <Star className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary-600 dark:text-primary-400 fill-primary-600 dark:fill-primary-400" />
                      <span className="text-sm text-slate-700 dark:text-slate-300">{h}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {tips && tips.length > 0 && (
              <section>
                <h2 className="text-2xl md:text-3xl font-bold mb-4 flex items-center gap-2">
                  <Lightbulb className="w-6 h-6 text-primary-600 dark:text-primary-400" /> Travel Tips
                </h2>
                <div className="space-y-3">
                  {tips.map((t, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 p-4 rounded-xl bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-900/20"
                    >
                      <Lightbulb className="w-4 h-4 mt-0.5 flex-shrink-0 text-amber-500" />
                      <span className="text-sm text-amber-800 dark:text-amber-200">{t}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {safetyNotes && safetyNotes.length > 0 && (
              <section>
                <h2 className="text-2xl md:text-3xl font-bold mb-4 flex items-center gap-2">
                  <ShieldCheck className="w-6 h-6 text-primary-600 dark:text-primary-400" /> Safety Notes
                </h2>
                <div className="space-y-3">
                  {safetyNotes.map((s, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 p-4 rounded-xl bg-rose-50 dark:bg-rose-900/10 border border-rose-200 dark:border-rose-900/20"
                    >
                      <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0 text-rose-500" />
                      <span className="text-sm text-rose-800 dark:text-rose-200">{s}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {howToReach && (howToReach.byAir || howToReach.byRoad || howToReach.byTrain) && (
              <section>
                <h2 className="text-2xl md:text-3xl font-bold mb-4 flex items-center gap-2">
                  <Car className="w-6 h-6 text-primary-600 dark:text-primary-400" /> How to Reach
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {howToReach.byAir && (
                    <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                      <Plane className="w-7 h-7 text-primary-600 dark:text-primary-400" />
                      <h3 className="font-bold mt-3 mb-1.5 text-sm">By Air</h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{howToReach.byAir}</p>
                    </div>
                  )}
                  {howToReach.byRoad && (
                    <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                      <Car className="w-7 h-7 text-primary-600 dark:text-primary-400" />
                      <h3 className="font-bold mt-3 mb-1.5 text-sm">By Road</h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{howToReach.byRoad}</p>
                    </div>
                  )}
                  {howToReach.byTrain && (
                    <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                      <Train className="w-7 h-7 text-primary-600 dark:text-primary-400" />
                      <h3 className="font-bold mt-3 mb-1.5 text-sm">By Train</h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{howToReach.byTrain}</p>
                    </div>
                  )}
                </div>
              </section>
            )}

            <section className="lg:hidden">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 flex items-center gap-2">
                <Wallet className="w-6 h-6 text-primary-600 dark:text-primary-400" /> Budget Planner
              </h2>
              <BudgetCalculator budgetRange={budgetRange} />
            </section>
          </div>

          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 sticky top-24">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <ClipboardList className="w-5 h-5 text-primary-600 dark:text-primary-400" /> Quick Facts
              </h3>
              <div className="space-y-4 divide-y divide-slate-100 dark:divide-slate-700">
                <div className="flex items-center justify-between text-sm pb-3">
                  <span className="text-slate-500">Region</span>
                  <span className="font-medium capitalize text-slate-800 dark:text-slate-200">{region}</span>
                </div>
                <div className="flex items-center justify-between text-sm py-3">
                  <span className="text-slate-500">Type</span>
                  <span className="font-medium capitalize text-slate-800 dark:text-slate-200">{type}</span>
                </div>
                <div className="flex items-center justify-between text-sm py-3">
                  <span className="text-slate-500">Category</span>
                  <span className="font-medium capitalize text-slate-800 dark:text-slate-200">{category}</span>
                </div>
                {difficulty && (
                  <div className="flex items-center justify-between text-sm py-3">
                    <span className="text-slate-500">Difficulty</span>
                    <span className={`px-2 py-0.5 rounded-md text-xs font-medium capitalize ${difficultyColors[difficulty]}`}>
                      {difficulty}
                    </span>
                  </div>
                )}
                {bestTime && (
                  <div className="flex items-center justify-between text-sm py-3">
                    <span className="text-slate-500">Best Time</span>
                    <span className="font-medium text-right text-slate-800 dark:text-slate-200">{bestTime}</span>
                  </div>
                )}
                {budgetRange?.min > 0 && (
                  <div className="flex items-center justify-between text-sm pt-3">
                    <span className="text-slate-500">Budget Range</span>
                    <span className="font-bold text-primary-600 dark:text-primary-400">
                      ${budgetRange.min.toLocaleString()} — ${budgetRange.max.toLocaleString()}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="hidden lg:block">
              <BudgetCalculator budgetRange={budgetRange} />
            </div>
          </div>
        </div>

        {related && related.length > 0 && (
          <section className="mt-16 pt-12 border-t border-slate-200 dark:border-slate-700">
            <div className="flex items-end justify-between mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold">Similar Destinations</h2>
                <p className="text-slate-500 dark:text-slate-400 mt-1">
                  You might also like these places curated by Star Walkers Tours & Travel
                </p>
              </div>
              <Link
                to="/destinations"
                className="hidden md:inline-flex items-center gap-1 text-sm font-medium text-primary-600 dark:text-primary-400 hover:underline"
              >
                View all <span>→</span>
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((d) => (
                <DestinationCard key={d._id} destination={d} />
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
