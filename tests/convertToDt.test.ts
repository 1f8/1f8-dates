import * as program from '../src/index'

test('convert date int back to date', () => {

  expect(1).toBeTruthy()
  const value = 20210325
  const expected = new Date('2021-03-25T07:14:38.877Z')
  const output = program.intToDate(value)

  expect(output).toBe(expected)
})

test('convert time int back to date', () => {

  expect(1).toBeTruthy()
  const value = 1616656831
  const expected = new Date('2021-03-25T07:20:31.000Z')
  const output = program.intToTime(value)

  expect(output).toBe(expected)
})
