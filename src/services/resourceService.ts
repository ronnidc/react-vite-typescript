import type { Resource } from '../types';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

// Henter et begrænset antal posts fra JSONPlaceholder.
// I et rigtigt projekt ville dette være GET /courses/:id/resources
// eller lignende endpoint på jeres eget API.
//
// Vi bruger courseId til at variere hvilke posts vi henter —
// det simulerer at hvert kursus har sine egne relaterede ressourcer.
export async function fetchRelatedResources(courseId: number): Promise<Resource[]> {
  // URLSearchParams bygger query string korrekt og escaper specialtegn.
  // Termen: "query string" / "search params"
  const params = new URLSearchParams({
    _start: String((courseId - 1) * 3), // offset baseret på kursus-id
    _limit: '3',
  });

  const response = await fetch(`${BASE_URL}/posts?${params}`);

  // Tjek HTTP-statuskode eksplicit — fetch() kaster IKKE en fejl ved 4xx/5xx.
  // Det er en klassisk fælde: fetch afviser kun Promise ved netværksfejl, ikke HTTP-fejl.
  // Termen: "non-ok response" / "HTTP error handling"
  if (!response.ok) {
    throw new Error(`HTTP fejl: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  return data as Resource[];
}
