import { Modal, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import { useRouter } from "next/router";
import type { ReactNode } from "react";
import { useContext, useEffect, useState } from "react";

import { PUBLIC_ROUTES } from "lib/layout/RouteWrapper";

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

  const isUnauthorized = currentUser === null && !isPublicRoute;

  useEffect(() => {
    if (isUnauthorized) {
      onOpen();
    } else {
      onClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser, pathname]);

  useEffect(() => {
    if (!isUnauthorized) {
      setIsRegistered(true);
    }
  }, [isUnauthorized]);

  const handleSwitchToRegister = () => setIsRegistered(false);
  const handleSwitchToLogin = () => setIsRegistered(true);

  if (!isUnauthorized) {
    return children as React.ReactElement;
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => 0}
      motionPreset="slideInBottom"
      isCentered
    >
      <ModalOverlay />

      {isRegistered ? (
        <Login {...{ handleSwitchToRegister }} />
      ) : (
        <Register {...{ handleSwitchToLogin }} />
      )}
    </Modal>
  );
};

export default AuthWrapper;
