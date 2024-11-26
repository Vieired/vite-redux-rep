/* eslint-disable @typescript-eslint/no-explicit-any */
export function autocompleteKeyControl(
  key: string,
  list: any[],
  query: string | number,
  setOpenList: (item: boolean) => void,
  onChange: (item: unknown) => void,
  getDisplayName?: (item: unknown) => string,
  setItemSelected?: (item: unknown) => void
) {
  const findItem = list?.find((item) =>
    getDisplayName ? getDisplayName(item) === query : item?.id === query
  );
  let index = key === "ArrowUp" ? list.length - 1 : key === "ArrowDown" ? 0 : 0;

  if (findItem !== undefined) {
    index =
      key === "ArrowUp"
        ? list.indexOf(findItem) - 1
        : list.indexOf(findItem) + 1;

    if (
      (key === "ArrowUp" && index < 0) ||
      (key === "ArrowDown" && index === list.length)
    ) {
      index = key === "ArrowUp" ? list.length - 1 : 0;
    }
  }

  if (key === "Enter") {
    setOpenList(false);

    return;
  }

  if (getDisplayName && setItemSelected)
    setItemSelected(getDisplayName(list[index]));

  onChange(list[index]);
}
