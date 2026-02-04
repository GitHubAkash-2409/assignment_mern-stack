"use client";

import useCartStore from "@/stores/cartStore";
import { Trash2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

const CartPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const activeStep = parseInt(searchParams.get("step") || "1");
  const { cart, removeFromCart } = useCartStore();

  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
      {/* TITLE */}
      <h1 className="text-2xl sm:text-3xl font-semibold text-center mb-8">
        Your Shopping Cart
      </h1>

      {/* CONTENT */}
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        {/* CART ITEMS */}
        <div className="w-full lg:w-7/12">
          <div className="flex flex-col gap-4">
            {cart.length === 0 && (
              <p className="text-gray-500 text-center py-12">
                Your cart is empty.
              </p>
            )}

            {cart.map((item) => (
              <div
                key={item._id || item.id}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 border rounded-lg"
              >
                {/* LEFT */}
                <div className="flex items-start gap-4">
                  <img
                    src={item.image || "/placeholder.png"}
                    alt={item.title}
                    className="w-20 h-20 rounded-md object-cover flex-shrink-0"
                  />

                  <div className="space-y-1">
                    <h3 className="font-medium text-sm sm:text-base">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-500 line-clamp-2">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* RIGHT */}
                <div className="flex items-center justify-between sm:justify-end gap-4">
                  <p className="font-medium text-sm sm:text-base">
                    ${item.price.toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-500">
                    Qty: {item.quantity}
                  </p>
                  <button
                    onClick={() => removeFromCart(item)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SUMMARY */}
        <div className="w-full lg:w-5/12">
          <div className="border rounded-lg p-6 sm:p-8 flex flex-col gap-6 lg:sticky lg:top-24">
            <h2 className="font-semibold text-lg">Cart Details</h2>

            <div className="flex flex-col gap-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Subtotal</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Discount (10%)</span>
                <span className="font-medium">-$10.00</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Shipping Fee</span>
                <span className="font-medium">$10.00</span>
              </div>

              <hr />

              <div className="flex justify-between text-base font-semibold">
                <span>Total</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
            </div>

            <button className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-900 transition">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
