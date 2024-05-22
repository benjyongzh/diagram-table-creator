import { ModalForm } from "./ModalForm";
import { toast } from "sonner";
import { FormFieldsNewNode } from "../formFieldGroups/FormFieldsNewNode";
import { z } from "zod";
import formSchemaNewNode from "Types/schemas/formSchemaNewNode";

const schema = formSchemaNewNode;

export const ModalFormNewNode = () => {
  const onNewNodeFormSubmit = (data: z.infer<typeof schema>) => {
    console.log("onNewNodeFormSubmit is run");
    console.log(data);

    toast.success("New component created", {
      description: data.component_name,
      // action: {
      //   label: "Close",
      //   onClick: () => {},
      // },
    });

    //close modal

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
