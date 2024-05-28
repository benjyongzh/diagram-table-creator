import { Edge, EdgeTypes } from "reactflow";
import edgeConfig from "Configs/edgeConfig";
import CustomEdge from "Components/CustomEdge";
import CustomEdgeVariant from "Types/customEdgeVariant";

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

export const initialCustomEdgeVariants: Array<CustomEdgeVariant> = [
  {
    edgeName: "Ethernet",
    edgeIdentifier: "ET",
  },
  {
    edgeName: "Fibre Optic",
    edgeIdentifier: "FO",
  },
];
