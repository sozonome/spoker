import { Grid } from "@chakra-ui/layout";
import { LayoutProps } from "@chakra-ui/styled-system";

import SpokerLoading from "components/ui/SpokerLoading";

type FullScreenLoadingProps = {
  height?: LayoutProps["height"];
};

const FullScreenLoading = ({ height }: FullScreenLoadingProps) => {
  return (
    <Grid height={height ?? "100vh"}>
      <SpokerLoading />
    </Grid>
  );
};

export default FullScreenLoading;
