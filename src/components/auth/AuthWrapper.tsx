import {
  Modal,
  ModalContent,
  ModalContentProps,
  ModalOverlay,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { ReactNode, useEffect, useState } from "react";

import Login from "./Login";
import Register from "./Register";

type AuthWrapperProps = {
  children: ReactNode;
};

const AuthWrapper = ({ children }: AuthWrapperProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isRegistered, setIsRegistered] = useState<boolean>(true);

  const loggedIn = false;

  useEffect(() => {
    onOpen();
  }, []);

  const borderColor = useColorModeValue("#18191F", "#FFFFFF");

  const contraBoxStyle: Partial<ModalContentProps> = {
    paddingY: 2,
    borderRadius: 16,
    border: `2px solid ${borderColor}`,
    boxShadow: `0px 6px 0px ${borderColor}`,
  };

  const handleSwitchToRegister = () => setIsRegistered(false);
  const handleSwitchToLogin = () => setIsRegistered(true);

  return (
    <>
      {children}

      <Modal
        isOpen={isOpen}
        onClose={undefined}
        motionPreset="slideInBottom"
        isCentered
      >
        <ModalOverlay />

        <ModalContent {...contraBoxStyle} marginX={8}>
          {isRegistered ? (
            <Login {...{ handleSwitchToRegister }} />
          ) : (
            <Register {...{ handleSwitchToLogin }} />
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default AuthWrapper;
