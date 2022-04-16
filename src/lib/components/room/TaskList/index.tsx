import {
  Button,
  Flex,
  Grid,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as React from "react";
import { useForm } from "react-hook-form";
import { GoPlus } from "react-icons/go";

import SpokerButton from "lib/components/shared/SpokerButton";
import SpokerInput from "lib/components/shared/SpokerInput";
import SpokerModalWrapper from "lib/components/shared/SpokerModalWrapper";
import SpokerWrapperGrid from "lib/components/shared/SpokerWrapperGrid";
import type { RoomInstance } from "lib/types/RawDB";

import { submitStoryFormValidationSchema } from "./constants";
import TaskItem from "./TaskItem";
import type { SubmitStoryForm } from "./types";

type TaskListProps = {
  roomData: RoomInstance;
};

const initialFormValue: SubmitStoryForm = {
  name: "",
  description: "",
};

const TaskList = ({ roomData }: TaskListProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const buttonContent = useBreakpointValue({
    base: <GoPlus />,
    md: "Add Story",
  });
  const [selectedTabIndex, setSelectedTabIndex] = React.useState<number>(0);

  const {
    register,
    handleSubmit,
    reset,
    // getValues,
    formState: { errors, isValid },
  } = useForm<SubmitStoryForm>({
    defaultValues: initialFormValue,
    resolver: yupResolver(submitStoryFormValidationSchema),
    mode: "onChange",
  });

  const handleAddStory = async () => {
    if (isValid) {
      // const values = getValues();
      reset();
    }
  };

  const { queue, completed, task } = roomData;
  const all = React.useMemo(
    () => [task, ...(queue ?? []), ...(completed ?? [])],
    [completed, queue, task]
  );

  const queueLengthText = queue?.length ? ` (${queue.length})` : "";
  const queueTabText = `Queue${queueLengthText}`;
  const completedLengthText = completed?.length ? ` (${completed.length})` : "";
  const completedTabText = `Completed${completedLengthText}`;

  const handleChangeTab = (index: number) => setSelectedTabIndex(index);

  return (
    <>
      <SpokerWrapperGrid>
        <Tabs
          index={selectedTabIndex}
          onChange={handleChangeTab}
          variant="soft-rounded"
        >
          <TabList alignItems="center">
            <Tab>{queueTabText}</Tab>
            <Tab>{completedTabText}</Tab>
            <Tab>All</Tab>
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
            <TabPanel>
              {queue?.map((queueItem) => (
                <TaskItem task={queueItem} key={queueItem.id} />
              ))}
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
