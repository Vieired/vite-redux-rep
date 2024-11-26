export function generateTooltipId(id: string | number, value: string | number) {
  const idString = String(id)?.substring(0, 5);
  const valueString = String(value)
    ?.trim()
    ?.replace(/(\r\n|\n|\r)/gm, '')
    ?.substring(0, 10);

  return `${idString}-${valueString}-tooltip`;
}
