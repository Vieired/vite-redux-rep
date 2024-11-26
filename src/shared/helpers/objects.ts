export const isEmptyObject = (obj: unknown) =>
  obj && Object.keys(obj).length === 0 && obj.constructor === Object;

export function clearObject<T>(obj: T): T {
  const toClear = obj;

  Object.keys(toClear).forEach(
    key =>
      (toClear[key] === undefined ||
        toClear[key] === null ||
        toClear[key] === '' ||
        !toClear[key]) &&
      typeof toClear[key] !== 'number' &&
      delete toClear[key]
  );

  const newObj = toClear;

  return newObj;
}
