import { FormField } from "Components/ui/form";
import { Input } from "Components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { FormFieldLabelTooltip } from "./FormFieldLabelTooltip";
import { formFieldInputTypes } from "Types/formFieldInputTypes";
import { FormItem, FormControl } from "Components/ui/form";
import nodeConfig from "Configs/nodeConfig";
import { Slider } from "Components/ui/slider";

type FormFieldHandleVariantItemProps = {
  form: UseFormReturn;
  indexNumber: number;
};
export const FormFieldHandleVariantItem = (
  props: FormFieldHandleVariantItemProps
) => {
  return (
    <div
      className="grid grid-cols-8 gap-6 p-4 rounded-lg border-2
    border-slate-300 dark:border-slate-900"
    >
      <FormField
        control={props.form.control}
        name={`handle_variants.${props.indexNumber}.handleName`}
        render={({ field }) => (
          <FormItem className="flex flex-col justify-stretch col-span-3">
            <FormFieldLabelTooltip
              labelText="Handle Name"
              description="Input the name of this handle type."
            />
            <FormControl>
              <Input
                type={formFieldInputTypes[formFieldInputTypes.text]}
                placeholder="MyHandleName"
                {...field}
              />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={props.form.control}
        name={`handle_variants.${props.indexNumber}.quantity`}
        render={({ field }) => (
          <FormItem className="flex flex-col justify-stretch col-span-3">
            <FormFieldLabelTooltip
              labelText="Quantity"
              description="Input the quantity of this handle type on this component."
            />
            <FormControl>
              <div className="w-full h-full flex items-center justify-between gap-2">
                hello
                <Slider
                  defaultValue={[nodeConfig.HANDLETYPE_QUANTITY_MIN]}
                  min={nodeConfig.HANDLETYPE_QUANTITY_MIN}
                  max={nodeConfig.HANDLETYPE_QUANTITY_MAX}
                  className="w-full h-full"
                  {...field}
                />
              </div>
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={props.form.control}
        name={`handle_variants.${props.indexNumber}.position`}
        render={({ field }) => (
          <FormItem className="flex flex-col justify-stretch col-span-2">
            <FormFieldLabelTooltip
              labelText="Handle Position"
              description="Choose the visual positioning of this handle type on this component."
            />
            <FormControl>
              {/* position: Position.Right. use dropdownMenu */}
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
};
