import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import Vehicles from "./pages/Vehicles";
import Map from "./pages/Map";
import RoutesPage from "./pages/Routes";
import Drivers from "./pages/Drivers";
import Navigation from "./pages/Navigation";
import Reporting from "./pages/Reporting";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

import LoginForm from "./components/LoginForm";
import TelemetryPanel from "./components/TelemetryPanel";

const queryClient = new QueryClient();

const App = () => {
  const [token, setToken] = useState<string | null>(null);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {!token ? (
              <Route path="*" element={<LoginForm onLogin={setToken} />} />
            ) : (
              <>
                <Route path="/" element={<Index />} />
                <Route path="/vehicles" element={<Vehicles />} />
                <Route path="/map" element={<Map />} />
                <Route path="/routes" element={<RoutesPage />} />
                <Route path="/drivers" element={<Drivers />} />
                <Route path="/navigation" element={<Navigation />} />
                <Route path="/reporting" element={<Reporting />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/telemetry" element={<TelemetryPanel token={token} />} />
                <Route path="*" element={<NotFound />} />
              </>
            )}
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
