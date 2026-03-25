import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import './index.css'
import App from './App.tsx'

// QueryClient er hjertet i TanStack Query — den ejer cachen og al konfiguration.
// Vi opretter én instans til hele appen.
// Termen: "cache client" / "query client"
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Hvor længe data betragtes som "frisk" inden TanStack Query henter igen.
      // 1 minut passer fint til kursuslister der ikke opdateres hvert sekund.
      // Termen: "stale time" — forældet tid
      staleTime: 1000 * 60,

      // Antal automatiske genforsøg ved fejl inden den giver op.
      retry: 1,
    },
  },
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* QueryClientProvider er en React Context der giver alle børnekomponenter
        adgang til queryClient via hooks som useQuery og useMutation.
        Termen: "provider pattern" — det samme mønster som BrowserRouter bruger. */}
    <QueryClientProvider client={queryClient}>
      <App />

      {/* ReactQueryDevtools er et debug-panel der kun vises i development.
          Det viser cache-indhold, query-status og timing.
          Fjernes automatisk fra production build — ingen ekstra konfiguration. */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>,
)
