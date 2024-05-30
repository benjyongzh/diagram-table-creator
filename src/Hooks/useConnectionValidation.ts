import { Connection, Edge } from "reactflow";
import { standardEdgeData } from "Objects/edges";
import { createEdgeId } from "Utilities/reactFlowEdges";

//redux

// types
import { EdgeIdentifier } from "Types/schemas/edgeIdentifier";

// hooks

// util
import { getConnectionTypeFromConnectionHandleString } from "Utilities/reactFlowHandles";
import CustomEdgeVariant from "Types/customEdgeVariant";

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

  const getLargestConnectionTypeIndex = (
    edges: Edge[],
    edgeId: EdgeIdentifier
  ): number | null => {
    const sortedIndexes: number[] = edges
      .filter((edge) => edge.data.edgeIdentifier === edgeId)
      .map((edge) => edge.data.connectionTypeIndex)
      .sort();
    return sortedIndexes.length
      ? sortedIndexes[sortedIndexes.length - 1]
      : null;
  };

  const createNewConnectionTypeIndex = (
    edges: Edge[],
    edgeId: EdgeIdentifier
  ): number => {
    const largest: number | null = getLargestConnectionTypeIndex(edges, edgeId);
    return largest === null ? 1 : largest + 1;
  };

  const createValidEdgeConnection = (connection: Connection): Edge => {
    const { source, target, sourceHandle, targetHandle } = connection;
    // get edgeIdentifier of target
    const edgeIdentifier: EdgeIdentifier =
      getConnectionTypeFromConnectionHandleString(connection.targetHandle!);

    // get new connectionTypeIndex. bsaed on next highest index of this connectionType
    const connectionTypeIndex: number = createNewConnectionTypeIndex(
      allEdges,
      edgeIdentifier
    );

    // create a CustomEdgeVariant with a connectionTypeIndex value
    const edgeVariant: CustomEdgeVariant = allEdgeVariants.filter(
      (variant) => variant.edgeIdentifier === edgeIdentifier
    )[0];
    const edgeData = {
      ...edgeVariant,
      connectionTypeIndex,
    };

    // create id
    const id: string = createEdgeId(
      connection,
      edgeIdentifier,
      connectionTypeIndex
    );

    const edge: Edge = {
      id,
      ...standardEdgeData,
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
