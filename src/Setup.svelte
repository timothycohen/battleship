<script>
  import { createGameboard } from './scripts/create-gameboard'
  import { boards, view } from './store'

  // DEVTOOL : seed gameboard
  let player1Board = createGameboard()
  player1Board.placeShip([0,0], 2, 'ver')
  player1Board.placeShip([0,1], 3, 'ver')
  player1Board.placeShip([0,2], 3, 'ver')
  player1Board.placeShip([0,3], 4, 'ver')
  player1Board.placeShip([0,4], 5, 'ver')

  let player2Board = createGameboard()
  player2Board.placeShip([0, 0], 2, 'hor')
  player2Board.placeShip([1, 0], 3, 'hor')
  player2Board.placeShip([2, 0], 3, 'hor')
  player2Board.placeShip([3, 0], 4, 'hor')
  player2Board.placeShip([4, 0], 5, 'hor')

  player2Board.receiveAttack([0, 0])
  player1Board.receiveAttack([0, 0])
  player2Board.receiveAttack([5, 5])
  player1Board.receiveAttack([1, 0])
  player2Board.receiveAttack([0, 3])
  player1Board.receiveAttack([6, 3])
  player2Board.receiveAttack([1, 8])

  $boards = [player1Board, player2Board]
  $view = 'pass'

</script>
