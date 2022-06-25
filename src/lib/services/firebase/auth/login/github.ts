import { GithubAuthProvider, signInWithPopup } from "firebase/auth";

import { auth } from "lib/services/firebase/auth/common";
import { showErrorToast } from "lib/services/firebase/utils";

export const loginWithGithub = async () => {
  const githubProvider = new GithubAuthProvider();

  signInWithPopup(auth, githubProvider).catch((err) => showErrorToast(err));
};
