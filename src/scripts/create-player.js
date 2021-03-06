const createPlayer = ((name, human = true) => {

  function chooseRandom(max) {
    const ran1 = Math.floor(Math.random()*max)
    const ran2 = Math.floor(Math.random()*max)
    return [ran1, ran2]
  }

  function chooseClose(position, max) {
    let pos = [...position]
    const plusOrMinus = Math.random() < 0.5 ? -1 : 1;
    const direction = Math.random() < 0.5 ? 'hor' : 'ver';

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
