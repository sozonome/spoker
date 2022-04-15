import { Box, Heading, Text } from "@chakra-ui/react";

import type { Task } from "lib/types/RawDB";

type TaskItemProps = {
  task: Task;
};

const TaskItem = ({ task }: TaskItemProps) => {
  return (
    <Box borderRadius={12} borderWidth={2} borderColor="gray.400" padding={4}>
      <Heading fontSize="xl">{task.name}</Heading>
      <Text>{task.description}</Text>
    </Box>
  );
};

export default TaskItem;
