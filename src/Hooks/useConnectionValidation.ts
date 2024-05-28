import { Node, Connection } from "reactflow";

//redux

// types
import { HandleVariant } from "Types/handleVariant";
import { EdgeIdentifier } from "Types/schemas/edgeIdentifier";

// hooks
import { useAppSelector } from "Hooks/reduxHooks";

// util
import { getConnectionTypeFromConnectionHandleString } from "Utilities/reactFlowHandles";

export const useConnectionValidation = () => {
  const allNodes: Node[] = useAppSelector(
    (state) => state.reactFlowObjects.nodes
  );
  const connectionIsValid = (connection: Connection): boolean => {
    console.log(connection);
    //   source: string | null;
    // target: string | null;
    // sourceHandle: string | null;
    // targetHandle: string | null;
    if (
      !connection ||
      !connection.source ||
      !connection.sourceHandle ||
      !connection.target ||
      !connection.targetHandle
    )
      return false;

    const sourceConnectionType: EdgeIdentifier =
      getConnectionTypeFromConnectionHandleString(connection.sourceHandle);
    const targetConnectionType: EdgeIdentifier =
      getConnectionTypeFromConnectionHandleString(connection.targetHandle);
    const result: boolean =
      sourceConnectionType === targetConnectionType ||
      sourceConnectionType === "" ||
      targetConnectionType === "";
    console.log(result);
    return result;
  };

  return { connectionIsValid };
};
