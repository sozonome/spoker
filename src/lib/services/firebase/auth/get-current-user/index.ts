import { auth } from '~/lib/services/firebase/auth/common';

export const getCurrentUser = () => {
  const user = auth.currentUser;

  if (user) {
    return user;
  }
  return null;
};
