import ProductCard from "./ProductCard";
import Link from "next/link";
import { ProductsType } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

const ProductList = async ({
  category,
  params,
}: {
  category?: string;
  params: "homepage" | "products";
}) => {
  let products: ProductsType = [];
  
  try {
    const res = await fetch(`${API_URL}/api/products`, { 
      cache: "no-store",
      next: { revalidate: 0 }
    });
    if (res.ok) {
      products = await res.json();
    } else {
      console.error("Failed to fetch products:", res.status);
    }
  } catch (error) {
    console.error("Error fetching products:", error);
  }

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 gap-12">
        {products && products.length > 0 ? (
          products.map((product) => (
            <ProductCard
              key={product._id || product.id}
              product={product}
            />
          ))
        ) : (
          <p className="text-gray-500">No products found.</p>
        )}
      </div>
      <Link
        href={category ? `/products/?category=${category}` : "/products"}
        className="flex justify-end mt-4 underline text-sm text-gray-500"
      >
        View all products
      </Link>
    </div>
  );
};

export default ProductList;
