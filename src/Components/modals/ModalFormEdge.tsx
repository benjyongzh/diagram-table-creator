import { ModalForm } from "./ModalForm";
import { FormFieldGroupNode } from "../formFieldGroups/FormFieldGroupNode";
import { z } from "zod";
import formSchemaNewEdge from "Types/schemas/formSchemaNewEdge";

//redux
import CustomEdgeVariant from "Types/edges/customEdgeVariant";

// hooks
import { useStoreNodeVariants } from "Hooks/useStoreNodeVariants";
import { useModalForm } from "Hooks/useModalForm";
import { useMemo } from "react";

import { onFormSubmitParams, onFormSubmitFunction } from "./ModalForm";

type ModalFormNodeProps = {
  setModalOpen: Function;
  variant?: CustomEdgeVariant;
};

type modalFormNodeSubmitArgs = Omit<onFormSubmitParams, "data"> & {
  data: z.infer<typeof schema>;
};

const schema = formSchemaNewEdge;

export const ModalFormEdge = (props: ModalFormNodeProps) => {
  const { addVariant, editVariant } = useStoreNodeVariants();
  const { formSubmitSuccess, formSubmitFailure } = useModalForm();

  const onEdgeFormSubmit: onFormSubmitFunction = async (
    formData: modalFormNodeSubmitArgs
  ) => {
    const { data, form } = formData;
    // console.log(data);

    if (props.variant) {
      // edit redux node variant slice
      try {
        const newNodeVariant: CustomEdgeVariant = {
          edgeName: data.connection_name,
          edgeIdentifier: data.edge_identifier,
        };
        if (form.formState.isDirty) {
          // await inserting data into DB
          editVariant({ old: props.variant, new: newNodeVariant });
          formSubmitSuccess("Component edited", data.connection_name, () =>
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
        const newEdgeVariant: CustomEdgeVariant = {
          edgeName: data.connection_name,
          edgeIdentifier: data.edge_identifier,
        };
        addVariant(newEdgeVariant);
        formSubmitSuccess("Connection type created", data.connection_name, () =>
          props.setModalOpen(false)
        );
      } catch (error) {
        formSubmitFailure("Error editing connection type", `${error}`);
      }
    }
  };

  const submitModalContent = useMemo(
    () =>
      props.variant && (
        <div className="flex flex-col gap-2">
          <span>{`Any existing ${props.variant.edgeName} connections and components with ${props.variant.edgeName} handles will be affected by changes made. You cannot undo this action.`}</span>
        </div>
      ),
    [props.variant]
  );

  return (
    <ModalForm
      title={
        props.variant ? "Edit Connection Type" : "Create New Connection Type"
      }
      width={760}
      schema={schema}
      onSubmit={onEdgeFormSubmit}
      submitModal={
        props.variant && {
          title: `Confirm edit ${props.variant.edgeName}?`,
          content: submitModalContent,
          destructive: false,
        }
      }
    >
      <FormFieldGroupNode variant={props.variant && props.variant} />
    </ModalForm>
  );
};
