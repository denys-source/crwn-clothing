import { createContext, useEffect, useState } from "react";

export const CartContext = createContext({
  cartIsOpen: false,
  setCartIsOpen: () => null,
  cartItems: [],
  addCartItem: () => null,
  cartCount: 0,
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

export const CartProvider = ({ children }) => {
  const [cartIsOpen, setCartIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const updatedCartCount = cartItems.reduce(
      (prev, curr) => prev + curr.quantity,
      0,
    );
    setCartCount(updatedCartCount);
  }, [cartItems]);

  const addCartItem = (productToAdd) => {
    setCartItems(addCartItemHelper(cartItems, productToAdd));
  };
  const value = {
    cartIsOpen,
    setCartIsOpen,
    cartItems,
    addCartItem,
    cartCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
