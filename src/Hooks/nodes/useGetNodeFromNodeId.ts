import { NodeId } from "Types/nodes/node";
import { Node } from "reactflow";
// hooks
import { useAppSelector } from "Hooks/reduxHooks";

export const useGetNodeFromNodeId = () => {
  const allNodes: Node[] = useAppSelector((state) => state.nodes.nodes);
  const getNodeFromNodeId = (nodeId: NodeId): Node => {
    return allNodes.filter((node) => node.id === nodeId)[0];
  };
  return getNodeFromNodeId;
};
