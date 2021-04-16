import * as program from '../src/index'

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
  expect(program.addMonthsInt(20200101, 1)).toBe(20210101)
  expect(program.addMonthsInt(20200131, 1)).toBe(20210131)
  expect(program.addMonthsInt(20200229, 1)).toBe(20210228)
})
