"use client";

import { ProductType } from "@/types";
import { useState } from "react";

type ProductModalProps = {
  product: ProductType | null;
  onClose: (saved?: boolean) => void;
  apiBase?: string;
};

export default function ProductModal({
  product,
  onClose,
  apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000",
}: ProductModalProps) {
  const [form, setForm] = useState<ProductType>(
    product || { title: "", description: "", price: 0, image: "", rating: 0 },
  );

  const isEdit = Boolean(product && (product._id || product.id));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isEdit) {
      await fetch(`${apiBase}/api/products/${product?._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    } else {
      await fetch(`${apiBase}/api/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    }
    onClose(true);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-md w-full max-w-xl">
        <h3 className="text-lg font-medium mb-4">
          {isEdit ? "Edit Product" : "Add Product"}
        </h3>
        <form onSubmit={submit} className="flex flex-col gap-3">
          <input
            className="border p-2"
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
          <input
            className="border p-2"
            placeholder="Image URL"
            value={form.image}
            onChange={(e) => setForm({ ...form, image: e.target.value })}
          />
          <textarea
            className="border p-2"
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
          <input
            type="text"
            className="border p-2"
            placeholder="Price"
            value={String(form.price || "")}
            onChange={(e) =>
              setForm({ ...form, price: parseFloat(e.target.value) || 0 })
            }
          />
          <input
            type="text"
            className="border p-2"
            placeholder="Rating"
            value={String(form.rating || "")}
            onChange={(e) =>
              setForm({ ...form, rating: parseFloat(e.target.value) || 0 })
            }
          />
          <div className="flex justify-end gap-2 mt-2">
            <button
              type="button"
              onClick={() => onClose(false)}
              className="px-3 py-1 border rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-3 py-1 bg-gray-800 text-white rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
