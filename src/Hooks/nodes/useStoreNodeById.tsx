import {
  Node,
  Edge,
  HandleProps,
  Position,
  useUpdateNodeInternals,
  getConnectedEdges,
} from "reactflow";
import { toast } from "sonner";
import colors from "Types/colorString";

// hooks
import { useAppSelector } from "Hooks/reduxHooks";
import { useMemo } from "react";
import { useGetNodesOfVariantId } from "Hooks/nodeVariants/useGetNodesOfVariantId";
import { useGetEdgeIdentifierOfHandleVariant } from "Hooks/handleVariants/useGetEdgeIdentifierOfHandleVariant";

// types
import { NodeVariant } from "Types/nodes/nodeVariant";
import { HandleVariant, HandlePort } from "Types/handles/handleVariant";
import { NodeId } from "Types/nodes/node";
import { EdgeIdentifier } from "Types/edges/edgeIdentifier";
import { CSSProperties } from "react";

//utils
import {
  getHandlePropsGroupingByKey,
  handleSpacingAndArray,
  getHandleSpacingAndArrayPerNodeSide,
  convertHandlePositionToStyleKey,
  formatHandleId,
} from "Services/handleVariants";
import { convertObjectGroupingOfArraysToCountLibrary } from "Utilities/objects";

// styling
import defaultHandleStyles from "Styles/handle";

export const useStoreNodeById = (nodeId: NodeId) => {
  const allEdges: Edge[] = useAppSelector((state) => state.edges.edges);
  const allNodeVariants: NodeVariant[] = useAppSelector(
    (state) => state.nodeVariants.nodeVariants
  );
  const allHandleVariants: HandleVariant[] = useAppSelector(
    (state) => state.handleVariants.handleVariants
  );
  const getNodesOfVariantId = useGetNodesOfVariantId();
  const getEdgeIdentifierOfhandleVariant =
    useGetEdgeIdentifierOfHandleVariant();
  const updateNodeInternals = useUpdateNodeInternals();

  const thisNode: Node | undefined = useAppSelector(
    (state) => state.nodes.nodes.filter((node: Node) => node.id === nodeId)[0]
  );

  const nodeHeight: number = useMemo(
    () => (thisNode ? thisNode.height! : 0),
    [thisNode]
  );
  const nodeWidth: number = useMemo(
    () => (thisNode ? thisNode.width! : 0),
    [thisNode]
  );

  const nodeVariant: NodeVariant = useMemo(
    () =>
      allNodeVariants.filter(
        (variant: NodeVariant) => variant.id === thisNode!.data.variantId
      )[0],
    [thisNode]
  );

  const variantIndex: number = useMemo(() => {
    const nodes: NodeId[] = getNodesOfVariantId(nodeVariant.id).map(
      (node) => node.id
    );
    return nodes.indexOf(nodeId);
  }, [nodeVariant]);

  const nodeName: string = useMemo(() => nodeVariant.nodeName, [nodeVariant]);

  const handleVariants: HandleVariant[] = useMemo(
    () =>
      allHandleVariants.filter((variant) =>
        nodeVariant.handleTypes.includes(variant.id)
      ),
    [nodeVariant.handleTypes]
  );

  const nodeColor: colors = nodeVariant.color;

  const handlesGroupings: Record<string, HandleProps[]> =
    getHandlePropsGroupingByKey(handleVariants, "position");

  const handleSpacingsAndArray: Record<Position, handleSpacingAndArray> =
    getHandleSpacingAndArrayPerNodeSide(
      { height: nodeHeight, width: nodeWidth },
      handleVariants
    );

  const createHandlePorts = () => {
    const finalArr: HandlePort[] = [];
    if (handleVariants.length < 1) return finalArr;

    const maxHandleCountPerSide: Record<string, number> =
      convertObjectGroupingOfArraysToCountLibrary(handlesGroupings);
    for (let i = 0; i < handleVariants.length; i++) {
      // i is the index of each handleVariant

      // get info of this handleVariant
      const {
        handleType,
        handleName,
        position: handlePos,
        edgeVariantId,
      } = handleVariants[i];

      // establish styleKey for this Variant
      const styleKey: string = convertHandlePositionToStyleKey(handlePos);
      // console.log(`style for handle ${handleName}`, styleKey);

      // get spacing for this handleVariant
      const handleSpacing: number =
        handleSpacingsAndArray[handlePos as Position].spacing;
      // console.log(`handleSpacing:`, handleSpacing);

      for (let j = 0; j < handleVariants[i].quantity; j++) {
        // j is the index of each <Handle> of this handleVariant}

        // get styling offset for this 1 handle, using maxHandleCountPerSide
        const offset: number = handleSpacing * (j + 1);
        // console.log(`offset for handle ${handleName}-${j}`, offset);
        const handleStyle: CSSProperties = { [styleKey]: offset };

        // create id for handlePort
        const handlePortEdgeIdentifier: EdgeIdentifier =
          getEdgeIdentifierOfhandleVariant(handleVariants[i]);
        const handlePortId: string = formatHandleId(
          handleVariants[i],
          handlePortEdgeIdentifier,
          j
        );

        const newhandlePort: HandlePort = {
          id: handlePortId,
          portIndex: j,
          position: handlePos,
          style: { ...defaultHandleStyles, ...handleStyle },
          handleType,
          handleName,
          edgeVariantId,
        };

        finalArr.push(newhandlePort);

        // update the max count
        maxHandleCountPerSide[handlePos] -= 1;
      }
    }
    updateNodeInternals(nodeId);
    return finalArr;
  };

  const connectedEdges = useMemo(
    () => getConnectedEdges([thisNode!], allEdges),
    [nodeId, allEdges]
  );

  return {
    nodeHeight,
    nodeWidth,
    nodeVariant,
    variantIndex,
    nodeName,
    handleVariants,
    nodeColor,
    createHandlePorts,
    connectedEdges,
  };
};
