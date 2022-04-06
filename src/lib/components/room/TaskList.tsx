import {
  Box,
  Button,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import { GoPlus } from "react-icons/go";

import SpokerModalWrapper from "lib/components/shared/SpokerModalWrapper";
import SpokerWrapperGrid from "lib/components/shared/SpokerWrapperGrid";
import type { RoomInstance } from "lib/types/RawDB";

type TaskListProps = {
  roomData: RoomInstance;
};

const TaskList = ({ roomData }: TaskListProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const buttonContent = useBreakpointValue({
    base: <GoPlus />,
    md: "Add Story",
  });

  const { queue, completed } = roomData;

  const queueLengthText = queue?.length ? ` (${queue.length})` : "";
  const queueTabText = `Queue${queueLengthText}`;

  const completedLengthText = completed?.length ? ` (${completed.length})` : "";
  const completedTabText = `Completed${completedLengthText}`;

  return (
    <>
      <SpokerWrapperGrid>
        <Tabs variant="soft-rounded">
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
                <Box>
                  <Heading>{queueItem.name}</Heading>
                  <Text>{queueItem.description}</Text>
                </Box>
              ))}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </SpokerWrapperGrid>

      <SpokerModalWrapper
        isOpen={isOpen}
        onClose={onClose}
        header="Add Story"
      />
    </>
  );
};

export default TaskList;
