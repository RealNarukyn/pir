// const addDays = (date, days) =>
//   date.setDate(date.getDate() + days);

// const nextWeekDate = addDays(new Date(), 7)
// const e = new Date();
// console.log(e);

// const dateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
// const e = new Date('2022-02-23');
// console.log(e);
// console.log(dateRegex.test('2022-2-23'));

// const e = new Date().toISOString().split('T')[0]
// console.log('e is:', e);

// const a = new Date(e);
// console.log('a is:',a.getTime())
// console.log('bDate is:', new Date('2022-02-23').getTime())

// const sumTime = (initTime, duration) => {
//     const time = initTime.split(':').map( (e)=> parseInt(e));
  
//     switch (duration) {
//       default:
//       case 60: time[0] += 1; break;
//       case 90:
//         time[1] += 30;
//         // If the minutes surpass the num 60 means that we had to add another hour
//         if (time[1] >= 60) {
//           time[1] = 00;
//           time[0] += 2;
//         } else {
//           time[0] += 1;
//         }
//         break;
//       case 120: time[0] += 2; break;
//     }
    
//     // Check the 24h to 00h
//     if(time[0] === 24) time[0] = 00;

//     return time.map( (e)=> e.toString().padStart(2, '0')).join(':');
// };

// console.log('08:00 -- ', sumTime('08:00',60))
// console.log('08:00 -- ', sumTime('08:00',90))
// console.log('08:00 -- ', sumTime('08:00',120))
// console.log()
// console.log('14:30 -- ', sumTime('14:30',60))
// console.log('14:30 -- ', sumTime('14:30',90))
// console.log('14:30 -- ', sumTime('14:30',120))
// console.log()
// console.log('23:00 -- ', sumTime('23:00',60))
// console.log('23:00 -- ', sumTime('23:00',90))
// console.log('23:00 -- ', sumTime('23:00',120))

const e = new Date().getHours()

console.log(e);