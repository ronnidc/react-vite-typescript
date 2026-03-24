import CourseCard from "./components/CourseCard";
import type { Course } from "./types";
import "./App.css";

// Hardkodet dummy-data — vi erstatter dette med et rigtigt API-kald i fase 4
const mockCourses: Course[] = [
  {
    id: 1,
    title: "Introduktion til Klimahandling",
    description:
      "Lær hvordan du som underviser kan integrere FNs verdensmål om klimahandling i din undervisning.",
    goal: 13,
    durationMinutes: 45,
    published: true,
  },
  {
    id: 2,
    title: "Livet under vand",
    description:
      "Undervisningsmateriale om bevarelse af oceaner og havressourcer til brug i folkeskolen.",
    goal: 14,
    durationMinutes: 30,
    published: true,
  },
  {
    id: 3,
    title: "Reduktion af ulighed",
    description:
      "Dette kursus er under udarbejdelse og giver redskaber til at arbejde med verdensmål 10.",
    goal: 10,
    durationMinutes: 60,
    published: false,
  },
];

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Læringsportal</h1>
        <p>Undervisningsmateriale om FNs verdensmål</p>
      </header>

      {/* .map() er Reacts måde at lave v-for på.
          key er påkrævet — React bruger den til effektivt at opdatere listen (reconciliation) */}
      <div className="course-grid">
        {mockCourses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
}

export default App;
