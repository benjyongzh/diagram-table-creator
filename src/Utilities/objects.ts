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
