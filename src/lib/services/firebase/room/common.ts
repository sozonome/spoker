import { getDatabase, ref } from 'firebase/database';

import { fbase } from '~/lib/services/firebase/config';

const database = getDatabase(fbase);

export const roomsData = ref(database, 'rooms');
