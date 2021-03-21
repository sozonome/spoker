import { Button, IconButton } from "@chakra-ui/button";
import { Box, Flex, Heading, Text } from "@chakra-ui/layout";
import {
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from "@chakra-ui/popover";
import { useToast } from "@chakra-ui/toast";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { BsPencil } from "react-icons/bs";
import { ImCheckmark } from "react-icons/im";
import { IoMdPerson } from "react-icons/io";

import SpokerInput from "components/ui/SpokerInput";

import { AuthContext } from "./AuthProvider";
import { logoutUser, updateDisplayName } from "functions/firebase";
import { roomsData } from "functions/firebase/room";
import { PRIVATE_ROUTES } from "components/layout/RouteWrapper";

const AuthPopover = () => {
  const { currentUser, isCurrentUserUpdating, updateCurrentUser } = useContext(
    AuthContext
  );
  const [displayName, setDisplayName] = useState<string>("");
  const [isEditingDisplayName, setIsEditingDisplayName] = useState<boolean>(
    false
  );
  const [displayNameInput, setDisplayNameInput] = useState<string>("");
  const toast = useToast();
  const router = useRouter();

  const {
    query: { id },
    pathname,
  } = router;

  const checkUserDisplayName = () => {
    if (currentUser) {
      setTimeout(() => {
        currentUser.reload().then(() => {
          setDisplayName(currentUser.displayName ?? "");
        });
      }, 500);
    }
  };

  useEffect(() => {
    checkUserDisplayName();
  }, [currentUser, isCurrentUserUpdating]);

  const handleEditClick = () => {
    if (isEditingDisplayName) {
      if (displayNameInput !== displayName) {
        updateDisplayName(displayNameInput)
          .then(async () => {
            toast({
              title: "Update name successful",
              status: "success",
              position: "top",
              isClosable: true,
            });
            updateCurrentUser && updateCurrentUser();
          })
          .catch(async (e) => {
            toast({
              description: e.message,
              status: "error",
              position: "top",
              isClosable: true,
            });
          })
          .finally(() => {
            setIsEditingDisplayName(false);
          });
      } else {
        checkUserDisplayName();
        setIsEditingDisplayName(false);
      }
    } else {
      setDisplayNameInput(displayName);
      setIsEditingDisplayName(true);
    }
  };

  const handleLogout = async () => {
    if (id && PRIVATE_ROUTES.includes(pathname) && currentUser) {
      router.push("/").then(async () => {
        await roomsData.child(`${id}/users/${currentUser.uid}`).remove();
        logoutUser();
      });
    } else {
      logoutUser();
    }
  };

  return (
    <>
      {currentUser && (
        <Box marginLeft="auto">
          <Popover
            placement="bottom-end"
            onClose={() => setIsEditingDisplayName(false)}
          >
            <PopoverTrigger>
              <IconButton aria-label="account" icon={<IoMdPerson />} />
            </PopoverTrigger>

            <PopoverContent>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverHeader>
                <Flex gridGap={2} alignItems="center">
                  {isEditingDisplayName ? (
                    <SpokerInput
                      value={displayNameInput}
                      onChange={(e) => setDisplayNameInput(e.target.value)}
                      size="sm"
                      formControlWidth="70%"
                    />
                  ) : (
                    <Heading size="sm">{displayName}</Heading>
                  )}
                  <IconButton
                    size="xs"
                    aria-label="edit"
                    icon={isEditingDisplayName ? <ImCheckmark /> : <BsPencil />}
                    onClick={handleEditClick}
                  />
                </Flex>
                <Text>{currentUser.email}</Text>
              </PopoverHeader>
              <PopoverBody>
                <Button isFullWidth colorScheme="red" onClick={handleLogout}>
                  Sign Out
                </Button>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </Box>
      )}
    </>
  );
};

export default AuthPopover;
