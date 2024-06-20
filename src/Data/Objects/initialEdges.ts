import { Edge, EdgeTypes } from "reactflow";
import edgeConfig from "@/Configs/edgeConfig";
import CustomEdge from "Components/CustomEdge";
import { EdgeVariant } from "Types/edges/edgeVariant";

const initialEdges: Array<Edge> = [
  {
    id: "provider-e1-2",
    source: "provider-1",
    target: "provider-2",
    animated: true,
  },
  { id: "provider-e1-3", source: "provider-1", target: "provider-3" },
];

export default initialEdges;

export const initialEdgeTypes: EdgeTypes = {
  [edgeConfig.INITIAL_CUSTOM_EDGE_NAME]: CustomEdge,
};

export const initialEdgeVariants: Array<EdgeVariant> = [
  {
    id: "12345",
    edgeName: "Ethernet",
    edgeIdentifier: "ET",
  },
  {
    id: "67890",
    edgeName: "Fibre Optic",
    edgeIdentifier: "FO",
  },
];
