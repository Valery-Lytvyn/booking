import { differenceInCalendarDays, formatDate } from "date-fns";

export const createId = () => {
  return Date.now().toString();
};

export const formatMoney = (num: number) => {
  return num.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
};

export const formattedDate = (date: Date) => {
  return formatDate(date, `yyyy-MM-dd`);
};

export const countPeriod = (startDay: string, endDay: string) => {
  return differenceInCalendarDays(new Date(endDay), new Date(startDay));
};
