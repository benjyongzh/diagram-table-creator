import {
  ModalForm,
  onFormSubmitParams,
  onFormSubmitFunction,
} from "./ModalForm";
import { FormFieldGroupNode } from "../formFieldGroups/FormFieldGroupNode";
import { z } from "zod";

// types
import { EdgeVariant, EdgeVariantData } from "Types/edges/edgeVariant";
import formSchemaNewEdgeVariant from "Types/forms/formSchemaNewEdgeVariant";

// hooks
import { useStoreEdgeVariants } from "Hooks/edgeVariants/useStoreEdgeVariants";
import { useModalForm } from "Hooks/useModalForm";
import { useMemo } from "react";

type ModalFormNodeProps = {
  setModalOpen: Function;
  variant?: EdgeVariant;
};

type modalFormNodeSubmitArgs = Omit<onFormSubmitParams, "data"> & {
  data: z.infer<typeof schema>;
};

const schema = formSchemaNewEdgeVariant;

export const ModalFormEdge = (props: ModalFormNodeProps) => {
  const { addEdgeVariant, updateEdgeVariant } = useStoreEdgeVariants();
  const { formSubmitSuccess, formSubmitFailure } = useModalForm();

  const onEdgeFormSubmit: onFormSubmitFunction = async (
    formData: modalFormNodeSubmitArgs
  ) => {
    const { data, form } = formData;
    // console.log(data);

    if (props.variant) {
      // edit redux node variant slice
      try {
        const newEdgeVariantData: EdgeVariantData = {
          edgeName: data.connection_name,
          edgeIdentifier: data.connection_identifier,
        };
        if (form.formState.isDirty) {
          // await inserting data into DB
          updateEdgeVariant({ id: props.variant.id, ...newEdgeVariantData });
          formSubmitSuccess("Connection edited", data.connection_name, () =>
            props.setModalOpen(false)
          );
        } else {
          props.setModalOpen(false);
        }
      } catch (error) {
        formSubmitFailure("Error editing connection", `${error}`);
      }
    } else {
      try {
        const newEdgeVariantData: EdgeVariantData = {
          edgeName: data.connection_name,
          edgeIdentifier: data.connection_identifier,
        };
        addEdgeVariant(newEdgeVariantData);
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
