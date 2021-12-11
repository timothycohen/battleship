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
      Active: {player0Ships.length - player0ShipsSunk}
      Sunk: {player0ShipsSunk}
    </div>
  </div>

  <div class="playerCard {$playerUp === 1 ? 'active' : ''}">
    <div class="name">
      {$players[1].name}
    </div>
    <div class="details">
      active: {player1Ships.length - player1ShipsSunk}
      sunk: {player1ShipsSunk}
    </div>
  </div>

</div>

<style>

  .scoreboard{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-wrap: wrap;
    margin: 1rem;
    gap: 2rem;
  }

  .playerCard{
    background-color: var(--blueroot);
    background-image: linear-gradient(315deg, var(--bluelighten50) 0%, var(--bluelighten70) 74%);
    box-shadow: 0 0 0 2px gray;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    color: var(--bluedarken70);
    box-shadow: 0 5px 15px -7px var(--grayshadow);
  }

  .active{
    transform: scale(1.3);
    box-shadow: 0 5px 15px -7px var(--gold);
  }

</style>
