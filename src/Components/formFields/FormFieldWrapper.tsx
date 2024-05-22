import React from "react";
import { FormItem, FormControl } from "Components/ui/form";
import { FormFieldLabelTooltip } from "./FormFieldLabelTooltip";

type FormFieldWrapperProps = {
  layout?: "horizontal" | "vertical";
  labelText: string;
  labelTextSize?: "normal" | "large";
  description: string;
  children: React.ReactNode;
  errorMessage?: React.ReactNode;
};

export const FormFieldWrapper = (props: FormFieldWrapperProps) => {
  return (
    <FormItem
      className={`formItem ${
        props.layout === "horizontal"
          ? "flex-row items-center justify-between"
          : "flex-col items-start justify-start"
      }`}
    >
      <FormFieldLabelTooltip
        labelText={props.labelText}
        labelTextSize={props.labelTextSize}
        description={props.description}
      />
      <FormControl>{props.children}</FormControl>
      {props.errorMessage}
    </FormItem>
  );
};
