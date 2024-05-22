import { useFormContext, useFieldArray } from "react-hook-form";
import { FormField } from "../ui/form";
import { FormFieldInput } from "Components/formFields/FormFieldInput";
import { formFieldInputTypes } from "Types/formFieldInputTypes";
import { FormFieldHandleVariantItem } from "Components/formFields/FormFieldHandleVariantItem";
import { Separator } from "Components/ui/separator";
import { Button } from "Components/ui/button";
import { handleVariantDefaultValue } from "Types/handleVariant";

export const FormFieldsNewNode = () => {
  const { control } = useFormContext();
  const { fields, append, prepend, remove } = useFieldArray({
    name: "handle_variants", // unique name for your Field Array
    control,
  });

  const addHandleVariant = () => {
    append(handleVariantDefaultValue);
  };

  const removeHandleVariant = (index: number) => {
    console.log("variant index to remove", index);
    // remove();
  };

  return (
    <div className="flex flex-col gap-4">
      <FormField
        control={control}
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
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <span className="formLabel">Handle Types</span>
          <Button type="button" onClick={addHandleVariant}>
            Add Handle Type
          </Button>
        </div>

        {fields.map((field, index) => (
          <FormFieldHandleVariantItem
            key={field.id}
            indexNumber={index}
            onRemove={removeHandleVariant}
          />
        ))}
      </div>
    </div>
  );
};
