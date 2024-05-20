import { ModalForm } from "./ModalForm";
// import { toast } from "@/components/ui/use-toast";
import { FormFieldsNewNode } from "../formFieldGroups/FormFieldsNewNode";
import { z } from "zod";
import formSchemaNewNode from "Objects/formSchemas/formSchemaNewNode";
import { useForm } from "react-hook-form";

const schema = formSchemaNewNode;

export const ModalFormNewNode = () => {
  const form = useForm();
  const onNewNodeFormSubmit = (data: z.infer<typeof schema>) => {
    console.log("onNewNodeFormSubmit is run");
    console.log(form.getValues());
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
      width={540}
      schema={schema}
      onSubmit={onNewNodeFormSubmit}
    >
      <FormFieldsNewNode />
    </ModalForm>
  );
};
