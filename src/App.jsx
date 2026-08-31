import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { lazy, Suspense } from "react";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { DarkModeProvider } from "./context/DarkModeContex";
import { EventFilterProvider } from "./context/EventFilterContext";
import { EventImageProvider } from "./context/EventImageContext";
import ProtectedRoute from "./ui/ProtectedRoute";
import AppLayout from "./ui/AppLayout";
import SpinnerFullPage from "./ui/SpinnerFullPage";
import Home from "./pages/Home";
//const Home = lazy(() => import("./pages/Home"));
const SignUp = lazy(() => import("./pages/SignUp"));
const SignIn = lazy(() => import("./pages/SignIn"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const AddEvent = lazy(() => import("./pages/AddEvent"));
const AddVenue = lazy(() => import("./pages/AddVenue"));
const AddImage = lazy(() => import("./pages/AddImage"));
//const Profile = lazy(() => import("./pages/Profile"));
const NotFound = lazy(() => import("./pages/NotFound"));

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
        <EventImageProvider>
          <QueryClientProvider client={queryClient}>
            <BrowserRouter>
              <Suspense fallback={<SpinnerFullPage />}>
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
              </Suspense>
              <Toaster />
            </BrowserRouter>
          </QueryClientProvider>
        </EventImageProvider>
      </EventFilterProvider>
    </DarkModeProvider>
  );
}

export default App;
