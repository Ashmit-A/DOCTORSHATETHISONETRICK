import { useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import DashboardNavbar from "./components/DashboardNavbar";
import Footer from "./components/Footer";
import Login from "./components/Login";

export default function Layout({ children, setShowLogin, showLogin }) {
  const location = useLocation();
  const isOwner = location.pathname.startsWith("/owner");
  const isDashboard = location.pathname.startsWith("/dashboard");

  return (
    <>
      {showLogin && <Login setShowLogin={setShowLogin} />}
      {isDashboard ? (
        <DashboardNavbar />
      ) : !isOwner ? (
        <Navbar setShowLogin={setShowLogin} />
      ) : null}
      {children}
      <Footer />
    </>
  );
} 