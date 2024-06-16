import { ModalContentWrapper } from "./ModalContentWrapper";
import { Button } from "../ui/button";
import { DialogClose } from "../ui/dialog";
import { Form } from "../ui/form";
import { useEffect, useMemo } from "react";
import { Modal } from "./Modal";
import { DialogTrigger } from "../ui/dialog";
import { ModalConfirmation, ModalConfirmationProps } from "./ModalConfirmation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import ModalType from "Types/modalType";

type modalFormProps = {
  title: string;
  width: number;
  schema: z.ZodObject<any>;
  children: React.ReactNode;
  onSubmit: Function;
  // submitMiddleware?: Function;
  submitModal?: submitModalData;
};

type submitModalData = Omit<ModalConfirmationProps, "action">;

export const ModalForm = (props: modalFormProps) => {
  const {
    title,
    width,
    schema,
    children,
    onSubmit,
    // submitMiddleware,
    submitModal,
  } = props;
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  const onFormSubmit = async (data: z.infer<typeof schema>) => {
    // async request which may result error
    try {
      // await fetch()
      //* callback for props to execute logic as middleware before real submission. after callback then onSubmit
      // if (submitMiddleware) {
      //   const newData: z.infer<typeof schema> = submitMiddleware(data);
      //   await onSubmit(newData);
      // } else {
      await onSubmit(data);
      // }
    } catch (e) {
      // handle your error
    }
  };

  const hasSubmitModal = useMemo(
    () => submitModal && form.formState.isDirty,
    [submitModal, form.formState.isDirty /*, JSON.stringify(form.getValues())*/]
  );

  useEffect(() => {
    if (form.formState.isSubmitSuccessful) form.reset();
  }, [form.formState, form.reset]);

  return (
    <ModalContentWrapper title={title} width={width} modalType={ModalType.form}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onFormSubmit)}
          className="w-full space-y-6"
        >
          <FormProvider {...form}>{children}</FormProvider>
          <div className="w-full flex items-center justify-end gap-4">
            {hasSubmitModal ? (
              <Modal
                triggerElement={
                  <DialogTrigger>
                    <Button type="button" className="px-8">
                      Submit
                    </Button>
                  </DialogTrigger>
                }
                modalContent={
                  <ModalConfirmation
                    title={submitModal!.title}
                    content={submitModal!.content}
                    destructive={submitModal!.destructive}
                    action={form.handleSubmit(onFormSubmit)}
                  />
                }
              />
            ) : (
              <Button type="submit" className="px-8">
                Submit
              </Button>
            )}

            <DialogClose asChild>
              <Button type="button" variant="outline" className="px-8">
                Cancel
              </Button>
            </DialogClose>
          </div>
        </form>
      </Form>
    </ModalContentWrapper>
  );
};
