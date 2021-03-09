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
    return <>{point}</>;
  } else if (point) {
    return <>{hideLabel[roomSelectedHideLabel].selected}</>;
  } else {
    return <>{hideLabel[roomSelectedHideLabel].empty}</>;
  }
};

export default PointWrapper;
