import { BaseButton, InvertedButton, SignInButton } from "./button.styles";

export const BUTTON_TYPE_CLASSES = {
  base: "base",
  inverted: "inverted",
  google: "google-sign-in",
};

const getButton = (buttonType = BUTTON_TYPE_CLASSES.base) => {
  return {
    [BUTTON_TYPE_CLASSES.base]: BaseButton,
    [BUTTON_TYPE_CLASSES.google]: SignInButton,
    [BUTTON_TYPE_CLASSES.inverted]: InvertedButton,
  }[buttonType];
};

const Button = ({ children, buttonType, isLoading, ...otherProps }) => {
  const ButtonComponent = getButton(buttonType);
  return (
    <ButtonComponent disabled={isLoading} {...otherProps}>
      {children}
    </ButtonComponent>
  );
};

export default Button;
