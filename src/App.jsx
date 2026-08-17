import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { DarkModeProvider } from "./context/DarkModeContex";
import { EventFilterProvider } from "./context/EventFilterContext";
import AppLayout from "./ui/AppLayout";
import Home from "./pages/Home"
import NotFound from "./ui/NotFound"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});

// This code is for all users
window.__TANSTACK_QUERY_CLIENT__ = queryClient

function App() {
  return (
    <DarkModeProvider>
    <EventFilterProvider>
            <QueryClientProvider client={queryClient}>

      <BrowserRouter>    
        <Routes>
          <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      <Toaster />
    </BrowserRouter>
</QueryClientProvider>   
</EventFilterProvider>   
    </DarkModeProvider>
  );
}

export default App;
