import { sendEmailVerification } from "firebase/auth";

import { auth } from "lib/services/firebase/auth/common";

export const requestVerificationMail = async () => {
  const user = auth.currentUser;

  if (user && !user.emailVerified) {
    await sendEmailVerification(user);
    return;
  }

  if (user && user.emailVerified) {
    throw new Error("Your email is already verified.");
  }

  throw new Error("Invalid Request");
};
