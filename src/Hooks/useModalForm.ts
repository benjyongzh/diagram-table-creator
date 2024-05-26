import { toast } from "sonner";

export const useModalForm = () => {
  const formSubmitSuccess = (
    toastMessage: string,
    toastDescription?: string,
    callback?: Function
  ) => {
    toast.success(toastMessage, {
      description: toastDescription && toastDescription,
    });
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
