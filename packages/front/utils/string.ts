export const capitalize = (str:string) => {
  return str.split(' ')
      .map((e) =>
        e.charAt(0).toUpperCase() + e.slice(1).toLowerCase()
      ).join(' ');
};
