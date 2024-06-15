import { Node, Edge } from "reactflow";

export type StoreReactFlowObjects = {
  nodes: Array<Node>;
  edges: Array<Edge>;
  nodeVariantCount: Record<string, number>;
  nodeVariantIndexNumbers: Record<string, number[]>;
};

export enum updateVariantCountAction {
  "add" = 1,
  "remove" = -1,
}

export type updateVariantCountOptions = {
  action: updateVariantCountAction;
  node: Node;
};
