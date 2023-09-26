import { useReducer } from "react";

import CartContext from "./cart-context";

const initialCartState = {
  items: [],
  finalAmount: 0
};

// using Reducer function to add or remove items from cart
const cartReducer = (state, action) => {
  if (action.type === "ADD_ITEM") {
    const updatedAmount =
      state.finalAmount + action.item.price * action.item.amount;

    const existingItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    const existingItem = state.items[existingItemIndex];
    let updatedItems;

    // updating only the amount if the item already exists in the cart
    // else adding the new item to the cart
    if (existingItem) {
      const updatedItem = {
        ...existingItem,
        amount: existingItem.amount + action.item.amount
      };

      updatedItems = [...state.items];
      updatedItems[existingItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }

    // returning the updated cart state
    return {
      items: updatedItems,
      finalAmount: updatedAmount
    };
  }

  if (action.type === "REMOVE_ITEM") {
    const existingItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );

    const existingItem = state.items[existingItemIndex];
    const updatedAmount = state.finalAmount - existingItem.price;

    let updatedItems;

    // removing the item from cart if it's ordered only once
    // else decreasing amount by 1
    if (existingItem.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
      updatedItems = [...state.items];
      updatedItems[existingItemIndex] = updatedItem;
    }

    // returning the updated cart state
    return {
      items: updatedItems,
      finalAmount: updatedAmount
    };
  }

  // returning default cart state if no item is added or removed initially
  return initialCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCart] = useReducer(cartReducer, initialCartState);

  const addItemHandler = (item) => {
    dispatchCart({ type: "ADD_ITEM", item: item });
  };

  const removeItemHandler = (id) => {
    dispatchCart({ type: "REMOVE_ITEM", id: id });
  };

  const cartContext = {
    items: cartState.items,
    finalAmount: cartState.finalAmount,
    addItem: addItemHandler,
    removeItem: removeItemHandler
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
