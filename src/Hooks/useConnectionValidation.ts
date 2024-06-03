import { Connection, Edge } from "reactflow";
import {
  createEdgeId,
  createNewConnectionTypeIndex,
  getUsableEdgeIdentifierFromConnection,
  createEdgeStartLabel,
  createEdgeEndLabel,
} from "Utilities/reactFlowEdges";

//redux

// types
import { EdgeIdentifier } from "Types/schemas/edgeIdentifier";
import EdgeData from "Types/EdgeData";

// hooks

// util
import { getConnectionTypeFromConnectionHandleString } from "Utilities/reactFlowHandles";
import CustomEdgeVariant, { emptyEdgeVariant } from "Types/customEdgeVariant";

export const useConnectionValidation = (
  allEdges: Edge[],
  allEdgeVariants: CustomEdgeVariant[]
) => {
  const connectionIsValid = (connection: Connection): boolean => {
    if (
      !connection ||
      !connection.source ||
      !connection.sourceHandle ||
      !connection.target ||
      !connection.targetHandle
    )
      return false;

    const sourceConnectionType: EdgeIdentifier =
      getConnectionTypeFromConnectionHandleString(connection.sourceHandle);
    const targetConnectionType: EdgeIdentifier =
      getConnectionTypeFromConnectionHandleString(connection.targetHandle);
    const result: boolean =
      sourceConnectionType === targetConnectionType ||
      sourceConnectionType === "" ||
      targetConnectionType === "";
    // console.log(result);
    return result;
  };

  const createValidEdgeConnection = (connection: Connection): Edge => {
    const { source, target, sourceHandle, targetHandle } = connection;
    // get edgeIdentifier of connection
    const edgeIdentifier: EdgeIdentifier =
      getUsableEdgeIdentifierFromConnection(connection);

    // get new connectionTypeIndex. bsaed on next highest index of this connectionType
    const connectionTypeIndex: number = createNewConnectionTypeIndex(
      allEdges,
      edgeIdentifier
    );

    // create a CustomEdgeVariant with a connectionTypeIndex value
    const edgeVariant: CustomEdgeVariant =
      allEdgeVariants.filter(
        (variant) => variant.edgeIdentifier === edgeIdentifier
      )[0] || emptyEdgeVariant;

    // create edge data
    const edgeStartLabel: string = createEdgeStartLabel(connection);
    const edgeEndLabel: string = createEdgeEndLabel(connection);
    const edgeData: EdgeData = {
      ...edgeVariant,
      connectionTypeIndex,
      edgeStartLabel,
      edgeEndLabel,
    };

    // create id
    const id: string = createEdgeId(
      connection,
      edgeIdentifier,
      connectionTypeIndex
    );

    const edge: Edge = {
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
    return edge;
  };

  return { connectionIsValid, createValidEdgeConnection };
};
