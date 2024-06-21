import { Edge } from "reactflow";

// services
import { createEdgeVariantId } from "Services/edgeVariants";

// redux
import {
  addEdgeVariant as storeAddEdgeVariant,
  removeEdgeVariant as storeRemoveEdgeVariant,
} from "Store/edgeVariantSlice";

// hooks
import { useStoreEdges } from "./useStoreEdges";
import { useAppSelector, useAppDispatch } from "./reduxHooks";

// types
import {
  EdgeVariant,
  EdgeVariantId,
  EdgeVariantData,
} from "Types/edges/edgeVariant";
import { EdgeIdentifier } from "Types/edges/edgeIdentifier";

export const useStoreEdgeVariants = () => {
  const dispatch = useAppDispatch();
  const { allEdges, removeEdge } = useStoreEdges();
  const allEdgeVariants: EdgeVariant[] = useAppSelector(
    (state) => state.edgeVariants.edgeVariants
  );

  const addEdgeVariant = (newVariantData: EdgeVariantData) => {
    const id: EdgeVariantId = createEdgeVariantId();
    const newVariant: EdgeVariant = { id, ...newVariantData };
    dispatch(storeAddEdgeVariant(newVariant));
  };

  const updateEdgeVariant = (updatedVariant: EdgeVariant) => {
    //TODO! update edges of this variant as well
    const edgesToUpdate: Edge[] = getEdges(updatedVariant.id);
    for (let i = 0; i < edgesToUpdate.length; i++) {
      // update mainLabel
      // update edgeStartLabel
      // update edgeEndLabel
      // update variantIndex
    }
  };

  const removeEdgeVariant = (id: EdgeVariantId) => {
    // delete edges of this variant first
    const edgesToDelete: Edge[] = getEdges(id);
    for (let i = 0; i < edgesToDelete.length; i++) {
      removeEdge(edgesToDelete[i].id);
    }

    //TODO! for all handles using this edgeVariant, set connectionType to any

    // delete this variant
    dispatch(storeRemoveEdgeVariant(id));
  };

  const getEdges = (id: EdgeVariantId): Edge[] => {
    return allEdges.filter((edge) => edge.data.variantId === id);
  };

  const getEdgeVariantFromEdgeIdentifier = (
    edgeIdentifier: EdgeIdentifier
  ): EdgeVariant => {
    return allEdgeVariants.filter(
      (variant) => variant.edgeIdentifier === edgeIdentifier
    )[0];
  };

  return {
    addEdgeVariant,
    updateEdgeVariant,
    removeEdgeVariant,
    getEdgeVariantFromEdgeIdentifier,
  };
};
