export const Days = [
  'Dilluns', 'Dimarts', 'Dimecres',
  'Dijous',
  'Divendres', 'Dissabte', 'Diumenge'
];

export const addDays = (date:Date, days:number):number =>
  date.setDate(date.getDate() + days);

export const beautyDate = (date: string): string => {
  // Get the number of the day in the week from 0 to 6 [0:monday ... 6:sunday]
  const day = new Date(date).getDay();

  // Split YYYY-MM-DD to get only DD
  const sDay = date.split('-')[2];

  return Days[day] + ' ' + sDay;
};
