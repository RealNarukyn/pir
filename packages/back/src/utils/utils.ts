export const addDays = (date:Date, days:number):number =>
  date.setDate(date.getDate() + days);

export const getToday = ():Date => {
  // Get the default date for the 00:00:00 of today
  const baseToday = new Date().toISOString().split('T')[0];
  return new Date(baseToday);
};

export const splitTime = (time: string): Array<number> =>
  time.split(':').map( (e)=> parseInt(e));

export const sumTime = (initTime:string, duration:number) => {
  const time = initTime.split(':').map( (e)=> parseInt(e));

  switch (duration) {
    default:
    case 60: time[0] += 1; break;
    case 90:
      time[1] += 30;
      // If the minutes surpass the num 60 means that we had to add another hour
      if (time[1] >= 60) {
        time[1] = 0;
        time[0] += 2;
      } else {
        time[0] += 1;
      }
      break;
    case 120: time[0] += 2; break;
  }

  return time.map( (e)=> e.toString().padStart(2, '0')).join(':');
};
