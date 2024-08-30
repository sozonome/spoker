import { signInWithEmailAndPassword } from 'firebase/auth';

import { auth } from '~/lib/services/firebase/auth/common';
import { showErrorToast } from '~/lib/services/firebase/utils';

export const loginUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  signInWithEmailAndPassword(auth, email, password).catch((err) =>
    showErrorToast(err)
  );
};
