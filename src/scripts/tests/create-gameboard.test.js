const { createGameboard } = require('../create-gameboard')

it('creates a board of 10x10 null squares', () =>{
  let row = [null, null, null, null, null, null, null, null, null, null]
  expect(createGameboard().getBoard())
    .toEqual([row, row, row, row, row, row, row, row, row, row])
})

test('placeShip throws error if any argument is missing or invalid', () => {
  expect(() => createGameboard().placeShip([3,2], 'Cruiser'))
    .toThrowError(`arguments: [int y, int x] position, ship name, 'ver' or 'hor'`)
  expect(() => createGameboard().placeShip([2], 'Cruiser', 'ver'))
    .toThrowError(`arguments: [int y, int x] position, ship name, 'ver' or 'hor'`)
  expect(() => createGameboard().placeShip([2,3,4], 'Cruiser', 'ver'))
    .toThrowError(`arguments: [int y, int x] position, ship name, 'ver' or 'hor'`)
  expect(() => createGameboard().placeShip([2,3], 'Crui', 'ver'))
    .toThrowError(`arguments: [int y, int x] position, ship name, 'ver' or 'hor'`)
  expect(() => createGameboard().placeShip([2,3], 'Cruiser', 'vert'))
    .toThrowError(`arguments: [int y, int x] position, ship name, 'ver' or 'hor'`)
})

test('placeShip throws error if length+position lead to out of bounds', () => {
  expect(() => createGameboard().placeShip([7,3], 'Battleship', 'ver'))
    .toThrowError('out of bounds')
  expect(() => createGameboard().placeShip([3,9], 'Destroyer', 'hor'))
    .toThrowError('out of bounds')
  expect(() => createGameboard().placeShip([2,-1], 'Battleship', 'hor'))
    .toThrowError('out of bounds')
})

test('placeShip correctly updates the board with the player\'s ships', () => {
  const board1 = createGameboard()
  board1.placeShip([0,0], 'Destroyer', 'hor')
  const board2 = createGameboard()
  board2.placeShip([3,2], 'Destroyer', 'ver')
  let nullRow = [null, null, null, null, null, null, null, null, null, null]

  expect(board1.getBoard()[1])
    .toEqual(nullRow)
  expect(typeof board1.getBoard()[0][0].ship.id)
    .toBe("number")
  expect(board1.getBoard()[0][0].ship.id === board1.getBoard()[0][1].ship.id)
    .toBe(true)
  expect(board2.getBoard()[9])
    .toEqual(nullRow)
  expect(typeof board2.getBoard()[3][2].ship.id)
    .toBe("number")
  expect(board2.getBoard()[3][2].ship.id === board2.getBoard()[4][2].ship.id)
    .toBe(true)
})

test('placeShip throws error if spot is already taken', () => {
  const board = createGameboard()

  board.placeShip([2,3], 'Submarine', 'ver')

  expect(()=> board.placeShip([3,1], 'Submarine', 'hor'))
    .toThrowError('ships cannot overlap')
})

test('placeShip returns true on successful placement of ship', () => {
  expect(createGameboard().placeShip([2,3], 'Submarine', 'ver'))
    .toBe(true)
})

test('receivedAttack throws an error if the position is not an array of two integers', () =>{
  const board = createGameboard();
  board.placeShip([3,2], 'Submarine', 'ver')

  expect(() => board.receiveAttack([2]))
    .toThrowError('valid argument: [int y, int x]')
  expect(() => board.receiveAttack([]))
    .toThrowError('valid argument: [int y, int x]')
  expect(() => board.receiveAttack(['3, 4']))
    .toThrowError('valid argument: [int y, int x]')
})

test('receivedAttack updates the game board and returns false for a miss', () => {
  const board = createGameboard();
  board.placeShip([3,2], 'Submarine', 'ver')

  expect(board.receiveAttack([7,1]))
    .toBe(false)
  expect(board.getBoard()[7][1])
    .toBe('miss')
  expect(board.getBoard()[9][9])
    .toBe(null)
})

test('receivedAttack returns true if and only if a ship at the position has been hit for the first time', () => {
  const board = createGameboard();
  board.placeShip([3,2], 'Submarine', 'ver')
  expect(board.receiveAttack([2,2]))
    .toBe(false)
  expect(board.receiveAttack([4,2]))
    .toBe(true)
  expect(board.receiveAttack([3,2]))
    .toBe(true)
  expect(board.receiveAttack([4,2]))
    .toBe(false)
})

test('getShips returns an array of all ship objects on the board', () => {
  const board = createGameboard();
  board.placeShip([3,2], 'Submarine', 'ver')
  board.placeShip([6,6], 'Destroyer', 'hor')

  expect(board.getShips().length)
    .toBe(2)
  expect(typeof board.getShips()[0])
    .toBe("object")
})

// NOTIMPLEMENTED
// This is not a pure function (uses Math.random)
// Need to mock to test error thrown or returns false after failing 200 times
test('placeShipsRandomly places five ships on the board and returns true', () => {
  const board = createGameboard();
  expect(board.placeShipsRandomly())
    .toBe(true)
  expect(board.getShips().length)
    .toBe(5)
})

test('removeShip removes a ship from the board if present and returns true', () => {
  const board = createGameboard();
  board.placeShip([3,2], 'Submarine', 'hor')
  board.placeShip([6,4], 'Submarine', 'ver')
  let nullRow = [null, null, null, null, null, null, null, null, null, null]
  let nullArray = [nullRow, nullRow, nullRow, nullRow, nullRow, nullRow, nullRow, nullRow, nullRow, nullRow]
  expect(board.removeShip([3,3]))
    .toBe(true)
  expect(board.getShips().length)
    .toBe(1)
  expect(board.placeShip([3,2], 'Submarine', 'hor'))
    .toBe(true)
  expect(board.removeShip([7,4]))
    .toBe(true)
  expect(board.removeShip([3,2]))
    .toBe(true)
  expect(board.getShips().length)
    .toBe(0)
  expect(board.getBoard())
    .toEqual(nullArray)
  })

test('removeShip returns false if no ship was present at that position', () => {
  const board = createGameboard();
  expect(board.removeShip([999,2]))
    .toBe(false)
  expect(board.removeShip([2,2]))
    .toBe(false)
})