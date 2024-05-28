//redux

// types

// hooks
import { Connection } from "reactflow";

export const useConnectionValidation = () => {
  const validateConnection = (connection: Connection): boolean => {
    //   source: string | null;
    // target: string | null;
    // sourceHandle: string | null;
    // targetHandle: string | null;
    return true;
  };

  return { validateConnection };
};
