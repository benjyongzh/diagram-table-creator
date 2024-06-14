import { getConnectedEdges, Edge, Node } from "reactflow";
import { useMemo } from "react";
import { useAppSelector } from "./reduxHooks";

export const useConnectedEdges = (nodeId: string) => {
  const allEdges: Edge[] = useAppSelector(
    (state) => state.reactFlowObjects.edges
  );
  const thisNode: Node = useAppSelector(
    (state) => state.reactFlowObjects.nodes
  ).filter((node: Node) => node.id === nodeId)[0];

  const connectedEdges = useMemo(
    () => getConnectedEdges([thisNode], allEdges),
    [nodeId, allEdges]
  );
  return connectedEdges;
};
