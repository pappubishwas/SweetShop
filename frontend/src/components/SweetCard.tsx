import React from "react";

export default function SweetCard({ sweet, onPurchase, disabled }: any) {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col">
      {/* Image  */}
      {sweet.imageUrl ? (
        <img
          src={sweet.imageUrl}
          alt={sweet.name}
          className="h-40 w-full object-cover"
        />
      ) : (
        <div className="h-40 w-full bg-gradient-to-br from-pink-100 to-yellow-100 flex items-center justify-center">
          <span className="text-3xl font-bold text-pink-600">
            {sweet.name?.charAt(0) || "S"}
          </span>
        </div>
      )}

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-gray-800">{sweet.name}</h3>
          <span className="bg-pink-100 text-pink-600 px-2 py-0.5 rounded-full text-sm font-medium">
            ₹{sweet.price.toFixed(2)}
          </span>
        </div>

        <p className="text-sm text-gray-500 mt-1">{sweet.category}</p>

        <div className="flex items-center gap-2 mt-2">
          <span
            className={`w-2 h-2 rounded-full ${
              sweet.quantity > 0 ? "bg-green-500" : "bg-red-500"
            }`}
          ></span>
          <span className="text-xs text-gray-600">
            {sweet.quantity > 0
              ? `In stock: ${sweet.quantity}`
              : "Out of stock"}
          </span>
        </div>

        <p className="text-sm text-gray-700 mt-3 flex-1 line-clamp-3">
          {sweet.description || "Delicious sweet to enjoy anytime!"}
        </p>

        {/* Actions */}
        <div className="mt-4">
          <button
            disabled={disabled}
            onClick={() => onPurchase(sweet._id)}
            className={`w-full px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
              disabled
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-pink-500 hover:bg-pink-600 text-white"
            }`}
          >
            {disabled ? "Unavailable" : "Purchase"}
          </button>
        </div>
      </div>
    </div>
  );
}
