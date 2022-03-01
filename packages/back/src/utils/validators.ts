import { dateRegex, emailRegex } from './regex';
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

export const isFreeToBook = (
    initTime: string, beyondBookings: IBooking[]
):boolean => {
  console.log('initTime', initTime);
  console.log('beyondBookings', beyondBookings);

  let validBook = true;

  const bTime = splitTime(initTime);
  console.log('bTime', bTime);

  beyondBookings.forEach((booking) => {
    const alreadyBookedTime: Array<number> = splitTime(booking.initTime);
    const alreadyBookedEndTime: Array<number> = splitTime(
        sumTime(booking.initTime, booking.duration)
    );

    // Same booking time === [ ERROR ]
    if (booking.initTime === initTime) validBook = false;

    // Booking between an already booked time === [ ERROR ]
    // [ Case 21:00 ]
    if (bTime[0] >= alreadyBookedTime[0] &&
      bTime[0] < alreadyBookedEndTime[0]) {
      validBook = false;
    }
    // [ Case 21:30 ]
    if (bTime[0] >= alreadyBookedTime[0] &&
      (bTime[0] === alreadyBookedEndTime[0] &&
        bTime[1] > alreadyBookedEndTime[1]) ) {
      validBook = false;
    }
  });

  return validBook;
};
