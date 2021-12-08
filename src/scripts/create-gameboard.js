const { createShip } = require("./create-ship");

/*
each player has a gameboard
the gameboards have squares, each of which have one of three possible states:
  miss, null, or a ship state such as: {id: 3, position: 0}
on each turn the player can view their gameboard with ship, hit ship, sunk ship, missed, nothing
they can also view their opponent's gameboard with everything except the ships viewable
*/

const createGameboard = (() => {
  const GRIDSIZE = 10;
  let ships = [];
  let board = initializeBoard(GRIDSIZE);

  function placeShip(position, shipLength, direction) {
    let positions = [];

    // check argument validity
    if (
          arguments.length !== 3
      || !(Array.isArray(position) && position.length === 2 && Number.isInteger(position[0]) && Number.isInteger(position[1]))
      || !(Number.isInteger(shipLength))
      || !(direction === 'ver' || direction === 'hor')
      ){
      throw Error(`arguments: [int y, int x] position, int shipLength, 'ver' or 'hor'`)
    }

    const tempShip = createShip(shipLength)

    // calculate positions
    for (let i = 0; i < shipLength; i++){
      if (direction === 'ver'){
        positions.push([position[0]+i, position[1]]);
      } else if (direction === 'hor') {
        positions.push([position[0], position[1]+i]);
      }
    }

    // check position validity
    positions.forEach(pos => {
      if (  pos[0] < 0 || pos[0] > GRIDSIZE - 1
        ||  pos[1] < 0 || pos[1] > GRIDSIZE - 1)
      {
        throw Error(`out of bounds. max grid size is ${GRIDSIZE}`)
      }
    })

    // check the space is not occupied
    positions.forEach(pos => {
      if(board[pos[0]][pos[1]] !== null) {
        throw Error(`ships cannot overlap`)
      }
    })

    // write the ship id into the board
    positions.forEach((pos, i) => {
      board[pos[0]][pos[1]] = { id: tempShip.id, position: i }
    })
    ships.push(tempShip)
    return true;
    }

  function receiveAttack(pos) {
    if (!Array.isArray(pos) || pos.length !== 2){
      throw Error('valid argument: [int y, int x]')
    }

    if (board[pos[0]][pos[1]] === null){
      board[pos[0]][pos[1]] = 'miss'
      return false;
    }
    if (board[pos[0]][pos[1]] === 'miss'){
      return false;
    }
    if (typeof board[pos[0]][pos[1]] === 'object'
        && typeof board[pos[0]][pos[1]]['id'] === 'number'){
      let id = board[pos[0]][pos[1]]['id']
      let position = board[pos[0]][pos[1]]['position']
      return getShipById(id).hit(position)
    }
  }

  function gameOver() {
    let over = true;
    ships.forEach(ship => {
      if (ship.isSunk() === false) over = false
    });
    return over
  }

  const getBoard = () => board

  function initializeBoard(size) {
    let newBoard = [];
    for (let i = 0; i<size; i++){
      let row = []
      for (let j = 0; j<size; j++){
        row[j] = null
      }
    newBoard.push(row)
    }
    return newBoard
  }

  function getShipById(id) {
    for (const ship of ships){
      if (ship.id === id) return ship
    }
  }

  const getShips = () => ships

  return{
    getBoard,
    placeShip,
    receiveAttack,
    gameOver,
    getShips,
  }
})

module.exports = {createGameboard}

let board = createGameboard();
board.placeShip([2,4], 4, 'ver')
board.placeShip([0,0], 3, 'hor')
board.receiveAttack([0,0])
