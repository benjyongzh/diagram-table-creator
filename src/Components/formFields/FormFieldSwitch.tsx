import { Switch } from "Components/ui/switch";
import { ControllerRenderProps, FieldValues } from "react-hook-form";
import { FormFieldWrapper } from "./FormFieldWrapper";

type FormFieldSwitchProps = {
  field: ControllerRenderProps<FieldValues, any>;
  layout?: "horizontal" | "vertical";
  labelText: string;
  labelTextSize?: "normal" | "large";
  description: string;
};

export const FormFieldSwitch = (props: FormFieldSwitchProps) => {
  const { field, layout, labelText, description } = props;
  return (
    <FormFieldWrapper
      layout={layout}
      labelText={labelText}
      labelTextSize={props.labelTextSize}
      description={description}
    >
      <Switch checked={field.value} onCheckedChange={field.onChange} />
    </FormFieldWrapper>
  );
};
