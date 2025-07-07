import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/Home";
import FindFlats from "./pages/FindFlats";
import FindRoommate from "./pages/FindRoommate";
import Essentials from "./pages/Essentials";
import Sell from "./pages/Sell";
import Dashboard from "./pages/Dashboard";
import { useState } from "react";

export default function App() {
  const [showLogin, setShowLogin] = useState(false);
  return (
    <Router>
      <Layout setShowLogin={setShowLogin} showLogin={showLogin}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/find-flats" element={<FindFlats />} />
          <Route path="/find-roommate" element={<FindRoommate />} />
          <Route path="/essentials" element={<Essentials />} />
          <Route path="/sell" element={<Sell />} />
          <Route path="/owner" element={<Dashboard />} />
        </Routes>
      </Layout>
    </Router>
  );
}
