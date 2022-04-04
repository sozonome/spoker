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

  return (
    <>
      <SpokerWrapperGrid>
        <Tabs variant="soft-rounded">
          <TabList alignItems="center">
            <Tab>Queue</Tab>
            <Tab>Completed</Tab>
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
              {roomData.queue?.map((queue) => (
                <Box>
                  <Heading>{queue.name}</Heading>
                  <Text>{queue.description}</Text>
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
