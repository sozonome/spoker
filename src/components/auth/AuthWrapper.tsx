import {
  Modal,
  ModalContent,
  ModalContentProps,
  ModalOverlay,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { PUBLIC_ROUTES } from "components/layout/RouteWrapper";
import { useRouter } from "next/router";
import { ReactNode, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthProvider";

import Login from "./Login";
import Register from "./Register";

type AuthWrapperProps = {
  children: ReactNode;
};

const AuthWrapper = ({ children }: AuthWrapperProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isRegistered, setIsRegistered] = useState<boolean>(true);
  const { currentUser } = useContext(AuthContext);

  const router = useRouter();
  const { pathname } = router;
  const isPublicRoute = PUBLIC_ROUTES.indexOf(pathname) >= 0;

  const needAuth = currentUser === null && !isPublicRoute;

  useEffect(() => {
    if (needAuth) {
      onOpen();
    } else {
      onClose();
    }
  }, [currentUser, pathname]);

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

      {needAuth && (
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
      )}
    </>
  );
};

export default AuthWrapper;
