import { Input } from "Components/ui/input";
import { Control } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "../ui/form";

type FormFieldInputProps = {
  control: Control;
  name: string;
  labelText: string;
  description: string;
};
export const FormFieldInput = (props: FormFieldInputProps) => {
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
            <Input placeholder="shadcn" {...field} />
          </FormControl>
        </FormItem>
      )}
    />
  );
};
