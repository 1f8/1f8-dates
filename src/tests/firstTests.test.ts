import * as program from '../index'

test('create date as number', () => {

  const value = new Date('2021-03-25T07:14:38.877Z')
  const expected = 20210325
  const output = program.dateToInt(value)

  expect(output).toBe(expected)
})

test('create time as a number', () => {

  const value = new Date('2021-03-25T07:20:31.669Z')
  const expected = 1616656831
  const output = program.dateToInt(value)
  
  expect(output).toBe(expected)
})
