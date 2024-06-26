const nodeConfig = {
  INITIAL_CUSTOM_NODE_NAME: "myNode",
  STARTING_X_POS: 0,
  STARTING_Y_POS: 0,
  ID_LENGTH: 5,
  HANDLETYPE_QUANTITY_MIN: 1,
  HANDLETYPE_QUANTITY_MAX: 20,
  COMPONENT_MODAL_FORM_CREATES_TOAST_NOTIFICATION_ON_SUBMIT_SUCCESS: true,
  COMPONENT_MODAL_FORM_CREATES_TOAST_NOTIFICATION_ON_SUBMIT_FAILURE: true,
  EDITING_VARIANT_EDITS_AFFECTED_EDGES: true,
  DELETION_REQUIRES_USER_CONFIRMATION: true,
  DELETION_DELETES_AFFECTED_EDGES: true,
  DELETION_CREATES_TOAST_NOTIFICATION: true,
};

export default nodeConfig;

export const nodeBackgroundBrightnessTailwind = {
  normal: 600,
  hover: 500,
};
