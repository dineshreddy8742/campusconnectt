import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GoogleOAuthProvider } from "@react-oauth/google";
import MessagesPage from './pages/MessagesPage';
import { axiosInstance } from './lib/axios';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000
    },
  },
});

// If a token exists in localStorage, set the axios default header immediately
// so initial requests (like /auth/me) use it without waiting for React effects.
try {
  const t = localStorage.getItem('token');
  if (t) axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${t}`;
} catch (e) {
  // ignore
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {
      /* Only enable Google OAuth when VITE_GOOGLE_CLIENT_ID is provided. */
    }
    {import.meta.env.VITE_GOOGLE_CLIENT_ID ? (
      <GoogleOAuthProvider
        clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}
        onScriptLoadError={(error) => {
          console.error('Failed to load Google OAuth script:', error);
        }}
        onScriptLoadSuccess={() => console.log('Google OAuth script loaded successfully')}
      >
        <BrowserRouter>
          <QueryClientProvider client={queryClient}>
            <App />
          </QueryClientProvider>
        </BrowserRouter>
      </GoogleOAuthProvider>
    ) : (
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </BrowserRouter>
    )}
  </StrictMode>
);
