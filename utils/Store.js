import { ACTIONS } from "@/config/config";
import Cookies from "js-cookie";
const { createContext, useReducer } = require("react");
export const Store = createContext();

const initialStore = {
  cart: Cookies.get("cart")
    ? JSON.parse(Cookies.get("cart"))
    : { cartItems: [] },
};

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.CART_ADD_ITEM: {
      const newItem = action.payload;
      const existItem = state.cart.cartItems.find(
        (item) => item.id === newItem.id
      );
      const cartItems = existItem
        ? state.cart.cartItems.map((item) =>
          item.name === existItem.name ? newItem : item
        )
        : [...state.cart.cartItems, newItem];

      Cookies.set("cart", JSON.stringify({ ...state.cart, cartItems }));

      return { ...state, cart: { ...state.cart, cartItems } };
    }
    default:
      return state;
  }
}
export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialStore);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{children}</Store.Provider>;
}
