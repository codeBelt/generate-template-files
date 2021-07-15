// src/__scope__CamelCase__/__resourceName__(pascalCase).ts
import { __resourceName__SnakeCase___data } from "./__resourceName__PascalCase__Data"

console.assert(__resourceName__SnakeCase___data.key === "__resourceName__(snakeCase)");

export const __resourceName__ConstantCase___KEY = __resourceName__SnakeCase___data.key;
type __resourceName__PascalCase__Data = typeof __resourceName__SnakeCase___data

/**
 *
 */
const fetchData = (_key: "__resourceName__(snakeCase)"): __resourceName__PascalCase__Data => {
  // Implement fetch logic here
  const result: __resourceName__PascalCase__Data["result"] = {}

  return {
    key: __resourceName__ConstantCase___KEY,
    result,
  }
};

/**
 * The __resourceName__(titleCase) fetcher
 */
export const get__resourceName__ = async (): Promise<__resourceName__PascalCase__Data> => {
  const __resourceName__CamelCase__ = fetchData(__resourceName__SnakeCase___data.key);
  return __resourceName__CamelCase__;
};
