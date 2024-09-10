import { screen, fireEvent } from "@testing-library/react";

import ProductCard from "../product-card.component";
import { renderWithProviders } from "../../../utils/test/test.utils";

describe("Product Card tests", () => {
  test("should add product on Product Card button click", () => {
    const productMock = {
      id: 1,
      name: "Product A",
      imageUrl: "test",
      price: 10,
    };
    const preloadedState = {
      cart: {
        cartItems: [],
      },
    };

    const { store } = renderWithProviders(
      <ProductCard product={productMock} />,
      {
        preloadedState,
      },
    );

    const addToCartButton = screen.getByText(/add to cart/i);
    fireEvent.click(addToCartButton);

    expect(store.getState().cart.cartItems.length).toEqual(1);
  });
});
