import React, { useState } from 'react';
import ResourceCard from '../components/ResourceCard';
import { useResources } from '../hooks/useResources';
import { Backpack, ShieldCheck, BookOpen, HelpCircle, ClipboardList, BookOpen as BookOpenIcon } from 'lucide-react';

const resourceIcons = {
  'packing-list': Backpack,
  'safety-tip': ShieldCheck,
  'travel-guide': BookOpen,
  'faq': HelpCircle,
  'itinerary': ClipboardList,
};

const resourceTypes = [
  { value: '', label: 'All Resources', icon: null },
  { value: 'packing-list', label: 'Packing Lists', icon: 'packing-list' },
  { value: 'safety-tip', label: 'Safety Tips', icon: 'safety-tip' },
  { value: 'travel-guide', label: 'Travel Guides', icon: 'travel-guide' },
  { value: 'faq', label: 'FAQs', icon: 'faq' },
  { value: 'itinerary', label: 'Itineraries', icon: 'itinerary' },
];

export default function Resources() {
  const [type, setType] = useState('');
  const { data, isLoading } = useResources(type);
  const resources = data?.data || [];

  return (
    <>
      <section className="bg-gradient-to-br from-slate-900 via-primary-900 to-slate-900 text-white pt-24 md:pt-32 pb-16 md:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Travel Resources</h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            Everything you need to plan your perfect trip — packing lists, safety tips, guides, and more
          </p>
        </div>
      </section>

      <section className="py-10 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 mb-8">
            {resourceTypes.map((t) => (
              <button
                key={t.value}
                onClick={() => setType(t.value)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  type === t.value
                    ? 'bg-primary-600 text-white shadow-md'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {t.icon ? <span className="inline-flex items-center gap-1.5">{React.createElement(resourceIcons[t.icon], { className: 'w-4 h-4' })} {t.label}</span> : t.label}
              </button>
            ))}
          </div>

          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="rounded-xl bg-slate-100 dark:bg-slate-800 animate-pulse h-32" />
              ))}
            </div>
          ) : resources.length > 0 ? (
            <div className="space-y-4">
              {resources.map((r) => (
                <ResourceCard key={r._id} resource={r} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <BookOpenIcon className="w-12 h-12 text-slate-300 dark:text-slate-600" />
              <h3 className="text-xl font-bold mt-4 mb-2">No resources yet</h3>
              <p className="text-slate-500">Resources for this category are coming soon</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
