import { Tooltip, TooltipTrigger, TooltipContent } from "Components/ui/tooltip";
import { FormLabel, FormDescription } from "Components/ui/form";

type FormFieldLabelTooltipProps = {
  labelText: string;
  description: string;
};

export const FormFieldLabelTooltip = (props: FormFieldLabelTooltipProps) => {
  return (
    <div className="">
      <Tooltip>
        <TooltipTrigger asChild>
          <FormLabel className="formLabel">{props.labelText}</FormLabel>
        </TooltipTrigger>
        <TooltipContent
          side="right"
          className="bg-white text-black dark:bg-white dark:text-black"
        >
          <FormDescription>{props.description}</FormDescription>
        </TooltipContent>
      </Tooltip>
    </div>
  );
};
