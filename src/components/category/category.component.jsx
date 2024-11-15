import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectCategoriesMap, selectCategoryIsLoading } from "../../store/categories/categories.selector";
import ProductCard from "../product-card/product-card.component";
import { Spinner } from "../spinner/spinner.component";

import "./category.styles.scss";

const Category = () => {
  const categoriesMap = useSelector(selectCategoriesMap);
  const isLoading = useSelector(selectCategoryIsLoading);
  const { category } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const products = categoriesMap[category];
    setProducts(products);
  }, [category, categoriesMap]);

  return (
    <Fragment>
      <h2 className="category-title">{category.toUpperCase()}</h2>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="category-container">
          {products &&
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </div>
      )}
    </Fragment>
  );
};

export default Category;
