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
import { useStoreEdges } from "./edges/useStoreEdges";
import { useAppSelector, useAppDispatch } from "./reduxHooks";

// types
import {
  EdgeVariant,
  EdgeVariantId,
  EdgeVariantData,
} from "Types/edges/edgeVariant";
import { EdgeIdentifier } from "Types/edges/edgeIdentifier";
// import { HandleVariant } from "Types/handles/handleVariant";
import { useStoreHandleVariants } from "./useStoreHandleVariants";
import edgeConfig from "Configs/edgeConfig";

export const useStoreEdgeVariants = () => {
  const dispatch = useAppDispatch();
  const allEdges: Edge[] = useAppSelector((state) => state.edges.edges);
  const { setEdgeVariantIdOfHandleVariant } = useStoreHandleVariants();
  const allEdgeVariants: EdgeVariant[] = useAppSelector(
    (state) => state.edgeVariants.edgeVariants
  );
  // const allHandleVariants: HandleVariant[] = useAppSelector(
  //   (state) => state.handleVariants.handleVariants
  // );
  const { removeEdge } = useStoreEdges();

  const getEdgeVariantFromId = (id: EdgeVariantId) =>
    allEdgeVariants.filter((variant) => variant.id === id)[0];

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

  const getEdgesOfVariantId = (id: EdgeVariantId): Edge[] => {
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
    getEdgeVariantFromId,
    addEdgeVariant,
    updateEdgeVariant,
    removeEdgeVariant,
    getEdgesOfVariantId,
    getEdgeVariantFromEdgeIdentifier,
  };
};
