export enum TimeZone {
  AustrlianEastern,
  AustrlianCentral,
  AustrlianWestern,
  UsPacific,
  UsEastern,
  UsHawaii,
  Japan,
}

class TimeZoneInfo {
  tz: TimeZone
  offset: number
  isoName: string
  constructor(tz:TimeZone, offset:number, isoName:string) {
    this.tz = tz
    this.offset = offset
    this.isoName = isoName
  }
}

const timeZoneOffsets = {}
timeZoneOffsets[TimeZone.Japan           ] = new TimeZoneInfo(TimeZone.Japan           ,  1000*60*60*9    , 'Tokyo');
timeZoneOffsets[TimeZone.UsHawaii        ] = new TimeZoneInfo(TimeZone.UsHawaii        , -36000000        , ''     );
timeZoneOffsets[TimeZone.AustrlianEastern] = new TimeZoneInfo(TimeZone.AustrlianEastern,  39600000        , ''     );
timeZoneOffsets[TimeZone.AustrlianCentral] = new TimeZoneInfo(TimeZone.AustrlianCentral,  34200000        , ''     );
timeZoneOffsets[TimeZone.AustrlianWestern] = new TimeZoneInfo(TimeZone.AustrlianWestern,  28800000        , ''     );
timeZoneOffsets[TimeZone.UsPacific       ] = new TimeZoneInfo(TimeZone.UsPacific       , -28800000        , ''     );
timeZoneOffsets[TimeZone.UsEastern       ] = new TimeZoneInfo(TimeZone.UsEastern       , -18000000        , ''     );

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

  if (!timeZoneOffsets.hasOwnProperty(tz)) {
    throw Error("Not supported TimeZone");
  }

  let utcTime = dt.getTime() + timeZoneOffsets[tz].offset;
  return new Date(utcTime)

}

export const convertIntTz = (n: number, h: number, tz: TimeZone): Date => {
  const utc = intToDate(n).getTime()
  const hourInMil = h * 3600000;
  return convertDateTz(new Date(utc + hourInMil), tz)
}
