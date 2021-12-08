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

test('chooseClose chooses a position one square away in the correct direction', () => {
  const player2 = createPlayer('John', false)
  const max = 10
  const pos = [2, 6]

  const randomChoiceVer = player2.chooseClose(pos, max, 'ver')
  const validVer = [[1,6], [3,6]]
  const invalidVer = [[1,7], [3,7]]

  const randomChoiceHor = player2.chooseClose(pos, max, 'hor')
  const validHor = [[2,5], [2,7]]
  const invalidHor = [[2,4], [2,6]]

  expect(containsArr(validVer, randomChoiceVer))
    .toBe(true)
  expect(containsArr(invalidVer, randomChoiceVer))
    .toBe(false)
  expect(containsArr(validHor, randomChoiceHor))
    .toBe(true)
  expect(containsArr(invalidHor, randomChoiceHor))
    .toBe(false)

});

test('chooseClose doesn\t return below zero or above max', () => {
  const player2 = createPlayer('John', false)
  const max = 10

  const randomChoiceHor = player2.chooseClose([0, 0], max, 'hor')
  const randomChoiceVer = player2.chooseClose([9, 9], max, 'ver')
  expect(randomChoiceHor)
    .toEqual([0,1])
  expect(randomChoiceVer)
    .toEqual([8,9])
})

function containsArr(arr, sub) {
  let contains = false;
  arr.forEach(possibility => {
    contains = contains || possibility.every(el => sub.includes(el))
  })
  return contains;
}
