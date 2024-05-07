import { HandleVariant } from "Types/handleVariant";
import { HandleProps, HandleType } from "reactflow";

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

//creates an array item for each key value pair of obj
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

//iterates through an array and separates each array item into a dictionary that counts array items based on a key
// export const createCountLibrary = <T extends Record<string, string | number>>(
//   arr: Array<T>,
//   key: string
// ) => {
//   //redo entire library
//   const newLibrary: Record<string, number> = {};
//   arr.forEach((item) => {
//     const dataKey: string | number = item[key as keyof typeof item];
//     if (!newLibrary[dataKey]) {
//       newLibrary[dataKey] = 1;
//     } else {
//       newLibrary[dataKey] += 1;
//     }
//   });
//   return newLibrary;
// };

//iterates through an array and groups array items into a dictionary based on a key of these items
export const groupBy = <T>(
  xs: Array<T>,
  key: string
): Record<string, Array<T>> => {
  return xs.reduce(function (rv: Record<string, Array<T>>, x: T) {
    (rv[x[key as keyof T] as string] =
      rv[x[key as keyof T] as string] || []).push(x);
    return rv;
  }, {});
};

//converts {key: array<whatever>} into {key:array.length}
export const convertObjectGroupingOfArraysToCountLibrary = <T>(
  obj: Record<string, Array<T>>
): Record<string, number> => {
  const newLibrary: Record<string, number> = {};
  for (const key in obj) {
    newLibrary[key] = obj[key].length;
  }
  return newLibrary;
};

export const getHighestValueBetweenTwoKeysOfCountLibrary = (
  obj: Record<string, number>,
  key1: string,
  key2: string
): string => {
  const value1: number = obj[key1];
  const value2: number = obj[key2];
  return value1 > value2 ? key1 : key2;
};
