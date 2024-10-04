import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
  NextOrObserver,
} from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getFirestore,
  setDoc,
  writeBatch,
  query,
  getDocs,
  QueryDocumentSnapshot,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDJHacrQE8_ItuA3Fbd1GWu02pZGh-MR-w",
  authDomain: "crwn-db-9b7e3.firebaseapp.com",
  projectId: "crwn-db-9b7e3",
  storageBucket: "crwn-db-9b7e3.appspot.com",
  messagingSenderId: "647153263725",
  appId: "1:647153263725:web:52ac6e8ae662aa24c34b64",
};

initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const db = getFirestore();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export type AdditionalOptions = {
  displayName?: string;
}

export type UserData = {
  email: string;
  displayName: string;
  createdAt: Date;
}

export const createUserDocument = async (user: User, additionalOptions = {} as AdditionalOptions): Promise<QueryDocumentSnapshot<UserData>> => {
  const userDocRef = doc(db, "users", user.uid);
  const userDocSnapshot = await getDoc(userDocRef);

  if (!userDocSnapshot.exists()) {
    const { displayName, email } = { ...user, ...additionalOptions };
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, { displayName, email, createdAt });
    } catch (err) {
      console.error(err);
    }
  }

  return userDocSnapshot as QueryDocumentSnapshot<UserData>;
};

export type ObjectToAdd = {
  [key: string]: string;
}

export const addCollectionAndDocuments = async <T extends ObjectToAdd>(
  collectionKey: string,
  objectsToAdd: T[],
  field: keyof T,
) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach(async (object) => {
    const docRef = doc(collectionRef, object[field].toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
};

export const getCollectionDocuments = async (collectionKey: string) => {
  const collectionRef = collection(db, collectionKey);
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((docSnapshot) => docSnapshot.data());
};

export const createAuthUserWithEmailAndPassword = async (email: string, password: string) => {
  if (!email || !password) {
    return;
  }

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email: string, password: string) => {
  if (!email || !password) {
    return;
  }

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutAuthUser = async () => {
  await signOut(auth);
};

export const onAuthStateChangedObserver = (callback: NextOrObserver<User>) => {
  onAuthStateChanged(auth, callback);
};

export const getCurrentUser = (): Promise<User | null> => {
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      unsubscribe();
      resolve(authUser);
    });
  });
};
