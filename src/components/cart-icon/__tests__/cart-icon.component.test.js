import { screen } from "@testing-library/react";

import { renderWithProviders } from "../../../utils/test/test.utils";
import CartIcon from "../cart-icon.component";

describe("Cart Icon Tests", () => {
  test("should use preloaded state", () => {
    const preloadedState = {
      cart: {
        cartItems: [
          { id: 1, name: "Item A", imageUrl: "test", price: 10, quantity: 1 },
          { id: 2, name: "Item B", imageUrl: "test", price: 10, quantity: 2 },
        ],
      },
    };
    renderWithProviders(<CartIcon />, { preloadedState });

    const cartIconElement = screen.getByText("3");
    expect(cartIconElement).toBeInTheDocument();
  });
});
