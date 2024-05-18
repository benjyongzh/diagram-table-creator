import { Modal } from "./Modal";
import { Switch } from "./ui/switch";
import { Button } from "./ui/button";
import { DialogClose } from "./ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "./ui/form";
// import { toast } from "@/components/ui/use-toast";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import React from "react";
import { FormFieldsContainer } from "./FormFieldsContainer";

type modalFormProps = {
  title: string;
  schema: z.ZodObject<any>;
  formFields: React.ReactNode;
  onSubmit: Function;
};

export const ModalForm = (props: modalFormProps) => {
  const { title, schema, formFields, onSubmit } = props;
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      security_emails: true,
    },
  });

  function onFormSubmit(data: z.infer<typeof schema>) {
    onSubmit(data);
    // toast({
    //   title: "You submitted the following values:",
    //   description: (
    //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //   ),
    // });
  }
  return (
    <Modal title={title} width={640} isForm>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onFormSubmit)}
          className="w-full space-y-6"
        >
          <div>
            <h3 className="mb-4 text-lg font-medium">{title}</h3>
            <FormFieldsContainer form={form}>{formFields}</FormFieldsContainer>
          </div>
          <div className="w-full flex items-center justify-end gap-4">
            <Button type="submit" className="px-8">
              Submit
            </Button>
            <DialogClose asChild>
              <Button type="button" variant="outline" className="px-8">
                Cancel
              </Button>
            </DialogClose>
          </div>
        </form>
      </Form>
    </Modal>
  );
};
