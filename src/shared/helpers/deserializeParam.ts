const stringifyKeys = (obj, parentKey = "") => {
  let result = {};
  for (const key in obj) {
    const newKey = parentKey ? `${parentKey}.${key}` : key;
    if (typeof obj[key] === "object" && !Array.isArray(obj[key])) {
      result = { ...result, ...stringifyKeys(obj[key], newKey) };
    } else if (Array.isArray(obj[key])) {
      const objValue = obj[key];
      if (objValue && objValue != "") {
        const mappedArray = obj[key].map((value) => value);
        for (let i = 0; i < mappedArray.length; i++) {
          result[`${key}[${i}]`] = mappedArray[i];
        }
      }
    } else {
      const objValue = obj[key];
      if (objValue && !Array.isArray(obj[key])) result[newKey] = objValue;
    }
  }
  return result;
};

const stringifyPrimitiveKeys = (obj, parentKey = "") => {
  let result = {};
  for (const key in obj) {
    const newKey = parentKey ? `${parentKey}.${key}` : key;
    if (typeof obj[key] === "object" && !Array.isArray(obj[key])) {
      result = { ...result, ...stringifyKeys(obj[key], newKey) };
    } else if (Array.isArray(obj[key])) {
      // Handle arrays by joining the elements into a string
      result = obj[key]
        .map((value, index) => `${key}[${index}]=${value}`)
        .join("&");
    } else {
      result[newKey] = obj[key];
    }
  }
  return result;
};

// Only works for non primitives ex: Interfaces with complex objects
export const deserializeParam = (obj, parentKey = "") => {
  // Flatten the JSON object
  const flattenedObject = stringifyKeys(obj);

  // Serialize the flattened object using URLSearchParams
  const params = new URLSearchParams(flattenedObject);

  return params;
};

// Only works for primitives ex: string[]
export const deserializePrimitiveParam = (obj, parentKey = "") => {
  // Flatten the JSON object
  const flattenedObject = stringifyPrimitiveKeys(obj);

  // Serialize the flattened object using URLSearchParams
  const params = new URLSearchParams(flattenedObject);

  return params;
};
