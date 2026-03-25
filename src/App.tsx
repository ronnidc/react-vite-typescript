import { useState } from 'react'
import CourseCard from './components/CourseCard'
import { useCourses } from './hooks/useCourses'
import './App.css'

function App() {
  // Vores custom hook — al loading/error-logik er gemt væk herfra
  const { courses, loading, error } = useCourses()

  const [showOnlyPublished, setShowOnlyPublished] = useState(false)

  const visibleCourses = showOnlyPublished
    ? courses.filter((course) => course.published)
    : courses

  // Tidlig return — render loading-state før vi forsøger at vise data.
  // Termen: "early return pattern" eller "guard clause".
  if (loading) {
    return (
      <div className="app">
        <div className="status-message">Henter kurser…</div>
      </div>
    )
  }

  // Vis fejl hvis noget gik galt
  if (error) {
    return (
      <div className="app">
        <div className="status-message error">{error}</div>
      </div>
    )
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Læringsportal</h1>
        <p>Undervisningsmateriale om FNs verdensmål</p>
      </header>

      <div className="toolbar">
        <label className="filter-toggle">
          <input
            type="checkbox"
            checked={showOnlyPublished}
            onChange={(e) => setShowOnlyPublished(e.target.checked)}
          />
          Vis kun publicerede kurser
        </label>
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
