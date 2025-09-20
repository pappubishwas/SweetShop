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
    image: null as File | null,
  });

  const [editingId, setEditingId] = useState<string | null>(null);
  const [restockId, setRestockId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState({
    name: "",
    category: "",
    price: "",
    quantity: "",
    description: "",
    image: null as File | null,
  });

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

    const fd = new FormData();
    fd.append("name", form.name);
    fd.append("category", form.category);
    fd.append("price", form.price);
    fd.append("quantity", form.quantity);
    fd.append("description", form.description);
    if (form.image) fd.append("image", form.image);

    await API.post("/sweets", fd, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    setForm({
      name: "",
      category: "",
      price: "",
      quantity: "",
      description: "",
      image: null,
    });
    fetchAll();
  };

  const del = async (id: string) => {
    if (!confirm("Delete?")) return;
    const { data } = await API.delete(`/sweets/${id}`);
    if (data.message == "Deleted") toast.success("Successfully Deleted!");
    else toast.error(data.message);
    fetchAll();
  };

  const saveEdit = async (id: string) => {
    const fd = new FormData();
    fd.append("name", editValue.name);
    fd.append("category", editValue.category);
    fd.append("price", String(Number(editValue.price)));
    fd.append("quantity", String(Number(editValue.quantity)));
    fd.append("description", editValue.description);
    if (editValue.image) fd.append("image", editValue.image);

    await API.put(`/sweets/${id}`, fd, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    toast.success("Sweet updated!");
    setEditingId(null);
    setEditValue({
      name: "",
      category: "",
      price: "",
      quantity: "",
      description: "",
      image: null,
    });
    fetchAll();
  };

  const saveRestock = async (id: string) => {
    if (!restockValue.qty || Number(restockValue.qty) <= 0) {
      toast.error("Enter a valid quantity");
      return;
    }
    await API.post(`/sweets/${id}/restock`, { qty: Number(restockValue.qty) });
    toast.success("Stock updated!");
    setRestockId(null);
    setRestockValue({ qty: "" });
    fetchAll();
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Admin Panel</h2>

      {/* Add Sweet */}
      <form
        onSubmit={submit}
        className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6"
      >
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

        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            setForm({
              ...form,
              image: e.target.files ? e.target.files[0] : null,
            })
          }
          className="p-2 border rounded col-span-2"
        />

        <button className="px-4 py-2 rounded bg-green-400 col-span-2">
          Add Sweet
        </button>
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
                {s.name}{" "}
                <span className="text-xs text-gray-500">({s.category})</span>
              </div>
              <div className="text-sm">
                ₹{s.price} • Stock: {s.quantity}
              </div>
            </div>

            <div className="flex gap-2 flex-wrap">
              {/* If editing button is clicked */}
              {editingId === s._id ? (
                <>
                  <div className="bg-white p-4 rounded shadow w-full">
                    <input
                      value={editValue.name}
                      onChange={(e) =>
                        setEditValue({ ...editValue, name: e.target.value })
                      }
                      placeholder="Name"
                      className="p-2 border rounded w-full mb-2"
                    />
                    <input
                      value={editValue.category}
                      onChange={(e) =>
                        setEditValue({ ...editValue, category: e.target.value })
                      }
                      placeholder="Category"
                      className="p-2 border rounded w-full mb-2"
                    />
                    <input
                      type="number"
                      value={editValue.price}
                      onChange={(e) =>
                        setEditValue({ ...editValue, price: e.target.value })
                      }
                      placeholder="Price"
                      className="p-2 border rounded w-full mb-2"
                    />
                    <input
                      type="number"
                      value={editValue.quantity}
                      onChange={(e) =>
                        setEditValue({ ...editValue, quantity: e.target.value })
                      }
                      placeholder="Quantity"
                      className="p-2 border rounded w-full mb-2"
                    />
                    <textarea
                      value={editValue.description}
                      onChange={(e) =>
                        setEditValue({
                          ...editValue,
                          description: e.target.value,
                        })
                      }
                      placeholder="Description"
                      className="p-2 border rounded w-full mb-2"
                    />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        setEditValue({
                          ...editValue,
                          image: e.target.files ? e.target.files[0] : null,
                        })
                      }
                      className="p-2 border rounded w-full mb-2"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => saveEdit(s._id)}
                        className="px-3 py-1 bg-blue-500 text-white rounded"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="px-3 py-1 bg-gray-300 rounded"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
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
                      setEditValue({
                        name: s.name,
                        category: s.category,
                        price: String(s.price),
                        quantity: String(s.quantity),
                        description: s.description || "",
                        image: null,
                      });
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
