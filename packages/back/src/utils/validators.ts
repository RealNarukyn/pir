import { addDays, dateRegex, getToday } from './utils';

export const checkEnv = (envVar:string):string => {
  if (process.env[envVar]) return process.env[envVar] as string;

  throw new Error(`Please define the Enviroment variable ${envVar}`);
};

export const validDate = (date: string):boolean => {
  const today = getToday();
  const pDate = new Date(date).getTime();

  if (today.getTime() > pDate) return false;

  const nextWeekDate = addDays(today, 7);
  if (pDate > nextWeekDate) return false;

  return dateRegex.test(date);
};

// @To Do: [ You can't book the past! ]
export const validTime = (time: number):boolean => {
  // this function needs to check if the time someone is doing a booking for
  // it's not lesser than the current time.

  return true;
};

// @To Do: [ !!! alks@klsd@gmail.@es ]
export const validEmail = (email: string):boolean => {
  // this function needs to check if the email is correct
  return true;
};
