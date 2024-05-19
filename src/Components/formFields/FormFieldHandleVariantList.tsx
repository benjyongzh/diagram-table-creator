import { ControllerRenderProps, FieldValues } from "react-hook-form";
import { useState } from "react";

import { FormFieldHandleVariantItem } from "./FormFieldHandleVariantItem";
import { Button } from "Components/ui/button";
import { HandleVariant } from "Types/handleVariant";
import { Position } from "reactflow";
import nodeConfig from "Configs/nodeConfig";

type FormFieldHandleVariantListProps = {
  field: ControllerRenderProps<FieldValues, "handle_variants">;
};
export const FormFieldHandleVariantList = (
  props: FormFieldHandleVariantListProps
) => {
  const { field } = props;

  const [handleVariants, setHandleVariants] = useState<HandleVariant[]>([]);

  const addHandleVariant = () => {
    const newVariant: HandleVariant = {
      handleType: "source", //source | target
      handleName: "myHandleName",
      position: Position.Top,
      quantity: nodeConfig.HANDLETYPE_QUANTITY_MIN,
    };
    setHandleVariants((variants) => [...variants, newVariant]);
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-between items-center">
        <span className="formLabel">Handle Types</span>
        <Button onClick={addHandleVariant}>Add Handle Type</Button>
      </div>

      {handleVariants.map((handleVariant, i) => (
        <FormFieldHandleVariantItem
          key={`handleVariant-${i}`}
          field={field.value[i]}
          handleVariant={handleVariant}
        />
      ))}
    </div>
  );
};
