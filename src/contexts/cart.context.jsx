import { createContext, useEffect, useState } from "react";

export const CartContext = createContext({
  cartIsOpen: false,
  setCartIsOpen: () => null,
  cartItems: [],
  addCartItem: () => null,
  removeCartItem: () => null,
  removeCartProduct: () => null,
  cartCount: 0,
  cartTotal: 0,
});

const addCartItemHelper = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find(
    (item) => item.id === productToAdd.id,
  );

  if (existingCartItem) {
    return cartItems.map((item) =>
      item.id === productToAdd.id
        ? { ...item, quantity: item.quantity + 1 }
        : item,
    );
  }
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItemHelper = (cartItems, productToRemove) => {
  return cartItems
    .map((item) =>
      item.id === productToRemove.id && item.quantity
        ? { ...item, quantity: item.quantity - 1 }
        : item,
    )
    .filter((item) => item.quantity);
};

const removeCartProductHelper = (cartItems, productToRemove) => {
  return cartItems.filter((item) => item.id !== productToRemove.id);
};

export const CartProvider = ({ children }) => {
  const [cartIsOpen, setCartIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    const updatedCartCount = cartItems.reduce(
      (prev, curr) => prev + curr.quantity,
      0,
    );
    setCartCount(updatedCartCount);
  }, [cartItems]);

  useEffect(() => {
    const updatedCartTotal = cartItems.reduce(
      (prev, curr) => prev + curr.price * curr.quantity,
      0,
    );
    setCartTotal(updatedCartTotal);
  }, [cartItems]);

  const addCartItem = (productToAdd) => {
    setCartItems(addCartItemHelper(cartItems, productToAdd));
  };
  const removeCartItem = (productToRemove) => {
    setCartItems(removeCartItemHelper(cartItems, productToRemove));
  };
  const removeCartProduct = (productToRemove) => {
    setCartItems(removeCartProductHelper(cartItems, productToRemove));
  };
  const value = {
    cartIsOpen,
    setCartIsOpen,
    cartItems,
    addCartItem,
    removeCartItem,
    removeCartProduct,
    cartCount,
    cartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
