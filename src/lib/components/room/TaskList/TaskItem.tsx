import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";

import type { Task } from "lib/types/RawDB";

type TaskItemProps = {
  task: Task;
  queueProps?: {
    isQueue: boolean;
    taskIndex: number;
    onClickSwap: (selectedIndex: number) => Promise<void>;
  };
};

const TaskItem = ({ task, queueProps }: TaskItemProps) => {
  const handleClickSwap = () => {
    if (queueProps) {
      queueProps.onClickSwap(queueProps.taskIndex);
    }
  };

  return (
    <Flex
      borderRadius={12}
      borderWidth={2}
      borderColor="gray.400"
      padding={4}
      marginBottom={2}
      justifyContent="space-between"
      alignItems="center"
      _hover={{ cursor: queueProps?.isQueue ? "move" : undefined }}
      _active={{ cursor: queueProps?.isQueue ? "grab" : undefined }}
    >
      <Box>
        <Heading fontSize="xl">{task.name}</Heading>
        {task.description && <Text>{task.description}</Text>}

        {queueProps?.isQueue && (
          <Flex marginTop={2}>
            <Button size="sm" onClick={handleClickSwap}>
              Swap with Current
            </Button>
          </Flex>
        )}
      </Box>

      {task.estimation && task.estimation >= 0 && (
        <Text fontSize="lg" fontWeight="bold">
          {task.estimation}
        </Text>
      )}
    </Flex>
  );
};

export default TaskItem;
