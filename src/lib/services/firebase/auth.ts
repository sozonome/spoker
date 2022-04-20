import {
  applyActionCode,
  createUserWithEmailAndPassword,
  getAuth,
  GithubAuthProvider,
  GoogleAuthProvider,
  sendEmailVerification,
  updateProfile,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";

import { fbase } from "./config";

const auth = getAuth(fbase);

type RegisterUserWithEmailAndPasswordArgs = {
  email: string;
  password: string;
  name: string;
};

export const registerUserWithEmailAndPassword = async ({
  email,
  password,
  name,
}: RegisterUserWithEmailAndPasswordArgs) => {
  const authState = await createUserWithEmailAndPassword(auth, email, password);
  sendEmailVerification(authState.user);

  const user = auth.currentUser;

  if (!user) {
    return undefined;
  }

  updateProfile(user, {
    displayName: name,
  });

  return user;
};

export const loginUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  await signInWithEmailAndPassword(auth, email, password);
};

export const updateDisplayName = async (displayName: string) => {
  const user = auth.currentUser;

  if (user) {
    updateProfile(user, {
      displayName,
    });
  }
};

export const requestVerificationMail = async () => {
  const user = auth.currentUser;

  if (user) {
    if (!user.emailVerified) {
      await sendEmailVerification(user);
      return;
    }

    throw new Error("Your email is already verified.");
  }

  throw new Error("Invalid Request");
};

export const handleVerifyEmail = async (actionCode: string) => {
  await applyActionCode(auth, actionCode);
};

export const logoutUser = async () => {
  await signOut(auth);
};

export const getCurrentUser = () => {
  const user = auth.currentUser;

  if (user) {
    return user;
  }
  return null;
};

export const requestPasswordReset = async (email: string) => {
  await sendPasswordResetEmail(auth, email);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const showErrorToast = (toast: any, err: any) =>
  toast({
    description: err.message,
    status: "error",
    position: "top",
    isClosable: true,
    duration: 15000,
  });

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const loginWithGoogle = async (toast: any) => {
  const googleProvider = new GoogleAuthProvider();

  signInWithPopup(auth, googleProvider)
    .then((res) => res)
    .catch((err) => showErrorToast(toast, err));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const loginWithGithub = async (toast: any) => {
  const githubProvider = new GithubAuthProvider();

  signInWithPopup(auth, githubProvider).catch((err) =>
    showErrorToast(toast, err)
  );
};
