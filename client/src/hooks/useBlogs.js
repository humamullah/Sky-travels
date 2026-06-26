import { useQuery } from '@tanstack/react-query';
import { getBlogs, getBlogBySlug } from '../api/client';

export const useBlogs = (params) =>
  useQuery({
    queryKey: ['blogs', params],
    queryFn: () => getBlogs(params),
  });

export const useBlog = (slug) =>
  useQuery({
    queryKey: ['blog', slug],
    queryFn: () => getBlogBySlug(slug),
    enabled: !!slug,
  });
