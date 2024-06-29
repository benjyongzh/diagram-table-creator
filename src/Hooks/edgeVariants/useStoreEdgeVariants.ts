import { Edge } from "reactflow";

// services
import { createEdgeVariantId } from "Services/edgeVariants";

// redux
import {
  addEdgeVariant as storeAddEdgeVariant,
  removeEdgeVariant as storeRemoveEdgeVariant,
  updateEdgeVariant as storeUpdateEdgeVariant,
} from "Store/edgeVariantSlice";

// hooks
import { useStoreEdges } from "../edges/useStoreEdges";
import { useAppDispatch } from "../reduxHooks";
import { useGetEdgesOfVariantId } from "./useGetEdgesOfVariantId";
import { useSetEdgeVariantIdOfHandleVariant } from "Hooks/handleVariants/useSetEdgeVariantIdOfHandleVariant";

// types
import {
  EdgeVariant,
  EdgeVariantId,
  EdgeVariantData,
} from "Types/edges/edgeVariant";
import edgeConfig from "Configs/edgeConfig";

export const useStoreEdgeVariants = () => {
  const dispatch = useAppDispatch();
  const getEdgesOfVariantId = useGetEdgesOfVariantId();
  const setEdgeVariantIdOfHandleVariant = useSetEdgeVariantIdOfHandleVariant();

  const { removeEdge } = useStoreEdges();

  const addEdgeVariant = (newVariantData: EdgeVariantData) => {
    const id: EdgeVariantId = createEdgeVariantId();
    const newVariant: EdgeVariant = { id, ...newVariantData };
    dispatch(storeAddEdgeVariant(newVariant));
  };

  const updateEdgeVariant = (updatedVariant: EdgeVariant) => {
    // const edgesToUpdate: Edge[] = getEdgesOfVariantId(updatedVariant.id);
    // update edges of this variant as well
    // for (let i = 0; i < edgesToUpdate.length; i++) {
    // update mainLabel
    // update edgeStartLabel
    // update edgeEndLabel
    // update variantIndex
    // }
    dispatch(storeUpdateEdgeVariant(updatedVariant));
  };

  const removeEdgeVariant = (id: EdgeVariantId) => {
    // delete edges of this variant first
    const edgesToDelete: Edge[] = getEdgesOfVariantId(id);
    for (let i = 0; i < edgesToDelete.length; i++) {
      removeEdge(edgesToDelete[i].id);
    }

    // for all handles using this edgeVariant, set connectionType to any
    setEdgeVariantIdOfHandleVariant({
      initialEdgeVariantId: id,
      finalEdgeVariantId: edgeConfig.FREE_CONNECTION_TYPE_VARIANT_ID,
    });

    // delete this variant
    dispatch(storeRemoveEdgeVariant(id));
  };

  return {
    addEdgeVariant,
    updateEdgeVariant,
    removeEdgeVariant,
  };
};
