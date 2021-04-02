export enum TimeZone {
  AustrlianEastern,
  AustrlianCentral,
  AustrlianWestern,
  UsPacific,
  UsEastern,
  UsHawaii,
  Japan,
}

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

export const convertDateTz = (dt: Date, tz: TimeZone): Date => {

  if (tz === TimeZone.Japan) {
    let utcTime = dt.getTime() + 32400000;
    return new Date(utcTime)
  } else if (tz === TimeZone.UsHawaii) {
    let utcTime = dt.getTime() - 36000000;
    return new Date(utcTime)
  } else if (tz === TimeZone.AustrlianEastern) {
    let utcTime = dt.getTime() + 39600000;
    return new Date(utcTime)
  } else if (tz === TimeZone.AustrlianCentral) {
    let utcTime = dt.getTime() + 34200000;
    return new Date(utcTime)
  } else if (tz === TimeZone.AustrlianWestern) {
    let utcTime = dt.getTime() + 28800000;
    return new Date(utcTime)
  } else if (tz === TimeZone.UsPacific) {
    let utcTime = dt.getTime() - 28800000;
    return new Date(utcTime)
  } else if (tz === TimeZone.UsEastern) {
    let utcTime = dt.getTime() - 18000000;
    return new Date(utcTime)
  } else {
    throw Error("Not supported TimeZone");
  }
}

export const convertIntTz = (n: number, h: number, tz: TimeZone): Date => {
  const utc = intToDate(n).getTime()
  const hourInMil = h * 3600000;
  const utcDateTime = utc + hourInMil;
  if (tz === TimeZone.Japan) {
    let utcTime = utcDateTime + 32400000;
    return new Date(utcTime)
  } else if (tz === TimeZone.UsHawaii) {
    let utcTime = utcDateTime - 36000000;
    return new Date(utcTime)
  } else if (tz === TimeZone.AustrlianEastern) {
    let utcTime = utcDateTime + 39600000;
    return new Date(utcTime)
  } else if (tz === TimeZone.AustrlianCentral) {
    let utcTime = utcDateTime + 34200000;
    return new Date(utcTime)
  } else if (tz === TimeZone.AustrlianWestern) {
    let utcTime = utcDateTime + 28800000;
    return new Date(utcTime)
  } else if (tz === TimeZone.UsPacific) {
    let utcTime = utcDateTime - 28800000;
    return new Date(utcTime)
  } else if (tz === TimeZone.UsEastern) {
    let utcTime = utcDateTime - 18000000;
    return new Date(utcTime)
  } else {
    throw Error("Not supported TimeZone");
  }
}
