import { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import App from './App.jsx'; // This contains your routes
import SplashScreen from './SplashScreen.jsx';
import { HelmetProvider } from "react-helmet-async";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Cache data for 5 minutes — prevents refetching on every mount
      staleTime: 5 * 60 * 1000,
      // Keep unused cache for 10 minutes before garbage collection
      gcTime: 10 * 60 * 1000,
      // Don't refetch when window regains focus (noisy on e-commerce)
      refetchOnWindowFocus: false,
      // Retry failed requests once (not 3x default)
      retry: 1,
    },
  },
});

function Root() {
  const [showSplash, setShowSplash] = useState(() => {
    const hasSeenSplash = sessionStorage.getItem("hasSeenSplash");
    return !hasSeenSplash;
  });

  useEffect(() => {
    if (!showSplash) return undefined;

    const timer = setTimeout(() => {
      setShowSplash(false);
      sessionStorage.setItem("hasSeenSplash", "true");
    }, 3000);

    return () => clearTimeout(timer);
  }, [showSplash]);

  return (
    <QueryClientProvider client={queryClient}>
      {showSplash ? <SplashScreen /> : <App />}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

createRoot(document.getElementById('root')).render(
  <HelmetProvider>
    <Root />
  </HelmetProvider>
);

export default Root;
