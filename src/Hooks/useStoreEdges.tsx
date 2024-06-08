import { Node, Edge, Connection, updateEdge } from "reactflow";
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
import { getConnectionTypeFromConnectionHandleString } from "Utilities/reactFlowHandles";
import {
  getEdgesConnectedToNodes,
  getEdgesConnectedToHandleName,
  getEdgesConnectedToHandleNameMoreThanIndex,
  getEdgeConnectionDirectionToNodes,
  updateEdgeConnectionType,
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
        if (newHandleType !== null) {
          // this handleType exists is both old and new. check if handleInfo etc is same
          //* check quantity
          if (oldHandleType.quantity > newHandleType.quantity) {
            // quantity is lower now select edges who are connected to index at most newHandleType.quantity
            const edgesToDelete = getEdgesConnectedToHandleNameMoreThanIndex(
              allEdges,
              oldHandleType.handleName,
              newHandleType.quantity
            ).map((edge) => edge.id);
            edgeIdsToDelete.concat(edgesToDelete);
          }

          //* check handleName. will affect edges' start and end labels

          //* connectionType
          if (oldHandleType.connectionType !== newHandleType.connectionType) {
            // connectionType has changed. for each edge, check if connection still valid
            const edgesToCheck: Edge[] = getEdgesConnectedToNodes(
              allEdges,
              nodesToCheck
            );
            // identify if it is the source or target what is experiencing connectionType change. (if both, then edge is still valid)
            const edgeConnectionDirections: EdgeConnectionDirectionToNode[] =
              getEdgeConnectionDirectionToNodes(edgesToCheck, nodesToCheck);
            for (let j = 0; j < edgeConnectionDirections.length; j++) {
              const direction: EdgeConnectionDirectionToNode =
                edgeConnectionDirections[j];
              const edge: Edge = edgesToCheck[j];
              switch (direction) {
                case "both":
                  // both edge is connected to affected nodes on both ends. just update connectionType in edge
                  const newEdge: Edge = updateEdgeConnectionType(
                    edge,
                    newHandleType.connectionType
                  );
                  setEdge(newEdge);

                  break;
                case "source":
                  // check if target has connectionType of either "any" or newHandleType.connectionType. else, delete edge
                  const targetConnectionType: EdgeIdentifier =
                    getConnectionTypeFromConnectionHandleString(
                      edge.targetHandle!
                    );
                  if (
                    targetConnectionType === newHandleType.connectionType ||
                    targetConnectionType === ""
                  ) {
                    // update redux object
                    const newEdge: Edge = updateEdgeConnectionType(
                      edge,
                      newHandleType.connectionType
                    );
                    setEdge(newEdge);
                  } else {
                    // delete edge
                    deleteEdge(edge.id);
                  }
                  break;
                case "target":
                  // check if source has connectionType of either "any" or newHandleType.connectionType. else, delete edge
                  const sourceConnectionType: EdgeIdentifier =
                    getConnectionTypeFromConnectionHandleString(
                      edge.sourceHandle!
                    );
                  if (
                    sourceConnectionType === newHandleType.connectionType ||
                    sourceConnectionType === ""
                  ) {
                    // update redux object
                    const newEdge: Edge = updateEdgeConnectionType(
                      edge,
                      newHandleType.connectionType
                    );
                    setEdge(newEdge);
                  } else {
                    // delete edge
                    deleteEdge(edge.id);
                  }
                  break;

                default:
                  break;
              }
            }
          }
        } else {
          // this handleType no longer exists. select all edges using this handleType and remove them
          const edgesToDelete = getEdgesConnectedToHandleName(
            allEdges,
            oldHandleType.handleName
          ).map((edge) => edge.id);
          edgeIdsToDelete.concat(edgesToDelete);
        }

        for (let j = 0; j < edgeIdsToDelete.length; j++) {
          deleteEdge(edgeIdsToDelete[j]);
        }
      }

      //* check for handleTypes that exist in new but not in old
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

  const setEdge = (edge: Edge, options?: reduxObjectsHookOptions) => {
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

  return { editEdgesOfNodeVariant, deleteEdgesOfNode, deleteEdge };
};
