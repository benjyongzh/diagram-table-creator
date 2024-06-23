import { Node, Edge, Connection } from "reactflow";
import { toast } from "sonner";

//redux
import { onConnect, removeEdgeById, editEdge } from "@/Store/edgeSlice";

// hooks
import { useAppSelector, useAppDispatch } from "Hooks/reduxHooks";
import { useStoreEdgeVariants } from "./useStoreEdgeVariants";

// config

// types
import { EdgeId } from "Types/edges/edge";
import { EdgeVariantId } from "Types/edges/edgeVariant";
import { EdgeData } from "Types/edges/edge";
import { EdgeIdentifier } from "Types/edges/edgeIdentifier";
import {
  createEdgeId,
  getUsableEdgeIdentifierFromConnection,
} from "Services/edges";

export const useStoreEdges = () => {
  const dispatch = useAppDispatch();
  // const allNodes: Node[] = useAppSelector((state) => state.nodes.nodes);
  const allEdges: Edge[] = useAppSelector((state) => state.edges.edges);
  const { getEdgeVariantFromEdgeIdentifier } = useStoreEdgeVariants();

  const addEdgeFromConnection = (connection: Connection) => {
    const { source, target, sourceHandle, targetHandle } = connection;
    // get edgeIdentifier of connection
    const edgeIdentifier: EdgeIdentifier =
      getUsableEdgeIdentifierFromConnection(connection);

    // get variantId from edgeIdentifier
    const variantId: EdgeVariantId =
      getEdgeVariantFromEdgeIdentifier(edgeIdentifier).id;

    // create edge data
    const edgeData: EdgeData = {
      variantId,
    };

    // create id
    const id: EdgeId = createEdgeId();

    const newEdge: Edge = {
      id,
      data: edgeData,
      source: source!,
      target: target!,
      sourceHandle,
      targetHandle,
      //markerStart
      //markerEnd
      // label: "",
    };
    dispatch(onConnect(newEdge));
  };

  const updateEdge = (updatedEdge: Edge) => {
    dispatch(editEdge(updatedEdge));
  };

  const removeEdge = (edgeId: EdgeId) => {
    dispatch(removeEdgeById(edgeId));
  };

  const getVariantCountOfEdges = (variantId: EdgeVariantId): number => {
    const count: number = allEdges.filter(
      (edge) => edge.data.variantId === variantId
    ).length;
    return count;
  };

  const getEdgeById = (id: EdgeId): Edge => {
    return allEdges.filter((edge: Edge) => edge.id === id)[0];
  };

  // const editEdgesOfNodeVariant = (change: EditVariant) => {
  //   // narrow down all nodes of this variant
  //   const nodesToCheck: Node[] = allNodes.filter((node) =>
  //     nodeIsOfThisVariant(node, change.old)
  //   );

  //   if (
  //     JSON.stringify(change.new.handleTypes) !==
  //     JSON.stringify(change.old.handleTypes)
  //   ) {
  //     //* there are changes to make. narrow down which handleTypes has changes. cycle through old handleTypes' IDs first
  //     for (let i = 0; i < change.old.handleTypes.length; i++) {
  //       // i is index of old handleType
  //       const oldHandleType: HandleVariant = change.old.handleTypes[i];
  //       const oldHandleTypeId: string = oldHandleType.handleTypeId;
  //       const newHandleType: HandleVariant | null =
  //         change.new.handleTypes.filter(
  //           (handleType) => handleType.handleTypeId === oldHandleTypeId
  //         )[0];
  //       const edgeIdsToDelete: string[] = [];
  //       if (newHandleType) {
  //         console.log("edited Handle Type", newHandleType);
  //         // this handleType exists is both old and new. check if handleInfo etc is same
  //         //* check quantity
  //         if (oldHandleType.quantity > newHandleType.quantity) {
  //           const edgesToDelete: string[] = getConnectedEdges(
  //             nodesToCheck,
  //             allEdges
  //           )
  //             .filter((edge) => !edgeIdsToDelete.includes(edge.id))
  //             .filter((edge) =>
  //               edgeIsConnectedToHandleWhoseNewIndexIsNoLongerInRange(edge, {
  //                 oldHandleType,
  //                 newHandleType,
  //               })
  //             )
  //             .map((edge) => edge.id);
  //           edgeIdsToDelete.push(...edgesToDelete);
  //         }

  //         const edgesToCheck: Edge[] = getConnectedEdges(
  //           nodesToCheck,
  //           allEdges
  //         );

  //         // identify if it is the source or target that is experiencing connectionType change. (if both, then edge is still valid)
  //         const edgeConnectionDirections: EdgeConnectionDirectionToNode[] =
  //           getEdgeConnectionDirectionToNodes(edgesToCheck, nodesToCheck);
  //         for (let j = 0; j < edgeConnectionDirections.length; j++) {
  //           // j is number of edgesToCheck
  //           const direction: EdgeConnectionDirectionToNode =
  //             edgeConnectionDirections[j];
  //           const edge: Edge = edgesToCheck[j];
  //           switch (direction) {
  //             case "both":
  //               {
  //                 // both edge is connected to affected nodes on both ends. just update connectionType in edge
  //                 const newEdge: Edge = updateEdgeInfo(edge, {
  //                   connectionType: newHandleType.connectionType,
  //                   sourceHandleName: newHandleType.handleName,
  //                   targetHandleName: newHandleType.handleName,
  //                 });
  //                 updateEdge(newEdge, { useToast: false });
  //               }
  //               break;
  //             case "source":
  //               {
  //                 // check if target has connectionType of either "any" or newHandleType.connectionType. else, delete edge
  //                 if (
  //                   handleHasIncompatibleConnectionType(
  //                     edge.targetHandle!,
  //                     newHandleType.connectionType
  //                   )
  //                 ) {
  //                   // delete edge
  //                   console.log(`${edge.id} will be deleted`);
  //                   edgeIdsToDelete.push(edge.id);
  //                 } else {
  //                   // update redux object
  //                   const newEdge: Edge = updateEdgeInfo(edge, {
  //                     connectionType: newHandleType.connectionType,
  //                     sourceHandleName: newHandleType.handleName,
  //                   });
  //                   updateEdge(newEdge, { useToast: false });
  //                 }
  //               }

  //               break;
  //             case "target":
  //               {
  //                 // check if source has connectionType of either "any" or newHandleType.connectionType. else, delete edge
  //                 if (
  //                   handleHasIncompatibleConnectionType(
  //                     edge.sourceHandle!,
  //                     newHandleType.connectionType
  //                   )
  //                 ) {
  //                   // delete edge
  //                   console.log(`${edge.id} will be deleted`);
  //                   edgeIdsToDelete.push(edge.id);
  //                 } else {
  //                   // update redux object
  //                   const newEdge: Edge = updateEdgeInfo(edge, {
  //                     connectionType: newHandleType.connectionType,
  //                     targetHandleName: newHandleType.handleName,
  //                   });
  //                   updateEdge(newEdge, { useToast: false });
  //                 }
  //               }

  //               break;

  //             default:
  //               break;
  //           }
  //         }
  //       } else {
  //         // this handleType no longer exists. select all edges using this handleType and remove them
  //         const edgesToDelete = getEdgesConnectedToHandleName(
  //           allEdges,
  //           oldHandleType.handleName
  //         ).map((edge) => edge.id);
  //         edgeIdsToDelete.push(...edgesToDelete);
  //       }
  //       console.log(`final edgeIdsToDelete`, edgeIdsToDelete);

  //       // delete all in edgeIdsToDelete array
  //       for (let j = 0; j < edgeIdsToDelete.length; j++) {
  //         deleteEdge(edgeIdsToDelete[j]);
  //       }
  //     }
  //   }
  // };

  // // also used by useStoreEdgeById
  // const deleteEdge = (edgeId: string, options?: reduxObjectsHookOptions) => {
  //   dispatch(removeEdge(edgeId));
  //   if (
  //     (!options || options.useToast) &&
  //     edgeConfig.DELETION_CREATES_TOAST_NOTIFICATION
  //   ) {
  //     const edgeToDelete: Edge = allEdges.filter(
  //       (edge) => edge.id === edgeId
  //     )[0];
  //     toast.success("Connection deleted", {
  //       description: edgeToDelete.data.mainLabel,
  //     });
  //   }
  // };

  // const updateEdge = (edge: Edge, options?: reduxObjectsHookOptions) => {
  //   dispatch(editEdge(edge));
  //   if (
  //     (!options || options.useToast) &&
  //     edgeConfig.EDITING_CREATES_TOAST_NOTIFICATION
  //   ) {
  //     toast.success("Connection edited", {
  //       description: edge.data.mainLabel,
  //     });
  //   }
  // };

  return {
    allEdges,
    addEdgeFromConnection,
    updateEdge,
    removeEdge,
    getVariantCountOfEdges,
    getEdgeById,
  };
};
