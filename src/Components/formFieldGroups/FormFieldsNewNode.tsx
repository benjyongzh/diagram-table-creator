import { useFormContext } from "react-hook-form";
import { FormField } from "../ui/form";
import { FormFieldSwitch } from "Components/formFields/FormFieldSwitch";
import { FormFieldInput } from "Components/formFields/FormFieldInput";
export const FormFieldsNewNode = () => {
  const form = useFormContext();
  return (
    <div>
      <FormField
        control={form.control}
        name="marketing_emails"
        render={({ field }) => (
          <FormFieldSwitch
            field={field}
            labelText="Marketing emails"
            description="Receive emails about new products, features, and more."
          />
        )}
      />
      <FormField
        control={form.control}
        name="username"
        render={({ field }) => (
          <FormFieldInput
            field={field}
            labelText="Username"
            description="Specifies the username of your account."
            placeholder="test placeholder"
          />
        )}
      />
    </div>
  );
};
