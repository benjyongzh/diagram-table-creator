import {
  Node,
  Edge,
  Connection,
  updateEdge,
  getConnectedEdges,
} from "reactflow";
import { toast } from "sonner";

//redux
import { removeEdge, editEdge } from "Features/reactFlowSlice";

// hooks
import { useAppSelector, useAppDispatch } from "Hooks/reduxHooks";

// config
import edgeConfig from "Configs/edgeConfig";

// types
import { EdgeConnectionDirectionToNode } from "Types/edgeConnectionDirectionToNode";

// utils
import { EditVariant } from "Types/customNodeVariant";
import { nodeIsOfThisVariant } from "Utilities/reactFlowNodes";
import { handleHasIncompatibleConnectionType } from "Utilities/reactFlowHandles";
import {
  getEdgesConnectedToHandleName,
  getEdgesConnectedToHandleNameMoreThanIndex,
  getEdgeConnectionDirectionToNodes,
  updateEdgeConnectionType,
  edgeIsConnectedToHandleWhoseNewIndexIsNoLongerInRange,
  updateEdgeInfo,
} from "Utilities/reactFlowEdges";
import { HandleVariant } from "Types/handleVariant";
import { EdgeIdentifier } from "Types/schemas/edgeIdentifier";
import { reduxObjectsHookOptions } from "Types/reduxObjectsHookOptions";

export const useStoreEdges = () => {
  const dispatch = useAppDispatch();
  const allNodes: Node[] = useAppSelector(
    (state) => state.reactFlowObjects.nodes
  );
  const allEdges: Edge[] = useAppSelector(
    (state) => state.reactFlowObjects.edges
  );

  const deleteEdgesOfNode = (node: Node) => {
    const nodeId: string = node.id;
    const edgesToDelete = allEdges.filter(
      (edge) => edge.source === nodeId || edge.target === nodeId
    );
    for (let i = 0; i < edgesToDelete.length; i++) {
      //delete by id
      deleteEdge(edgesToDelete[i].id);
    }
  };

  const editEdgesOfNodeVariant = (change: EditVariant) => {
    // narrow down all nodes of this variant
    const nodesToCheck: Node[] = allNodes.filter((node) =>
      nodeIsOfThisVariant(node, change.old)
    );

    if (
      JSON.stringify(change.new.handleTypes) !==
      JSON.stringify(change.old.handleTypes)
    ) {
      //* there are changes to make. narrow down which handleTypes has changes. cycle through old handleTypes' IDs first
      for (let i = 0; i < change.old.handleTypes.length; i++) {
        // i is index of old handleType
        const oldHandleType: HandleVariant = change.old.handleTypes[i];
        const oldHandleTypeId: string = oldHandleType.handleTypeId;
        const newHandleType: HandleVariant | null =
          change.new.handleTypes.filter(
            (handleType) => handleType.handleTypeId === oldHandleTypeId
          )[0];
        const edgeIdsToDelete: string[] = [];
        if (newHandleType) {
          console.log("edited Handle Type", newHandleType);
          // this handleType exists is both old and new. check if handleInfo etc is same
          //* check quantity
          if (oldHandleType.quantity > newHandleType.quantity) {
            const edgesToDelete: string[] = getConnectedEdges(
              nodesToCheck,
              allEdges
            )
              .filter((edge) => !edgeIdsToDelete.includes(edge.id))
              .filter((edge) =>
                edgeIsConnectedToHandleWhoseNewIndexIsNoLongerInRange(edge, {
                  oldHandleType,
                  newHandleType,
                })
              )
              .map((edge) => edge.id);
            console.log("edgesToDelete", edgesToDelete);
            edgeIdsToDelete.push(...edgesToDelete);
          }

          const edgesToCheck: Edge[] = getConnectedEdges(
            nodesToCheck,
            allEdges
          );

          // identify if it is the source or target that is experiencing connectionType change. (if both, then edge is still valid)
          const edgeConnectionDirections: EdgeConnectionDirectionToNode[] =
            getEdgeConnectionDirectionToNodes(edgesToCheck, nodesToCheck);
          for (let j = 0; j < edgeConnectionDirections.length; j++) {
            // j is number of edgesToCheck
            const direction: EdgeConnectionDirectionToNode =
              edgeConnectionDirections[j];
            const edge: Edge = edgesToCheck[j];
            switch (direction) {
              case "both":
                {
                  // both edge is connected to affected nodes on both ends. just update connectionType in edge
                  //* connectionType. will affect edges' mainLabel and connectionTypeVariantIndex
                  //
                  // const connectionTypeHasChanged: boolean =
                  //   oldHandleType.connectionType !==
                  //     newHandleType.connectionType &&
                  //   !edgeIdsToDelete.includes(edge.id);

                  //* check handleName. will affect edges' start and end labels
                  // const handleNameHasChanged: boolean =
                  //   oldHandleType.handleName !== newHandleType.handleName;
                  console.log(
                    `both ends of edge ${edge.id} are connected to edited handleType`
                  );
                  const newEdge: Edge = updateEdgeInfo(edge, {
                    connectionType: newHandleType.connectionType,
                    sourceHandleName: newHandleType.handleName,
                    targetHandleName: newHandleType.handleName,
                  });
                  updateEdge(newEdge);
                }
                break;
              case "source":
                {
                  // check if target has connectionType of either "any" or newHandleType.connectionType. else, delete edge
                  console.log(
                    `source end of edge ${edge.id} is connected to edited handleType`
                  );
                  if (
                    handleHasIncompatibleConnectionType(
                      edge.targetHandle!,
                      newHandleType.connectionType
                    )
                  ) {
                    // delete edge
                    console.log(`${edge.id} will be deleted`);
                    edgeIdsToDelete.push(edge.id);
                  } else {
                    // update redux object
                    const newEdge: Edge = updateEdgeInfo(edge, {
                      connectionType: newHandleType.connectionType,
                      sourceHandleName: newHandleType.handleName,
                    });
                    console.log("newEdge", newEdge);
                    updateEdge(newEdge);
                  }
                }

                break;
              case "target":
                {
                  // check if source has connectionType of either "any" or newHandleType.connectionType. else, delete edge
                  console.log(
                    `target end of edge ${edge.id} is connected to edited handleType`
                  );
                  if (
                    handleHasIncompatibleConnectionType(
                      edge.sourceHandle!,
                      newHandleType.connectionType
                    )
                  ) {
                    // delete edge
                    console.log(`${edge.id} will be deleted`);
                    edgeIdsToDelete.push(edge.id);
                  } else {
                    // update redux object
                    const newEdge: Edge = updateEdgeInfo(edge, {
                      connectionType: newHandleType.connectionType,
                      targetHandleName: newHandleType.handleName,
                    });
                    console.log("newEdge", newEdge);
                    updateEdge(newEdge);
                  }
                }

                break;

              default:
                break;
            }
          }
        } else {
          // this handleType no longer exists. select all edges using this handleType and remove them
          const edgesToDelete = getEdgesConnectedToHandleName(
            allEdges,
            oldHandleType.handleName
          ).map((edge) => edge.id);
          edgeIdsToDelete.push(...edgesToDelete);
        }
        console.log(`final edgeIdsToDelete`, edgeIdsToDelete);

        // delete all in edgeIdsToDelete array
        for (let j = 0; j < edgeIdsToDelete.length; j++) {
          deleteEdge(edgeIdsToDelete[j]);
        }
      }
    }
  };

  // also used by useStoreEdgeById
  const deleteEdge = (edgeId: string, options?: reduxObjectsHookOptions) => {
    dispatch(removeEdge(edgeId));
    if (
      (!options || options.useToast) &&
      edgeConfig.DELETION_CREATES_TOAST_NOTIFICATION
    ) {
      const edgeToDelete: Edge = allEdges.filter(
        (edge) => edge.id === edgeId
      )[0];
      toast.success("Connection deleted", {
        description: edgeToDelete.data.mainLabel,
      });
    }
  };

  const updateEdge = (edge: Edge, options?: reduxObjectsHookOptions) => {
    dispatch(editEdge(edge));
    if (
      (!options || options.useToast) &&
      edgeConfig.EDITING_CREATES_TOAST_NOTIFICATION
    ) {
      toast.success("Connection edited", {
        description: edge.data.mainLabel,
      });
    }
  };

  return {
    editEdgesOfNodeVariant,
    updateEdge,
    deleteEdgesOfNode,
    deleteEdge,
  };
};
