let id = 0;

const createShip = (length => {
  if (!Number.isInteger(length) || length < 2 || length > 5){
    throw Error('argument must be an integer between 2 and 5')
  }

  let ship = {}

  for (let i=0; i<length; i++){
    ship[i] = false;
  }

  function hit(hitPos) {
    if (hitPos === undefined || hitPos >= length || hitPos < 0) throw Error('argument not within length')
    if (!Number.isInteger(hitPos)) throw Error('argument must be an integer')

    for (pos of Object.keys(ship)){
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
    for (pos of Object.keys(ship)){
      if (ship[pos] === false) return false
    }
    return true;
  }

  const inspectShip = () => ship;

  return {
    length,
    hit,
    isSunk,
    inspectShip,
    id: id++,
  }
})

module.exports = { createShip }
