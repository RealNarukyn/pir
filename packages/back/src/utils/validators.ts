import { timeRegex, dateRegex, emailRegex } from './regex';
import { addDays, getToday, splitTime, sumTime } from './utils';
import { IBooking } from '../components/bookings/booking.model';

export const checkEnv = (envVar:string):string => {
  if (process.env[envVar]) return process.env[envVar] as string;

  throw new Error(`Please define the Enviroment variable ${envVar}`);
};

export const validDate = (date: string):boolean => {
  const today = getToday();
  const pDate = new Date(date).getTime();

  if (pDate < today.getTime()) return false;

  // [ Not booked for more than a week ]
  const nextWeekDate = addDays(today, 7);
  if (pDate > nextWeekDate) return false;

  return dateRegex.test(date);
};

export const validTime = (
    bDate: string, strTime: string, duration:number
):boolean => {
  if (!timeRegex.test(strTime)) return false;

  const time = splitTime(strTime);

  // [ We're closed ! ]
  if (time[0] < 8 || time[0] > 23) return false;

  // [ Check if it's booking the past ]
  if (lookingForToday(bDate)) {
    const curHour = new Date().getHours();
    if (time[0] <= curHour) return false;
  }

  // [ Check endTime doesn't goes beyond 00:00 ]
  const endTime = splitTime(sumTime(strTime, duration));
  if (endTime[0] > 24) return false;
  if (endTime[0] === 24 && endTime[1] !== 0) return false;

  return true;
};

export const lookingForToday = (lookingDate: string):boolean => {
  const todayTimestamp = getToday().getTime();
  const lookingDateTimestamp = new Date(lookingDate).getTime();
  return lookingDateTimestamp === todayTimestamp;
};

export const validDuration = (duration: number): boolean =>
  duration === 60 || duration === 90 || duration === 120;

export const validEmail = (email: string):boolean => emailRegex.test(email);

export interface BookTimeInfo {
  bDate: string;
  initTime: string;
  endTime: string;
}
export const isFreeToBook = (
    newBook:BookTimeInfo, bookings: IBooking[]
):boolean => {
  let validBook = true;

  const bookTs = new Date(`${newBook.bDate}/${newBook.initTime}`).getTime();
  const bookEndTs = new Date(`${newBook.bDate}/${newBook.endTime}`).getTime();

  bookings.forEach((book) => {
    const alreadyBookTs = new Date(`${book.bDate}/${book.initTime}`).getTime();
    const alreadyBookEndTs = new Date(`${book.bDate}/${book.endTime}`)
        .getTime();

    // Check it's not the same Init Time
    if (bookTs === alreadyBookTs) validBook = false;

    // Check the init time it's not between a set booking
    if (bookTs >= alreadyBookTs && bookTs < alreadyBookEndTs) validBook = false;

    // Check the end time of the new book is not overlaping an old booking
    if (
      bookEndTs > alreadyBookTs &&
      bookEndTs < alreadyBookEndTs
    ) validBook = false;
  });

  return validBook;
};
