import { Switch } from "Components/ui/switch";
import { Control } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "../ui/form";

type FormFieldSwitchProps = {
  control: Control;
  name: string;
  labelText: string;
  description: string;
};
export const FormFieldSwitch = (props: FormFieldSwitchProps) => {
  const { control, name, labelText, description } = props;
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="formItem">
          <div className="formLabelContainer">
            <FormLabel className="formLabel">{labelText}</FormLabel>
            <FormDescription>{description}</FormDescription>
          </div>
          <FormControl>
            <Switch checked={field.value} onCheckedChange={field.onChange} />
          </FormControl>
        </FormItem>
      )}
    />
  );
};
