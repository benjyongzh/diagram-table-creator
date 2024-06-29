import {
  HandleVariant,
  HandleVariantConnectionType,
} from "Types/handles/handleVariant";
import { EdgeIdentifier } from "Types/edges/edgeIdentifier";
import edgeConfig from "Configs/edgeConfig";
import { useGetEdgeVariantFromId } from "Hooks/edgeVariants/useGetEdgeVariantFromId";

export const useGetEdgeIdentifierOfHandleVariant = () => {
  const getEdgeVariantFromId = useGetEdgeVariantFromId();
  const getEdgeIdentifierOfhandleVariant = (
    variant: HandleVariant
  ): EdgeIdentifier => {
    const edgeVariantId: HandleVariantConnectionType = variant.edgeVariantId;
    if (edgeVariantId === edgeConfig.FREE_CONNECTION_TYPE_VARIANT_ID) {
      return edgeConfig.FREE_CONNECTION_TYPE_EDGE_IDENTIFIER;
    } else {
      return getEdgeVariantFromId(edgeVariantId).edgeIdentifier;
    }
  };
  return getEdgeIdentifierOfhandleVariant;
};
