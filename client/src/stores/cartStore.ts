import { CartStoreActionsType, CartStoreStateType } from "@/types";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useCartStore = create<CartStoreStateType & CartStoreActionsType>()(
  persist(
    (set) => ({
      cart: [],
      hasHydrated: false,
      addToCart: (product) =>
        set((state) => {
          // normalize id field so we consistently compare by `id` (fall back to `_id`)
          const pid = (product as any).id || (product as any)._id || undefined;

          const existingIndex = state.cart.findIndex((p) => {
            const existingId = (p as any).id || (p as any)._id || undefined;
            return existingId !== undefined && existingId === pid;
          });

          if (existingIndex !== -1) {
            const updatedCart = [...state.cart];
            updatedCart[existingIndex].quantity += product.quantity || 1;
            return { cart: updatedCart };
          }

          // ensure added item has an `id` property for consistent comparisons
          const normalized = {
            ...(product as any),
            id: pid,
            quantity: product.quantity || 1,
          };

          return {
            cart: [...state.cart, normalized],
          };
        }),
      removeFromCart: (product) =>
        set((state) => {
          const pid = (product as any).id || (product as any)._id || undefined;
          return {
            cart: state.cart.filter((p) => {
              const existingId = (p as any).id || (p as any)._id || undefined;
              return existingId !== pid;
            }),
          };
        }),
      clearCart: () => set({ cart: [] }),
    }),
    {
      name: "cart",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.hasHydrated = true;
        }
      },
    }
  )
);

export default useCartStore;
