export type ProductType = {
  _id?: string;
  id?: string | number;
  title: string;
  price: number;
  description: string;
  category?: string;
  image?: string;
  rating?: number;
};

export type ProductsType = ProductType[];

export type CartItemType = ProductType & {
  quantity: number;
};

export type CartItemsType = CartItemType[];

export type CartStoreStateType = {
  cart: CartItemsType;
  hasHydrated: boolean;
};

export type CartStoreActionsType = {
  addToCart: (product: CartItemType) => void;
  removeFromCart: (product: CartItemType) => void;
  clearCart: () => void;
};
