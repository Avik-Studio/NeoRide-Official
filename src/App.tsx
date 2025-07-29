import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import AdminHome from "./pages/AdminHome";
import CustomerHome from "./pages/CustomerHome";
import CustomerHomeSimple from "./pages/CustomerHomeSimple";
import DriverHome from "./pages/DriverHome";
import AdminLoginTest from "./pages/AdminLoginTest";
import AuthTest from "./pages/AuthTest";
import TestPage from "./pages/TestPage";
import AuthCallback from "./pages/AuthCallback";
import PackagesPage from "./components/Pages/PackagesPage";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
          <Route path="/admin" element={
            <ProtectedRoute>
              <AdminHome />
            </ProtectedRoute>
          } />
          <Route path="/customer" element={
            <ProtectedRoute>
              <CustomerHome />
            </ProtectedRoute>
          } />
          <Route path="/customer-full" element={<CustomerHome />} />
          <Route path="/driver" element={
            <ProtectedRoute>
              <DriverHome />
            </ProtectedRoute>
          } />
          <Route path="/admin-test" element={<AdminLoginTest />} />
          <Route path="/auth-test" element={<AuthTest />} />
          <Route path="/test" element={<TestPage />} />
          <Route path="/auth/callback" element={<AuthCallback />} />
          <Route path="/packages" element={<PackagesPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
