export const removeSubsetObject = <T>(
  mainObject: Record<string, T>,
  subObject: Record<string, T>
): Record<string, T> => {
  const mainKeys: string[] = Object.keys(mainObject);
  const subKeys: string[] = Object.keys(subObject);
  const newObject: Record<string, T> = {};

  const newKeys: string[] = mainKeys.filter((key) => !subKeys.includes(key));
  newKeys.forEach((key) => {
    newObject[key] = mainObject[key];
  });
  return newObject;
};

type countLibraryEditOptions = {
  allowNegative: boolean;
  allowZero: boolean;
};

export const countLibraryEdit = (
  library: Record<string, number>,
  key: string,
  change: number,
  options: countLibraryEditOptions = {
    allowNegative: false,
    allowZero: false,
  }
) => {
  library[key] ? (library[key] += change) : (library[key] = change);

  //check zero
  if (options.allowZero !== true && library[key] === 0) {
    delete library[key];
  }

  //check negative
  if (options.allowNegative !== true && library[key]! < 0) {
    delete library[key];
  }
};

export const convertRecordToArray = <T>(
  obj: Record<string, T>
): Array<Record<string, T>> => {
  const keys: string[] = Object.keys(obj);
  const values: T[] = Object.values(obj);
  const newArray: Array<Record<string, T>> = [];
  for (let i = 0; i < keys.length; i++) {
    const newPair: Record<string, T> = {};
    newPair[keys[i]] = values[i];
    newArray.push(newPair);
  }
  return newArray;
};
