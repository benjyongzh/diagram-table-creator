import { Node, NodeTypes, Position } from "reactflow";
import CustomComponentNode from "Components/CustomComponentNode";
import nodeConfigs from "@/Configs/nodeConfig";
import { NodeVariant } from "Types/nodes/nodeVariant";
import colors from "Types/colorString";
import edgeConfig from "@/Configs/edgeConfig";
import { HandleVariant } from "Types/handles/handleVariant";

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

export const initialHandleVariants: HandleVariant[] = [
  {
    id: "12345",
    handleType: "source", //source | target
    handleName: "bleh",
    position: Position.Right,
    quantity: 4,
    edgeVariantId: edgeConfig.FREE_CONNECTION_TYPE_VARIANT_ID,
  },
  {
    id: "67890",
    handleType: "source", //source | target
    handleName: "bla",
    position: Position.Top,
    quantity: 2,
    edgeVariantId: "12345",
  },

  {
    id: "abcde",
    handleType: "source", //source | target
    handleName: "blu",
    position: Position.Bottom,
    quantity: 8,
    edgeVariantId: "67890",
  },
  {
    id: "fghij",
    handleType: "source", //source | target
    handleName: "blihhh",
    position: Position.Right,
    quantity: 7,
    edgeVariantId: "12345",
  },
];

export const initialNodeVariants: Array<NodeVariant> = [
  {
    id: "12345",
    nodeName: "Monitoring Unit",
    handleTypes: ["12345", "67890", "abcde"],
    color: colors.orange,
  },
  {
    id: "67890",
    nodeName: "Extension Unit",
    handleTypes: ["fghij"],
    color: colors.blue,
  },
];

export default initialNodes;
