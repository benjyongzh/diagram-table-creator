import { ModalForm } from "./ModalForm";
import { FormFieldGroupNode } from "../formFieldGroups/FormFieldGroupNode";
import { z } from "zod";
import formSchemaNewNode from "Types/schemas/formSchemaNewNode";

//redux
import CustomNodeVariant from "Types/nodes/customNodeVariant";

// hooks
import { useStoreNodeVariants } from "Hooks/useStoreNodeVariants";
import { useModalForm } from "Hooks/useModalForm";
import { useMemo } from "react";

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
        const newNodeVariant: CustomNodeVariant = {
          nodeName: data.component_name,
          handleTypes: data.handle_variants,
          color: data.color,
        };
        // await inserting data into DB
        editVariant({ old: props.variant, new: newNodeVariant });
        formSubmitSuccess("Component edited", data.component_name, () =>
          props.setModalOpen(false)
        );
      } catch (error) {
        formSubmitFailure("Error editing component", `${error}`);
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

  const submitModalContent = useMemo(
    () =>
      props.variant && (
        <div className="flex flex-col gap-2">
          <span>{`${props.variant.nodeName}'s connections will be affected by any changes. You cannot undo this action.`}</span>
        </div>
      ),
    [props.variant]
  );

  // const submitMiddleware = (
  //   data: z.infer<typeof schema>
  // ): z.infer<typeof schema> => {
  //   // middleware logic before real form submission
  //   // check differences
  //   const newNodeVariant: CustomNodeVariant = {
  //     nodeName: data.component_name,
  //     handleTypes: data.handle_variants,
  //     color: data.color,
  //   };
  //   if (JSON.stringify(props.variant) !== JSON.stringify(newNodeVariant)) {
  //     //* spawn modalConfirmation. how?
  //   }

  //   return data;
  // };

  return (
    <ModalForm
      title={props.variant ? "Edit Component" : "Create New Component"}
      width={760}
      schema={schema}
      onSubmit={onNodeFormSubmit}
      submitModal={
        props.variant && {
          title: `Confirm edit ${props.variant.nodeName}?`,
          content: submitModalContent,
          destructive: false,
        }
      }
      // submitMiddleware={submitMiddleware}
    >
      <FormFieldGroupNode variant={props.variant && props.variant} />
    </ModalForm>
  );
};
