import { useContext } from "react";

import { CartContext } from "../../contexts/cart.context";
import "./checkout-item.styles.scss";

const CheckoutItem = ({ checkoutItem }) => {
  const { name, imageUrl, quantity, price } = checkoutItem;
  const { addCartItem, removeCartItem, removeCartProduct } =
    useContext(CartContext);

  const addCartItemHandler = () => addCartItem(checkoutItem);
  const removeCartItemHandler = () => removeCartItem(checkoutItem);
  const removeCartProductHandler = () => removeCartProduct(checkoutItem);

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
