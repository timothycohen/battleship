<script>
  import { players, playerUp, boards } from './store'

  $: player0Ships = $boards[0].getShips()
  $: player1Ships = $boards[1].getShips()
  $: player0Active = player0Ships.length - player0ShipsSunk
  $: player1Active = player1Ships.length - player1ShipsSunk

  $: player0ShipsSunk = $boards[0].getShips().reduce((total, currentShip) => {
    if (currentShip.isSunk()) total++
    return total;
  }, 0)

  $: player1ShipsSunk = $boards[1].getShips().reduce((total, currentShip) => {
    if (currentShip.isSunk()) total++
    return total;
  }, 0)

  $boards[1].receiveAttack([3,0])
  $boards[1].receiveAttack([3,1])
  $boards[1].receiveAttack([3,2])
  $boards[1].receiveAttack([3,3])
  $boards[1].receiveAttack([3,4])
  $boards[1].receiveAttack([3,5])
  $boards[1].receiveAttack([3,6])
  $boards[1].receiveAttack([3,7])
  $boards[1].receiveAttack([3,8])

  $boards[1].receiveAttack([4,0])
  $boards[1].receiveAttack([4,1])
  $boards[1].receiveAttack([4,2])
  $boards[1].receiveAttack([4,3])
  $boards[1].receiveAttack([4,4])
  $boards[1].receiveAttack([4,5])
  $boards[1].receiveAttack([4,6])
  $boards[1].receiveAttack([4,7])
  $boards[1].receiveAttack([4,8])

  $boards[1].receiveAttack([5,0])
  $boards[1].receiveAttack([5,1])
  $boards[1].receiveAttack([5,2])
  $boards[1].receiveAttack([5,3])
  $boards[1].receiveAttack([5,4])
  $boards[1].receiveAttack([5,5])
  $boards[1].receiveAttack([5,6])
  $boards[1].receiveAttack([5,7])
  $boards[1].receiveAttack([5,8])

  $boards[1].receiveAttack([6,0])
  $boards[1].receiveAttack([6,1])
  $boards[1].receiveAttack([6,2])
  $boards[1].receiveAttack([6,3])
  $boards[1].receiveAttack([6,4])
  $boards[1].receiveAttack([6,5])
  $boards[1].receiveAttack([6,6])
  $boards[1].receiveAttack([6,7])
  $boards[1].receiveAttack([6,8])

  $boards[1].receiveAttack([7,0])
  $boards[1].receiveAttack([7,1])
  $boards[1].receiveAttack([7,2])
  $boards[1].receiveAttack([7,3])
  $boards[1].receiveAttack([7,4])
  $boards[1].receiveAttack([7,5])
  $boards[1].receiveAttack([7,6])
  $boards[1].receiveAttack([7,7])
  $boards[1].receiveAttack([7,8])


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
