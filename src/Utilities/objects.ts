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

// const object1 = {
//   hello: "world",
//   bye: "bitch",
//   maybe: "yes",
// };

// const object2 = {
//   hello: "world",
//   bye: "bitch",
// };

// const lol = removeSubsetObject(object1, object2);
// console.log(lol);

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
