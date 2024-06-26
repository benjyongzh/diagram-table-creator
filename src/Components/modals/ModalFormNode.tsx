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

import { onFormSubmitParams, onFormSubmitFunction } from "./ModalForm";

type ModalFormNodeProps = {
  setModalOpen: Function;
  variant?: CustomNodeVariant;
};

type modalFormNodeSubmitArgs = Omit<onFormSubmitParams, "data"> & {
  data: z.infer<typeof schema>;
};

const schema = formSchemaNewNode;

export const ModalFormNode = (props: ModalFormNodeProps) => {
  const { addVariant, editVariant } = useStoreNodeVariants();
  const { formSubmitSuccess, formSubmitFailure } = useModalForm();

  const onNodeFormSubmit: onFormSubmitFunction = async (
    formData: modalFormNodeSubmitArgs
  ) => {
    const { data, form } = formData;
    // console.log(data);

    if (props.variant) {
      // edit redux node variant slice
      try {
        const newNodeVariant: CustomNodeVariant = {
          nodeName: data.component_name,
          handleTypes: data.handle_variants,
          color: data.color,
        };
        if (form.formState.isDirty) {
          // await inserting data into DB
          editVariant({ old: props.variant, new: newNodeVariant });
          formSubmitSuccess("Component edited", data.component_name, () =>
            props.setModalOpen(false)
          );
        } else {
          props.setModalOpen(false);
        }
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
          <span>{`${props.variant.nodeName}'s connections will be affected by changes made. You cannot undo this action.`}</span>
        </div>
      ),
    [props.variant]
  );

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
    >
      <FormFieldGroupNode variant={props.variant && props.variant} />
    </ModalForm>
  );
};
