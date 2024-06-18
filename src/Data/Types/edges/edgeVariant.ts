import edgeConfig from "@/Configs/edgeConfig";
import { EdgeIdentifier } from "../schemas/edgeIdentifier";
import { z } from "zod";

export type EdgeVariantData = {
  edgeName: string;
  edgeIdentifier: EdgeIdentifier;
};

export const emptyEdgeVariant: EdgeVariantData = {
  edgeName: "",
  edgeIdentifier: edgeConfig.FREE_CONNECTION_TYPE_EDGE_IDENTIFIER,
};

const edgeVariantIdSchema = z
  .string()
  .length(edgeConfig.EDGE_VARIANT_ID_LENGTH);

export type EdgeVariantId = z.infer<typeof edgeVariantIdSchema>;

export type EdgeVariant = {
  id: EdgeVariantId;
} & EdgeVariantData;
