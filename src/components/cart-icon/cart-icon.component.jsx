import { useDispatch, useSelector } from "react-redux";
import { setCartIsOpen } from "../../store/cart/cart.actions";
import {
  selectCartCount,
  selectCartIsOpen,
} from "../../store/cart/cart.selector";

import { CartIconContainer, ShoppingIcon, ItemCount } from "./cart-icon.styles";

const CartIcon = () => {
  const dispatch = useDispatch();

  const cartIsOpen = useSelector(selectCartIsOpen);
  const cartCount = useSelector(selectCartCount);

  const toggleCartIsOpen = () => {
    dispatch(setCartIsOpen(!cartIsOpen));
  };

  return (
    <CartIconContainer onClick={toggleCartIsOpen}>
      <ShoppingIcon className="shopping-icon" />
      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  );
};

export default CartIcon;
