import * as program from '../src/index'

test('convert DB Date to Tokyo time', () => {

  const value = new Date('2021-03-25T00:14:38.877Z')
  const expected = new Date('2021-03-25T09:14:38.877Z').getTime()
  const output = program.convertDateTz(value, program.TimeZone.Japan).getTime()

  expect(output).toBe(expected)
})

test('convert DB Date to Hawaii time', () => {

  const value = new Date('2021-03-25T07:14:38.877Z')
  const expected = new Date('2021-03-24T21:14:38.877Z').getTime()
  const output = program.convertDateTz(value, program.TimeZone.UsHawaii).getTime()

  expect(output).toBe(expected)
})

test('convert DB Date+Hour to Tokyo time', () => {

  const expected = new Date('2021-03-25T09:00:00.000Z').getTime()
  const output = program.convertIntTz(20210325, 0, program.TimeZone.Japan).getTime()

  expect(output).toBe(expected)
})
