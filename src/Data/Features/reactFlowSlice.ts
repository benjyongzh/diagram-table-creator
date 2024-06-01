import { createSlice, PayloadAction, Slice } from "@reduxjs/toolkit";
import {
  StoreReactFlowObjects,
  updateVariantCountAction,
  updateVariantCountOptions,
} from "Types/storeReactFlowObjects";
import {
  Node,
  NodeChange,
  applyNodeChanges,
  Edge,
  addEdge,
  EdgeChange,
  applyEdgeChanges,
  Connection,
} from "reactflow";
import {
  checkNodeType,
  createNodeCountLibrary,
  addIndexNumberToNodesBasedOnCountLibrary,
  nodeIsOfThisVariant,
} from "Utilities/reactFlowNodes";
import { countLibraryEdit } from "Utilities/objects";
import nodeConfigs from "Configs/nodeConfig";
import { EditVariant } from "Types/customNodeVariant";

// Define the initial state using that type
const initialState: StoreReactFlowObjects = {
  nodes: [],
  edges: [],
  nodeVariantCount: {},
  nodeVariantIndexNumbers: {},
};

const updateVariantCount = (
  state: StoreReactFlowObjects,
  options?: updateVariantCountOptions
): Record<string, number> => {
  const { nodes, nodeVariantCount } = state;

  if (!options) {
    //redo entire library
    return createNodeCountLibrary(nodes, "nodeName");
  } else {
    //only change library according to options stated
    const { action, node } = options;
    const nodeName: string = node.data.nodeName;
    countLibraryEdit(nodeVariantCount, nodeName, action);
    return nodeVariantCount;
  }
};

const updateVariantIndexsOnNodes = (state: StoreReactFlowObjects) => {
  const { nodes, nodeVariantCount } = state;
  addIndexNumberToNodesBasedOnCountLibrary(nodes, nodeVariantCount);
};

const updateVariantIndexNumbers = (state: StoreReactFlowObjects) => {
  state.nodeVariantIndexNumbers = {};
  for (let i = 0; i < state.nodes.length; i++) {
    const key: string = state.nodes[i].data.nodeName;
    if (state.nodeVariantIndexNumbers[key]) {
      state.nodeVariantIndexNumbers[key].push(state.nodes[i].data.variantIndex);
    } else {
      state.nodeVariantIndexNumbers[key] = [state.nodes[i].data.variantIndex];
    }
  }
};

const addVariantIndexNumber = (
  state: StoreReactFlowObjects,
  nodeName: string,
  index: number
) => {
  state.nodeVariantIndexNumbers[nodeName] &&
  state.nodeVariantIndexNumbers[nodeName].length
    ? state.nodeVariantIndexNumbers[nodeName].push(index)
    : (state.nodeVariantIndexNumbers[nodeName] = [index]);
};

const removeVariantIndexNumber = (
  state: StoreReactFlowObjects,
  nodeName: string,
  index: number
) => {
  state.nodeVariantIndexNumbers[nodeName] = state.nodeVariantIndexNumbers[
    nodeName
  ].filter((number) => number !== index);
};

export const reactFlowSlice: Slice = createSlice({
  name: "nodes",
  initialState,
  reducers: {
    //node objects
    onNodesChange: (state, action: PayloadAction<NodeChange[]>) => {
      state.nodes = applyNodeChanges(action.payload, state.nodes);
    },
    setAllNodes: (state, action: PayloadAction<Array<Node>>) => {
      state.nodes = action.payload;
      state.nodeVariantCount = updateVariantCount(state);
      updateVariantIndexsOnNodes(state);
      updateVariantIndexNumbers(state);
    },
    addNode: (state, action: PayloadAction<Node>) => {
      updateVariantCount(state, {
        action: updateVariantCountAction.add,
        node: action.payload,
      });

      //get next highest index number
      const variantIndexNumbers: number[] =
        state.nodeVariantIndexNumbers[action.payload.data.nodeName];
      const newIndexNumber: number =
        variantIndexNumbers && variantIndexNumbers.length
          ? variantIndexNumbers.sort().reverse()[0] + 1
          : 1;
      //add new index number to library
      addVariantIndexNumber(
        state,
        action.payload.data.nodeName,
        newIndexNumber
      );

      //add index number to new node
      const newData = { ...action.payload.data, variantIndex: newIndexNumber };
      const realNode: Node = { ...action.payload, data: { ...newData } };
      state.nodes.push(realNode);
    },
    removeNode: (state, action: PayloadAction<Node>) => {
      state.nodes = state.nodes.filter(
        (node: Node) => node.id !== action.payload.id
      );
      updateVariantCount(state, {
        action: updateVariantCountAction.remove,
        node: action.payload,
      });
      removeVariantIndexNumber(
        state,
        action.payload.data.nodeName,
        action.payload.data.variantIndex
      );
    },

    editNodesByVariant: (state, action: PayloadAction<EditVariant>) => {
      state.nodes = state.nodes.map((node: Node) => {
        if (nodeIsOfThisVariant(node, action.payload.old)) {
          node = { ...node, data: { ...node.data, ...action.payload.new } };
        }

        return node;
      });
    },
    // onNodeDataChange: (
    //   state,
    //   action: PayloadAction<{ editedNode: Node; newData: CustomNodeVariant }>
    // ) => {
    //   state.nodes = state.nodes.map((node: Node) => {
    //     if (node.id === action.payload.editedNode.id) {
    //       // it's important that you create a new object here
    //       // in order to notify react flow about the change
    //       node.data = {
    //         ...node.data,
    //         ...action.payload.newData,
    //       };
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

    //edges
    onEdgesChange: (state, action: PayloadAction<EdgeChange[]>) => {
      state.edges = applyEdgeChanges(action.payload, state.edges);
    },
    onConnect: (state, action: PayloadAction<Connection | Edge>) => {
      state.edges = addEdge(action.payload, state.edges);
    },
    setAllEdges: (state, action: PayloadAction<Array<Edge>>) => {
      state.edges = action.payload;
    },
    removeEdge: (state, action: PayloadAction<string>) => {
      state.edges = state.edges.filter(
        (edge: Edge) => edge.id !== action.payload
      );
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
  onEdgesChange,
  onConnect,
  setAllEdges,
  removeEdge,
} = reactFlowSlice.actions;

export default reactFlowSlice.reducer;
