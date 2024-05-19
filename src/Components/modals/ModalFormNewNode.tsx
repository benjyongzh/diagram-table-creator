import { ModalForm } from "./ModalForm";
// import { toast } from "@/components/ui/use-toast";
import { FormFieldsNewNode } from "../formFieldGroups/FormFieldsNewNode";
import { z } from "zod";
import formSchemaNewNode from "Objects/formSchemas/formSchemaNewNode";

const schema = formSchemaNewNode;
export const ModalFormNewNode = () => {
  const onNewNodeFormSubmit = (data: z.infer<typeof schema>) => {
    // toast({
    //   title: "You submitted the following values:",
    //   description: (
    //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //   ),
    // });
  };

  return (
    <ModalForm
      title="Create New Node"
      width={640}
      schema={schema}
      onSubmit={onNewNodeFormSubmit}
    >
      <FormFieldsNewNode />
    </ModalForm>
  );
};
