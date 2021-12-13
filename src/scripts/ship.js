let id = 0;

const VALIDSHIPS = [
  {name: 'Carrier', length: 5},
  {name: 'Battleship', length: 4},
  {name: 'Cruiser', length: 3},
  {name: 'Submarine', length: 3},
  {name: 'Destroyer', length: 2},
];

const createShip = (name => {
  if (!VALIDSHIPS.map(ship => ship.name).includes(name)) throw Error(`valid names are ${VALIDSHIPS.map(ship => ship.name).join(', ')}`)

  const length = VALIDSHIPS.find(ship => ship.name === name).length

  let ship = {}

  for (let i=0; i<length; i++){
    ship[i] = false;
  }

  function hit(hitPos) {
    if (hitPos === undefined || hitPos >= length || hitPos < 0) throw Error('argument not within length')
    if (!Number.isInteger(hitPos)) throw Error('argument must be an integer')

    for (const pos of Object.keys(ship)){
      if (hitPos === +pos && ship[pos] === false){
        ship[pos] = true;
        return true;
      }
      if (hitPos === +pos && ship[pos] === true){
        return false;
      }
    }
  }

  function isSunk() {
    for (const pos of Object.keys(ship)){
      if (ship[pos] === false) return false
    }
    return true;
  }

  function inspectShip(pos){
    if (pos === undefined || pos >= length || pos < 0) throw Error('argument not within length')
    if (!Number.isInteger(pos)) throw Error('argument must be an integer')

    return ship[pos]
  }

  return {
    name,
    length,
    hit,
    isSunk,
    inspectShip,
    id: id++,
  }
})

module.exports = { createShip, VALIDSHIPS }
