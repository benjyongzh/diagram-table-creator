import { Node, NodeTypes, Position } from "reactflow";
import CustomComponentNode from "Components/CustomComponentNode";
import nodeConfigs from "Configs/nodeConfig";
import CustomNodeVariant from "Types/customNodeVariant";
import colors from "Types/colorString";
import edgeConfig from "Configs/edgeConfig";

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
        handleTypeId: "12345",
        handleType: "source", //source | target
        handleName: "bleh",
        position: Position.Right,
        quantity: 4,
        connectionType: edgeConfig.FREE_CONNECTION_TYPE_EDGE_IDENTIFIER,
      },
      {
        handleTypeId: "67890",
        handleType: "source", //source | target
        handleName: "bla",
        position: Position.Top,
        quantity: 2,
        connectionType: "ET",
      },

      {
        handleTypeId: "abcde",
        handleType: "source", //source | target
        handleName: "blu",
        position: Position.Bottom,
        quantity: 8,
        connectionType: "FO",
      },
    ],
    color: colors.orange,
  },
  {
    nodeName: "Extension Unit",
    handleTypes: [
      {
        handleTypeId: "fghij",
        handleType: "source", //source | target
        handleName: "blihhh",
        position: Position.Right,
        quantity: 7,
        connectionType: "ET",
      },
    ],
    color: colors.blue,
  },
];

export default initialNodes;
