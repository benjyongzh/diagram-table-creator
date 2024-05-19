import { Input } from "Components/ui/input";
import { ControllerRenderProps, FieldValues } from "react-hook-form";
import { FormFieldLabelTooltip } from "./FormFieldLabelTooltip";
import { formFieldInputTypes } from "Types/formFieldInputTypes";
import { FormItem, FormControl } from "Components/ui/form";
import nodeConfig from "Configs/nodeConfig";
import { HandleVariant } from "Types/handleVariant";

type FormFieldHandleVariantItemProps = {
  field: ControllerRenderProps<FieldValues, any>;
  handleVariant: HandleVariant;
};
export const FormFieldHandleVariantItem = (
  props: FormFieldHandleVariantItemProps
) => {
  const { field } = props;
  return (
    <div
      className="flex flex-row items-center justify-between gap-5 p-4 rounded-lg border-2
    border-slate-300 dark:border-slate-900"
    >
      <FormItem>
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
      <FormItem>
        <FormFieldLabelTooltip
          labelText="Quantity"
          description="Input the quantity of this handle type on this component."
        />
        <FormControl>
          <Input
            type={formFieldInputTypes[formFieldInputTypes.number]}
            {...field}
            min={nodeConfig.HANDLETYPE_QUANTITY_MIN}
            max={nodeConfig.HANDLETYPE_QUANTITY_MAX}
          />
        </FormControl>
      </FormItem>
      <FormItem>
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
