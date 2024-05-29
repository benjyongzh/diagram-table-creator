import { Connection, Edge } from "reactflow";
import { standardEdgeData } from "Objects/edges";
import { createEdgeId } from "Utilities/reactFlowEdges";

//redux

// types
import { EdgeIdentifier } from "Types/schemas/edgeIdentifier";

// hooks
import { useAppSelector } from "Hooks/reduxHooks";

// util
import { getConnectionTypeFromConnectionHandleString } from "Utilities/reactFlowHandles";
import CustomEdgeVariant from "Types/customEdgeVariant";

export const useConnectionValidation = () => {
  const allEdgeVariants: CustomEdgeVariant[] = useAppSelector(
    (state) => state.customEdgeVariants.variants
  );
  const allEdges: Edge[] = useAppSelector(
    (state) => state.reactFlowObjects.edges
  );

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
    // get edgeIdentifier of target
    const edgeIdentifier: EdgeIdentifier =
      getConnectionTypeFromConnectionHandleString(connection.targetHandle!);

    // get new connectionTypeIndex. bsaed on next highest index of this connectionType
    const sortedIndexes: number[] = allEdges
      .filter((edge) => edge.data.edgeIdentifier === edgeIdentifier)
      .map((edge) => edge.data.connectionTypeIndex)
      .sort();
    const connectionTypeIndex: number = sortedIndexes.length
      ? sortedIndexes[sortedIndexes.length - 1]
      : 1;
    console.log(connectionTypeIndex);

    // create a CustomEdgeVariant with a connectionTypeIndex value
    const edgeVariant: CustomEdgeVariant = allEdgeVariants.filter(
      (variant) => variant.edgeIdentifier === edgeIdentifier
    )[0];
    //!allEdgeVariants is returning empty array
    console.log("allEdgeVariants", allEdgeVariants);
    console.log("edgeVariant", edgeVariant);
    const edgeData = { ...edgeVariant, connectionTypeIndex };

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
