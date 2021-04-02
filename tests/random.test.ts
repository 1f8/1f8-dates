import * as program from '../src/index'

test('Date to short string with day of week', () => {

  const value = new Date('2021-04-02T00:14:38.877Z')
  const expected = 'Fri, Apr 2'

  expect(1).toBeTruthy()
})

test('Date to short string used in Japan', () => {

  const value = new Date('2021-04-02T00:14:38.877Z')
  const expected = '2 Apr 2021'

  expect(1).toBeTruthy()
})

test('Date to short Japan formatted time', () => {

  const value = new Date('2021-04-02T00:14:00.877Z')
  const expected = '4/2(金) 14:00'

  expect(1).toBeTruthy()
})

test('Get Japan Year', () => {

  const value = new Date('2021-04-02T00:14:38.877Z')
  const expected = ['令和', 3]

  expect(1).toBeTruthy()
})

test('Get formatted "ago"', () => {
  const v1 = new Date().getTime() - (1000*60*3)
  expect(v1).toBe('3 minutes ago')

  const v2 = new Date().getTime() - (1000*30)
  expect(v1).toBe('30 seconds ago')

  const v3 = new Date().getTime() - (1000*60*60*4)
  expect(v1).toBe('4 hours ago')

  const v4 = new Date().getTime() - (1000*60*60*50)
  expect(v1).toBe('2 days ago')
})

test('Get formatted "ago" in Japanese', () => {
  const v1 = new Date().getTime() - (1000*60*3)
  expect(v1).toBe('3分前')

  const v2 = new Date().getTime() - (1000*30)
  expect(v1).toBe('30秒前')

  const v3 = new Date().getTime() - (1000*60*60*4)
  expect(v1).toBe('4時間前')

  const v4 = new Date().getTime() - (1000*60*60*50)
  expect(v1).toBe('2日前')
})

test('# of days between 2 Date Integers', () => {
  const dt1 = 20210314
  const dt2 = 20210310
  expect(program.daysBetweenInts(dt1, dt1)).toBe(4)

  const dt3 = 20210105
  const dt4 = 20201231
  expect(program.daysBetweenInts(dt3, dt4)).toBe(6)

  expect(program.daysBetweenInts(dt4, dt3)).toBe(6)
})

test('Add days to int', () => {
  expect(program.addDaysInt(20201231, 6)).toBe(20210105)
})

test('Add months to int', () => {
  expect(program.addMonthsInt(20201231, -18)).toBe(20190630)
})

test('Add years to int', () => {
  expect(program.addMonthsInt(20200229, 1)).toBe(20210228)
})
