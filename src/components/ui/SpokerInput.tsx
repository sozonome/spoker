import {
  FormControl,
  FormControlProps,
  FormHelperText,
  FormLabel,
  HelpTextProps,
  Input,
  InputProps,
} from "@chakra-ui/react";

type SpokerInputProps = {
  helperText?: HelpTextProps["children"];
} & Pick<FormControlProps, "label" | "isInvalid"> &
  InputProps;

export const contraInputStyle: Partial<InputProps> = {
  borderColor: "black",
  borderRadius: 12,
  borderWidth: 2,
  size: "lg",
};

const SpokerInput = ({
  label,
  isInvalid,
  helperText,
  ...inputProps
}: SpokerInputProps) => {
  return (
    <FormControl isInvalid={isInvalid}>
      {label && <FormLabel>{label}</FormLabel>}
      <Input {...inputProps} {...contraInputStyle} />
      {helperText && (
        <FormHelperText color="red.400">{helperText}</FormHelperText>
      )}
    </FormControl>
  );
};

export default SpokerInput;
