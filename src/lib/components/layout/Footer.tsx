import { Flex, Link, Text } from "@chakra-ui/react";
import { RiGithubFill } from "react-icons/ri";

import packageInfo from "../../../../package.json";

const Footer = () => {
  return (
    <Flex as="footer" width="full" align="center" paddingY={8}>
      <Text>
        2021 |{" "}
        <Link href="https://sznm.dev" isExternal>
          sznm.dev
        </Link>
      </Text>

      <Flex marginLeft="auto" alignItems="center" gridGap={2}>
        <Link
          href={`${packageInfo.repository.url}/blob/main/CHANGELOG.md`}
          isExternal
        >
          v{packageInfo.version}
        </Link>
        <Link href={packageInfo.repository.url} isExternal>
          <RiGithubFill fontSize="2rem" />
        </Link>
      </Flex>
    </Flex>
  );
};

export default Footer;
