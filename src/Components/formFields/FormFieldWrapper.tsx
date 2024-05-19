import React from "react";
import { FormItem, FormControl } from "Components/ui/form";
import { FormFieldLabelTooltip } from "./FormFieldLabelTooltip";

type FormFieldWrapperProps = {
  layout?: "horizontal" | "vertical";
  labelText: string;
  description: string;
  children: React.ReactNode;
};

export const FormFieldWrapper = (props: FormFieldWrapperProps) => {
  return (
    <FormItem
      className={`formItem ${props.layout === "vertical" ? "flex-col" : ""}`}
    >
      <FormFieldLabelTooltip
        labelText={props.labelText}
        description={props.description}
      />
      <FormControl className="my-0">{props.children}</FormControl>
    </FormItem>
  );
};
