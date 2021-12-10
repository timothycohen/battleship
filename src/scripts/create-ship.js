let id = 0;

let nameToLength = {
  'Carrier': 5,
  'Battleship': 4,
  'Cruiser': 3,
  'Submarine': 3,
  'Destroyer': 2,
};

const VALIDNAMES = ['Destroyer', 'Submarine', 'Cruiser', 'Battleship', 'Carrier'];

const createShip = (name => {
  if (!VALIDNAMES.includes(name)) throw Error(`valid names are ${VALIDNAMES.join(', ')}`)
  const length = nameToLength[name]

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

module.exports = { createShip }
