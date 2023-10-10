import { Button, Grid, Heading, useColorModeValue } from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import type { ChangeEventHandler } from 'react';
import * as React from 'react';

import SpokerInput from '~/lib/components/shared/SpokerInput';
import SpokerWrapperGrid from '~/lib/components/shared/SpokerWrapperGrid';

const JoinRoom = () => {
  const router = useRouter();
  const [roomId, setRoomId] = React.useState<string>('');
  const backgroundColor = useColorModeValue('orange.500', 'orange.700');
  const placeholderColor = useColorModeValue('orange.200', 'orange.400');
  const isDisabled = React.useMemo(() => roomId.length === 0, [roomId.length]);

  const handleChangeInput: ChangeEventHandler<HTMLInputElement> = (e) =>
    setRoomId(e.target.value);

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter' && !isDisabled) {
      e.preventDefault();
      e.stopPropagation();
      router.push(`/join/${roomId}`);
    }
  };

  return (
    <SpokerWrapperGrid gap={8} backgroundColor={backgroundColor} color="white">
      <Heading size="lg">or Join the Party!</Heading>

      <Grid gap={4}>
        <SpokerInput
          label="Room ID"
          value={roomId}
          onChange={handleChangeInput}
          placeholder="quick-brown-fox"
          _placeholder={{ color: placeholderColor }}
          onKeyDown={handleKeyDown}
        />
      </Grid>

      <Button
        as={Link}
        href={`/join/${roomId}`}
        isDisabled={isDisabled}
        alignSelf="flex-end"
      >
        Let Me in!
      </Button>
    </SpokerWrapperGrid>
  );
};

export default JoinRoom;
