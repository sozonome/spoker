import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { HiPencil, HiSwitchVertical, HiTrash } from "react-icons/hi";

import type { Task } from "lib/types/RawDB";

type TaskItemProps = {
  task: Task;
  queueProps?: {
    isQueue: boolean;
    taskIndex: number;
    onClickSwap: (selectedIndex: number) => Promise<void>;
    onClickEdit: (selectedIndex: number) => void;
    onClickRemove: (selectedIndex: number) => void;
  };
};

const TaskItem = ({ task, queueProps }: TaskItemProps) => {
  const swapButtonContent = useBreakpointValue({
    base: null,
    md: "Swap with Current",
  });

  const removeButtonContent = useBreakpointValue({
    base: null,
    md: "Remove",
  });

  const handleClickSwap = () => {
    if (queueProps) {
      queueProps.onClickSwap(queueProps.taskIndex);
    }
  };

  const handleClickEdit = () => {
    if (queueProps) {
      queueProps.onClickEdit(queueProps.taskIndex);
    }
  };

  const handleClickRemove = () => {
    if (queueProps) {
      queueProps.onClickRemove(queueProps.taskIndex);
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
          <Flex marginTop={2} gridGap={2}>
            <Button
              colorScheme="orange"
              size="sm"
              onClick={handleClickSwap}
              leftIcon={<HiSwitchVertical />}
            >
              {swapButtonContent}
            </Button>

            <Button
              colorScheme="teal"
              size="sm"
              onClick={handleClickEdit}
              leftIcon={<HiPencil />}
            >
              Edit
            </Button>

            <Button
              colorScheme="red"
              size="sm"
              onClick={handleClickRemove}
              leftIcon={<HiTrash />}
            >
              {removeButtonContent}
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
