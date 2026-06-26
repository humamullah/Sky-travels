import { Link } from 'react-router-dom';
import { MapPin, Mountain, Leaf, Landmark, ScrollText, Star } from 'lucide-react';

const difficultyColors = {
  easy: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  moderate: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
  challenging: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
};

const regionColors = {
  north: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  central: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
  south: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
};

const typeIconMap = {
  adventure: Mountain,
  nature: Leaf,
  cultural: Landmark,
  historical: ScrollText,
};

export default function DestinationCard({ destination }) {
  const {
    _id, name, slug, location, region, type, shortDescription, description,
    category, difficulty, budgetRange, images, rating, featured, popular,
  } = destination;
  const imageUrl = images?.[0]?.url || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600';

  return (
    <Link
      to={`/destinations/${slug}`}
      className="group rounded-2xl overflow-hidden bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
    >
      <div className="relative h-52 overflow-hidden flex-shrink-0">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {featured && (
            <span className="px-2.5 py-1 rounded-lg bg-accent-500 text-slate-900 text-xs font-bold shadow">
              Featured
            </span>
          )}
          {popular && (
            <span className="px-2.5 py-1 rounded-lg bg-rose-500 text-white text-xs font-bold shadow">
              Popular
            </span>
          )}
          <span className="px-2.5 py-1 rounded-lg bg-white/90 backdrop-blur-sm text-slate-800 text-xs font-medium capitalize shadow">
            {category}
          </span>
        </div>

        <div className={`absolute top-3 right-3 px-2 py-1 rounded-lg text-xs font-semibold capitalize ${regionColors[region] || 'bg-white/90 text-slate-800'}`}>
          {region}
        </div>

        {rating > 0 && (
          <div className="absolute bottom-3 right-3 px-2 py-1 rounded-lg bg-black/50 backdrop-blur-sm text-white text-xs font-bold flex items-center gap-1">
            <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" /> {rating}
          </div>
        )}
      </div>

      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start gap-2 mb-1.5">
          <span className="flex-shrink-0 mt-0.5 w-5 h-5">{(() => { const Icon = typeIconMap[type] || MapPin; return <Icon className="w-5 h-5 text-primary-600 dark:text-primary-400" />; })()}</span>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors leading-tight">
              {name}
            </h3>
          </div>
        </div>

        <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mb-2.5">
          <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
          {location}
        </p>

        <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 mb-4 flex-1">
          {shortDescription || description?.substring(0, 120)}...
        </p>

        <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-700 mt-auto">
          <div className="flex items-center gap-2">
            {difficulty && (
              <span className={`px-2 py-0.5 rounded-md text-[11px] font-medium capitalize ${difficultyColors[difficulty]}`}>
                {difficulty}
              </span>
            )}
            <span className="text-[11px] capitalize text-slate-400 px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-700">
              {type}
            </span>
          </div>
          {budgetRange?.min > 0 && (
            <span className="text-sm font-bold text-primary-600 dark:text-primary-400">
              ${budgetRange.min.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
