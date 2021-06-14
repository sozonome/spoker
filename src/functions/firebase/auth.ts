import firebase from "firebase/app";
import { fbase } from "./config";

export const registerUserWithEmailAndPassword = async (
  email: string,
  password: string,
  name: string
) => {
  return await fbase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((authState) => {
      authState?.user?.sendEmailVerification();

      const user = fbase.auth().currentUser;

      if (user !== null) {
        user.updateProfile({
          displayName: name,
        });

        return user;
      }
    });
};

export const loginUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  await fbase.auth().signInWithEmailAndPassword(email, password);
};

export const updateDisplayName = async (displayName: string) => {
  const user = fbase.auth().currentUser;

  if (user) {
    user.updateProfile({
      displayName,
    });
  }
};

export const requestVerificationMail = async () => {
  const user = fbase.auth().currentUser;

  if (user) {
    if (!user.emailVerified) {
      await user.sendEmailVerification();
      return;
    }

    throw new Error("Your email is already verified.");
  }

  throw new Error("Invalid Request");
};

export const handleVerifyEmail = async (actionCode: string) => {
  try {
    await fbase.auth().applyActionCode(actionCode);
  } catch (error) {
    throw error;
  }
};

export const logoutUser = async () => {
  await fbase.auth().signOut();
};

export const getCurrentUser = () => {
  const user = fbase.auth().currentUser;

  if (user) {
    return user;
  } else {
    return null;
  }
};

export const requestPasswordReset = async (email: string) => {
  await fbase.auth().sendPasswordResetEmail(email);
};

const showErrorToast = (toast: any, err: any) =>
  toast({
    description: err.message,
    status: "error",
    position: "top",
    isClosable: true,
    duration: 15000,
  });

export const loginWithGoogle = async (toast: any) => {
  const googleProvider = new firebase.auth.GoogleAuthProvider();

  fbase
    .auth()
    .signInWithPopup(googleProvider)
    .then((res) => res)
    .catch((err) => showErrorToast(toast, err));
};

export const loginWithGithub = async (toast: any) => {
  const githubProvider = new firebase.auth.GithubAuthProvider();

  fbase
    .auth()
    .signInWithPopup(githubProvider)
    .catch((err) => showErrorToast(toast, err));
};
