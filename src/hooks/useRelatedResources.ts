import { useQuery } from '@tanstack/react-query';
import type { Resource } from '../types';
import { fetchRelatedResources } from '../services/resourceService';

export function useRelatedResources(courseId: number) {
  return useQuery<Resource[]>({
    // queryKey inkluderer courseId — cachen er separat for hvert kursus.
    // ['resources', 1] og ['resources', 2] er to uafhængige cache-entries.
    queryKey: ['resources', courseId],
    queryFn: () => fetchRelatedResources(courseId),

    // Data om relaterede ressourcer ændrer sig sjældent —
    // vi cacher i 5 minutter så vi ikke henter igen ved hvert besøg.
    staleTime: 1000 * 60 * 5,
  });
}
