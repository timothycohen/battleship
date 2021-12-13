<script>
  import { players, playerUp, boards, boardSize } from './store'

  $: player0Ships = $boards[0].getShipsPlaced()
  $: player1Ships = $boards[1].getShipsPlaced()
  $: player0Active = player0Ships.length - player0ShipsSunk
  $: player1Active = player1Ships.length - player1ShipsSunk

  $: player0ShipsSunk = $boards[0].getShipsPlaced().reduce((total, currentShip) => {
    if (currentShip.isSunk()) total++
    return total;
  }, 0)

  $: player1ShipsSunk = $boards[1].getShipsPlaced().reduce((total, currentShip) => {
    if (currentShip.isSunk()) total++
    return total;
  }, 0)

  // DEVTOOL : seed attacks
  // for (let y = 0; y < boardSize - 2; y++) {
  //   for (let x = 0; x < boardSize; x++) {
  //     $boards[0].receiveAttack([y,x])
  //     $boards[1].receiveAttack([y,x])
  //   }
  // }

</script>

<div class="scoreboard">

  <div class="playerCard {$playerUp === 0 ? 'active' : ''}">
    <div class="name">
      {$players[0].name}
    </div>
    <div class="details">
      <span class="{player0Active === 1 ? 'danger' : ''}">Active: {player0Active}</span>
      Sunk: {player0ShipsSunk}
    </div>
  </div>

  <div class="playerCard {$playerUp === 1 ? 'active' : ''}">
    <div class="name">
      {$players[1].name}
    </div>
    <div class="details">
      <span class="{player1Active === 1 ? 'danger' : ''}">Active: {player1Active}</span>
      Sunk: {player1ShipsSunk}
    </div>
  </div>

</div>

<style>

  .scoreboard{
    width: 97%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-wrap: wrap;
    margin-top: 1rem;
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
    font-size: 1.2rem;
  }

  .active{
    font-size: 1.5rem;
    box-shadow: 0 5px 15px -7px var(--gold);
  }

  .danger{
    color: red;
  }

</style>
