import { Switch } from "Components/ui/switch";
import { ControllerRenderProps, FieldValues } from "react-hook-form";
import { FormFieldWrapper } from "./FormFieldWrapper";

type FormFieldSwitchProps = {
  field: ControllerRenderProps<FieldValues, any>;
  layout?: "horizontal" | "vertical";
  labelText: string;
  description: string;
};

export const FormFieldSwitch = (props: FormFieldSwitchProps) => {
  const { field, layout, labelText, description } = props;
  return (
    <FormFieldWrapper
      layout={layout}
      labelText={labelText}
      description={description}
    >
      <Switch checked={field.value} onCheckedChange={field.onChange} />
    </FormFieldWrapper>
  );
};
