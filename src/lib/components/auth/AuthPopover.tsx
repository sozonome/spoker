import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Text,
  useBreakpointValue,
  useToast,
} from "@chakra-ui/react";
import { child, remove } from "firebase/database";
import { useRouter } from "next/router";
import * as React from "react";
import { BsPencil } from "react-icons/bs";
import { ImCheckmark } from "react-icons/im";
import { IoMdPerson } from "react-icons/io";

import SpokerInput from "lib/components/shared/SpokerInput";
import { PRIVATE_ROUTES } from "lib/constants/routes/private";
import { logoutUser } from "lib/services/firebase/auth/logout";
import { updateDisplayName } from "lib/services/firebase/auth/updateDisplayName";
import { roomsData } from "lib/services/firebase/room";
import { removeFirebasePrefix } from "lib/utils/removeFirebasePrefix";
import { trackEvent } from "lib/utils/trackEvent";

import { AuthContext } from "./AuthProvider";

const AuthPopover = () => {
  const { currentUser, isCurrentUserUpdating, updateCurrentUser } =
    React.useContext(AuthContext);
  const [displayName, setDisplayName] = React.useState<string>("");
  const [isEditingDisplayName, setIsEditingDisplayName] =
    React.useState<boolean>(false);
  const [displayNameInput, setDisplayNameInput] = React.useState<string>("");
  const toast = useToast();
  const router = useRouter();
  const buttonSize = useBreakpointValue({
    base: "md",
    sm: "lg",
  });

  const {
    query: { id },
    pathname,
  } = router;

  const checkUserDisplayName = React.useCallback(() => {
    if (currentUser) {
      setTimeout(() => {
        currentUser.reload().then(() => {
          setDisplayName(currentUser.displayName ?? "");
        });
      }, 500);
    }
  }, [currentUser]);

  React.useEffect(() => {
    checkUserDisplayName();
  }, [checkUserDisplayName, isCurrentUserUpdating]);

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
            updateCurrentUser();
          })
          .catch(async (e) => {
            toast({
              description: removeFirebasePrefix(e.message),
              status: "error",
              position: "top",
              isClosable: true,
            });
          })
          .finally(() => {
            setIsEditingDisplayName(false);
          });
        return;
      }

      checkUserDisplayName();
      setIsEditingDisplayName(false);
      return;
    }

    setDisplayNameInput(displayName);
    setIsEditingDisplayName(true);
  };

  const processLogout = async () => {
    await logoutUser().then(() => {
      toast({
        description: "Successfully logged out",
        status: "info",
        position: "top",
      });
    });
  };

  const clearUserSessionData = async () => {
    if (id && PRIVATE_ROUTES.includes(pathname) && currentUser) {
      router.push("/").then(async () => {
        await remove(child(roomsData, `${id}/users/${currentUser.uid}`));
        processLogout();
      });
      return;
    }

    processLogout();
  };

  const handleLogout = async () => {
    await clearUserSessionData();
    trackEvent({
      eventValue: "sign out",
      eventType: "auth",
    });
  };

  if (!currentUser) {
    return null;
  }

  return (
    <Box>
      <Popover
        placement="bottom-end"
        onClose={() => setIsEditingDisplayName(false)}
      >
        <PopoverTrigger>
          <IconButton
            size={buttonSize}
            aria-label="account"
            icon={<IoMdPerson />}
          />
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
            <Button width="full" colorScheme="red" onClick={handleLogout}>
              Sign Out
            </Button>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Box>
  );
};

export default AuthPopover;
