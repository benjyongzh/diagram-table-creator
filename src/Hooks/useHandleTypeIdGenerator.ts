import handleConfig from "Configs/handleConfig";
import { randomStringGenerator } from "Utilities/strings";
import { useState, useEffect } from "react";

export const useHandleTypeIdGenerator = () => {
  const [handleTypeId, setHandleTypeId] = useState<string>("");

  useEffect(() => {
    const id: string = randomStringGenerator(handleConfig.ID_LENGTH);
    setHandleTypeId(id);
  }, []);

  return { handleTypeId };
};
