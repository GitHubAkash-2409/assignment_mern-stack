import ProductInteraction from "@/components/ProductInteraction";
import { ProductType } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export const generateMetadata = async ({
  params,
}: {
  params: { id: string };
}) => {
  try {
    const res = await fetch(`${API_URL}/api/products/${params.id}`);
    const product: ProductType = await res.json();
    return {
      title: product?.title || "Product",
      description: product?.description || "",
    };
  } catch (err) {
    return { title: "Product" };
  }
};

const ProductPage = async ({ params }: { params: { id: string } }) => {
  let product: ProductType | null = null;
  try {
    const res = await fetch(`${API_URL}/api/products/${params.id}`, {
      cache: "no-store",
      next: { revalidate: 0 },
    });
    if (res.ok) {
      product = await res.json();
    }
  } catch (err) {
    console.error("Failed to fetch product:", err);
  }

  if (!product) {
    return (
      <div className="mt-12 text-center text-gray-500">Product not found.</div>
    );
  }

  return (
    <div className="flex flex-col gap-4 lg:flex-row md:gap-12 mt-12">
      {/* IMAGE */}
      <div className="w-full lg:w-5/12 bg-gray-100 rounded-md overflow-hidden">
        <img
          src={product.image || "/placeholder.png"}
          alt={product.title}
          className="w-full h-auto object-contain"
        />
      </div>
      {/* DETAILS */}
      <div className="w-full lg:w-7/12 flex flex-col gap-4">
        <h1 className="text-2xl font-medium">{product.title}</h1>
        <p className="text-gray-500">{product.description}</p>
        {/* <div className="flex items-center justify-between pt-4">
            <span className="text-3xl font-semibold text-amber-500">★ {(product.rating || 0).toFixed(1)}</span>
          </div> */}
        <ProductInteraction product={product} />
        {/* CARD INFO */}
        <div className="flex items-center gap-2 mt-4">
          <img src="/cards.png" alt="cards" className="w-12 h-6 rounded-md" />
          <img src="/stripe.png" alt="stripe" className="w-12 h-6 rounded-md" />
        </div>
        <p className="text-gray-500 text-xs">
          By clicking Pay Now, you agree to our{" "}
          <span className="underline hover:text-black">Terms & Conditions</span>{" "}
          and <span className="underline hover:text-black">Privacy Policy</span>
          .
        </p>
      </div>
    </div>
  );
};

export default ProductPage;
