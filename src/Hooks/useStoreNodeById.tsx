import { Node, HandleProps, Position, useUpdateNodeInternals } from "reactflow";
import { toast } from "sonner";
import colors from "Types/colorString";

// hooks
import { useAppSelector, useAppDispatch } from "Hooks/reduxHooks";
import { useMemo } from "react";
import { useStoreNodeVariants } from "./useStoreNodeVariants";
import { useStoreHandleVariants } from "./useStoreHandleVariants";

// types
import { NodeVariant } from "Types/nodes/nodeVariant";
import {
  HandleVariant,
  HandleVariantId,
  HandlePort,
} from "Types/handles/handleVariant";
import { CSSProperties } from "react";

//config
import nodeConfig from "@/Configs/nodeConfig";

//utils
import { NodeId } from "Types/nodes/node";
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
  // const dispatch = useAppDispatch();
  const { allNodeVariants } = useStoreNodeVariants();
  const { allHandleVariants } = useStoreHandleVariants();
  const updateNodeInternals = useUpdateNodeInternals();

  const thisNode: Node | undefined = useAppSelector(
    (state) => state.nodes.nodes.filter((node: Node) => node.id === nodeId)[0]
  );

  const nodeHeight = useMemo(
    () => (thisNode ? thisNode.height! : 0),
    [thisNode]
  );
  const nodeWidth = useMemo(() => (thisNode ? thisNode.width! : 0), [thisNode]);

  const nodeVariant: NodeVariant = useMemo(
    () =>
      allNodeVariants.filter(
        (variant: NodeVariant) => variant.id === thisNode!.data.variantId
      ),
    [thisNode]
  );

  const nodeName: string = useMemo(() => nodeVariant.nodeName, [nodeVariant]);

  const handleVariants: HandleVariant[] = useMemo(
    () =>
      allHandleVariants.filter((variant) =>
        nodeVariant.handleTypes.includes(variant.id)
      ),
    [nodeVariant]
  );

  const nodeColor: colors = useMemo(() => nodeVariant.color, [nodeVariant]);

  const handlesGroupings: Record<string, HandleProps[]> = useMemo(
    () => getHandlePropsGroupingByKey(handleVariants, "position"),
    [handleVariants]
  );

  const handleSpacingsAndArray: Record<Position, handleSpacingAndArray> =
    useMemo(
      () =>
        getHandleSpacingAndArrayPerNodeSide(
          { height: nodeHeight, width: nodeWidth },
          handleVariants
        ),
      [nodeHeight, nodeWidth, handleVariants]
    );

  const handles: HandlePort[] = useMemo(() => {
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
        connectionType,
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

        const newhandlePort: HandlePort = {
          id: formatHandleId(handleVariants[i], j),
          portIndex: j,
          position: handlePos,
          style: { ...defaultHandleStyles, ...handleStyle },
          handleType,
          handleName,
          connectionType,
        };

        finalArr.push(newhandlePort);

        // update the max count
        maxHandleCountPerSide[handlePos] -= 1;
      }
    }
    updateNodeInternals(nodeId);
    return finalArr;
  }, [nodeVariant]);

  return {
    nodeHeight,
    nodeWidth,
    nodeVariant,
    nodeName,
    handleVariants,
    nodeColor,
    handles,
  };
};
