import { useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./components/Login";

export default function Layout({ children, setShowLogin, showLogin }) {
  const location = useLocation();
  const isOwner = location.pathname.startsWith("/owner");

  return (
    <>
      {showLogin && <Login setShowLogin={setShowLogin} />}
      {!isOwner && <Navbar setShowLogin={setShowLogin} />}
      {children}
      <Footer />
    </>
  );
} 