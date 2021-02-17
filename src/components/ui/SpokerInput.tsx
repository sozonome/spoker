import {
  FormControl,
  FormControlProps,
  FormLabel,
  Input,
  InputProps,
} from "@chakra-ui/react";

type SpokerInputProps = {
  label?: FormControlProps["label"];
} & InputProps;

export const contraInputStyle: Partial<InputProps> = {
  borderColor: "black",
  borderRadius: 12,
  borderWidth: 2,
  size: "lg",
};

const SpokerInput = ({ label, ...inputProps }: SpokerInputProps) => {
  return (
    <FormControl>
      {label && <FormLabel>{label}</FormLabel>}
      <Input {...inputProps} {...contraInputStyle} />
    </FormControl>
  );
};

export default SpokerInput;
