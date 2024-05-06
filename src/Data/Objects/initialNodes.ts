import { Node, NodeTypes, Position } from "reactflow";
import CustomComponentNode from "Components/CustomComponentNode";
import nodeConfigs from "Configs/nodeConfig";
import CustomNodeVariant from "Types/customNodeVariant";
import colorName from "Types/colorString";

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

export const initialNodeTypes: NodeTypes = {
  [nodeConfigs.INITIAL_CUSTOM_NODE_NAME]: CustomComponentNode,
};

export const initialCustomNodeVariants: Array<CustomNodeVariant> = [
  {
    nodeName: "Monitoring Unit",
    handleTypes: [
      {
        handleType: "source", //source | target
        position: Position.Right,
        quantity: 7,
      },
    ],
    color: colorName.orange,
  },
  { nodeName: "Extension Unit", handleTypes: [], color: colorName.blue },
];

export default initialNodes;
