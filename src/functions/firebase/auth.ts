import firebase from "firebase/app";
import { fbase } from "./config";

export const registerUserWithEmailAndPassword = async (
  email: string,
  password: string,
  name: string
) => {
  try {
    await fbase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((authState) => {
        authState.user.sendEmailVerification();
      });

    const user = fbase.auth().currentUser;

    if (user !== null) {
      user.updateProfile({
        displayName: name,
      });

      return user;
    }
  } catch (error) {
    throw error;
  }
};

export const loginUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  try {
    await fbase.auth().signInWithEmailAndPassword(email, password);
  } catch (error) {
    throw error;
  }
};

export const requestVerificationMail = async () => {
  const user = fbase.auth().currentUser;

  if (user) {
    if (!user.emailVerified) {
      try {
        await user.sendEmailVerification();
      } catch (error) {
        throw error;
      }
    } else {
      throw { message: "Your email is already verified." };
    }
  } else {
    throw { message: "Invalid Request" };
  }
};

export const handleVerifyEmail = async (actionCode: string) => {
  try {
    await fbase.auth().applyActionCode(actionCode);
  } catch (error) {
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    await fbase.auth().signOut();
  } catch (error) {
    throw error;
  }
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
  try {
    await fbase.auth().sendPasswordResetEmail(email);
  } catch (error) {
    throw error;
  }
};

export const loginWithGoogle = async () => {
  const googleProvider = new firebase.auth.GoogleAuthProvider();

  fbase
    .auth()
    .signInWithPopup(googleProvider)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      throw err;
    });
};
