# Læringsportal - React Vite Typescript

Et React-læringsportalprojekt der demonstrerer moderne React-praksis (2026) med Vite, TypeScript og tilhørende økosystem som Tanstack Query.

Live: [forbund.vercel.app](https://forbund.vercel.app)

## Stack

| Teknologi                 | Version | Formål                                                 |
| ------------------------- | ------- | ------------------------------------------------------ |
| React                     | 19      | UI og komponentarkitektur                              |
| TypeScript                | 5.9     | Typesikkerhed                                          |
| Vite                      | 8       | Bundler, dev-server og HMR                             |
| React Router              | v7      | Klientside routing via Browser History API             |
| TanStack Query            | v5      | Server state, caching og datahentning                  |
| CSS Modules               | —       | Scoped komponent-styling uden runtime overhead         |
| Barlow / Barlow Condensed | —       | Selvhostede woff2-fonte med `@font-face` i `index.css` |
| ESLint + Prettier         | —       | Linting og kodeformatering                             |
| Vercel                    | —       | Hosting og CI/CD                                       |

## Lighthouse

99 / 100 / 100 / 100 (Performance / Accessibility / Best Practices / SEO)

## Koncepter der demonstreres

- **Funktionskomponenter og hooks** — `useState`, `useEffect`, `useContext`, custom hooks
- **React Router v7** — deklarativ routing, URL-parametre, protected routes, post-login redirect
- **TanStack Query** — `useQuery` med cache, stale time, loading og error states
- **REST API-integration** — `fetch()` mod JSONPlaceholder med korrekt HTTP-fejlhåndtering
- **Context API** — `AuthContext` med `useAuth` hook og provider-mønster
- **RBAC** — rollebaseret UI (admin ser kladder og redigeringsknap, underviser ser kun publicerede)
- **Skeleton loaders** — shimmer-animation der matcher det faktiske indholdslayout
- **Code splitting** — `React.lazy()` + `Suspense` per route, vendor chunk splitting i Vite
- **Selvhostede fonte** — woff2-filer i `public/fonts/` med `font-display: swap` og unicode-range subsetting
- **CSS Modules** — scoped styling, klassenavne kompileres til unikke identifiers
- **Feature-baseret mappestruktur** — `pages/`, `components/`, `hooks/`, `services/`, `context/`, `types/`

## Mappestruktur

```
src/
├── components/
│   ├── CourseCard/            # Kursuskort med badge-support og hover-animation
│   ├── ProtectedRoute/        # Route guard — kræver login
│   └── Skeleton/              # Genbrugelig skeleton loader med shimmer
├── context/
│   └── AuthContext.tsx        # Global auth-state med useAuth hook
├── hooks/
│   ├── useCourses.ts          # Henter kursusliste via TanStack Query
│   └── useRelatedResources.ts # Henter relaterede ressourcer fra REST API
├── pages/
│   ├── CoursesPage.tsx        # Kursusliste med filter og rollebaseret visning
│   ├── CourseDetailPage.tsx   # Kursusdetalje med relaterede ressourcer
│   ├── LoginPage.tsx          # Login med split-layout og post-login redirect
│   └── NotFoundPage.tsx       # 404
├── services/
│   ├── courseService.ts       # Mock-kurser med simuleret API-forsinkelse
│   └── resourceService.ts     # fetch() mod JSONPlaceholder
└── types/
    └── index.ts               # Course, User, Resource interfaces

public/
└── fonts/                     # Selvhostede woff2-filer (Barlow + Barlow Condensed)
```

## Kom i gang

```bash
npm install
npm run dev    # starter dev-server på http://localhost:5173
```

## Demo-logins

| Email                 | Rolle      | Adgang                             |
| --------------------- | ---------- | ---------------------------------- |
| underviser@forbund.dk | instructor | Kun publicerede kurser             |
| admin@forbund.dk      | admin      | Alle kurser + kladder + redigering |

Adgangskode: hvad som helst

## Scripts

```bash
npm run dev          # Start dev-server med HMR
npm run build        # TypeScript-tjek + production build
npm run preview      # Preview af production build lokalt
npm run lint         # ESLint
npm run format       # Prettier — formater alle filer
npm run format:check # Tjek formatering uden at skrive
```

---

## Todo

### Styling

- [ ] **CSS-strategi** — projektet bruger pt. CSS Modules. Tailwind CSS er også en mulighed og måske mere hensigtsmæssigt i et større team og i sammenhæng med et eksisterende design system. Begge er legitime valg — CSS Modules er eksplicit og tæt på standard CSS, Tailwind er hurtigere at iterere i men kræver kendskab til utility-klasser.

### Tests forslag

- [ ] **Opsæt testmiljø** — Vitest + React Testing Library + MSW (Mock Service Worker)
- [ ] **Unit tests** — `useCourses`, `useRelatedResources`, `useAuth`
- [ ] **Komponenttests** — `CourseCard`, `ProtectedRoute`, `LoginPage`
- [ ] **Integrationstests** — login-flow, protected route redirect, post-login redirect

### Auth

- [ ] **Persistent login** — auth-state nulstilles ved page refresh. Implementér token-persistering via `localStorage` eller `sessionStorage`
- [ ] **JWT-integration** — erstat mock-auth med rigtig `POST /auth/login` der returnerer et JWT
- [ ] **Token refresh** — håndtér udløbne tokens med silent refresh

### Data

- [ ] **Erstat mock-data** — `courseService.ts` bruger hardkodet data med kunstig forsinkelse. I et rigtigt projekt skal det naturligvis erstattes med rigtige API-kald til backend.
- [ ] **`useMutation`** — tilføj TanStack Query `useMutation` til oprettelse og redigering af kurser

### Features

- [ ] **Redigeringsside** — admin-knappen på kursusdetalje viser `alert()`. Implementér `/courses/:id/edit` med formular og validering
- [ ] **Søgefunktion** — filtrer kurser på titel og verdensmål-nummer
- [ ] **Fremskridtssporing** — marker kurser som gennemført per bruger
