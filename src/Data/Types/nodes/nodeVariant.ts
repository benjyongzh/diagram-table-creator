import { HandleVariantId } from "../handles/handleVariant";
import colors from "../colorString";
import { z } from "zod";
import nodeConfig from "Configs/nodeConfig";

export type NodeVariantData = {
  nodeName: string;
  handleTypes: HandleVariantId[];
  color: colors;
};

export const nodeVariantIdSchema = z
  .string()
  .length(nodeConfig.NODE_VARIANT_ID_LENGTH);

export type NodeVariantId = z.infer<typeof nodeVariantIdSchema>;

export type NodeVariant = {
  id: NodeVariantId;
} & NodeVariantData;
