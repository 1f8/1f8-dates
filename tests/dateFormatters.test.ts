import * as program from '../src/index'

test('Date to short string with day of week', () => {

  const value = new Date('2021-04-02T00:14:38.877Z')
  const expected = 'Fri, Apr 2'

  const output = program.dayToWeek(value)
  expect(output).toBe(expected)
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
