import { sendPasswordResetEmail } from 'firebase/auth';

import { auth } from '~/lib/services/firebase/auth/common';
import { showErrorToast } from '~/lib/services/firebase/utils';

export const requestPasswordReset = (email: string, onSuccess?: () => void) =>
  sendPasswordResetEmail(auth, email)
    .then(() => {
      onSuccess?.();
    })
    .catch((err) => {
      showErrorToast(err);
    });
