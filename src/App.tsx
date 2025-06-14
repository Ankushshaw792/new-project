import { Suspense } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import ListingDetail from "./components/listings/ListingDetail";
import UserDashboard from "./components/dashboard/UserDashboard";
import AdminDashboard from "./components/dashboard/AdminDashboard";
import routes from "tempo-routes";
import Footer from "./components/navigation/Footer";
import { AuthProvider } from "./lib/auth";
import { RBACProvider, withRoleProtection } from "./lib/rbac";

// Protect dashboards with role-based access
const ProtectedUserDashboard = withRoleProtection(UserDashboard, 'user');
const ProtectedAdminDashboard = withRoleProtection(AdminDashboard, ['admin', 'salon_owner']);

function App() {
  return (
    <AuthProvider>
      <RBACProvider>
        <Suspense fallback={
          <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
          </div>
        }>
          <div className="min-h-screen flex flex-col">
            <div className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/listing/:id" element={<ListingDetail />} />
                <Route path="/dashboard" element={<ProtectedUserDashboard />} />
                <Route path="/admin" element={<ProtectedAdminDashboard />} />
              </Routes>
              {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
            </div>
            <Footer />
          </div>
        </Suspense>
      </RBACProvider>
    </AuthProvider>
  );
}

export default App;