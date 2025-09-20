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

  // search function for search the sweets
  const fetchSweet = async () => {
    try {
      const { data } = await API.get(`/sweets/search`, { params: { q: "" } });
      const found = data.find((s: any) => s._id === id);
      setSweet(found);
    } catch (error: any) {
      setErr("Failed to load sweet");
    }
  };

  // confirm function for purchase
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

  if (!sweet)
    return <div className="text-center p-6">{err || "Loading..."}</div>;

  const total = sweet.price * (Number(qty) || 0);

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg border border-gray-200">
      <h2 className="text-2xl font-bold mb-6 text-center text-pink-600">
        {sweet.name}
      </h2>

      {/* Sweet Image */}
      {sweet.imageUrl && (
        <div className="flex justify-center mb-6">
          <img
            src={sweet.imageUrl}
            alt={sweet.name}
            className="w-48 h-48 object-cover rounded-lg shadow-md"
          />
        </div>
      )}

      {/* Sweet Details */}
      <div className="mb-6 space-y-2 text-gray-700">
        <p>
          <span className="font-semibold">Price per unit:</span> ₹{sweet.price}
        </p>
        <p>
          <span className="font-semibold">Available:</span> {sweet.quantity}
        </p>
      </div>

      {/* Quantity Selector */}
      <div className="flex items-center gap-4 mb-6">
        <label className="font-medium text-gray-700">Quantity:</label>
        <input
          type="number"
          value={qty}
          min={1}
          max={sweet.quantity}
          onChange={(e) => setQty(e.target.value)}
          className="p-2 border border-gray-300 rounded w-20 focus:outline-none focus:ring-2 focus:ring-pink-400"
        />
      </div>

      {/* Total */}
      <p className="text-lg font-semibold mb-6 text-gray-800">
        Total: ₹{total}
      </p>

      {/* Error */}
      {err && <div className="text-red-500 mb-4 text-center">{err}</div>}

      {/* Confirm Button */}
      <button
        onClick={confirmPurchase}
        className="w-full py-3 rounded-lg bg-pink-500 hover:bg-pink-600 text-white font-semibold transition"
      >
        Confirm Order
      </button>
    </div>
  );
}
