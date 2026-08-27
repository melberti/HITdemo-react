import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { DarkModeProvider } from "./context/DarkModeContex";
import { EventFilterProvider } from "./context/EventFilterContext";
import ProtectedRoute from "./ui/ProtectedRoute";
import AppLayout from "./ui/AppLayout";
import NotFound from "./ui/NotFound";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Dashboard from "./pages/Dashboard";
import AddEvent from "./pages/AddEvent";
import AddVenue from "./pages/AddVenue";
import AddImage from "./pages/AddImage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});

// This code is for all users
window.__TANSTACK_QUERY_CLIENT__ = queryClient;

function App() {
  return (
    <DarkModeProvider>
      <EventFilterProvider>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <Routes>
              {/* Shared layout for all pages */}
              <Route element={<AppLayout />}>
                {/* Public pages */}
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Navigate to="/" replace />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="*" element={<NotFound />} />

                {/* Protected wrapper */}
                <Route element={<ProtectedRoute />}>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/addevent" element={<AddEvent />} />
                  <Route path="/addvenue" element={<AddVenue />} />
                  <Route path="/addimage" element={<AddImage />} />
                </Route>
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
