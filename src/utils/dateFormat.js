import { format, formatDistance, isThisYear } from "date-fns";

export function datePostFormat(date) {
  const shortDate = format(new Date(date), "MMMM d");
  const LongDate = format(new Date(date), "MMMM d, yyy");

  return isThisYear(new Date(date)) ? shortDate : LongDate;
}

export function dateFormatToNow(date) {
  return formatDistance(new Date(date), new Date(Date.now()))
    .split(" ")
    .map((s, i) => (i === 1 ? s[0] : s))
    .join("");
}
