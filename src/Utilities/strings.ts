type randomStringGeneratorOptions = {
  charType?: charType;
  case?: casing;
};

enum charType {
  "number",
  "alphabet",
  "all",
}

enum casing {
  "lower",
  "upper",
  "all",
}

const upperCaseCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerCaseCharacters = "abcdefghijklmnopqrstuvwxyz";
const numberCharacters = "0123456789";

export const randomStringGenerator = (
  charCount: number,
  options: randomStringGeneratorOptions = {}
): string => {
  const realOptions = evaluaterandomStringGeneratorOptions(options);
  const charList: string = assembleCharList(realOptions);
  let result: string = "";
  let counter: number = 0;
  while (counter < charCount) {
    const charactersLength = charList.length;
    result += charList.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
};

const evaluaterandomStringGeneratorOptions = (
  optionsInput: randomStringGeneratorOptions
): randomStringGeneratorOptions => {
  const newOptions: randomStringGeneratorOptions = {};
  optionsInput.case
    ? (newOptions.case = optionsInput.case)
    : (newOptions.case = casing.all);
  optionsInput.charType
    ? (newOptions.charType = optionsInput.charType)
    : (newOptions.charType = charType.all);
  return newOptions;
};

const assembleCharList = (options: randomStringGeneratorOptions): string => {
  let charList: string = "";
  if (options.charType !== charType.alphabet) {
    charList.concat(numberCharacters);
  }
  switch (options.case) {
    case casing.lower:
      charList.concat(lowerCaseCharacters);
      break;
    case casing.upper:
      charList.concat(upperCaseCharacters);
      break;
    default:
      charList.concat(upperCaseCharacters);
      charList.concat(lowerCaseCharacters);
      break;
  }
  return charList;
};
