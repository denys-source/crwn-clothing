import Button from "../../components/button/button.component";
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import {
  createUserDocument,
  signInWithGooglePopup,
} from "../../utils/firebase/firebase.utils";

const SignIn = () => {
  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    await createUserDocument(user);
  };
  return (
    <div>
      <h1>Sign In</h1>
      <Button onClick={logGoogleUser} buttonType="google">
        Sign in with Google
      </Button>
      <SignUpForm />
    </div>
  );
};

export default SignIn;
