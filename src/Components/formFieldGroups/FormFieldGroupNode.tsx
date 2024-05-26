import { useFormContext, useFieldArray } from "react-hook-form";
import { FormField, FormMessage, FormControl, FormItem } from "../ui/form";
import { FormFieldHandleVariantItem } from "Components/formFields/FormFieldHandleVariantItem";
import { Separator } from "Components/ui/separator";
import { Button } from "Components/ui/button";
import { handleVariantDefaultValue } from "Types/handleVariant";
import { useCallback } from "react";
import { FormFieldWrapper } from "Components/formFields/FormFieldWrapper";
import { Input } from "Components/ui/input";
import colors from "Types/colorString";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "Components/ui/select";
import { FormFieldLabelTooltip } from "Components/formFields/FormFieldLabelTooltip";
import CustomNodeVariant from "Types/customNodeVariant";
import { useEffect } from "react";

type FormFieldGroupNodeProps = {
  variant?: CustomNodeVariant;
};

export const FormFieldGroupNode = (props: FormFieldGroupNodeProps) => {
  const { control, setValue, getValues } = useFormContext();
  const { fields, append, remove, replace } = useFieldArray({
    name: "handle_variants", // unique name for your Field Array
    control,
  });

  const setFormValuesBasedOnExistingVariant = (variant: CustomNodeVariant) => {
    console.log(variant);
    setValue("component_name", variant.nodeName);
    // setValue("color", colors[variant.color as keyof typeof colors]);
    setValue("color", variant.color);
    replace(variant.handleTypes);
    console.log(getValues());
  };

  const addHandleVariant = useCallback(() => {
    append(handleVariantDefaultValue);
  }, []);

  const removeHandleVariant = (index: number) =>
    useCallback(() => {
      remove(index);
    }, [index]);

  useEffect(() => {
    if (props.variant) setFormValuesBasedOnExistingVariant(props.variant);
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-7 gap-6">
        <div className="col-span-5">
          <FormField
            control={control}
            name="component_name"
            render={({ field, fieldState: { error } }) => (
              <FormFieldWrapper
                labelTextSize="large"
                labelText="Component Name"
                description="Specifies the name of this new component."
                errorMessage={
                  error && <FormMessage>{error.message}</FormMessage>
                }
              >
                <Input type="text" placeholder="MyComponent" {...field} />
              </FormFieldWrapper>
            )}
          />
        </div>
        <div className="col-span-2">
          <FormField
            control={control}
            name="color"
            render={({ field }) => (
              <FormItem className="formItem flex-col items-start justify-start">
                <FormFieldLabelTooltip
                  labelTextSize="large"
                  labelText="Color"
                  description="Choose the color of this component."
                />
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select color" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.keys(colors).map((key) => (
                        // <SelectItem value={colors[key as keyof typeof colors]}>
                        <SelectItem value={colors[key as keyof typeof colors]}>
                          <div className="flex items-center justify-start gap-2">
                            <div
                              className={`w-8 h-6 border-slate-700 dark:border-slate-300 border-2 bg-${key}-500`}
                            />
                            {key}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      </div>

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