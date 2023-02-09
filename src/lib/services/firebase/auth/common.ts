import { getAuth } from 'firebase/auth';

import { fbase } from '~/lib/services/firebase/config';

export const auth = getAuth(fbase);
