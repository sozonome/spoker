import type {
  FormControlProps,
  HelpTextProps,
  InputProps,
} from "@chakra-ui/react";
import {
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
} from "@chakra-ui/react";

type SpokerInputProps = {
  helperText?: HelpTextProps["children"];
  formControlWidth?: FormControlProps["width"];
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
  formControlWidth,
  isInvalid,
  helperText,
  ...inputProps
}: SpokerInputProps) => {
  return (
    <FormControl isInvalid={isInvalid} width={formControlWidth}>
      {label && <FormLabel>{label}</FormLabel>}
      <Input {...contraInputStyle} {...inputProps} />
      {helperText && (
        <FormHelperText color="red.400">{helperText}</FormHelperText>
      )}
    </FormControl>
  );
};

export default SpokerInput;
