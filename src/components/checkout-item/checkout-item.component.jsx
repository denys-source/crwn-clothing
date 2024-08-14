import { useDispatch, useSelector } from "react-redux";
import {
  addCartItem,
  removeCartItem,
  removeCartProduct,
} from "../../store/cart/cart.actions";
import { selectCartItems } from "../../store/cart/cart.selector";

import "./checkout-item.styles.scss";

const CheckoutItem = ({ checkoutItem }) => {
  const dispatch = useDispatch();

  const cartItems = useSelector(selectCartItems);
  const { name, imageUrl, quantity, price } = checkoutItem;

  const addCartItemHandler = () =>
    dispatch(addCartItem(cartItems, checkoutItem));
  const removeCartItemHandler = () =>
    dispatch(removeCartItem(cartItems, checkoutItem));
  const removeCartProductHandler = () =>
    dispatch(removeCartProduct(cartItems, checkoutItem));

  return (
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={imageUrl} alt={name} />
      </div>
      <span className="name">{name}</span>
      <span className="quantity">
        <div className="arrow" onClick={removeCartItemHandler}>
          &#10094;
        </div>
        <span className="value">{quantity}</span>
        <div className="arrow" onClick={addCartItemHandler}>
          &#10095;
        </div>
      </span>
      <span className="price">{price}</span>
      <div className="remove-button" onClick={removeCartProductHandler}>
        &#10005;
      </div>
    </div>
  );
};

export default CheckoutItem;
