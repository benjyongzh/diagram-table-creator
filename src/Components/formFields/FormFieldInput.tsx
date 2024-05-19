import { Input } from "Components/ui/input";
import { ControllerRenderProps, FieldValues } from "react-hook-form";
import { FormFieldWrapper } from "./FormFieldWrapper";
import { formFieldInputTypes } from "Types/formFieldInputTypes";

type FormFieldInputProps = {
  field: ControllerRenderProps<FieldValues, any>;
  layout?: "horizontal" | "vertical";
  labelText: string;
  labelTextSize?: "normal" | "large";
  description: string;
  inputType: formFieldInputTypes;
  placeholder: string;
};
export const FormFieldInput = (props: FormFieldInputProps) => {
  const { field, layout, labelText, description, inputType, placeholder } =
    props;
  return (
    <FormFieldWrapper
      layout={layout}
      labelText={labelText}
      labelTextSize={props.labelTextSize}
      description={description}
    >
      <Input
        type={formFieldInputTypes[inputType]}
        placeholder={placeholder}
        {...field}
      />
    </FormFieldWrapper>
  );
};
