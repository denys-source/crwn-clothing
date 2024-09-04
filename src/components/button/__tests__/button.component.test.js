import { render, screen } from "@testing-library/react";
import Button, { BUTTON_TYPE_CLASSES } from "../button.component";

describe("button tests", () => {
  test("should render base button when nothing is passed", () => {
    render(<Button />);

    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toHaveStyle("background-color: white");
  });

  test("should render signin button when google button type is passed", () => {
    render(<Button buttonType={BUTTON_TYPE_CLASSES.google} />);

    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toHaveStyle("background-color: #357ae8");
  });

  test("should render inverted button when inverted button type is passed", () => {
    render(<Button buttonType={BUTTON_TYPE_CLASSES.inverted} />);

    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toHaveStyle("background-color: black");
  });

  test("should render disabled button when isLoading is true", () => {
    render(<Button isLoading={true} />);

    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toBeDisabled();
  });
});
