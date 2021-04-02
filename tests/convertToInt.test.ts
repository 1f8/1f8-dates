import * as program from '../src/index'

test('create date as number', () => {

  const value = new Date('2021-03-25T07:14:38.877Z')
  const expected = 20210325
  const output = program.dateToInt(value)

  expect(output).toBe(expected)
})

test('create date as number time-zone-indifference', () => {

  const value = new Date('2021-03-25T01:00:00.000Z')
  const expected = 20210325
  const output = program.dateToInt(value)


  expect(output).toBe(expected)

  const value2 = new Date('2021-03-24T23:58:00.000Z')
  const expected2 = 20210324
  const output2 = program.dateToInt(value2)

  expect(output2).toBe(expected2)
})

test('create time as a number', () => {

  const value = new Date('2021-03-25T07:20:31.669Z')
  const expected = 1616656831
  const output = program.timeToInt(value)

  expect(output).toBe(expected)
})
