import nodeConfig from "@/Configs/nodeConfig";
import { toast } from "sonner";

export const useModalForm = () => {
  const formSubmitSuccess = (
    toastMessage: string,
    toastDescription?: string,
    callback?: Function
  ) => {
    if (
      nodeConfig.COMPONENT_MODAL_FORM_CREATES_TOAST_NOTIFICATION_ON_SUBMIT_SUCCESS
    ) {
      toast.success(toastMessage, {
        description: toastDescription && toastDescription,
      });
    }

    callback && callback();
  };

  const formSubmitFailure = (
    toastMessage: string,
    toastDescription?: string,
    callback?: Function
  ) => {
    if (
      nodeConfig.COMPONENT_MODAL_FORM_CREATES_TOAST_NOTIFICATION_ON_SUBMIT_FAILURE
    ) {
      toast.error(toastMessage, {
        description: toastDescription && toastDescription,
      });
    }

    callback && callback();
  };

  return { formSubmitSuccess, formSubmitFailure };
};
