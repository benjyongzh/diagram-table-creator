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
      <FormField
        control={form.control}
        name="marketing_emails"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <FormLabel className="text-base">Marketing emails</FormLabel>
              <FormDescription>
                Receive emails about new products, features, and more.
              </FormDescription>
            </div>
            <FormControl>
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
};
