import { Text } from '@chakra-ui/react';

import Twemoji from '~/lib/components/shared/Twemoji';
import type { HideLabelOptionsType } from '~/lib/constants/hideLabel';
import { hideLabel } from '~/lib/constants/hideLabel';

type PointWrapperProps = {
  showVote: boolean;
  roomSelectedHideLabel: HideLabelOptionsType;
  isCurrentUser: boolean;
  point?: number;
};

const PointWrapper = ({
  showVote,
  roomSelectedHideLabel,
  isCurrentUser,
  point,
}: PointWrapperProps) => {
  if (showVote || isCurrentUser) {
    return (
      <Text
        as="span"
        minWidth="1.875rem"
        display="inline-block"
        textAlign="center"
      >
        {point}
      </Text>
    );
  }
  if (point || point === 0) {
    return <Twemoji emoji={hideLabel[roomSelectedHideLabel].selected} />;
  }
  return <Twemoji emoji={hideLabel[roomSelectedHideLabel].empty} />;
};

export default PointWrapper;
