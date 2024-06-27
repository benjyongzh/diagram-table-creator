import { Connection } from "reactflow";

// types
import { EdgeIdentifier } from "Types/edges/edgeIdentifier";

// util
import { getConnectionTypeFromConnectionHandleString } from "Services/handleVariants";
import edgeConfig from "@/Configs/edgeConfig";

export const useConnectionValidation = () => {
  const connectionIsValid = (connection: Connection): boolean => {
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
      sourceConnectionType ===
        edgeConfig.FREE_CONNECTION_TYPE_EDGE_IDENTIFIER ||
      targetConnectionType === edgeConfig.FREE_CONNECTION_TYPE_EDGE_IDENTIFIER;
    // console.log(result);
    return result;
  };

  return { connectionIsValid };
};
