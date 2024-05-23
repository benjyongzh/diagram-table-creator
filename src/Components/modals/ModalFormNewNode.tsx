import { ModalForm } from "./ModalForm";
import { toast } from "sonner";
import { FormFieldsNewNode } from "../formFieldGroups/FormFieldsNewNode";
import { z } from "zod";
import formSchemaNewNode from "Types/schemas/formSchemaNewNode";

//redux
import { useAppDispatch } from "Hooks/reduxHooks";
import { addNewNodeVariant } from "Features/customNodeVariantSlice";
import CustomNodeVariant from "Types/customNodeVariant";

type ModalFormNewNodeProps = {
  setModalOpen: Function;
};

const schema = formSchemaNewNode;

export const ModalFormNewNode = (props: ModalFormNewNodeProps) => {
  const dispatch = useAppDispatch();
  const onNewNodeFormSubmit = async (data: z.infer<typeof schema>) => {
    console.log(data);

    try {
      // await inserting data into DB
      const newNodeVariant: CustomNodeVariant = {
        nodeName: data.component_name,
        handleTypes: data.handle_variants,
        color: data.color,
      };
      dispatch(addNewNodeVariant(newNodeVariant));

      toast.success("New component created", {
        description: data.component_name,
        // action: {
        //   label: "Close",
        //   onClick: () => {},
        // },
      });

      //close modal
      props.setModalOpen(false);
    } catch (e) {}

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
