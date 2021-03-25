export const dateToInt = (dt: Date): number => {
  const year = dt.getFullYear()
  let month = dt.getMonth()
  let date = dt.getDate()
  let result = `${year}`;

  console.log(`${year}${month}${date}`);
  if (month < 9) {
    result += `0${month + 1}`;
  } else {
    result += `${month + 1}`;
  }
  if (date < 10) {
    result += `0${date}`;
  } else {
    result += `${date}`;
  }
  return parseInt(result, 10);
}

export const timeToInt = (dt: Date): number => {

  return parseInt(`${dt.getTime() / 1000}`, 10);
}

export const intToDate = (n:number):Date => {
  return new Date(n)
}

export const intToTime = (n:number):Date => {
  return new Date(n)
}
