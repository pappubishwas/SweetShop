import React, { useEffect, useState } from "react";
import API, { setToken } from "../lib/api";
import SweetCard from "../components/SweetCard";
import { useNavigate } from "react-router-dom";
import { Listbox } from "@headlessui/react";
interface Sweet {
  _id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
  description?: string;
  imageUrl?: String;
  createdBy?: string;
}

export default function Dashboard({
  token,
  user,
}: {
  token: string | null;
  user: any;
}) {
  const [sweets, setSweets] = useState<Sweet[]>([]);
  const [q, setQ] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const nav = useNavigate();

  useEffect(() => {
    fetchAll();
    setToken(token || undefined);
  }, [token]);

  const fetchAll = async () => {
    const { data } = await API.get<Sweet[]>("/sweets");
    setSweets(data);

    const uniqueCategories = Array.from(
      new Set(data.map((s: Sweet) => s.category))
    );
    setCategories(uniqueCategories);
  };

  const search = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data } = await API.get<Sweet[]>("/sweets/search", {
      params: { q, category: category || undefined },
    });
    setSweets(data);
  };

  const purchase = (id: string) => {
    nav(`/purchase/${id}`);
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-2">
        <form
          onSubmit={search}
          className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto"
        >
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search sweets"
            className="p-2 border rounded flex-1"
          />

          <Listbox value={category} onChange={setCategory}>
            <div className="relative w-full sm:w-48">
              <Listbox.Button className="w-full p-2 border rounded bg-white text-left">
                {category || "All Categories"}
              </Listbox.Button>
              <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded bg-white shadow-lg z-10">
                <Listbox.Option value="">
                  {({ active }) => (
                    <div className={`p-2 ${active ? "bg-pink-100" : ""}`}>
                      All Categories
                    </div>
                  )}
                </Listbox.Option>
                {categories.map((c) => (
                  <Listbox.Option key={c} value={c}>
                    {({ active }) => (
                      <div className={`p-2 ${active ? "bg-pink-100" : ""}`}>
                        {c}
                      </div>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </div>
          </Listbox>

          <button className="px-3 py-2 rounded bg-pink-500 text-white sm:w-auto">
            Search
          </button>
        </form>


      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {sweets.map((s) => (
          <SweetCard
            key={s._id}
            sweet={s}
            onPurchase={purchase}
            disabled={s.quantity === 0}
          />
        ))}
      </div>
    </div>
  );
}
