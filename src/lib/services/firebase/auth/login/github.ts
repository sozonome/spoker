import { GithubAuthProvider, signInWithPopup } from 'firebase/auth';

import { auth } from '~/lib/services/firebase/auth/common';
import { showErrorToast } from '~/lib/services/firebase/utils';

const githubProvider = new GithubAuthProvider();

export const loginWithGithub = async () => {
  signInWithPopup(auth, githubProvider).catch((err) => showErrorToast(err));
};
