import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";

import { auth } from "lib/services/firebase/auth/common";
import { showErrorToast } from "lib/services/firebase/utils";

export const loginUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  await signInWithEmailAndPassword(auth, email, password);
};

export const loginWithGoogle = async () => {
  const googleProvider = new GoogleAuthProvider();

  signInWithPopup(auth, googleProvider).catch((err) => showErrorToast(err));
};
