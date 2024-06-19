// components
import { FormFieldWrapper } from "Components/formFields/FormFieldWrapper";
import { FormFieldLabelTooltip } from "Components/formFields/FormFieldLabelTooltip";
import { FormFieldHandleVariantItem } from "Components/formFields/FormFieldHandleVariantItem";
import { Input } from "Components/ui/input";
import { FormField, FormMessage, FormControl, FormItem } from "../ui/form";
import { Separator } from "Components/ui/separator";
import { Button } from "Components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "Components/ui/select";

// hooks
import { useCallback, useEffect } from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import { z } from "zod";

// types
import { handleVariantDataDefaultValue } from "Types/handles/handleVariant";
import colors from "Types/colorString";
import CustomNodeVariant from "Types/nodes/customNodeVariant";
import formSchemaNewNode from "Types/schemas/formSchemaNewNode";
import { randomStringGenerator } from "Utilities/strings";
import handleConfig from "@/Configs/handleConfig";

type FormFieldGroupNodeProps = {
  variant?: CustomNodeVariant;
};

export const FormFieldGroupNode = (props: FormFieldGroupNodeProps) => {
  const { control, reset } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    name: "handle_variants", // unique name for your Field Array
    control,
  });

  const setFormValuesBasedOnExistingVariant = useCallback(() => {
    console.log(props.variant);
    const fieldValues: z.infer<typeof formSchemaNewNode> = {
      component_name: props.variant!.nodeName,
      handle_variants: props.variant!.handleTypes,
      color: props.variant!.color,
    };
    reset(fieldValues);
  }, [reset]);

  const addHandleVariant = useCallback(() => {
    const handleId: string = randomStringGenerator(
      handleConfig.HANDLE_VARIANT_ID_LENGTH
    );
    append({ handleTypeId: handleId, ...handleVariantDataDefaultValue });
  }, []);

  const removeHandleVariant = (index: number) =>
    useCallback(() => {
      remove(index);
    }, [index]);

  useEffect(() => {
    if (props.variant) setFormValuesBasedOnExistingVariant();
  }, [setFormValuesBasedOnExistingVariant]);

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
                    defaultValue={
                      props.variant ? props.variant!.color : field.value
                    }
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
