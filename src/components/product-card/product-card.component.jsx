import { useDispatch } from "react-redux";
import { addCartItem } from "../../store/cart/cart.reducer";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";

import "./product-card.styles.scss";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const { name, price, imageUrl } = product;

  const clickHandler = () => {
    dispatch(addCartItem(product));
  };

  return (
    <div className="product-card-container">
      <img src={imageUrl} alt={name} />
      <div className="footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>
      <Button buttonType={BUTTON_TYPE_CLASSES.inverted} onClick={clickHandler}>
        Add to cart
      </Button>
    </div>
  );
};

export default ProductCard;
