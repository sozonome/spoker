import { useColorModeValue } from "@chakra-ui/color-mode";
import { Grid, GridProps } from "@chakra-ui/layout";

type SpokerWrapperGridProps = GridProps;

const SpokerWrapperGrid = ({ children, ...props }: SpokerWrapperGridProps) => {
  const backgroundColor = useColorModeValue(undefined, "gray.700");

  const contraGridStyle: Partial<GridProps> = {
    padding: 4,
    borderRadius: 16,
    borderWidth: `2px`,
    borderColor: "black",
    boxShadow: `0px 6px 0px black`,
    backgroundColor,
  };

  return (
    <Grid {...contraGridStyle} {...props}>
      {children}
    </Grid>
  );
};

export default SpokerWrapperGrid;
