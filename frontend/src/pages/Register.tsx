import React, { useState } from "react";
import API from "../lib/api";
import { useNavigate } from "react-router-dom";

export default function Register({ onRegister }: { onRegister: (token: string,user:any)=>void }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();
  const [err, setErr] = useState("");

  const submit = async (e: any) => {
    e.preventDefault();
    try {
      const { data } = await API.post("/auth/register", { email, password, name });
      onRegister(data.token, data.user);

      nav("/");
    } catch (error: any) {
      setErr(error?.response?.data?.message || "Register failed");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      {err && <div className="text-red-500 mb-2">{err}</div>}
      <form onSubmit={submit} className="flex flex-col gap-3">
        <input placeholder="Name" value={name} onChange={e=>setName(e.target.value)} className="p-2 border rounded" />
        <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} className="p-2 border rounded" />
        <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} className="p-2 border rounded" />
        <button className="mt-2 px-4 py-2 rounded bg-yellow-500">Register</button>
      </form>
    </div>
  );
}
