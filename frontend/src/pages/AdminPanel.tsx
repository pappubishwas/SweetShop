import React, { useEffect, useState } from "react";
import API from "../lib/api";
import { toast } from "react-toastify";

export default function AdminPanel() {
  const [sweets, setSweets] = useState<any[]>([]);
  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    quantity: "",
    description: "",
  });

  // Track editing/restocking states
  const [editingId, setEditingId] = useState<string | null>(null);
  const [restockId, setRestockId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState({ name: "" });
  const [restockValue, setRestockValue] = useState({ qty: "" });

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    const { data } = await API.get("/sweets");
    setSweets(data);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    await API.post("/sweets", {
      ...form,
      price: Number(form.price),
      quantity: Number(form.quantity),
    });
    setForm({ name: "", category: "", price: "", quantity: "", description: "" });
    fetchAll();
  };

  const del = async (id: string) => {
    if (!confirm("Delete?")) return;
    const {data}= await API.delete(`/sweets/${id}`);
    if(data.message=="Deleted")
    toast.success("Successfully Deleted!")
  else 
    toast.error(data.message);
    fetchAll();
  };

  const saveEdit = async (id: string) => {
    await API.put(`/sweets/${id}`, { name: editValue.name });
    setEditingId(null);
    setEditValue({ name: "" });
    fetchAll();
  };

  const saveRestock = async (id: string) => {
    await API.post(`/sweets/${id}/restock`, { qty: Number(restockValue.qty) });
    setRestockId(null);
    setRestockValue({ qty: "" });
    fetchAll();
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Admin Panel</h2>

      {/* Add Sweet */}
      <form onSubmit={submit} className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="p-2 border rounded"
        />
        <input
          placeholder="Category"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          className="p-2 border rounded"
        />
        <input
          placeholder="Price"
          type="number"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          className="p-2 border rounded"
        />
        <input
          placeholder="Quantity"
          type="number"
          value={form.quantity}
          onChange={(e) => setForm({ ...form, quantity: e.target.value })}
          className="p-2 border rounded"
        />
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="p-2 border rounded col-span-2"
        />
        <button className="px-4 py-2 rounded bg-green-400 col-span-2">Add Sweet</button>
      </form>

      {/* List of sweets */}
      <div className="space-y-3">
        {sweets.map((s) => (
          <div
            key={s._id}
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 bg-gray-50 rounded gap-3"
          >
            <div>
              <div className="font-semibold">
                {s.name} <span className="text-xs text-gray-500">({s.category})</span>
              </div>
              <div className="text-sm">₹{s.price} • Stock: {s.quantity}</div>
            </div>

            <div className="flex gap-2 flex-wrap">
              {editingId === s._id ? (
                <>
                  <input
                    type="text"
                    value={editValue.name}
                    onChange={(e) => setEditValue({ name: e.target.value })}
                    className="border p-1 rounded"
                  />
                  <button
                    onClick={() => saveEdit(s._id)}
                    className="px-2 py-1 bg-blue-400 rounded text-white"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="px-2 py-1 bg-gray-300 rounded"
                  >
                    Cancel
                  </button>
                </>
              ) : restockId === s._id ? (
                <>
                  <input
                    type="number"
                    value={restockValue.qty}
                    onChange={(e) => setRestockValue({ qty: e.target.value })}
                    className="border p-1 rounded w-20"
                  />
                  <button
                    onClick={() => saveRestock(s._id)}
                    className="px-2 py-1 bg-yellow-500 rounded text-white"
                  >
                    Add
                  </button>
                  <button
                    onClick={() => setRestockId(null)}
                    className="px-2 py-1 bg-gray-300 rounded"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      setEditingId(s._id);
                      setEditValue({ name: s.name });
                    }}
                    className="px-2 py-1 rounded bg-indigo-200"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      setRestockId(s._id);
                      setRestockValue({ qty: "" });
                    }}
                    className="px-2 py-1 rounded bg-yellow-200"
                  >
                    Restock
                  </button>
                  <button
                    onClick={() => del(s._id)}
                    className="px-2 py-1 rounded bg-red-200"
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
