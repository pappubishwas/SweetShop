import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AdminPanel from "./pages/AdminPanel";
import Header from "./components/Header";
import { setToken } from "./lib/api";

function App() {
  const [token, setTokenState] = useState<string | null>(() => localStorage.getItem("token"));
  const [user, setUser] = useState<any>(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  useEffect(() => {
    setToken(token || undefined);
  }, [token]);

  const handleLogin = (t: string, u: any) => {
    localStorage.setItem("token", t);
    localStorage.setItem("user", JSON.stringify(u));
    setTokenState(t);
    setUser(u);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setTokenState(null);
    setUser(null);
  };

  return (
    <div>
      <Header token={token} user={user} onLogout={handleLogout} />
      <main className="p-6 max-w-6xl mx-auto">
        <Routes>
        
          <Route path="/" element={token ? <Dashboard token={token} user={user} /> : <Navigate to="/login" />} />

          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register onRegister={handleLogin} />} />

          <Route
            path="/admin"
            element={
              token && user?.isAdmin ? <AdminPanel /> : <Navigate to="/login" />
            }
          />

          
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
