import { useFormContext } from "react-hook-form";
import { FormField } from "../ui/form";
import { FormFieldInput } from "Components/formFields/FormFieldInput";
import { formFieldInputTypes } from "Types/formFieldInputTypes";
import { FormFieldHandleVariantList } from "Components/formFields/FormFieldHandleVariantList";
import { Separator } from "Components/ui/separator";

export const FormFieldsNewNode = () => {
  const form = useFormContext();
  return (
    <div className="flex flex-col gap-4">
      <FormField
        control={form.control}
        name="component_name"
        render={({ field }) => (
          // <FormFieldSwitch
          //   field={field}
          //   labelText="Marketing emails"
          //   description="Receive emails about new products, features, and more."
          // />
          <FormFieldInput
            field={field}
            labelTextSize="large"
            labelText="Component Name"
            description="Specifies the name of this new component."
            inputType={formFieldInputTypes.text}
            placeholder="MyComponent"
          />
        )}
      />
      <Separator />
      <FormField
        control={form.control}
        name="handle_variants"
        render={({ field }) => <FormFieldHandleVariantList field={field} />}
      />
    </div>
  );
};
