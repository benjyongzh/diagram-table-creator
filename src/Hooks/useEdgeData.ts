import { useEffect, useMemo } from "react";
import { Connection, Edge, HandleType } from "reactflow";
import { EdgeIdentifier } from "Types/schemas/edgeIdentifier";
import {
  updateEdgeConnectionType,
  updateEdgeEndLabel,
} from "@/Services/reactFlowEdges";
import { getConnectionTypeFromConnectionHandleString } from "@/Services/reactFlowHandles";
import EdgeData from "Types/edges/edgeData";
import { useAppSelector } from "./reduxHooks";
import { useStoreEdges } from "./useStoreEdges";

export const useEdgeData = (edgeId: string) => {
  const allEdges: Edge[] = useAppSelector(
    (state) => state.reactFlowObjects.edges
  );
  const edge: Edge | null = useMemo(
    () => allEdges.filter((edge) => edge.id === edgeId)[0],
    [edgeId]
  );
  const { updateEdge } = useStoreEdges();

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

    // setEdgeData(newEdge.data);
    updateEdge(newEdge, { useToast: false });
  };

  useEffect(() => {
    if (edge && edge.sourceHandle)
      onHandleIdChange(edge.sourceHandle, "source");
  }, [edge.sourceHandle]);

  useEffect(() => {
    if (edge && edge.targetHandle)
      onHandleIdChange(edge.targetHandle, "target");
  }, [edge.targetHandle]);

  const edgeData: EdgeData = useMemo(() => edge.data, [edge.data]);
  return { edgeData };
};
