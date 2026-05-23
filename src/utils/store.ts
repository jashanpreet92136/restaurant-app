import { ActionType, CartType, CartItemType } from "@/types/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const INITIAL_STATE: CartType = {
  products: [],
  totalItems: 0,
  totalPrice: 0,
};

export const useCartStore = create(
  persist<CartType & ActionType>(
    (set, get) => ({
      products: INITIAL_STATE.products,
      totalItems: INITIAL_STATE.totalItems,
      totalPrice: INITIAL_STATE.totalPrice,

      addToCart(item) {
        const products = get().products;
        const productInState = products.find(
          (product) => product.id === item.id,
        );

        if (productInState) {
          const updateProducts = products.map((product) =>
            product.id === productInState.id
              ? {
                  ...item,
                  quantity: product.quantity + item.quantity,
                  price: item.price + product.price,
                }
              : product,
          );
          set((state) => ({
            products: updateProducts,
            totalItems: state.totalItems + item.quantity,
            totalPrice: state.totalPrice + item.price,
          }));
        } else {
          set((state) => ({
            products: [...state.products, item],
            totalItems: state.totalItems + item.quantity,
            totalPrice: state.totalPrice + item.price,
          }));
        }
      },
      clearCart: () => set(INITIAL_STATE),
      removeFromCart(item) {
        set((state) => ({
          products: state.products.filter((p) => p.id !== item.id),
          totalItems: state.totalItems - item.quantity,
          totalPrice: state.totalPrice - item.price,
        }));
      },
    }),
    { name: "cart" },
  ),
);
