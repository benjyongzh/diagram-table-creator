import { Connection, Edge } from "reactflow";
//redux

// types
import { EdgeIdentifier } from "Types/edges/edgeIdentifier";
import { EdgeVariant, emptyEdgeVariant } from "Types/edges/edgeVariant";

// hooks
import { useAppSelector } from "./reduxHooks";

// util
import { getConnectionTypeFromConnectionHandleString } from "@/Services/reactFlowHandles";
import edgeConfig from "@/Configs/edgeConfig";

export const useConnectionValidation = () => {
  const allEdges: Edge[] = useAppSelector((state) => state.edges.edges);
  const allEdgeVariants: EdgeVariant[] = useAppSelector(
    (state) => state.edgeVariants.edgeVariants
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
      sourceConnectionType ===
        edgeConfig.FREE_CONNECTION_TYPE_EDGE_IDENTIFIER ||
      targetConnectionType === edgeConfig.FREE_CONNECTION_TYPE_EDGE_IDENTIFIER;
    // console.log(result);
    return result;
  };

  /*
  const createValidEdgeConnection = (connection: Connection): Edge => {
    const { source, target, sourceHandle, targetHandle } = connection;
    // get edgeIdentifier of connection
    const edgeIdentifier: EdgeIdentifier =
      getUsableEdgeIdentifierFromConnection(connection);

    // get new connectionTypeIndex. bsaed on next highest index of this connectionType
    const variantIndex: number = getVariantCountOfEdges() + 1;

    // create a CustomEdgeVariant with a connectionTypeIndex value
    const edgeVariant: EdgeVariant =
      allEdgeVariants.filter(
        (variant) => variant.edgeIdentifier === edgeIdentifier
      )[0] || emptyEdgeVariant;

    // create edge data
    const mainLabel: string = createEdgeMainLabel(edgeIdentifier, variantIndex);
    const edgeStartLabel: string = createEdgeLabelAtSource(connection);
    const edgeEndLabel: string = createEdgeLabelAtTarget(connection);
    const edgeData: EdgeData = {
      ...edgeVariant,
      variantIndex,
      mainLabel,
      edgeStartLabel,
      edgeEndLabel,
    };

    // create id
    const id: string = createEdgeId();

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
  */

  return { connectionIsValid };
};
