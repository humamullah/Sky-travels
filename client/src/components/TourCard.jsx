import { Link } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';

export default function TourCard({ tour }) {
  const {
    name, slug, duration, dates, price, highlights, includes, image,
  } = tour;

  const displayPrice = price?.perPerson || 'Contact for Price';
  const displayDate = dates || 'Flexible';

  const features = includes || highlights || [];

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:-translate-y-1 transition-all duration-300 flex flex-col border border-slate-100">
      {/* Image */}
      <div className="relative h-56 overflow-hidden flex-shrink-0 m-2 rounded-xl">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
      </div>

      {/* Content */}
      <div className="px-5 pb-5 flex flex-col flex-1">
        {/* Title */}
        <h3 className="font-heading text-[17px] font-bold text-slate-900 leading-snug mb-2.5">
          {name}
        </h3>

        {/* Features as comma-separated text */}
        {features.length > 0 && (
          <p className="text-sm text-slate-500 leading-relaxed mb-4">
            {features.slice(0, 4).join(', ')}
          </p>
        )}

        {/* Price & Date Row */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-lg font-extrabold text-slate-900">
            {displayPrice}
          </p>
          <p className="text-sm text-slate-500 font-medium">
            Date | {displayDate}
          </p>
        </div>

        {/* Button Group */}
        <div className="flex flex-col gap-2.5 mt-auto">
          <Link
            to={`/tours/${slug}`}
            className="w-full text-center py-2.5 px-4 rounded-lg border border-slate-300 text-slate-700 font-semibold text-sm hover:bg-slate-50 transition-all"
          >
            View Details
          </Link>
          <a
            href={`https://wa.me/923369169265?text=Hi, I'm interested in the ${name} tour package.`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-[#25D366] hover:bg-[#20BD5A] text-white font-semibold text-sm transition-all shadow-sm"
          >
            <MessageCircle className="w-4 h-4" />
            Book via WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
