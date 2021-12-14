const { createPlayer } = require('../create-player.js')

it('correctly assigns a name and species', () => {
  const player1 = createPlayer('Jane', true)
  const player2 = createPlayer('John', false)

  expect(player1.name)
    .toBe('Jane')
  expect(player1.human)
    .toBe(true)
  expect(player2.name)
    .toBe('John')
  expect(player2.human)
    .toBe(false)
})

test('chooseClose chooses a position one square away in a random direction', () => {
  const player2 = createPlayer('John', false)
  const max = 8
  const pos = [2, 6]

  const randomChoice = player2.chooseClose(pos, max)
  const valid = [[1,6], [3,6], [2,5], [2,7]]
  const invalid = [[1,7], [3,7], [2,4], [2,6]]

  expect(containsArr(valid, randomChoice))
    .toBe(true)
  expect(containsArr(invalid, randomChoice))
    .toBe(false)
  expect(containsArr(valid, randomChoice))
    .toBe(true)
  expect(containsArr(invalid, randomChoice))
    .toBe(false)

});

test('chooseClose doesn\t return below zero or above max', () => {
  const player2 = createPlayer('John', false)
  const max = 10

  const randomChoiceLow = player2.chooseClose([0, 0], max)
  const randomChoiceHigh = player2.chooseClose([9, 9], max)
  const validLow = [[1, 0], [0, 1]]
  const validHigh= [[8, 9], [9, 8]]

  expect(containsArr(validLow, randomChoiceLow))
    .toBe(true)
    expect(containsArr(validHigh, randomChoiceHigh))
    .toBe(true)
})

function containsArr(arr, sub) {
  let contains = false;
  arr.forEach(possibility => {
    contains = contains || possibility.every(el => sub.includes(el))
  })
  return contains;
}
