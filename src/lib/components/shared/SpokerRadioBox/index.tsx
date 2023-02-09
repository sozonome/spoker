import type { RadioProps } from '@chakra-ui/react';
import { Box, useRadio } from '@chakra-ui/react';

type SpokerRadioBoxProps = RadioProps;

const SpokerRadioBox = ({ children, ...props }: SpokerRadioBoxProps) => {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="xl"
        boxShadow="md"
        _checked={{
          bg: 'teal.500',
          color: 'white',
          borderColor: 'black',
          borderWidth: 2,
          fontWeight: 'bold',
          boxShadow: 'none',
        }}
        _focus={{
          boxShadow: 'outline',
        }}
        px={5}
        py={3}
      >
        {children}
      </Box>
    </Box>
  );
};

export default SpokerRadioBox;
