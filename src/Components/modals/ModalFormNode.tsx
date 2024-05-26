import { ModalForm } from "./ModalForm";
import { toast } from "sonner";
import { FormFieldGroupNode } from "../formFieldGroups/FormFieldGroupNode";
import { z } from "zod";
import formSchemaNewNode from "Types/schemas/formSchemaNewNode";

//redux
import CustomNodeVariant from "Types/customNodeVariant";

// hooks
import { useStoreNodeVariants } from "Hooks/useStoreNodeVariants";

type ModalFormNodeProps = {
  setModalOpen: Function;
  variant?: CustomNodeVariant;
};

const schema = formSchemaNewNode;

export const ModalFormNode = (props: ModalFormNodeProps) => {
  const { addVariant, editVariant } = useStoreNodeVariants();

  const onNodeFormSubmit = async (data: z.infer<typeof schema>) => {
    console.log(data);

    if (props.variant) {
      // edit redux node variant slice
      try {
        // await inserting data into DB
        const newNodeVariant: CustomNodeVariant = {
          nodeName: data.component_name,
          handleTypes: data.handle_variants,
          color: data.color,
        };
        editVariant({ old: props.variant, new: newNodeVariant });
        toast.success("Component edited", {
          description: data.component_name,
        });

        //close modal
        // form.reset();
        props.setModalOpen(false);
      } catch (error) {
        toast.error("Error editing node", {
          description: `${error}`,
        });
      }
    } else {
      try {
        const newNodeVariant: CustomNodeVariant = {
          nodeName: data.component_name,
          handleTypes: data.handle_variants,
          color: data.color,
        };
        addVariant(newNodeVariant);

        toast.success("New component created", {
          description: data.component_name,
        });

        //close modal
        // form.reset();
        props.setModalOpen(false);
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
      <FormFieldGroupNode variant={props.variant && props.variant} />
    </ModalForm>
  );
};
