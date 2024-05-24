import { ModalForm } from "./ModalForm";
import { toast } from "sonner";
import { FormFieldGroupNode } from "../formFieldGroups/FormFieldGroupNode";
import { z } from "zod";
import formSchemaNewNode from "Types/schemas/formSchemaNewNode";

//redux
import { useAppSelector, useAppDispatch } from "Hooks/reduxHooks";
import { addNewNodeVariant } from "Features/customNodeVariantSlice";
import CustomNodeVariant from "Types/customNodeVariant";
import { useFormContext } from "react-hook-form";

type ModalFormNodeProps = {
  setModalOpen: Function;
  variant?: CustomNodeVariant;
};

const schema = formSchemaNewNode;

export const ModalFormNode = (props: ModalFormNodeProps) => {
  const form = useFormContext();
  const dispatch = useAppDispatch();
  const nodeVariants = useAppSelector(
    (state) => state.customNodeVariants.variants
  );

  const onNodeFormSubmit = async (data: z.infer<typeof schema>) => {
    console.log(data);

    if (props.variant) {
      // edit redux node variant slice
    } else {
      try {
        // check to make sure there are no other variants of this name
        const nodesWithSameName = nodeVariants.filter(
          (node) => node.nodeName === data.component_name
        );
        if (nodesWithSameName.length > 0)
          throw `"${data.component_name}" already exists.`;

        // await inserting data into DB
        const newNodeVariant: CustomNodeVariant = {
          nodeName: data.component_name,
          handleTypes: data.handle_variants,
          color: data.color,
        };
        dispatch(addNewNodeVariant(newNodeVariant));

        toast.success("New component created", {
          description: data.component_name,
        });

        //close modal
        props.setModalOpen(false);
        form.reset();
      } catch (err) {
        toast.error("Error creating node", {
          description: `${err}`,
        });
      }
    }
  };

  return (
    <ModalForm
      title={props.variant ? "Edit Node" : "Create New Node"}
      width={540}
      schema={schema}
      onSubmit={onNodeFormSubmit}
    >
      <FormFieldGroupNode />
    </ModalForm>
  );
};
