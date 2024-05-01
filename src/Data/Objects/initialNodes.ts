import { Node } from "reactflow";

const initialNodes: Array<Node> = [
  {
    id: "provider-1",
    type: "input",
    data: { label: "Node 1" },
    position: { x: 250, y: 5 },
  },
  { id: "provider-2", data: { label: "Node 2" }, position: { x: 100, y: 100 } },
  { id: "provider-3", data: { label: "Node 3" }, position: { x: 400, y: 100 } },
  { id: "provider-4", data: { label: "Node 4" }, position: { x: 400, y: 200 } },
];

export default initialNodes;
