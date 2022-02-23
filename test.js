// const addDays = (date, days) =>
//   date.setDate(date.getDate() + days);

// const nextWeekDate = addDays(new Date(), 7)
// const e = new Date();
// console.log(e);

// const dateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
// const e = new Date('2022-02-23');
// console.log(e);
// console.log(dateRegex.test('2022-2-23'));

const e = new Date().toISOString().split('T')[0]
console.log('e is:', e);

const a = new Date(e);
console.log('a is:',a.getTime())
console.log('bDate is:', new Date('2022-02-23').getTime())
