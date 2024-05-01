import { ComponentType } from "react";
import { NodeProps } from "reactflow";

type nodeTypePair = Record<string, ComponentType<NodeProps>>;

export default nodeTypePair;
