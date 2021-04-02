import * as program from '../src/index'

test('convert date int back to date', () => {

  const value = 20210325
  const expected = new Date('2021-03-25T00:00:00.000Z').getTime()
  const output = program.intToDate(value).getTime()

  expect(output).toBe(expected)
})

test('convert time int back to date', () => {

  const value = 1616656831
  const expected = new Date('2021-03-25T07:20:31.000Z').getTime()
  const output = program.intToTime(value).getTime()

  expect(output).toBe(expected)
})
