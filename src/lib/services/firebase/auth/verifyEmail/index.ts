import { applyActionCode } from 'firebase/auth';

import { auth } from '~/lib/services/firebase/auth/common';

export const handleVerifyEmail = async (actionCode: string) => {
  await applyActionCode(auth, actionCode);
};
