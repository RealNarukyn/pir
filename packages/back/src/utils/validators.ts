import { dateRegex, emailRegex } from './regex';
import { addDays, getToday, splitTime, sumTime } from './utils';

export const checkEnv = (envVar:string):string => {
  if (process.env[envVar]) return process.env[envVar] as string;

  throw new Error(`Please define the Enviroment variable ${envVar}`);
};

export const validDate = (date: string):boolean => {
  const today = getToday();
  const pDate = new Date(date).getTime();

  if (today.getTime() > pDate) return false;

  // [ Not booked for more than a week ]
  const nextWeekDate = addDays(today, 7);
  if (pDate > nextWeekDate) return false;

  return dateRegex.test(date);
};

export const validTime = (strTime: string, duration:number):boolean => {
  const time = splitTime(strTime);

  // [ We're closed ! ]
  if (time[0] < 8 || time[0] > 23) return false;

  // [ Check if it's booking the past ]
  const curHour = new Date().getHours();
  if (time[0] <= curHour) return false;

  // [ Check endTime doesn't goes beyond 00:00 ]
  const endTime = splitTime(sumTime(strTime, duration));
  if (endTime[0] > 24) return false;
  if (endTime[0] === 24 && endTime[1] !== 0) return false;

  return true;
};

export const validEmail = (email: string):boolean => emailRegex.test(email);
