import { useMemo } from 'react';
import sampleDestinations from '../data/destinations';

export const useDestinations = (params = {}) => {
  const filtered = useMemo(() => {
    let list = [...sampleDestinations];

    if (params.search) {
      const q = params.search.toLowerCase();
      list = list.filter(
        (d) =>
          d.name.toLowerCase().includes(q) ||
          d.location.toLowerCase().includes(q) ||
          d.description.toLowerCase().includes(q)
      );
    }
    if (params.region) {
      list = list.filter((d) => d.region === params.region);
    }
    if (params.type) {
      list = list.filter((d) => d.type === params.type);
    }
    if (params.category) {
      list = list.filter((d) => d.category === params.category);
    }
    if (params.difficulty) {
      list = list.filter((d) => d.difficulty === params.difficulty);
    }
    if (params.budget) {
      const [min, max] = params.budget.split('-').map(Number);
      list = list.filter((d) => {
        if (max) return d.budgetRange.min >= min && d.budgetRange.min <= max;
        return d.budgetRange.min >= min;
      });
    }
    if (params.featured === 'true') {
      list = list.filter((d) => d.featured);
    }
    if (params.limit) {
      list = list.slice(0, Number(params.limit));
    }

    return list;
  }, [params.search, params.region, params.type, params.category, params.difficulty, params.budget, params.featured, params.limit]);

  return {
    data: { data: filtered, total: sampleDestinations.length, count: filtered.length },
    isLoading: false,
    error: null,
  };
};

export const useDestination = (slug) => {
  const destination = useMemo(() => {
    if (!slug) return null;
    return sampleDestinations.find((d) => d.slug === slug) || null;
  }, [slug]);

  return {
    data: destination ? { data: destination } : null,
    isLoading: false,
    error: destination ? null : new Error('Not found'),
  };
};

export const useRelatedDestinations = (slug, limit = 3) => {
  const related = useMemo(() => {
    const current = sampleDestinations.find((d) => d.slug === slug);
    if (!current) return [];
    return sampleDestinations
      .filter((d) => d.slug !== slug && (d.region === current.region || d.type === current.type))
      .slice(0, limit);
  }, [slug, limit]);

  return { data: related, isLoading: false };
};
