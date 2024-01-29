import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDJHacrQE8_ItuA3Fbd1GWu02pZGh-MR-w",
  authDomain: "crwn-db-9b7e3.firebaseapp.com",
  projectId: "crwn-db-9b7e3",
  storageBucket: "crwn-db-9b7e3.appspot.com",
  messagingSenderId: "647153263725",
  appId: "1:647153263725:web:52ac6e8ae662aa24c34b64",
};

const firebaseApp = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const db = getFirestore();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const createUserDocument = async (user) => {
  const userDocRef = doc(db, "users", user.uid);
  const userDocSnapshot = await getDoc(userDocRef);

  if (!userDocSnapshot.exists()) {
    const { displayName, email } = user;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, { displayName, email, createdAt });
    } catch (err) {
      console.error(err.message);
    }
  }

  return userDocRef;
};
