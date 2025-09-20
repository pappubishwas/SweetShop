import React, { useEffect, useState } from "react";
import API from "../lib/api";

export default function AdminPanel() {
  const [sweets, setSweets] = useState<any[]>([]);
  const [form, setForm] = useState({ name: "", category: "", price: 0, quantity: 0, description: "" });

  useEffect(()=> { fetchAll(); }, []);

  const fetchAll = async () => {
    const { data } = await API.get("/sweets");
    setSweets(data);
  };

  const submit = async (e: any) => {
    e.preventDefault();
    await API.post("/sweets", form);
    setForm({ name: "", category: "", price: 0, quantity: 0, description: "" });
    fetchAll();
  };

  const del = async (id: string) => {
    if (!confirm("Delete?")) return;
    await API.delete(`/sweets/${id}`);
    fetchAll();
  };

  const restock = async (id: string) => {
    const qty = Number(prompt("Quantity to add", "10"));
    if (!qty) return;
    await API.post(`/sweets/${id}/restock`, { qty });
    fetchAll();
  };

  const update = async (id: string) => {
    const name = prompt("New name");
    if (!name) return;
    await API.put(`/sweets/${id}`, { name });
    fetchAll();
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Admin Panel</h2>

      <form onSubmit={submit} className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
        <input placeholder="Name" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} className="p-2 border rounded" />
        <input placeholder="Category" value={form.category} onChange={e=>setForm({...form, category:e.target.value})} className="p-2 border rounded" />
        <input placeholder="Price" type="number" value={form.price} onChange={e=>setForm({...form, price:Number(e.target.value)})} className="p-2 border rounded" />
        <input placeholder="Quantity" type="number" value={form.quantity} onChange={e=>setForm({...form, quantity:Number(e.target.value)})} className="p-2 border rounded" />
        <textarea placeholder="Description" value={form.description} onChange={e=>setForm({...form, description:e.target.value})} className="p-2 border rounded col-span-2" />
        <button className="px-4 py-2 rounded bg-green-400 col-span-2">Add Sweet</button>
      </form>

      <div className="space-y-3">
        {sweets.map(s => (
          <div key={s._id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
            <div>
              <div className="font-semibold">{s.name} <span className="text-xs text-gray-500">({s.category})</span></div>
              <div className="text-sm">₹{s.price} • Stock: {s.quantity}</div>
            </div>
            <div className="flex gap-2">
              <button onClick={()=>restock(s._id)} className="px-2 py-1 rounded bg-yellow-200">Restock</button>
              <button onClick={()=>update(s._id)} className="px-2 py-1 rounded bg-indigo-200">Edit</button>
              <button onClick={()=>del(s._id)} className="px-2 py-1 rounded bg-red-200">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
