import { useState } from 'react'
import CourseCard from './components/CourseCard'
import type { Course } from './types'
import './App.css'

const mockCourses: Course[] = [
  {
    id: 1,
    title: 'Introduktion til Klimahandling',
    description: 'Lær hvordan du som underviser kan integrere FNs verdensmål om klimahandling i din undervisning.',
    goal: 13,
    durationMinutes: 45,
    published: true,
  },
  {
    id: 2,
    title: 'Livet under vand',
    description: 'Undervisningsmateriale om bevarelse af oceaner og havressourcer til brug i folkeskolen.',
    goal: 14,
    durationMinutes: 30,
    published: true,
  },
  {
    id: 3,
    title: 'Reduktion af ulighed',
    description: 'Dette kursus er under udarbejdelse og giver redskaber til at arbejde med verdensmål 10.',
    goal: 10,
    durationMinutes: 60,
    published: false,
  },
  {
    id: 4,
    title: 'Sundhed og trivsel i skolen',
    description: 'Praktiske undervisningsforløb der sætter fokus på mental og fysisk sundhed blandt unge.',
    goal: 3,
    durationMinutes: 50,
    published: true,
  },
  {
    id: 5,
    title: 'Kvalitetsuddannelse for alle',
    description: 'Hvordan sikrer vi inkluderende og ligelig uddannelse? Materialer til brug i forbundsregi.',
    goal: 4,
    durationMinutes: 40,
    published: true,
  },
  {
    id: 6,
    title: 'Bæredygtige byer',
    description: 'Undervisningsforløb om byplanlægning, transport og bæredygtig udvikling i urbane miljøer.',
    goal: 11,
    durationMinutes: 35,
    published: false,
  },
  {
    id: 7,
    title: 'Ansvarligt forbrug og produktion',
    description: 'Lær at undervise i cirkulær økonomi og ansvarlige forbrugsmønstre fra folkeskole til gymnasium.',
    goal: 12,
    durationMinutes: 55,
    published: true,
  },
  {
    id: 8,
    title: 'Livet på land',
    description: 'Biologisk mangfoldighed og beskyttelse af økosystemer — undervisningsressourcer til naturfag.',
    goal: 15,
    durationMinutes: 45,
    published: true,
  },
  {
    id: 9,
    title: 'Fred, retfærdighed og stærke institutioner',
    description: 'Demokrati og medborgerskab i praksis. Dette forløb er under review inden publicering.',
    goal: 16,
    durationMinutes: 70,
    published: false,
  },
]

function App() {
  // useState returnerer et array med to elementer:
  // 1. den aktuelle værdi  2. en funktion til at opdatere den
  // TypeScript udleder typen automatisk fra startværdien (false = boolean)
  const [showOnlyPublished, setShowOnlyPublished] = useState(false)

  // Dette er "derived state" — en værdi beregnet ud fra eksisterende state.
  // Vi bruger IKKE et ekstra useState her — det ville skabe dobbelt state der kan gå ud af sync.
  // I Vue ville dette svare til en computed property.
  const visibleCourses = showOnlyPublished
    ? mockCourses.filter((course) => course.published)
    : mockCourses

  return (
    <div className="app">
      <header className="app-header">
        <h1>Læringsportal</h1>
        <p>Undervisningsmateriale om FNs verdensmål</p>
      </header>

      <div className="toolbar">
        {/* onChange er Reacts svar på @change i Vue */}
        <label className="filter-toggle">
          <input
            type="checkbox"
            checked={showOnlyPublished}
            onChange={(e) => setShowOnlyPublished(e.target.checked)}
          />
          Vis kun publicerede kurser
        </label>

        {/* Template literal i JSX — samme som Vue */}
        <span className="course-count">
          {visibleCourses.length} {visibleCourses.length === 1 ? 'kursus' : 'kurser'}
        </span>
      </div>

      <div className="course-grid">
        {visibleCourses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  )
}

export default App
