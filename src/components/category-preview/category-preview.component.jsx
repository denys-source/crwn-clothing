import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import ProductCard from "../product-card/product-card.component";
import { selectCategoryIsLoading } from "../../store/categories/categories.selector";

import "./category-preview.styles.scss";
import { Spinner } from "../spinner/spinner.component";

const CategoryPreview = ({ title, products }) => {
  const isLoading = useSelector(selectCategoryIsLoading);

  return (
    <div className="category-preview-container">
      <h2>
        <Link className="title" to={title}>
          {title.toUpperCase()}
        </Link>
      </h2>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="preview">
          {products
            .filter((_, idx) => idx < 4)
            .map((product) => {
              return <ProductCard key={product.id} product={product} />;
            })}
        </div>
      )}
    </div>
  );
};

export default CategoryPreview;
