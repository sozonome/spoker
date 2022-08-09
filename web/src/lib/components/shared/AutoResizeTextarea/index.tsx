import type {
  FormControlProps,
  FormErrorMessageProps,
  HelpTextProps,
  TextareaProps,
} from "@chakra-ui/react";
import {
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  forwardRef,
  FormControl,
  Textarea,
} from "@chakra-ui/react";
import ResizeTextarea from "react-textarea-autosize";

type AutoResizeTextareaProps = {
  errorText?: FormErrorMessageProps["children"];
  helperText?: HelpTextProps["children"];
} & TextareaProps &
  Pick<FormControlProps, "label" | "isInvalid">;

export const contraStyle: Partial<TextareaProps> = {
  borderColor: "black",
  borderRadius: 12,
  borderWidth: 2,
  size: "lg",
};

const AutoResizeTextarea = forwardRef(
  (
    {
      isInvalid,
      label,
      errorText,
      helperText,
      ...props
    }: AutoResizeTextareaProps,
    ref
  ) => {
    return (
      <FormControl isInvalid={isInvalid}>
        {label && <FormLabel>{label}</FormLabel>}

        <Textarea
          minH="unset"
          overflow="hidden"
          w="100%"
          resize="none"
          ref={ref}
          minRows={1}
          as={ResizeTextarea}
          {...contraStyle}
          {...props}
        />

        {errorText && <FormErrorMessage>{errorText}</FormErrorMessage>}
        {helperText && (
          <FormHelperText color="red.400">{helperText}</FormHelperText>
        )}
      </FormControl>
    );
  }
);

export default AutoResizeTextarea;
