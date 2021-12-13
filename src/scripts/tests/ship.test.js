const { createShip, VALIDSHIPS } = require("../ship");

it('produces an object', () => {
  expect(typeof createShip('Carrier'))
    .toBe("object")
});

it('creates a ship with name according to the input', () => {
  const ship = createShip('Destroyer')
  expect(ship.name)
    .toBe('Destroyer')
})

it('creates a ship with an integer id', () => {
  const ship = createShip('Destroyer')
  expect(Number.isInteger(ship.id))
    .toBe(true)
})

it('creates a ship with length according to the name', () => {
  const ship2 = createShip('Destroyer')
  const ship3A = createShip('Submarine')
  const ship3B = createShip('Cruiser')
  const ship4 = createShip('Battleship')
  const ship5 = createShip('Carrier')
  expect(ship2.length)
    .toBe(2)
  expect(ship3A.length)
    .toBe(3)
  expect(ship3B.length)
    .toBe(3)
  expect(ship4.length)
    .toBe(4)
  expect(ship5.length)
    .toBe(5)
})

it('throws an error if not a valid name', () => {
  expect(() => createShip(''))
    .toThrowError('valid names are')
  expect(() => createShip())
    .toThrowError('valid names are')
  expect(() => createShip('Carr'))
    .toThrowError('valid names are')
  expect(() => createShip('Carrierr'))
    .toThrowError('valid names are')
});

test('the hit method throws an error when the argument isn\'t from 0 to length-1', () => {
  const ship = createShip("Submarine")
  expect(() => ship.hit(3))
    .toThrowError('argument not within length');
  expect(() => ship.hit())
    .toThrowError('argument not within length');
  expect(() => ship.hit(-4))
    .toThrowError('argument not within length');
})

test('the hit method throws an error when the argument isn\'t an integer', () => {
  const ship = createShip("Submarine")
  expect(() => ship.hit('2'))
    .toThrowError('argument must be an integer');
})

test('the hit method returns false when it\'s already been hit at that position', () => {
  const ship = createShip("Destroyer")
  ship.hit(1);

  expect(ship.hit(1))
    .toBe(false);
})

test('the hit method returns true if hit for the first time at that position', () => {
  const ship = createShip("Destroyer")
  ship.hit(1)

  expect(ship.hit(0))
    .toBe(true)
})

test('isSunk returns false when all its positions haven\'t been hit', () => {
  const ship = createShip("Battleship")
  ship.hit(2)

  expect(ship.isSunk())
    .toBe(false)
})

test('isSunk returns true after all its positions have been hit', () => {
  const ship = createShip("Battleship")
  for (let i = 0; i<4; i++){
    ship.hit(i)
  }
  expect(ship.isSunk())
    .toBe(true)
})

test('inspectShip returns true if the ship has been hit at that position', () =>{
  const ship = createShip("Battleship")
  ship.hit(2)
  expect(ship.inspectShip(0))
    .toBe(false)
  expect(ship.inspectShip(2))
    .toBe(true)
  ship.hit(0)
  expect(ship.inspectShip(0))
  .toBe(true)
})

test('inspectShip throws an error if the argument isn\'t an integer from 0 to ship length -1', () => {
  const ship = createShip("Battleship")

  expect(() => ship.inspectShip(4))
    .toThrowError('argument not within length')
  expect(() => ship.inspectShip(-1))
    .toThrowError('argument not within length')
  expect(() => ship.inspectShip('3'))
    .toThrowError('argument must be an integer')
})

test('VALIDSHIPS is an array of objects with name and length properties', () => {
  expect(typeof VALIDSHIPS[0])
    .toBe('object')
  expect(Object.keys(VALIDSHIPS[0]).length)
    .toBe(2)

  const expectedProperties = ['name', 'length']

  const shipKeys = Object.keys(VALIDSHIPS[0])

  expect( shipKeys.reduce((prev, key) => { return prev && expectedProperties.includes(key) }, true) )
    .toBe(true)
})
