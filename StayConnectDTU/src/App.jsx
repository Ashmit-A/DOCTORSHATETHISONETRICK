import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import Layout from "./Layout";
import Home from "./pages/Home";
import FindFlats from "./pages/FindFlats";
import FindRoommate from "./pages/FindRoommate";
import Essentials from "./pages/Essentials";
import Sell from "./pages/Sell";
import Dashboard from "./pages/Dashboard";
import MyListings from "./pages/dashboard/MyListings";
import MyEssentials from "./pages/dashboard/MyEssentials";
import RoommateInfo from "./pages/dashboard/RoommateInfo";
import MyAccount from "./pages/dashboard/MyAccount";
import ProtectedRoute from "./components/ProtectedRoute";
import { useState } from "react";
import useAuthStore from "./store/authStore";

export default function App() {
  const [showLogin, setShowLogin] = useState(false);
  const { fetchUser } = useAuthStore();

  // Dashboard routes configuration
  const dashboardRoutes = [
    { path: "/dashboard", component: Dashboard },
    { path: "/dashboard/listings", component: MyListings },
    { path: "/dashboard/essentials", component: MyEssentials },
    { path: "/dashboard/roommate", component: RoommateInfo },
    { path: "/dashboard/account", component: MyAccount },
  ];

  // Initialize auth state on app load
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <>
      <Toaster 
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#ffffff',
            color: '#374151',
            border: '1px solid #e5e7eb',
            borderRadius: '12px',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
            fontSize: '14px',
            fontFamily: 'Roboto, sans-serif',
            padding: '16px 20px',
            maxWidth: '400px',
            lineHeight: '1.5',
          },
          success: {
            style: {
              background: '#f0fdf4',
              color: '#166534',
              border: '1px solid #bbf7d0',
            },
            iconTheme: {
              primary: '#16a34a',
              secondary: '#f0fdf4',
            },
          },
          error: {
            style: {
              background: '#fef2f2',
              color: '#dc2626',
              border: '1px solid #fecaca',
            },
            iconTheme: {
              primary: '#dc2626',
              secondary: '#fef2f2',
            },
          },
          loading: {
            style: {
              background: '#f8fafc',
              color: '#374151',
              border: '1px solid #e2e8f0',
            },
          },
        }}
        gutter={16}
        containerStyle={{
          top: 20,
          right: 20,
        }}
      />
      <Layout setShowLogin={setShowLogin} showLogin={showLogin}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/find-flats" element={<FindFlats />} />
          <Route path="/find-roommate" element={<FindRoommate />} />
          <Route path="/essentials" element={<Essentials />} />
          <Route path="/sell" element={<Sell />} />
          
          {/* Dashboard Routes */}
          {dashboardRoutes.map(({ path, component: Component }) => (
            <Route
              key={path}
              path={path}
              element={
                <ProtectedRoute>
                  <Component />
                </ProtectedRoute>
              }
            />
          ))}
          
          <Route path="*" element={<div style={{padding:'4rem',fontSize:'2rem',textAlign:'center'}}>404 Not Found</div>} />
        </Routes>
      </Layout>
    </>
  );
}
