<script>
  import { players, playerUp, boards } from './store'

  let player0Ships = $boards[0].getShips()
  let player1Ships = $boards[1].getShips()

  let player0ShipsSunk = $boards[0].getShips().reduce((total, currentShip) => {
    if (currentShip.isSunk()) total++
    return total;
  }, 0)

  let player1ShipsSunk = $boards[1].getShips().reduce((total, currentShip) => {
    if (currentShip.isSunk()) total++
    return total;
  }, 0)

</script>

<div class="scoreboard">

  <div class="playerCard {$playerUp === 0 ? 'active' : ''}">
    <div class="name">
      {$players[0].name}
    </div>
    <div class="details">
      ships active: {player0Ships.length - player0ShipsSunk}
      ships sunk: {player0ShipsSunk}
    </div>
  </div>

  <div class="playerCard {$playerUp === 1 ? 'active' : ''}">
    <div class="name">
      {$players[1].name}
    </div>
    <div class="details">
      ships active: {player1Ships.length - player1ShipsSunk}
      ships sunk: {player1ShipsSunk}
    </div>
  </div>

</div>

<style>
  .scoreboard{
    width: 100%;
    height: 4rem;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }

  .playerCard{
    background-color: var(--blueroot);
    box-shadow: 0 0 0 2px gray;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    color: white;
    box-shadow: 0 5px 15px -7px var(--grayshadow);
  }

  .active{
    transform: scale(1.5);
    box-shadow: 0px 0px 10px 5px var(--gold);
  }

</style>
