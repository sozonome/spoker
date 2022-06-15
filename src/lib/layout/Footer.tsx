import { Flex, Link, Text } from "@chakra-ui/react";
import { RiGithubFill } from "react-icons/ri";

import { packageInfo } from "lib/constants/packageInfo";
import { trackEvent } from "lib/utils/trackEvent";

const Footer = () => {
  const handleClick = (eventValue: string) => () => {
    trackEvent({
      eventValue,
      eventType: "link",
    });
  };

  return (
    <Flex as="footer" width="full" align="center" paddingY={8}>
      <Text>
        2021 |{" "}
        <Link
          href="https://sznm.dev"
          isExternal
          onClick={handleClick("open sznm.dev")}
        >
          sznm.dev
        </Link>
      </Text>

      <Flex marginLeft="auto" alignItems="center" gridGap={2}>
        <Link
          href={`${packageInfo.repository.url}/blob/main/CHANGELOG.md`}
          isExternal
          onClick={handleClick("open repo changelog")}
        >
          v{packageInfo.version}
        </Link>
        <Link
          href={packageInfo.repository.url}
          onClick={handleClick("open repository")}
          isExternal
        >
          <RiGithubFill fontSize="2rem" />
        </Link>
      </Flex>
    </Flex>
  );
};

export default Footer;
