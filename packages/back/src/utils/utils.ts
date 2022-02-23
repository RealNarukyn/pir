// -- Accepts date format: YYYY-MM-DD ex:(2022-02-23)
export const dateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;

export const addDays = (date:Date, days:number):number =>
  date.setDate(date.getDate() + days);

export const getToday = ():Date => {
  // Get the default time for the 00:00:00 of today
  const baseToday = new Date().toISOString().split('T')[0];
  return new Date(baseToday);
};
