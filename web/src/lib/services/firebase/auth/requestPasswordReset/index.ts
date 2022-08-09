import { sendPasswordResetEmail } from "firebase/auth";

import { auth } from "lib/services/firebase/auth/common";

export const requestPasswordReset = async (email: string) => {
  await sendPasswordResetEmail(auth, email);
};
