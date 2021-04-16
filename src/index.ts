import { getDefaultSettings } from "http2"

export enum TimeZone {
  AustrlianEastern,
  AustrlianCentral,
  AustrlianWestern,
  UsPacific,
  UsEastern,
  UsHawaii,
  Japan,
}
export enum Language {
  JPN = 'JPN',
  ENG = 'ENG',
}
const langOptions = {
  ENG: [' seconds ago', ' minutes ago', ' hours ago', ' days ago'],
  JPN: ['秒前', '分前', '時間前', '日前'],
}
class TimeZoneInfo {
  tz: TimeZone
  offset: number
  isoName: string
  constructor(tz: TimeZone, offset: number, isoName: string) {
    this.tz = tz
    this.offset = offset
    this.isoName = isoName
  }
}

const timeZoneOffsets = {}
timeZoneOffsets[TimeZone.Japan] = new TimeZoneInfo(TimeZone.Japan, 1000 * 60 * 60 * 9, 'Tokyo');
timeZoneOffsets[TimeZone.UsHawaii] = new TimeZoneInfo(TimeZone.UsHawaii, -36000000, '');
timeZoneOffsets[TimeZone.AustrlianEastern] = new TimeZoneInfo(TimeZone.AustrlianEastern, 39600000, '');
timeZoneOffsets[TimeZone.AustrlianCentral] = new TimeZoneInfo(TimeZone.AustrlianCentral, 34200000, '');
timeZoneOffsets[TimeZone.AustrlianWestern] = new TimeZoneInfo(TimeZone.AustrlianWestern, 28800000, '');
timeZoneOffsets[TimeZone.UsPacific] = new TimeZoneInfo(TimeZone.UsPacific, -28800000, '');
timeZoneOffsets[TimeZone.UsEastern] = new TimeZoneInfo(TimeZone.UsEastern, -18000000, '');

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
  const dtDate = n.toString(10);
  const dtDateYear = dtDate.substring(0, 4);
  const dtDateMonth = dtDate.substring(4, 6);
  const dtDateDay = dtDate.substring(6);
  return new Date(`${dtDateYear}-${dtDateMonth}-${dtDateDay}`)
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

export const dayToWeek = (dt: Date): string => {
  const weekChars = ["Sun", "Mon", "Thu", "Wed", "Thur", "Fri", "Sat"];
  const wDay = dt.getDay();
  const youbi = weekChars[wDay];
  const monthChars = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const month = dt.getMonth();
  const eMonth = monthChars[month];
  const nDay = dt.getDate();

  return `${youbi}, ${eMonth} ${nDay}`
}

export const dateToStringJapan = (dt: Date): string => {
  const monthChars = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const month = dt.getMonth();
  const eMonth = monthChars[month];
  const nDay = dt.getDate();
  const year = dt.getFullYear();

  return `${nDay} ${eMonth} ${year}`
}

export const dateToStringFormatJapan = (dt: Date): String => {

  const weekChars = ["日", "月", "火", "水", "木", "金", "土"];
  const wDay = dt.getUTCDay();
  const jDay = weekChars[wDay];
  const date = dt.getUTCDate();
  const month = dt.getUTCMonth() + 1;
  let currentHours = dt.getUTCHours().toString(10);
  currentHours = ("0" + currentHours).slice(-2);
  let currentMinutes = dt.getUTCMinutes().toString(10);
  currentMinutes = ("0" + currentMinutes).slice(-2);
  return `${month}/${date}(${jDay}) ${currentHours}:${currentMinutes}`

}

export const getJapanYear = (dt: Date): [string, number] => {
  const japanYear = dt.toLocaleString("ja-JP-u-ca-japanese", { era: "long" });
  console.log({japanYear})
  const reiwa = japanYear.substring(0, 2);
  const year = japanYear.substring(2, 3);
  return [reiwa, parseInt(year, 10)]
}

//現在時間より3分前の時間が入力されれば、３ minutes agoと出力する.
//引数と現在時間の差のミリ秒が60秒未満だったら1000で割る。60分未満だったら1000 * 60で割る。24時間以内だったら1000 * 60 * 60で割る。1日以上だったら1000 * 60 * 60 * 24で割る。
export const getFormatAgo = (n: number, lang: Language = Language.ENG): string => {
  const now = new Date().getTime();
  const diff = now - n;
  if (diff < 1000 * 60) {
    const pastSec = Math.floor((diff / 1000));
    return `${pastSec}${langOptions[lang][0]}`;
  } else if (diff > (1000 * 60) && diff < (1000 * 60 * 60)) {
    const pastMin = Math.floor(diff / (1000 * 60));
    return `${pastMin}${langOptions[lang][1]}`
  } else if (diff > (1000 * 60 * 60) && diff < (1000 * 60 * 60 * 24)) {
    const pastHours = Math.floor(diff / (1000 * 60 * 60));
    return `${pastHours}${langOptions[lang][2]}`
  } else if (diff >= (1000 * 60 * 60 * 24)) {
    const pastDays = Math.floor(diff / (1000 * 60 * 60 * 24));
    return `${pastDays}${langOptions[lang][3]}`
  }
}

// const n = new Date().getTime() - 1000 * 60 * 60 * 60;
//   const now = new Date().getTime();
//   const diff = now - n;
//   if (diff < 1000 * 60) {
//     const pastSec = diff / 1000;
//     console.log(`${pastSec} seconds ago`);
//   } else if (diff < (1000 * 60 * 60)) {
//     const pastMin = diff / (1000 * 60);
//     console.log(`${pastMin} minutes ago`);
//   } else if (diff < (1000 * 60 * 60 * 24)) {
//     const pastHours = diff / (1000 * 60 * 60);
//     console.log(`${pastHours} hours ago`);
//   } else if (diff >= (1000 * 60 * 60 * 24)) {
//     const pastDays = Math.round(diff / (1000 * 60 * 60 * 24));
//     console.log(`${pastDays} days ago`);
//   }

export const daysBetweenInts = (dt1: number, dt2: number): number => {
  const miliDt1 = intToDate(dt1);
  const miliDt2 = intToDate(dt2);
  const dt1Number = miliDt1.getTime();
  const dt2Number = miliDt2.getTime();

  const dtDiff = Math.abs(dt1Number - dt2Number) / 86400000;
  return dtDiff
}
// const dt1 = 20210314
// const dt2 = 20210310


// const dt1Date = dt1.toString(10);
// const dt1DateYear = dt1Date.substring(0, 4);
// const dt1DateMonth = dt1Date.substring(4, 6);
// const dt1DateDay = dt1Date.substring(6);

// const miliDt1 = new Date(`${dt1DateYear},${dt1DateMonth}, ${dt1DateDay}`);
// const dt2Date = dt2.toString(10);
// const dt2DateYear = dt2Date.substring(0, 4);
// const dt2DateMonth = dt2Date.substring(4, 6);
// const dt2DateDay = dt2Date.substring(6);

// const miliDt2 = new Date(`${dt2DateYear},${dt2DateMonth}, ${dt2DateDay}`);
// const dt2Number = miliDt2.getTime();
// const dtDiffDay = dtDiff.getDate();

// console.log(dtDiffDay + 1);

// let years = [20210314 , 20210310];
// for(let i = 0; i < years.length; i ++){
// function intToDate (years) {
//   const dates = `${ years[i] / 10000}`.split('.');
//   const year = dates[0];
//   const months = dates[1].substring(0, 2);
//   const date = dates[1].substring(2)
//   console.log(new Date(`${year}-${months}-${date}`));
//   }}


//月をまたがない時は上。月をまたぐ時は下。もしgetMonth() not equal

// const dt1 = 20210105
// const dt2 = 20201231

// const dt1Date = dt1.toString(10);
// const dt1DateYear = dt1Date.substring(0, 4);
// const dt1DateMonth = dt1Date.substring(4, 6);
// const dt1DateDay = dt1Date.substring(6);

// const miliDt1 = new Date(`${dt1DateYear},${dt1DateMonth}, ${dt1DateDay}`);
// const dt1Number = miliDt1.getTime();

// const dt2Date = dt2.toString(10);
// const dt2DateYear = dt2Date.substring(0, 4);
// const dt2DateMonth = dt2Date.substring(4, 6);
// const dt2DateDay = dt2Date.substring(6);

// const miliDt2 = new Date(`${dt2DateYear},${dt2DateMonth}, ${dt2DateDay}`);
// const dt2Number = miliDt2.getTime();

// const dtDiff = new Date(dt1Number - dt2Number);
// const dtDiffDay = dtDiff.getDate();

// console.log(dtDiffDay);

//20201231をミリ秒にして、ｘ日分のミリ秒を足す。getYear,Month,Dayで出力する
// 月をまたがない時は、let addedDate = addedDay.getDate().toString();

export const addDaysInt = (dt1: number, dayX: number): number => {

  const miliDt1 = intToDate(dt1);
  const dtNumber = miliDt1.getTime();
  const dayNumber = 1000 * 60 * 60 * 24 * dayX;

  const addedDay = new Date(dtNumber + dayNumber);
  const addedYear = addedDay.getFullYear().toString();
  let addedMonth = (addedDay.getMonth() + 1).toString(10);
  addedMonth = ("0" + addedMonth).slice(-2);
  let addedDate = addedDay.getDate().toString();
  addedDate = ("0" + addedDate).slice(-2);
  return parseInt(`${addedYear}${addedMonth}${addedDate}`)
}
// Days not considered version
// export const addMonthsInt = (dt1: number, monthX: number): number => {


//   const miliDt = intToDate(dt1);
//   const dtMonth = miliDt.getMonth();
//   miliDt.setMonth(dtMonth + monthX);

//   return dateToInt(miliDt)
// }
// Days considered version
export const addMonthsInt = (dt1: number, monthX: number): number => {

  const miliDt = intToDate(dt1);
  const dtMonth = miliDt.getMonth() + 1;
  // const date = miliDt.getDate();
  const year = miliDt.getFullYear();
  let calculatedYear = year;
  let calculatedMonth = monthX;
  while (calculatedMonth <= 0) {
    calculatedMonth = 12 + calculatedMonth;
    if (calculatedMonth <= 0) {
      calculatedYear = calculatedYear - 1;
    }
  }
  const dt = new Date(Date.UTC(calculatedYear, calculatedMonth, 0));

  return dateToInt(dt)
}

export const addYearsInt = (dt1: number, yearX: number): number => {
  const miliDt = intToDate(dt1);
  const dtYear = miliDt.getUTCFullYear();
  const newYear = dtYear + yearX;
  const month = miliDt.getUTCMonth();
  const dt = new Date(Date.UTC(newYear, month + 1, 0));
  console.log(miliDt)
  return dateToInt(dt)
}
