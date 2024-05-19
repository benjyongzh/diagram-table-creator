import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "../ui/form";
import { Switch } from "Components/ui/switch";
import { FormFieldSwitch } from "Components/formFields/FormFieldSwitch";
import { FormFieldInput } from "Components/formFields/FormFieldInput";
export const FormFieldsNewNode = () => {
  const form = useFormContext();
  return (
    <div className="space-y-4">
      <FormFieldSwitch
        control={form.control}
        name="marketing_emails"
        labelText="Marketing emails"
        description="Receive emails about new products, features, and more."
      />
      <FormFieldInput
        control={form.control}
        name="username"
        labelText="Username"
        description="Specifies the username of your account."
        placeholder="test placeholder"
      />
    </div>
  );
};
