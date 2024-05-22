import { FormField } from "Components/ui/form";
import { Input } from "Components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "Components/ui/select";
import { useFormContext } from "react-hook-form";
import { FormFieldLabelTooltip } from "./FormFieldLabelTooltip";
import { formFieldInputTypes } from "Types/formFieldInputTypes";
import { FormItem, FormControl } from "Components/ui/form";
import nodeConfig from "Configs/nodeConfig";
import { Position } from "reactflow";
// import { Slider } from "Components/ui/slider";

import { X } from "lucide-react";
import ButtonStyledIcon from "Components/ui/ButtonStyledIcon";

type FormFieldHandleVariantItemProps = {
  indexNumber: number;
  onRemove: Function;
};
export const FormFieldHandleVariantItem = (
  props: FormFieldHandleVariantItemProps
) => {
  const { control, getValues } = useFormContext();
  return (
    <div
      className="relative grid grid-cols-8 gap-6 p-4 rounded-lg border-2
    border-slate-300 dark:border-slate-900"
    >
      <FormField
        control={control}
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
        control={control}
        name={`handle_variants.${props.indexNumber}.quantity`}
        render={({ field }) => (
          <FormItem className="flex flex-col justify-stretch col-span-2">
            <FormFieldLabelTooltip
              labelText="Quantity"
              description="Input the quantity of this handle type on this component."
            />
            <FormControl>
              <Input
                type={formFieldInputTypes[formFieldInputTypes.number]}
                placeholder="MyHandleName"
                defaultValue={nodeConfig.HANDLETYPE_QUANTITY_MIN}
                min={nodeConfig.HANDLETYPE_QUANTITY_MIN}
                max={nodeConfig.HANDLETYPE_QUANTITY_MAX}
                {...field}
              />
              {/* <div className="w-full h-full flex items-center justify-between gap-2">
                {getValues(`handle_variants.${props.indexNumber}.quantity`)}
                <Slider
                  defaultValue={[nodeConfig.HANDLETYPE_QUANTITY_MIN]}
                  min={nodeConfig.HANDLETYPE_QUANTITY_MIN}
                  max={nodeConfig.HANDLETYPE_QUANTITY_MAX}
                  className="w-full h-full"
                  value={field.value}
                  onValueChange={field.onChange}
                />
              </div> */}
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name={`handle_variants.${props.indexNumber}.position`}
        render={({ field }) => (
          <FormItem className="flex flex-col justify-stretch col-span-3">
            <FormFieldLabelTooltip
              labelText="Handle Position"
              description="Choose the visual positioning of this handle type on this component."
            />
            <FormControl>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select position" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.keys(Position).map((key) => (
                    <SelectItem value={Position[key as keyof typeof Position]}>
                      {key}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
          </FormItem>
        )}
      />
      <ButtonStyledIcon
        className="absolute right-2 top-2 rounded-sm"
        onButtonClick={props.onRemove(props.indexNumber)}
        type="button"
      >
        <X className="h-4 w-4" />
      </ButtonStyledIcon>
    </div>
  );
};
