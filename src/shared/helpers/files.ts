export const KILO = 1000;
export const MEGA = 1000000;

export const bytesToKB = (size: number) => size / KILO;

export const bytesToMB = (size: number) => size / MEGA;

export const convertBytes = (size: number) =>
  size < MEGA
    ? `${bytesToKB(size).toFixed(2)} KB`
    : `${bytesToMB(size).toFixed(2)} MB`;

export function getDownloadFilename(filename: string) {
  if (!filename) {
    return 'etro-download.xlsx';
  }
  
  return filename?.split(`filename*=UTF-8''`)[1];
}
