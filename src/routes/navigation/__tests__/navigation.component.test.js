import { fireEvent, screen } from "@testing-library/react";

import { renderWithProviders } from "../../../utils/test/test.utils";
import { signOutStart } from "../../../store/user/user.reducer";
import Navigation from "../navigation.component";

const mockDispatch = jest.fn();

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => mockDispatch,
}));

beforeEach(() => {
  mockDispatch.mockReset();
});

describe("Navigation tests", () => {
  test("should render sign in and not log out for unauthenticated user", () => {
    const preloadedState = {
      user: {
        currentUser: null,
      },
    };
    renderWithProviders(<Navigation />, { preloadedState });

    const signOutButton = screen.queryByText(/log out/i);
    expect(signOutButton).toBeNull();

    const signInButton = screen.getByText(/sign in/i);
    expect(signInButton).toBeInTheDocument();
  });

  test("should render log out and not sign in for authenticated user", () => {
    const preloadedState = {
      user: {
        currentUser: {},
      },
    };

    renderWithProviders(<Navigation />, { preloadedState });

    const signInButton = screen.queryByText(/sign in/i);
    expect(signInButton).toBeNull();

    const signOutButton = screen.getByText(/log out/i);
    expect(signOutButton).toBeInTheDocument();
  });

  test("should not render cart dropdown when cart is open", () => {
    const preloadedState = {
      cart: {
        cartIsOpen: false,
        cartItems: [],
      },
    };

    renderWithProviders(<Navigation />, { preloadedState });

    const dropdownCheckoutButton = screen.queryByText(/go to checkout/i);
    expect(dropdownCheckoutButton).toBeNull();
  });

  test("should render cart dropdown when cart is open", () => {
    const preloadedState = {
      cart: {
        cartIsOpen: true,
        cartItems: [],
      },
    };

    renderWithProviders(<Navigation />, { preloadedState });

    const dropdownCheckoutButton = screen.getByText(/go to checkout/i);
    expect(dropdownCheckoutButton).toBeInTheDocument();
  });

  test("should dispatch signOutStart action when log out button is clicked", () => {
    const preloadedState = {
      user: {
        currentUser: {},
      },
    };
    renderWithProviders(<Navigation />, { preloadedState });

    const logOutButton = screen.getByText(/log out/i);
    expect(logOutButton).toBeInTheDocument();

    fireEvent.click(logOutButton);
    expect(mockDispatch).toHaveBeenCalledWith(signOutStart());
  });
});
