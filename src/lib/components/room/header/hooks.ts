import debounce from "lodash-es/debounce";
import { useRouter } from "next/router";
import * as React from "react";

import { useUserRole } from "lib/hooks/useUserRole";
import { updateRoomTask } from "lib/services/firebase/room/update/roomTask";
import { useRoomStore } from "lib/stores/room";
import type { Task } from "lib/types/RawDB";

export const useRoomHeader = () => {
  const roomData = useRoomStore((state) => state.roomData);
  const { setTaskName, setTaskDescription } = useRoomStore((action) => ({
    setTaskName: action.setTaskName,
    setTaskDescription: action.setTaskDescription,
  }));
  const { isOwner } = useUserRole();
  const router = useRouter();
  const {
    query: { id },
  } = router;

  const handleUpdateRemoteTask = React.useCallback(
    (field: keyof Task) =>
      debounce((event: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (roomData && isOwner) {
          const updatedTask: Task = {
            ...roomData.task,
            [field]: event.target.value,
          };
          updateRoomTask(id as string, updatedTask);
        }
      }, 500),
    [id, isOwner, roomData]
  );

  const handleUpdateTask = React.useCallback(
    (field: keyof Task) => (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (field === "name") {
        setTaskName(event.target.value);
      }
      if (field === "description") {
        setTaskDescription(event.target.value);
      }
      handleUpdateRemoteTask(field)(event);
    },
    [handleUpdateRemoteTask, setTaskDescription, setTaskName]
  );

  return {
    handleUpdateTask,
  };
};
