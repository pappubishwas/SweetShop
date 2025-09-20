import React from "react";

export default function SweetCard({ sweet, onPurchase, disabled }: any) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm flex flex-col">
      <div className="text-lg font-semibold">{sweet.name}</div>
      <div className="text-sm text-gray-500">{sweet.category}</div>
      <div className="mt-2 text-pink-600 font-bold">₹{sweet.price.toFixed(2)}</div>
      <div className="mt-1 text-xs text-gray-600">Stock: {sweet.quantity}</div>
      <p className="mt-3 text-sm text-gray-700 flex-1">{sweet.description}</p>
      <div className="mt-4 flex gap-2">
        <button disabled={disabled} onClick={() => onPurchase(sweet._id)} className="px-3 py-1 rounded bg-pink-500 text-white disabled:opacity-50">
          Purchase
        </button>
      </div>
    </div>
  );
}
