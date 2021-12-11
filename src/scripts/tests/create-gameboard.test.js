const { createGameboard } = require('../create-gameboard')

it('creates a square board equal to the input integer', () =>{
  let row8 = [null, null, null, null, null, null, null, null]
  let row10 = [null, null, null, null, null, null, null, null, null, null]
  expect(createGameboard(10).getBoard())
    .toEqual([row10, row10, row10, row10, row10, row10, row10, row10, row10, row10])
  expect(createGameboard(8).getBoard())
    .toEqual([row8, row8, row8, row8, row8, row8, row8, row8])
})

it('throws an error if the argument is not a positive integer greater than 5', () =>{
  expect(() => createGameboard('10'))
    .toThrowError('argument must be a positive integer greater than 5')
    expect(() => createGameboard(0))
    .toThrowError('argument must be a positive integer greater than 5')
    expect(() => createGameboard(-8))
    .toThrowError('argument must be a positive integer greater than 5')
    expect(() => createGameboard(5))
    .toThrowError('argument must be a positive integer greater than 5')
})

test('placeShip throws error if any argument is missing or invalid', () => {
  expect(() => createGameboard(9).placeShip([3,2], 'Cruiser'))
    .toThrowError(`arguments: [int y, int x] position, ship name, 'ver' or 'hor'`)
  expect(() => createGameboard(8).placeShip([2], 'Cruiser', 'ver'))
    .toThrowError(`arguments: [int y, int x] position, ship name, 'ver' or 'hor'`)
  expect(() => createGameboard(7).placeShip([2,3,4], 'Cruiser', 'ver'))
    .toThrowError(`arguments: [int y, int x] position, ship name, 'ver' or 'hor'`)
  expect(() => createGameboard(10).placeShip([2,3], 'Crui', 'ver'))
    .toThrowError(`arguments: [int y, int x] position, ship name, 'ver' or 'hor'`)
  expect(() => createGameboard(10).placeShip([2,3], 'Cruiser', 'vert'))
    .toThrowError(`arguments: [int y, int x] position, ship name, 'ver' or 'hor'`)
})

test('placeShip throws error if length+position lead to out of bounds', () => {
  expect(() => createGameboard(8).placeShip([6,3], 'Battleship', 'ver'))
    .toThrowError('out of bounds')
  expect(() => createGameboard(10).placeShip([3,9], 'Destroyer', 'hor'))
    .toThrowError('out of bounds')
  expect(() => createGameboard(10).placeShip([2,-1], 'Battleship', 'hor'))
    .toThrowError('out of bounds')
})

test('placeShip correctly updates the board with the player\'s ships', () => {
  const board8 = createGameboard(8)
  board8.placeShip([0,0], 'Destroyer', 'hor')
  const board10 = createGameboard(10)
  board10.placeShip([3,2], 'Destroyer', 'ver')
  let nullRow8 = [null, null, null, null, null, null, null, null]
  let nullRow10 = [null, null, null, null, null, null, null, null, null, null]

  expect(board8.getBoard()[1])
    .toEqual(nullRow8)
  expect(typeof board8.getBoard()[0][0].ship.id)
    .toBe("number")
  expect(board8.getBoard()[0][0].ship.id === board8.getBoard()[0][1].ship.id)
    .toBe(true)
  expect(board10.getBoard()[9])
    .toEqual(nullRow10)
  expect(typeof board10.getBoard()[3][2].ship.id)
    .toBe("number")
  expect(board10.getBoard()[3][2].ship.id === board10.getBoard()[4][2].ship.id)
    .toBe(true)
})

test('placeShip throws error if spot is already taken', () => {
  const board = createGameboard(10)

  board.placeShip([2,3], 'Submarine', 'ver')

  expect(()=> board.placeShip([3,1], 'Submarine', 'hor'))
    .toThrowError('ships cannot overlap')
})

test('placeShip returns true on successful placement of ship', () => {
  expect(createGameboard(10).placeShip([2,3], 'Submarine', 'ver'))
    .toBe(true)
})

test('receivedAttack throws an error if the position is not an array of two integers', () =>{
  const board = createGameboard(10);
  board.placeShip([3,2], 'Submarine', 'ver')

  expect(() => board.receiveAttack([2]))
    .toThrowError('valid argument: [int y, int x]')
  expect(() => board.receiveAttack([]))
    .toThrowError('valid argument: [int y, int x]')
  expect(() => board.receiveAttack(['3, 4']))
    .toThrowError('valid argument: [int y, int x]')
})

test('receivedAttack updates the game board and returns false for a miss', () => {
  const board = createGameboard(10);
  board.placeShip([3,2], 'Submarine', 'ver')

  expect(board.receiveAttack([7,1]))
    .toBe(false)
  expect(board.getBoard()[7][1])
    .toBe('miss')
  expect(board.getBoard()[9][9])
    .toBe(null)
})

test('receivedAttack returns true if and only if a ship at the position has been hit for the first time', () => {
  const board = createGameboard(10);
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
  const board = createGameboard(10);
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
  const board = createGameboard(9);
  expect(board.placeShipsRandomly())
    .toBe(true)
  expect(board.getShips().length)
    .toBe(5)
})

test('removeShip removes a ship from the board if present and returns true', () => {
  const board = createGameboard(10);
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
  const board = createGameboard(10);
  expect(board.removeShip([999,2]))
    .toBe(false)
  expect(board.removeShip([2,2]))
    .toBe(false)
})