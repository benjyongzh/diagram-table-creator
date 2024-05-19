
import { useState } from "react";
import { Input } from "Components/ui/input";
import { ControllerRenderProps, FieldValues } from "react-hook-form";
import { FormFieldLabelTooltip } from "./FormFieldLabelTooltip";
import { formFieldInputTypes } from "Types/formFieldInputTypes";
import { FormItem, FormControl } from "Components/ui/form";
import nodeConfig from "Configs/nodeConfig";
import { HandleVariant } from "Types/handleVariant";
import { Slider } from "Components/ui/slider";
import { Position } from "reactflow";

type FormFieldHandleVariantItemProps = {
  field: ControllerRenderProps<FieldValues, any>;
  handleVariant: HandleVariant;
};
export const FormFieldHandleVariantItem = (
  props: FormFieldHandleVariantItemProps
) => {
  const { field,handleVariant } = props;
  const [name, setName] = useState<string>("")
  const [quantity, setQuantity] = useState<number>(nodeConfig.HANDLETYPE_QUANTITY_MIN)
  const [position, setPosition] = useState<Position>(Position.Top)
  return (
    <div
      className="grid grid-cols-8 gap-6 p-4 rounded-lg border-2
    border-slate-300 dark:border-slate-900"
    >
      <FormItem className="flex flex-col justify-stretch col-span-3">
        <FormFieldLabelTooltip
          labelText="Handle Name"
          description="Input the name of this handle type."
        />
        <FormControl>
          <Input
            type={formFieldInputTypes[formFieldInputTypes.text]}
            placeholder="MyHandleName"
            value={name}
            onChange={()=> setName}
            // {...field}
          />
        </FormControl>
      </FormItem>
      <FormItem className="flex flex-col justify-stretch col-span-3">
        <FormFieldLabelTooltip
          labelText="Quantity"
          description="Input the quantity of this handle type on this component."
        />
        <FormControl>
          <div className="w-full h-full flex items-center justify-between gap-2">
            {handleVariant.quantity}
            <Slider
              defaultValue={[nodeConfig.HANDLETYPE_QUANTITY_MIN]}
              min={nodeConfig.HANDLETYPE_QUANTITY_MIN}
              max={nodeConfig.HANDLETYPE_QUANTITY_MAX}
              className="w-full h-full"
              value={[handleVariant.quantity]}
              onChange={()=> handleVariant.quantity=}
            />
          </div>
        </FormControl>
      </FormItem>
      <FormItem className="flex flex-col justify-stretch col-span-2">
        <FormFieldLabelTooltip
          labelText="Handle Position"
          description="Choose the visual positioning of this handle type on this component."
        />
        <FormControl>
          {/* position: Position.Right. use dropdownMenu */}
        </FormControl>
      </FormItem>
    </div>
  );
};
