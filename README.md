# Læringsportal — FNs Verdensmål

Et React-læringsportalprojekt bygget som forberedelse til et interview. Demonstrerer moderne React-praksis (2026) med Vite, TypeScript og tilhørende økosystem.

Live: [forbund.vercel.app](https://forbund.vercel.app)

## Stack

| Teknologi | Formål |
|---|---|
| React 19 + TypeScript | UI og typesikkerhed |
| Vite 8 | Bundler og dev-server |
| React Router v6 | Klientside routing via Browser History API |
| TanStack Query | Server state, caching og datahentning |
| CSS Modules | Scoped komponent-styling |

## Koncepter der demonstreres

- **Funktionskomponenter og hooks** — `useState`, `useEffect`, `useContext`, custom hooks
- **React Router** — deklarativ routing, URL-parametre, protected routes, post-login redirect
- **TanStack Query** — `useQuery` med cache, stale time og loading/error states
- **REST API-integration** — `fetch()` mod JSONPlaceholder med korrekt HTTP-fejlhåndtering
- **Context API** — `AuthContext` med `useAuth` hook, provider-mønster
- **CSS Modules** — scoped styling uden runtime overhead
- **Feature-baseret mappestruktur** — `pages/`, `components/`, `hooks/`, `services/`, `context/`, `types/`

## Mappestruktur

```
src/
├── components/
│   ├── CourseCard/       # Genbrugelig kursus-kortkomponent
│   └── ProtectedRoute/   # Route guard — kræver login
├── context/
│   └── AuthContext.tsx   # Global auth-state med useAuth hook
├── hooks/
│   ├── useCourses.ts          # Henter kursusliste via TanStack Query
│   └── useRelatedResources.ts # Henter relaterede ressourcer fra REST API
├── pages/
│   ├── CoursesPage.tsx        # Kursusliste med filter
│   ├── CourseDetailPage.tsx   # Kursusdetalje med relaterede ressourcer
│   ├── LoginPage.tsx          # Login med mock-auth og post-login redirect
│   └── NotFoundPage.tsx       # 404
├── services/
│   ├── courseService.ts       # Mock-kurser med simuleret API-forsinkelse
│   └── resourceService.ts     # fetch() mod JSONPlaceholder
└── types/
    └── index.ts               # Course, User, Resource interfaces
```

## Kom i gang

```bash
npm install
npm run dev
```

Åbn [http://localhost:5173](http://localhost:5173)

## Demo-logins

| Email | Rolle |
|---|---|
| underviser@forbund.dk | instructor |
| admin@forbund.dk | admin |

Adgangskode: hvad som helst

## Scripts

```bash
npm run dev      # Start dev-server med HMR
npm run build    # TypeScript-tjek + production build
npm run lint     # ESLint
npm run preview  # Preview af production build lokalt
```
