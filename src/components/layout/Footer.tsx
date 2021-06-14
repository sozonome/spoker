import { Flex, Link, Text } from "@chakra-ui/layout";
import { RiGithubFill } from "react-icons/ri";

import { version, repository } from "../../../package.json";

const Footer = () => {
  return (
    <Flex as="footer" width="full" align="center">
      <Text>
        2021 |{" "}
        <Link href="https://sznm.dev" isExternal>
          sznm.dev
        </Link>
      </Text>

      <Flex marginLeft="auto" alignItems="center" gridGap={2}>
        <Link href={`${repository.url}/blob/main/CHANGELOG.md`} isExternal>
          v{version}
        </Link>
        <Link href={repository.url} isExternal>
          <RiGithubFill fontSize="2rem" />
        </Link>
      </Flex>
    </Flex>
  );
};

export default Footer;
