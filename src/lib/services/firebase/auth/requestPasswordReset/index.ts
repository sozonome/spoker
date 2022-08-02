import { sendPasswordResetEmail } from "firebase/auth";

import { auth } from "lib/services/firebase/auth/common";
import { showErrorToast, showSuccessToast } from "lib/services/firebase/utils";

export const requestPasswordReset = (email: string, onSuccess?: () => void) =>
  sendPasswordResetEmail(auth, email)
    .then(() => {
      showSuccessToast({
        title: "Password Reset Requested",
        description: `Check your email (${email}) for the password reset link.`,
      });
      onSuccess?.();
    })
    .catch((err) => {
      showErrorToast(err);
    });
