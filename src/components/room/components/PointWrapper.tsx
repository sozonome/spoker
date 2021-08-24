import { Text } from "@chakra-ui/react";
import Twemoji from "components/ui/Twemoji";
import { hideLabel, HideLabelOptionsType } from "constants/hideLabel";

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
  } else if (point) {
    return <Twemoji emoji={hideLabel[roomSelectedHideLabel].selected} />;
  } else {
    return <Twemoji emoji={hideLabel[roomSelectedHideLabel].empty} />;
  }
};

export default PointWrapper;
