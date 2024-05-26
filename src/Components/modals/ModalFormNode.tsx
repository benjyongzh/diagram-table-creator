import { ModalForm } from "./ModalForm";
import { FormFieldGroupNode } from "../formFieldGroups/FormFieldGroupNode";
import { z } from "zod";
import formSchemaNewNode from "Types/schemas/formSchemaNewNode";

//redux
import CustomNodeVariant from "Types/customNodeVariant";

// hooks
import { useStoreNodeVariants } from "Hooks/useStoreNodeVariants";
import { useModalForm } from "Hooks/useModalForm";

type ModalFormNodeProps = {
  setModalOpen: Function;
  variant?: CustomNodeVariant;
};

const schema = formSchemaNewNode;

export const ModalFormNode = (props: ModalFormNodeProps) => {
  const { addVariant, editVariant } = useStoreNodeVariants();
  const { formSubmitSuccess, formSubmitFailure } = useModalForm();

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
        formSubmitSuccess("Component edited", data.component_name, () =>
          props.setModalOpen(false)
        );
      } catch (error) {
        formSubmitFailure("Error editing node", `${error}`);
      }
    } else {
      try {
        const newNodeVariant: CustomNodeVariant = {
          nodeName: data.component_name,
          handleTypes: data.handle_variants,
          color: data.color,
        };
        addVariant(newNodeVariant);
        formSubmitSuccess("Component created", data.component_name, () =>
          props.setModalOpen(false)
        );
      } catch (error) {
        formSubmitFailure("Error editing node", `${error}`);
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
