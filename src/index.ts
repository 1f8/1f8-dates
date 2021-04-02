export const dateToInt = (dt: Date): number => {
  const isoDate = dt.toISOString()
  const dateString = isoDate.split("T")
  const cleanedDate = dateString[0].split("-").join("")

  return parseInt(cleanedDate, 10);
}

export const timeToInt = (dt: Date): number => {

  return parseInt(`${dt.getTime() / 1000}`, 10);
}

export const intToDate = (n: number): Date => {
  const dates = `${n / 10000}`.split('.')
  const year = dates[0];
  const months = dates[1].substring(0, 2);
  const date = dates[1].substring(2)
  return new Date(`${year}-${months}-${date}`)
}

export const intToTime = (n: number): Date => {
  return new Date(n * 1000)
}
