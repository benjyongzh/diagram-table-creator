import { Input } from "Components/ui/input";
import { ControllerRenderProps, FieldValues } from "react-hook-form";
import { FormFieldWrapper } from "./FormFieldWrapper";

type FormFieldInputProps = {
  field: ControllerRenderProps<FieldValues, any>;
  layout?: "horizontal" | "vertical";
  labelText: string;
  description: string;
  placeholder: string;
};
export const FormFieldInput = (props: FormFieldInputProps) => {
  const { field, layout, labelText, description, placeholder } = props;
  return (
    <FormFieldWrapper
      layout={layout}
      labelText={labelText}
      description={description}
    >
      <Input placeholder={placeholder} {...field} />
    </FormFieldWrapper>
  );
};
