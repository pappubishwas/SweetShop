import React, { useEffect, useState } from "react";
import API from "../lib/api";
import SweetCard from "../components/SweetCard";
import { setToken } from "../lib/api";
import { useNavigate } from "react-router-dom";

export default function Dashboard({ token ,user }: { token: string | null,user:any }) {
  const [sweets, setSweets] = useState<any[]>([]);
  const [q, setQ] = useState("");
  const nav = useNavigate();

  useEffect(()=> {
    fetchAll();
    setToken(token || undefined);
  }, [token]);

  const fetchAll = async () => {
    const { data } = await API.get("/sweets");
    setSweets(data);
  };

  const search = async (e: any) => {
    e.preventDefault();
    const { data } = await API.get("/sweets/search", { params: { q } });
    setSweets(data);
  };

  const purchase = async (id: string) => {
    try {
      await API.post(`/sweets/${id}/purchase`);
      fetchAll();
      alert("Purchased!");
    } catch (err: any) {
      alert(err?.response?.data?.message || "Failed");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <form onSubmit={search} className="flex gap-2">
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search sweets" className="p-2 border rounded" />
          <button className="px-3 py-1 rounded bg-pink-500 text-white">Search</button>
        </form>
        {
          user.isAdmin ? <button onClick={()=>nav("/admin")} className="px-3 py-1 rounded bg-indigo-100">Open Admin Panel</button> : <></>
        }
        
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {sweets.map(s => (
          <SweetCard key={s._id} sweet={s} onPurchase={purchase} disabled={s.quantity === 0} />
        ))}
      </div>
    </div>
  );
}
