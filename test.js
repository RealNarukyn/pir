const validDuration = (duration) =>
  duration === 60 || duration === 90 || duration === 120;


console.log(validDuration(60));
console.log(validDuration(90));
console.log(validDuration(120));
console.log(validDuration(5));
