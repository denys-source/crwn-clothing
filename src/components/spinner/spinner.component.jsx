import { SpinnerContainer, SpinnerOverlay } from "./spinner.styles";

export const Spinner = () => {
  return (
    <SpinnerOverlay data-testid="spinner">
      <SpinnerContainer />
    </SpinnerOverlay>
  );
};
