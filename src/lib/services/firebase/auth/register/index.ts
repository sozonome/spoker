import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from 'firebase/auth';

import { auth } from '~/lib/services/firebase/auth/common';

import type { RegisterUserWithEmailAndPasswordArgs } from './types';

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
