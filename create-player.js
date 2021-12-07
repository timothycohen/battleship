const createPlayer = ((name, human) => {

  function chooseRandom(max){
    ran1 = Math.floor(Math.random()*max)
    ran2 = Math.floor(Math.random()*max)
    return [ran1, ran2]
  }

  function chooseClose(position, max, direction){
    let pos = [...position]
    let plusOrMinus = Math.random() < 0.5 ? -1 : 1;

    if (direction === 'ver') {
      pos[0] += plusOrMinus
      if (pos[0] >= max || pos[0] < 0) pos[0] += -2 * plusOrMinus
    }
    if (direction === 'hor') {
      pos[1] += plusOrMinus
      if (pos[1] >= max || pos[1] < 0) pos[1] += -2 * plusOrMinus
    }
    return pos
  }
  return {
    name,
    'human': human,
    chooseRandom,
    chooseClose,
  }
})

module.exports = { createPlayer }
