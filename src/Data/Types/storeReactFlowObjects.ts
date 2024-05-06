import { Node, Edge } from "reactflow";

export type StoreReactFlowObjects = {
  nodes: Array<Node>;
  edges: Array<Edge>;
  variantCount: Record<string, number>;
};

export enum updateVariantCountAction {
  "add",
  "remove",
}

export type updateVariantCountOptions = {
  action: updateVariantCountAction;
  node: Node;
};
