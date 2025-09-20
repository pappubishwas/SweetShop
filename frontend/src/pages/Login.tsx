import React, { useState } from "react";
import API from "../lib/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Login({
  onLogin,
}: {
  onLogin: (token: string, user: any) => void;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();
  const [err, setErr] = useState("");

  // Submit function for login
  const submit = async (e: any) => {
    e.preventDefault();
    try {
      const { data } = await API.post("/auth/login", { email, password });
      onLogin(data.token, data.user);
      nav("/");
    } catch (error: any) {
      setErr(error?.response?.data?.message || "Login failed");
      toast.error(error?.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      {err && <div className="text-red-500 mb-2">{err}</div>}
      <form onSubmit={submit} className="flex flex-col gap-3">
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 border rounded"
        />
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 border rounded"
        />
        <button className="mt-2 px-4 py-2 rounded bg-pink-500 text-white">
          Login
        </button>
      </form>
    </div>
  );
}
