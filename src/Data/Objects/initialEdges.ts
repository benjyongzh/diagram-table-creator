import { Edge } from "reactflow";

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
