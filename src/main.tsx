import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./context/AuthContext";
import "./index.css";
import App from "./App.tsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60,
      retry: 1,
    },
  },
});

// ReactQueryDevtools importeres kun i development via dynamic import.
// import.meta.env.DEV er Vites built-in miljøvariabel — true i dev, false i production.
// Termen: "dynamic import" / "code splitting" — kun den kode der rent faktisk
// bruges i det givne miljø havner i bundlen.
async function bootstrap() {
  const Devtools = import.meta.env.DEV
    ? (await import("@tanstack/react-query-devtools")).ReactQueryDevtools
    : null;

  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <App />
        </AuthProvider>
        {Devtools && <Devtools initialIsOpen={false} />}
      </QueryClientProvider>
    </StrictMode>,
  );
}

bootstrap();
