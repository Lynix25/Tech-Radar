import moment from "moment";

const isoDateToMoment = (isoDate: string) =>
  moment(isoDate, "YYYY-MM-DD");

export const formatRelease = (
  isoDate: string,
  format: string = "MMMM YYYY"
) => isoDateToMoment(isoDate).format(format);