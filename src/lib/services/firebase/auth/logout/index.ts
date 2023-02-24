import { signOut } from 'firebase/auth';

import { auth } from '~/lib/services/firebase/auth/common';

export const logoutUser = async () => {
  await signOut(auth);
};
