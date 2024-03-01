import { useContext } from "react";

import { CartContext } from "../../contexts/cart.context";

import { ReactComponent as ShoppingIcon } from "./../../assets/shopping-bag.svg";
import "./cart-icon.styles.scss";

const CartIcon = () => {
  const { cartIsOpen, setCartIsOpen } = useContext(CartContext);

  const toggleCartIsOpen = () => {
    setCartIsOpen(!cartIsOpen);
  };

  return (
    <div className="cart-icon-container" onClick={toggleCartIsOpen}>
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count">0</span>
    </div>
  );
};

export default CartIcon;
