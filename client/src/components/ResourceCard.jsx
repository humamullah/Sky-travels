import { useState } from 'react';
import { Backpack, ShieldCheck, BookOpen, HelpCircle, ClipboardList, MapPin, CheckSquare, Square } from 'lucide-react';

const typeIcons = {
  'packing-list': Backpack,
  'safety-tip': ShieldCheck,
  'travel-guide': BookOpen,
  faq: HelpCircle,
  itinerary: ClipboardList,
};

const typeColors = {
  'packing-list': 'border-l-blue-500 bg-blue-50 dark:bg-blue-900/10',
  'safety-tip': 'border-l-green-500 bg-green-50 dark:bg-green-900/10',
  'travel-guide': 'border-l-purple-500 bg-purple-50 dark:bg-purple-900/10',
  faq: 'border-l-amber-500 bg-amber-50 dark:bg-amber-900/10',
  itinerary: 'border-l-rose-500 bg-rose-50 dark:bg-rose-900/10',
};

export default function ResourceCard({ resource }) {
  const { type, title, content, items } = resource;
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={`rounded-xl border-l-4 p-5 ${typeColors[type] || 'border-l-slate-500 bg-slate-50 dark:bg-slate-800/50'} border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow`}
    >
      <div className="flex items-start gap-3 mb-3">
        <span className="w-8 h-8 flex items-center justify-center">{(() => { const Icon = typeIcons[type] || MapPin; return <Icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />; })()}</span>
        <div>
          <h3 className="font-bold text-slate-900 dark:text-white">{title}</h3>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium capitalize">
            {type.replace('-', ' ')}
          </span>
        </div>
      </div>

      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-3">
        {expanded ? content : content?.substring(0, 150)}
        {content?.length > 150 && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="ml-1 text-primary-600 dark:text-primary-400 hover:underline font-medium"
          >
            {expanded ? 'Show less' : 'Read more'}
          </button>
        )}
      </p>

      {items && items.length > 0 && (
        <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-700">
          <ul className="space-y-1.5">
            {items.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm">
                <span className="mt-0.5 text-green-500 flex-shrink-0">
                  {item.optional ? <Square className="w-4 h-4" /> : <CheckSquare className="w-4 h-4 text-green-500" />}
                </span>
                <div>
                  <span className="text-slate-800 dark:text-slate-200 font-medium">{item.label}</span>
                  {item.description && (
                    <span className="text-slate-500 dark:text-slate-400 ml-1">— {item.description}</span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
