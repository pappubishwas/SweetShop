import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AdminPanel from "./pages/AdminPanel";
import Header from "./components/Header";
import { setToken } from "./lib/api";
import PurchasePage from "./pages/PurchasePage";
import { ToastContainer } from "react-toastify";
import Footer from "./components/Footer";

function App() {
  const [token, setTokenState] = useState<string | null>(() =>
    localStorage.getItem("token")
  );
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
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Header token={token} user={user} onLogout={handleLogout} />
      <main className="p-6 max-w-6xl mx-auto">
        <Routes>
          <Route
            path="/"
            element={
              token ? (
                <Dashboard token={token} user={user} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/purchase/:id"
            element={token ? <PurchasePage /> : <Navigate to="/login" />}
          />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route
            path="/register"
            element={<Register onRegister={handleLogin} />}
          />

          <Route
            path="/admin"
            element={
              token ? (
                user?.isAdmin ? (
                  <AdminPanel />
                ) : (
                  <Navigate to="/" />
                )
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
      <Footer/>
    </div>
  );
}

export default App;
