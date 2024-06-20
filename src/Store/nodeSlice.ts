import { createSlice, PayloadAction, Slice } from "@reduxjs/toolkit";
import { Node, NodeChange, applyNodeChanges } from "reactflow";
import {
  checkNodeType,
  // nodeIsOfThisVariant,
} from "@/Services/reactFlowNodes";
import nodeConfigs from "@/Configs/nodeConfig";
// import { EditVariant } from "Types/nodes/customNodeVariant";

type StoreNodes = {
  nodes: Node[];
};

// Define the initial state using that type
const initialState: StoreNodes = {
  nodes: [],
};

export const nodeSlice: Slice = createSlice({
  name: "nodes",
  initialState,
  reducers: {
    //node objects
    onNodesChange: (state, action: PayloadAction<NodeChange[]>) => {
      state.nodes = applyNodeChanges(action.payload, state.nodes);
    },
    setAllNodes: (state, action: PayloadAction<Array<Node>>) => {
      state.nodes = action.payload;
    },
    addNode: (state, action: PayloadAction<Node>) => {
      state.nodes.push(action.payload);
    },
    removeNode: (state, action: PayloadAction<Node>) => {
      state.nodes = state.nodes.filter(
        (node: Node) => node.id !== action.payload.id
      );
    },

    // editNodesByVariant: (state, action: PayloadAction<EditVariant>) => {
    //   state.nodes = state.nodes.map((node: Node) => {
    //     if (nodeIsOfThisVariant(node, action.payload.old)) {
    //       node = { ...node, data: { ...node.data, ...action.payload.new } };
    //     }

    //     return node;
    //   });
    // },

    onNodeMouseEnter: (state, action: PayloadAction<string>) => {
      const thisNode: Node = state.nodes.filter(
        (node: Node) => node.id === action.payload
      )[0];
      if (!checkNodeType(thisNode, nodeConfigs.INITIAL_CUSTOM_NODE_NAME))
        return;

      state.nodes = state.nodes.map((node: Node) => {
        if (node.id === action.payload) {
          node.data = {
            ...node.data,
            isHovered: true,
          };
        }
        return node;
      });
    },
    onNodeMouseLeave: (state, action: PayloadAction<string>) => {
      const thisNode: Node = state.nodes.filter(
        (node: Node) => node.id === action.payload
      )[0];
      if (!checkNodeType(thisNode, nodeConfigs.INITIAL_CUSTOM_NODE_NAME))
        return;

      state.nodes = state.nodes.map((node: Node) => {
        if (node.id === action.payload) {
          node.data = {
            ...node.data,
            isHovered: false,
          };
        }
        return node;
      });
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  onNodesChange,
  setAllNodes,
  addNode,
  removeNode,
  editNodesByVariant,
  onNodeMouseEnter,
  onNodeMouseLeave,
} = nodeSlice.actions;

export default nodeSlice.reducer;
