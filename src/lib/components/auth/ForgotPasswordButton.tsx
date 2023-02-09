import { Button } from '@chakra-ui/react';
import Link from 'next/link';

import { EVENT_TYPE_AUTH } from '~/lib/constants/tracking';
import { trackEvent } from '~/lib/utils/trackEvent';

const ForgotPasswordButton = () => {
  const handleClickForgotPassword = () => {
    trackEvent({
      eventName: 'open reset password',
      eventData: { type: EVENT_TYPE_AUTH },
    });
  };

  return (
    <Button
      as={Link}
      href="/reset-password"
      onClick={handleClickForgotPassword}
      variant="ghost"
      border="none"
      boxShadow="none"
      size="sm"
    >
      Forgot Password
    </Button>
  );
};

export default ForgotPasswordButton;
