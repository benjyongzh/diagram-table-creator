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
// import { useState } from "react";

import { X } from "lucide-react";
import ButtonStyledIcon from "Components/ui/ButtonStyledIcon";

type FormFieldHandleVariantItemProps = {
  indexNumber: number;
  onRemove: Function;
};
export const FormFieldHandleVariantItem = (
  props: FormFieldHandleVariantItemProps
) => {
  const { control } = useFormContext();
  // const [isHovered, setIsHovered] = useState(false);

  // const handleHover = (bool: boolean) => setIsHovered(bool);

  return (
    <div
      className="relative grid grid-cols-8 gap-6 p-4 rounded-lg border-2
    border-slate-300 dark:border-slate-900"
      // onMouseEnter={() => handleHover(true)}
      // onMouseLeave={() => handleHover(false)}
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
                // defaultValue={nodeConfig.HANDLETYPE_QUANTITY_MIN}
                min={nodeConfig.HANDLETYPE_QUANTITY_MIN}
                max={nodeConfig.HANDLETYPE_QUANTITY_MAX}
                {...field}
              />
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
      {/* {isHovered && ( */}
      <ButtonStyledIcon
        className="absolute right-2 top-2 rounded-sm -mt-2 -mr-2"
        onButtonClick={props.onRemove(props.indexNumber)}
        type="button"
      >
        <X className="h-4 w-4" />
      </ButtonStyledIcon>
      {/* )} */}
    </div>
  );
};
