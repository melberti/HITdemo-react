import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { DarkModeProvider } from "./context/DarkModeContex";
import AppLayout from "./ui/AppLayout";
import Home from "./pages/Home"
import NotFound from "./ui/NotFound"

function App() {
  return (
    <DarkModeProvider>
      <BrowserRouter>    
        <Routes>
          <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
      
    </DarkModeProvider>
  );
}

export default App;
