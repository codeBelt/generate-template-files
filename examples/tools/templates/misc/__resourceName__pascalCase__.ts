// src/__scope__camelCase__/__resourceName__(pascalCase).ts
import { __resourceName__snakeCase___data } from "./__resourceName__pascalCase__Data"

console.assert(__resourceName__snakeCase___data.key === "__resourceName__(snakeCase)");

export const __resourceName__constantCase___KEY = __resourceName__snakeCase___data.key;
type __resourceName__pascalCase__Data = typeof __resourceName__snakeCase___data

/**
 *
 */
const fetchData = (_key: "__resourceName__(snakeCase)"): __resourceName__pascalCase__Data => {
  // Implement fetch logic here
  const result: __resourceName__pascalCase__Data["result"] = {}

  return {
    key: __resourceName__constantCase___KEY,
    result,
  }
};

/**
 * The __resourceName__(titleCase) fetcher
 */
export const get__resourceName__ = async (): Promise<__resourceName__pascalCase__Data> => {
  const __resourceName__camelCase__ = fetchData(__resourceName__snakeCase___data.key);
  return __resourceName__camelCase__;
};
