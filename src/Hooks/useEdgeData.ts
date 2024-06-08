import { useEffect, useState } from "react";
import { Connection, Edge, HandleType } from "reactflow";
import edgeIdentifierSchema, {
  EdgeIdentifier,
} from "Types/schemas/edgeIdentifier";
import {
  updateEdgeConnectionType,
  updateEdgeEndLabel,
} from "Utilities/reactFlowEdges";
import {
  getConnectionTypeFromConnectionHandleString,
  getHandleIndexFromConnectionHandleString,
  getHandleNameFromConnectionHandleString,
} from "Utilities/reactFlowHandles";
import EdgeData from "Types/edgeData";
import { useAppSelector } from "./reduxHooks";

export const useEdgeData = (edgeId: string) => {
  const allEdges: Edge[] = useAppSelector(
    (state) => state.reactFlowObjects.edges
  );

  const edge: Edge = allEdges.filter((edge) => edge.id === edgeId)[0];

  const [edgeData, setEdgeData] = useState<EdgeData>(edge.data);

  const onHandleIdChange = (newHandleId: string, handleSide: HandleType) => {
    // check connectionType
    const edgeIdentifier: EdgeIdentifier =
      getConnectionTypeFromConnectionHandleString(newHandleId);

    // check handleName
    const updatedConnection: Connection = {
      source: "",
      target: "",
      sourceHandle: edge.sourceHandle!,
      targetHandle: edge.targetHandle!,
    };
    const newEdge: Edge = updateEdgeEndLabel(
      updateEdgeConnectionType(edge, edgeIdentifier),
      updatedConnection,
      handleSide
    );

    setEdgeData(newEdge.data);
  };

  useEffect(() => {
    onHandleIdChange(edge.sourceHandle!, "source");
  }, [edge.sourceHandle]);

  useEffect(() => {
    onHandleIdChange(edge.targetHandle!, "target");
  }, [edge.targetHandle]);
  return edgeData;
};
