import type { LayoutProps } from "@chakra-ui/react";
import { Grid } from "@chakra-ui/react";

import SpokerLoading from "lib/components/ui/SpokerLoading";

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
