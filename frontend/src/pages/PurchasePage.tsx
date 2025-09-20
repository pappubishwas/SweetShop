import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";   
import API from "../lib/api";

export default function PurchasePage() {
  const { id } = useParams(); 
  const nav = useNavigate();

  const [sweet, setSweet] = useState<any>(null);
  const [qty, setQty] = useState<string>("1"); 
  const [err, setErr] = useState("");

  useEffect(() => {
    fetchSweet();
  }, []);

  const fetchSweet = async () => {
    try {
      const { data } = await API.get(`/sweets/search`, { params: { q: "" } });
      const found = data.find((s: any) => s._id === id);
      setSweet(found);
    } catch (error: any) {
      setErr("Failed to load sweet");
    }
  };

  const confirmPurchase = async () => {
    if (!qty || Number(qty) < 1) {
      toast.error("Please enter a valid quantity");
      return;
    }
    try {
      await API.post(`/sweets/${id}/purchase`, { qty: Number(qty) });
      toast.success("Order placed successfully");
      nav("/");
    } catch (error: any) {
      setErr(error?.response?.data?.message || "Purchase failed");
      toast.error(error?.response?.data?.message || "Purchase failed");
    }
  };

  if (!sweet) return <div className="text-center p-6">{err || "Loading..."}</div>;

  const total = sweet.price * (Number(qty) || 0);

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Purchase {sweet.name}</h2>

      <div className="mb-4">
        <p className="text-gray-700">Price per unit: ₹{sweet.price}</p>
        <p className="text-gray-700">Available: {sweet.quantity}</p>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <label>Quantity:</label>
        <input
          type="number"
          value={qty}
          min={1}
          max={sweet.quantity}
          onChange={(e) => setQty(e.target.value)} 
          className="p-2 border rounded w-24"
        />
      </div>

      <p className="text-lg font-semibold mb-4">Total: ₹{total}</p>

      {err && <div className="text-red-500 mb-2">{err}</div>}

      <button
        onClick={confirmPurchase}
        className="px-4 py-2 rounded bg-pink-500 text-white"
      >
        Confirm Order
      </button>
    </div>
  );
}
