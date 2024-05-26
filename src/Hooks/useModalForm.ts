import { useFormContext } from "react-hook-form";
import { toast } from "sonner";

export const useModalForm = () => {
  const { reset } = useFormContext();

  const formSubmitSuccess = (
    toastMessage: string,
    toastDescription?: string,
    callback?: Function
  ) => {
    toast.success(toastMessage, {
      description: toastDescription && toastDescription,
    });
    reset();
    callback && callback();
  };

  const formSubmitFailure = (
    toastMessage: string,
    toastDescription?: string,
    callback?: Function
  ) => {
    toast.error(toastMessage, {
      description: toastDescription && toastDescription,
    });
    callback && callback();
  };

  return { formSubmitSuccess, formSubmitFailure };
};
