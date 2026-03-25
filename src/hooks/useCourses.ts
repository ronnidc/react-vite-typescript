import { useQuery } from '@tanstack/react-query'
import type { Course } from '../types'
import { fetchCourses } from '../services/courseService'

// Denne hook ser næsten identisk ud udefra — den returnerer stadig { courses, loading, error }.
// Men indmaden er reduceret fra ~40 linjer til 10.
// Alt vi selv kodede (useEffect, useState, cancelled-flag, cleanup) håndteres nu af useQuery.

export function useCourses() {
  // useQuery tager et objekt med to påkrævede felter:
  // - queryKey: cache-nøglen — et array der unikt identificerer denne datahentning
  // - queryFn:  funktionen der henter data — skal returnere et Promise
  // Termen: "query key" / "query function"
  const { data, isLoading, isError } = useQuery<Course[]>({
    queryKey: ['courses'],
    queryFn: fetchCourses,
  })

  return {
    // data er undefined mens den henter — vi defaulter til tom array
    courses: data ?? [],
    loading: isLoading,
    error: isError ? 'Kunne ikke hente kurser. Prøv igen.' : null,
  }
}
