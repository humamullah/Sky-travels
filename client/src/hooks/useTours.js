import { useMemo } from 'react';
import tours from '../data/tours';

export function useTours(params = {}) {
  const { category, featured, limit } = params;

  const filtered = useMemo(() => {
    let result = [...tours];

    if (category) {
      result = result.filter((t) => t.category === category);
    }
    if (featured) {
      result = result.filter((t) => t.featured === true);
    }
    if (limit) {
      result = result.slice(0, limit);
    }

    return result;
  }, [category, featured, limit]);

  return { data: filtered };
}

export function useTour(slug) {
  const tour = useMemo(() => tours.find((t) => t.slug === slug), [slug]);
  return { data: tour };
}
