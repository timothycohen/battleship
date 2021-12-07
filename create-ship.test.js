const { createShip } = require('./create-ship.js')

it('produces an object', () => {
  expect(typeof createShip(3))
    .toBe("object")
});

it('has two properties(length, id) and three methods (hit, isSunk, inspectShip)', () => {
  const obj = createShip(3);
    let methods = [];
    let properties = [];
    for (let i in obj) {
    if (typeof(obj[i]) === "number") properties.push(i);
    if (typeof(obj[i]) === "function") methods.push(i);
  }

  expect(methods)
    .toEqual(['hit', 'isSunk', 'inspectShip'])
  expect(properties)
    .toEqual(['length', 'id'])
});

it('throws an error if the argument is not an integer', () => {
  expect(() => createShip('2'))
    .toThrowError('argument must be an integer between 2 and 5')
  expect(() => createShip())
    .toThrowError('argument must be an integer between 2 and 5')
  expect(() => createShip(1))
    .toThrowError('argument must be an integer between 2 and 5')
  expect(() => createShip(6))
    .toThrowError('argument must be an integer between 2 and 5')
  expect(() => createShip(62))
    .toThrowError('argument must be an integer between 2 and 5')
});

it('creates a ship with length equal to the length passed in', () => {
  const ship2 = createShip(2)
  const ship3 = createShip(3)
  const ship4 = createShip(4)
  const ship5 = createShip(5)
  expect(ship2.length)
    .toBe(2)
  expect(ship3.length)
    .toBe(3)
  expect(ship4.length)
    .toBe(4)
  expect(ship5.length)
    .toBe(5)
})

test('the hit method throws an error when the argument isn\'t from 0 to length-1', () => {
  const ship = createShip(3)
  expect(() => ship.hit(3))
    .toThrowError('argument not within length');
  expect(() => ship.hit())
    .toThrowError('argument not within length');
  expect(() => ship.hit(-4))
    .toThrowError('argument not within length');
})

test('the hit method throws an error when the argument isn\'t an integer', () => {
  const ship = createShip(3)
  expect(() => ship.hit('2'))
    .toThrowError('argument must be an integer');
})

test('the hit method returns false when it\'s already been hit at that position', () => {
  const ship = createShip(2);
  ship.hit(1);

  expect(ship.hit(1))
    .toBe(false);
})

test('the hit method returns true if hit for the first time at that position', () => {
  const ship = createShip(2);
  ship.hit(1)

  expect(ship.hit(0))
    .toBe(true)
})

test('isSunk returns false when all its positions haven\'t been hit', () => {
  const ship = createShip(4);
  ship.hit(2)

  expect(ship.isSunk())
    .toBe(false)
})

test('isSunk returns true after all its positions have been hit', () => {
  const ship = createShip(4);
  for (let i = 0; i<4; i++){
    ship.hit(i)
  }
  expect(ship.isSunk())
    .toBe(true)
})
