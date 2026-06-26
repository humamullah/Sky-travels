import { useQuery } from '@tanstack/react-query';
import { getResources } from '../api/client';

export const useResources = (type) =>
  useQuery({
    queryKey: ['resources', type],
    queryFn: () => getResources(type ? { type } : {}),
  });
