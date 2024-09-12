import { screen } from "@testing-library/react";

import { renderWithProviders } from "../../../utils/test/test.utils";
import Category from "../category.component";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({
    category: "mens",
  }),
}));

describe("Category tests", () => {
  test("should display spinner when isLoading is true", () => {
    const preloadedState = {
      categories: {
        isLoading: true,
        categories: [],
      },
    };
    renderWithProviders(<Category />, { preloadedState });

    const spinnerElement = screen.getByTestId("spinner");
    expect(spinnerElement).toBeInTheDocument();
  });

  test("should display products when isLoading is false and there are items", () => {
    const preloadedState = {
      categories: {
        isLoading: false,
        categories: [
          {
            title: "Mens",
            items: [
              { id: 1, name: "Product 1" },
              { id: 2, name: "Product 2" },
            ],
          },
        ],
      },
    };
    renderWithProviders(<Category />, { preloadedState });

    const spinnerElement = screen.queryByTestId("spinner");
    expect(spinnerElement).toBeNull();

    const product1Element = screen.getByText(/product 1/i);
    expect(product1Element).toBeInTheDocument();
  });
});
