/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from "react-toastify";

import {
  parseISO,
  addDays,
  subDays,
  format,
  isValid,
  min,
  max,
  eachMonthOfInterval,
  isAfter,
  eachWeekOfInterval,
  startOfWeek,
} from "date-fns";

// import { MONTH_NAMES, SHORT_MONTH_NAMES } from "../consts";

export function parseDate(date: Date | string) {
  if (typeof date === "string") return parseISO(date);

  return date;
}

export function addDaysToDate(date: Date, amount: number) {
  return addDays(parseDate(date), amount);
}

export function subDaysInDate(date: Date, amount: number) {
  return subDays(parseDate(date), amount);
}

// export function getMonthName(month: number) {
//   return MONTH_NAMES[month];
// }

// export function getShortMonthName(month: number) {
//   return SHORT_MONTH_NAMES[month];
// }

export function isValidDate(value: unknown) {
  return isValid(value);
}

export function formatDate(date: Date, parseTo: string) {
  return format(date, parseTo);
}

export function showDateWithShortMonth(date: string | Date) {
  const dateValue = typeof date === "string" ? parseDate(date) : date;

  if (!isValidDate(dateValue)) return null;

  return formatDate(dateValue, "dd-MMM-yyyy");
}

export function minDate(date1: Date | string, date2: Date | string) {
  const date1Parse = typeof date1 === "string" ? parseDate(date1) : date1;
  const date2Parse = typeof date2 === "string" ? parseDate(date2) : date2;

  if (isValidDate(date1Parse) && !isValidDate(date2Parse)) {
    return date1Parse;
  }

  if (!isValidDate(date1Parse) && isValidDate(date2Parse)) {
    return date2Parse;
  }

  return min([date1Parse, date2Parse]);
}

export function maxDate(date1: Date | string, date2: Date | string) {
  const date1Parse = typeof date1 === "string" ? parseDate(date1) : date1;
  const date2Parse = typeof date2 === "string" ? parseDate(date2) : date2;

  if (isValidDate(date1Parse) && !isValidDate(date2Parse)) {
    return date1Parse;
  }

  if (!isValidDate(date1Parse) && isValidDate(date2Parse)) {
    return date2Parse;
  }

  return max([date1Parse, date2Parse]);
}

export function monthInterval(start: string | Date, end: string | Date) {
  try {
    const startParse = typeof start === "string" ? parseDate(start) : start;
    const endParse = typeof end === "string" ? parseDate(end) : end;

    return eachMonthOfInterval({ start: startParse, end: endParse });
  } catch (error: any) {
    toast.error(error);
  }
}

export function weekInterval(
  start: string | Date,
  end: string | Date,
  weekStartsOn?: any
) {
  try {
    const startParse = typeof start === "string" ? parseDate(start) : start;
    const endParse = typeof end === "string" ? parseDate(end) : end;

    return eachWeekOfInterval(
      { start: startParse, end: endParse },
      { weekStartsOn }
    );
  } catch (error: any) {
    toast.error(error);
  }
}

export function findWeekStart(date: string | Date, weekStartsOn?: any) {
  try {
    const dateParse: Date = typeof date === "string" ? parseDate(date) : date;

    return startOfWeek(dateParse, { weekStartsOn });
  } catch (error: any) {
    toast.error(error);
  }
}

export function standardDateFormat(date: Date | string): string {
  try {
    const value = typeof date === "string" ? parseDate(date) : date;

    return format(value, "yyyy/MM/dd");
  } catch {
    return "";
  }
}

export function isoDateFormat(date: Date | string) {
  const value = typeof date === "string" ? parseDate(date) : date;

  return format(value, "yyyy-MM-dd");
}

export function isDateAfter(date1: Date | string, date2: Date | string) {
  return isAfter(parseDate(date1), parseDate(date2));
}

export class DateUtil {
  displayMMYYYY(date: Date) {
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${String(month).padStart(2, "0")}/${year}`;
  }

  formatToInputMonth(date: Date) {
    const [year, month] = date.toISOString().split("-");
    return `${year}-${month}`;
  }

  // getMonthSimpleName(month: number) {
  //   return MONTH_NAMES[month - 1].substr(0, 3);
  // }

  format(date: Date | string, dateFormat: string): string {
    return format(new Date(date), dateFormat);
  }

  formatWithoutTimezone(date: Date | string, dateFormat: string): string {
    return format(new Date(new Date(date).toISOString().slice(0, -1)), dateFormat);
  }
}

export const makeDateUtil = () => new DateUtil();
