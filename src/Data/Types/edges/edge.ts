import { EdgeVariantId } from "./edgeVariant";
import edgeConfig from "Configs/edgeConfig";
import { z } from "zod";

export type EdgeData = {
  variantId: EdgeVariantId;
};

const edgeIdSchema = z.string().length(edgeConfig.EDGE_ID_LENGTH);

export type EdgeId = z.infer<typeof edgeIdSchema>;

export const standardEdgeData = {
  type: edgeConfig.INITIAL_CUSTOM_EDGE_NAME,
  deletable: true,
  focusable: true,
  //styling
};
