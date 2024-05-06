import { useContext } from "react";

import { CartContext } from "../../contexts/cart.context";

import { CartIconContainer, ShoppingIcon, ItemCount } from "./cart-icon.styles";

const CartIcon = () => {
  const { cartIsOpen, setCartIsOpen, cartCount } = useContext(CartContext);

  const toggleCartIsOpen = () => {
    setCartIsOpen(!cartIsOpen);
  };

  return (
    <CartIconContainer onClick={toggleCartIsOpen}>
      <ShoppingIcon className="shopping-icon" />
      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  );
};

export default CartIcon;
