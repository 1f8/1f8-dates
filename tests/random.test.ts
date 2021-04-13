import * as program from '../src/index'

test('Date to short string with day of week', () => {

  const value = new Date('2021-04-02T00:14:38.877Z')
  const expected = 'Fri, Apr 2'
  const output = program.dayToWeek(value)
  expect(output).toBe(expected)
})

test('Date to short string used in Japan', () => {

  const value = new Date('2021-04-02T00:14:38.877Z')
  const expected = '2 Apr 2021'
  const output = program.dateToStringJapan(value)

  expect(output).toBe(expected)
})

test('Date to short Japan formatted time', () => {

  const value = new Date('2021-04-02T00:14:00.877Z')
  const expected = '4/2(金) 00:14'
  const output = program.dateToStringFormatJapan(value)
  expect(output).toBe(expected)
})

test('Get Japan Year', () => {

  const value = new Date('2021-04-02T00:14:38.877Z')
  const expected = ['令和', 3]
  const output = program.getJapanYear(value)

  expect(output[0]).toBe(expected[0])
  expect(output[1]).toBe(expected[1])
})

test('Get formatted "ago"', () => {
  const v1 = new Date().getTime() - (1000 * 60 * 3)
  const output1 = program.getFormatAgo(v1)
  expect(output1).toBe('3 minutes ago')

  const v2 = new Date().getTime() - (1000 * 30)
  const output2 = program.getFormatAgo(v2)
  expect(output2).toBe('30 seconds ago')

  const v3 = new Date().getTime() - (1000 * 60 * 60 * 4)
  const output3 = program.getFormatAgo(v3)
  expect(output3).toBe('4 hours ago')

  const v4 = new Date().getTime() - (1000 * 60 * 60 * 50)
  const output4 = program.getFormatAgo(v4)
  expect(output4).toBe('2 days ago')
})

test('Get formatted "ago" in Japanese', () => {
  const v1 = new Date().getTime() - (1000 * 60 * 3)
  const output1 = program.getFormatAgo(v1, program.Language.JPN)
  expect(output1).toBe('3分前')

  const v2 = new Date().getTime() - (1000 * 30)
  const output2 = program.getFormatAgo(v2, program.Language.JPN)
  expect(output2).toBe('30秒前')

  const v3 = new Date().getTime() - (1000 * 60 * 60 * 4)
  const output3 = program.getFormatAgo(v3, program.Language.JPN)
  expect(output3).toBe('4時間前')

  const v4 = new Date().getTime() - (1000 * 60 * 60 * 50)
  const output4 = program.getFormatAgo(v4, program.Language.JPN)
  expect(output4).toBe('2日前')
})

test('# of days between 2 Date Integers', () => {
  // 数字をdate型にする。ミリ秒に変換して、引いてgetDateする
  const dt1 = 20210314
  const dt2 = 20210310
  expect(program.daysBetweenInts(dt1, dt2)).toBe(4)

  const dt3 = 20210105
  const dt4 = 20201231
  expect(program.daysBetweenInts(dt3, dt4)).toBe(5)

  expect(program.daysBetweenInts(dt4, dt3)).toBe(5)
})

test('Add days to int', () => {
  expect(program.addDaysInt(20201231, 6)).toBe(20210106)
})

test('Add months to int', () => {
  expect(program.addMonthsInt(20201231, -18)).toBe(20190630)
})

test('Add years to int', () => {
  expect(program.addYearsInt(20200229, 1)).toBe(20210228)
})
