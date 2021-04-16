import * as program from '../src/index'

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
