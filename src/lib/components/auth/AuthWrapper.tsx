import { Modal, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import { useRouter } from "next/router";
import type { ReactNode } from "react";
import * as React from "react";

import { PUBLIC_ROUTES } from "lib/constants/routes/public";
import { RESTRICTED_ROUTES } from "lib/constants/routes/restricted";
import { useAuth } from "lib/stores/auth";

import Login from "./Login";
import Register from "./Register";

type AuthWrapperProps = {
  children: ReactNode;
};

const AuthWrapper = ({ children }: AuthWrapperProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isRegistered, setIsRegistered] = React.useState<boolean>(true);
  const currentUser = useAuth((state) => state.currentUser);

  const router = useRouter();
  const { pathname } = router;
  const isPublicRoute = PUBLIC_ROUTES.indexOf(pathname) >= 0;
  const isRestrictedRoute = RESTRICTED_ROUTES.includes(pathname);

  const isUnauthorized =
    currentUser === null && !isPublicRoute && !isRestrictedRoute;

  React.useEffect(() => {
    if (isUnauthorized) {
      onOpen();
    } else {
      onClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser, pathname]);

  React.useEffect(() => {
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
      size={{ base: "full", sm: "md" }}
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
