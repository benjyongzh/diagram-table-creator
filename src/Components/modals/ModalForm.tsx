import { Modal } from "./Modal";
import { Button } from "../ui/button";
import { DialogClose } from "../ui/dialog";
import { Form } from "../ui/form";
// import { toast } from "@/components/ui/use-toast";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";

type modalFormProps = {
  title: string;
  width: number;
  schema: z.ZodObject<any>;
  children: React.ReactNode;
  onSubmit: Function;
};

export const ModalForm = (props: modalFormProps) => {
  const { title, width, schema, children, onSubmit } = props;
  // const form = useForm<z.infer<typeof schema>>({
  //   resolver: zodResolver(schema),
  // });
  const form = useForm<z.infer<typeof schema>>();

  const onFormSubmit = (data: z.infer<typeof schema>) => {
    console.log("onFormSubmit is run");
    console.log(data);
    onSubmit(data);
  };

  return (
    <Modal title={title} width={width} isForm>
      <Form {...form}>
        <form
          // onSubmit={form.handleSubmit(onFormSubmit)}
          onSubmit={onFormSubmit}
          className="w-full space-y-6"
        >
          <FormProvider {...form}>{children}</FormProvider>
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
