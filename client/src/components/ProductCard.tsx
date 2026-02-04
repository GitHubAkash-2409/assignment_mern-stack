"use client";

import useCartStore from "@/stores/cartStore";
import { ProductType } from "@/types";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";

const ProductCard = ({ product }: { product: ProductType }) => {
  const { addToCart } = useCartStore();

  const handleAddToCart = () => {
    addToCart({ ...product, quantity: 1 });
    toast.success("Product added to cart");
  };

  const imageSrc =
    typeof product.image === "string"
      ? product.image
      : ((Object.values(product.image ?? {})[0] as string) ??
        "/placeholder.png");

  return (
    <div className="group flex flex-col h-full rounded-lg border bg-white overflow-hidden transition-shadow hover:shadow-xl">
      {/* IMAGE */}
      <Link href={`/products/${product._id || product.id}`}>
        <div className="relative w-full aspect-[4/5] bg-gray-100 flex items-center justify-center overflow-hidden">
          <Image
            src={imageSrc}
            alt={product.title}
            fill
            className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        </div>
      </Link>

      {/* CONTENT */}
      <div className="flex flex-col flex-1 gap-3 p-4">
        {/* TITLE + RATING */}
        <div className="flex items-start justify-between gap-2">
          <h2 className="font-medium text-sm sm:text-base line-clamp-2">
            {product.title}
          </h2>
          <span className="text-xs sm:text-sm font-semibold text-amber-500 whitespace-nowrap">
            ★ {(product.rating || 0).toFixed(1)}
          </span>
        </div>

        {/* DESCRIPTION */}
        <p className="text-xs sm:text-sm text-gray-500 line-clamp-2">
          {product.description}
        </p>

        {/* PRICE + CTA */}
        <div className="mt-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <p className="font-semibold text-sm sm:text-base">
            ${(product.price || 0).toFixed(2)}
          </p>

          <button
            onClick={handleAddToCart}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-md border px-3 py-2 text-xs sm:text-sm font-medium transition
              hover:bg-black hover:text-white focus:outline-none focus:ring-2 focus:ring-black"
          >
            <ShoppingCart className="w-4 h-4" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
