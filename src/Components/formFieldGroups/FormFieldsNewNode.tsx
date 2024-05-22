import { useFormContext, useFieldArray } from "react-hook-form";
import { FormField, FormMessage } from "../ui/form";
import { FormFieldHandleVariantItem } from "Components/formFields/FormFieldHandleVariantItem";
import { Separator } from "Components/ui/separator";
import { Button } from "Components/ui/button";
import { handleVariantDefaultValue } from "Types/handleVariant";
import { useCallback } from "react";
import { FormFieldWrapper } from "Components/formFields/FormFieldWrapper";
import { Input } from "Components/ui/input";

export const FormFieldsNewNode = () => {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    name: "handle_variants", // unique name for your Field Array
    control,
  });

  const addHandleVariant = useCallback(() => {
    append(handleVariantDefaultValue);
  }, []);

  const removeHandleVariant = (index: number) =>
    useCallback(() => {
      remove(index);
    }, [index]);

  return (
    <div className="flex flex-col gap-4">
      <FormField
        control={control}
        name="component_name"
        render={({ field, fieldState: { error } }) => (
          <FormFieldWrapper
            labelTextSize="large"
            labelText="Component Name"
            description="Specifies the name of this new component."
            errorMessage={error && <FormMessage>{error.message}</FormMessage>}
          >
            <Input type="text" placeholder="MyComponent" {...field} />
          </FormFieldWrapper>
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
