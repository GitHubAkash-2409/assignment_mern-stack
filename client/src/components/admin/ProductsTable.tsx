"use client";

import { ProductType } from "@/types";
import { useState } from "react";
import ProductModal from "./ProductModal";

type Props = {
  initial: ProductType[];
  apiBase?: string;
};

export default function ProductsTable({
  initial,
  apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000",
}: Props) {
  const [products, setProducts] = useState<ProductType[]>(initial || []);
  const [editing, setEditing] = useState<ProductType | null>(null);
  const [showModal, setShowModal] = useState(false);

  const refresh = async () => {
    const res = await fetch(`${apiBase}/api/products`);
    const data = await res.json();
    setProducts(data);
  };

  const handleDelete = async (id?: string) => {
    if (!id) return;
    if (!confirm("Delete this product?")) return;
    await fetch(`${apiBase}/api/products/${id}`, { method: "DELETE" });
    await refresh();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium">Products</h2>
        <div>
          <button
            onClick={() => {
              setEditing(null);
              setShowModal(true);
            }}
            className="bg-gray-800 text-white px-3 py-1 rounded-md"
          >
            Add Product
          </button>
        </div>
      </div>

      <div className="overflow-auto border rounded-md">
        <table className="w-full text-left">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-2">Image</th>
              <th className="p-2">Title</th>
              <th className="p-2">Price</th>
              <th className="p-2">Rating</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p._id || p.id} className="border-b">
                <td className="p-2 w-24">
                  <img
                    src={p.image || "/placeholder.png"}
                    alt={p.title}
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td className="p-2">{p.title}</td>
                <td className="p-2">${(p.price || 0).toFixed(2)}</td>
                <td className="p-2">{p.rating || "-"}</td>
                <td className="p-2">
                  <button
                    onClick={() => {
                      setEditing(p);
                      setShowModal(true);
                    }}
                    className="mr-2 text-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p._id)}
                    className="text-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <ProductModal
          apiBase={apiBase}
          product={editing}
          onClose={async (saved?: boolean) => {
            setShowModal(false);
            setEditing(null);
            if (saved) await refresh();
          }}
        />
      )}
    </div>
  );
}
