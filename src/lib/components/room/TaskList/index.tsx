import {
  Box,
  Button,
  Flex,
  Grid,
  Icon,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Tooltip,
  useBreakpointValue,
  useColorModeValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { nanoid } from "nanoid";
import { useRouter } from "next/router";
import * as React from "react";
import isEqual from "react-fast-compare";
import { useForm } from "react-hook-form";
import { GoPlus } from "react-icons/go";
import { RiInformationLine } from "react-icons/ri";
import { ReactSortable } from "react-sortablejs";

import SpokerButton from "lib/components/shared/SpokerButton";
import SpokerInput from "lib/components/shared/SpokerInput";
import SpokerModalWrapper from "lib/components/shared/SpokerModalWrapper";
import SpokerWrapperGrid from "lib/components/shared/SpokerWrapperGrid";
import {
  rewriteQueue,
  swapSelectedQueueWithCurrent,
} from "lib/services/firebase/room";
import type { RoomInstance, Task } from "lib/types/RawDB";

import { submitStoryFormValidationSchema } from "./constants";
import TaskItem from "./TaskItem";
import type { SortableTaskItem, SubmitStoryForm } from "./types";

type TaskListProps = {
  roomData: RoomInstance;
  showVote: boolean;
};

const initialFormValue: SubmitStoryForm = {
  name: "",
  description: "",
};

const TaskList = ({ roomData, showVote }: TaskListProps) => {
  const router = useRouter();
  const {
    query: { id },
  } = router;
  const wrapperBackgroundColor = useColorModeValue("gray.50", "gray.900");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const buttonContent = useBreakpointValue({
    base: <GoPlus />,
    md: "Add Story",
  });
  const [selectedTabIndex, setSelectedTabIndex] = React.useState<number>(0);
  const { queue, completed, task } = roomData;

  const sortableQueue: Array<SortableTaskItem> = React.useMemo(() => {
    return (queue ?? []) as Array<SortableTaskItem>;
  }, [queue]);

  const all = React.useMemo(
    () => [task, ...(queue ?? []), ...(completed ?? [])],
    [completed, queue, task]
  );

  const activeStoriesLengthText = queue?.length
    ? ` (${queue.length + 1})`
    : " (1)";
  const activeStoriesTabText = `Active Stories${activeStoriesLengthText}`;
  const queueLengthText = queue?.length ? ` (${queue.length})` : "";
  const queueTabText = `Queue${queueLengthText}`;
  const completedLengthText = completed?.length ? ` (${completed.length})` : "";
  const completedTabText = `Completed${completedLengthText}`;
  const allLengthText = ` (${all.length})`;
  const allTabText = `All${allLengthText}`;

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors, isValid },
  } = useForm<SubmitStoryForm>({
    defaultValues: initialFormValue,
    resolver: yupResolver(submitStoryFormValidationSchema),
    mode: "onChange",
  });

  const handleAddStory = async () => {
    if (isValid) {
      const values = getValues();
      const randomId = nanoid(21);
      await rewriteQueue(id as string, [
        ...(queue ?? []),
        { ...values, id: randomId } as Task,
      ]);
      onClose();
      setSelectedTabIndex(0);
      reset();
    }
  };

  const handleRewriteQueue = async (updatedQueue: Array<SortableTaskItem>) => {
    const updated: Array<Task> = updatedQueue.map((queueItem) => {
      const temp = queueItem;
      delete temp.chosen;
      delete temp.selected;
      delete temp.filtered;
      return temp;
    });
    if (!isEqual(queue, updated)) {
      await rewriteQueue(id as string, updated);
    }
  };

  const handleClickSwap = async (selectedQueueIndex: number) => {
    if (showVote) {
      toast({
        description:
          "Cannot swap now as current story is already voted by all participants. Either finish or reset vote of current story to be able to swap.",
        status: "warning",
        position: "top",
      });
      return;
    }
    await swapSelectedQueueWithCurrent(
      id as string,
      task,
      selectedQueueIndex,
      queue
    );
  };

  const handleChangeTab = (index: number) => setSelectedTabIndex(index);

  return (
    <>
      <SpokerWrapperGrid backgroundColor={wrapperBackgroundColor}>
        <Tabs
          index={selectedTabIndex}
          onChange={handleChangeTab}
          variant="soft-rounded"
        >
          <TabList alignItems="center">
            <Tab>{activeStoriesTabText}</Tab>
            <Tab>{completedTabText}</Tab>
            <Tab>{allTabText}</Tab>
            <Button
              marginLeft="auto"
              size="md"
              colorScheme="facebook"
              onClick={onOpen}
            >
              {buttonContent}
            </Button>
          </TabList>

          <TabPanels>
            <TabPanel display="flex" flexDir="column" gap={2}>
              <Text>Current:</Text>
              <TaskItem task={task} />

              <Box>
                <Tooltip label="Queue can be re-arranged using drag and drop, the first item will be the next story to be voted.">
                  <Text
                    as="span"
                    _hover={{ cursor: "help" }}
                    textDecoration="underline"
                    fontWeight="semibold"
                    alignItems="center"
                  >
                    {queueTabText}: <Icon as={RiInformationLine} />
                  </Text>
                </Tooltip>
              </Box>
              <ReactSortable
                list={sortableQueue}
                setList={handleRewriteQueue}
                animation={200}
              >
                {sortableQueue?.map((queueItem, index) => (
                  <TaskItem
                    task={queueItem}
                    key={queueItem.id}
                    queueProps={{
                      isQueue: true,
                      taskIndex: index,
                      onClickSwap: handleClickSwap,
                    }}
                  />
                ))}
              </ReactSortable>
            </TabPanel>
            <TabPanel>
              {completed?.map((completedItem) => (
                <TaskItem task={completedItem} key={completedItem.id} />
              ))}
            </TabPanel>
            <TabPanel>
              {all.map((completedItem) => (
                <TaskItem task={completedItem} key={completedItem.id} />
              ))}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </SpokerWrapperGrid>

      <SpokerModalWrapper
        isOpen={isOpen}
        onClose={onClose}
        header="Add Story"
        contentWrapperProps={{
          as: "form",
          onSubmit: handleSubmit(handleAddStory),
        }}
        body={
          <Grid gap={4}>
            <SpokerInput
              {...register("name")}
              isRequired
              label="Name"
              isInvalid={!!errors.name?.message}
              errorText={errors.name?.message}
            />
            <SpokerInput {...register("description")} label="Description" />
          </Grid>
        }
        footer={
          <Flex gridGap={2}>
            <SpokerButton onClick={onClose}>Cancel</SpokerButton>
            <SpokerButton
              colorScheme="teal"
              type="submit"
              isDisabled={!isValid}
            >
              Add
            </SpokerButton>
          </Flex>
        }
      />
    </>
  );
};

export default TaskList;
