import type { Course } from '../types';

// Mock-data samlet ét sted — let at erstatte med fetch() senere
const mockCourses: Course[] = [
  {
    id: 1,
    title: 'Introduktion til Klimahandling',
    description:
      'Lær hvordan du som underviser kan integrere FNs verdensmål om klimahandling i din undervisning.',
    goal: 13,
    durationMinutes: 45,
    published: true,
  },
  {
    id: 2,
    title: 'Livet under vand',
    description:
      'Undervisningsmateriale om bevarelse af oceaner og havressourcer til brug i folkeskolen.',
    goal: 14,
    durationMinutes: 30,
    published: true,
  },
  {
    id: 3,
    title: 'Reduktion af ulighed',
    description:
      'Dette kursus er under udarbejdelse og giver redskaber til at arbejde med verdensmål 10.',
    goal: 10,
    durationMinutes: 60,
    published: false,
  },
  {
    id: 4,
    title: 'Sundhed og trivsel i skolen',
    description:
      'Praktiske undervisningsforløb der sætter fokus på mental og fysisk sundhed blandt unge.',
    goal: 3,
    durationMinutes: 50,
    published: true,
  },
  {
    id: 5,
    title: 'Kvalitetsuddannelse for alle',
    description:
      'Hvordan sikrer vi inkluderende og ligelig uddannelse? Materialer til brug i forbundsregi.',
    goal: 4,
    durationMinutes: 40,
    published: true,
  },
  {
    id: 6,
    title: 'Bæredygtige byer',
    description: 'Byplanlægning, transport og bæredygtig udvikling i urbane miljøer.',
    goal: 11,
    durationMinutes: 35,
    published: false,
  },
  {
    id: 7,
    title: 'Ansvarligt forbrug og produktion',
    description:
      'Lær at undervise i cirkulær økonomi og ansvarlige forbrugsmønstre fra folkeskole til gymnasium.',
    goal: 12,
    durationMinutes: 55,
    published: true,
  },
  {
    id: 8,
    title: 'Livet på land',
    description:
      'Biologisk mangfoldighed og beskyttelse af økosystemer — undervisningsressourcer til naturfag.',
    goal: 15,
    durationMinutes: 45,
    published: true,
  },
  {
    id: 9,
    title: 'Fred, retfærdighed og stærke institutioner',
    description:
      'Demokrati og medborgerskab i praksis. Dette forløb er under review inden publicering.',
    goal: 16,
    durationMinutes: 70,
    published: false,
  },
];

// Simulerer et asynkront API-kald med kunstig forsinkelse.
// Promise + setTimeout er standard måde at simulere netværksforsinkelse på.
// Returtypen Promise<Course[]> er eksplicit — god vane før vi rammer et rigtigt API.
export async function fetchCourses(): Promise<Course[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockCourses), 800);
  });
}
