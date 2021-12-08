<script>
  import { fade } from 'svelte/transition'
  import { view, playerUp, boards } from './store'

  let opponent = $playerUp === 1 ? 0 : 1
  let gameboardPlayer = $boards[$playerUp].getBoard()
  let gameboardOpponent = $boards[opponent].getBoard()
  let playerShips = $boards[$playerUp].getShips()
  let opponentShips = $boards[opponent].getShips()

  function checkShip(y, x, player) {
    if (player === opponent){
      let ship = opponentShips.find(s => s.id === gameboardOpponent[y][x].id)
      return ship.inspectShip(gameboardOpponent[y][x].position)
    }

    let ship = playerShips.find(s => s.id === gameboardPlayer[y][x].id)
    return ship.inspectShip(gameboardPlayer[y][x].position)
  }

  function isSunk(y, x, player) {
    let ship;
    if (player === opponent){
      ship = opponentShips.find(s => s.id === gameboardOpponent[y][x].id)
    } else {
      ship = playerShips.find(s => s.id === gameboardPlayer[y][x].id)
    }
    return ship.isSunk()
  }

  function sendAttack(e){
    let hit = $boards[opponent].receiveAttack([+e.target.dataset.y, +e.target.dataset.x])
    if ($boards[opponent].gameOver()) $view = 'over'
    else if (hit && isSunk(+e.target.dataset.y, +e.target.dataset.x, opponent)) $view = 'sunk'
    else if (hit) $view = 'hit'
    else $view = 'miss'
  }

</script>

<h1>Opponent</h1>
<div class="gameboard__opponent" in:fade>
  {#each gameboardOpponent as row, y}
    {#each row as square, x}

      {#if square === 'miss'}
        <div class="square missed" data-y={y} data-x={x}>missed</div>
      {:else if square !== null && typeof square === 'object' && checkShip(y, x, opponent) & !isSunk(y, x, opponent)}
        <div class="square hit" data-y={y} data-x={x}>hit!</div>
      {:else if square !== null && typeof square === 'object' && isSunk(y, x, opponent)}
        <div class="square hit" data-y={y} data-x={x}>sunk!</div>
      {:else}
        <div class="square open" data-y={y} data-x={x} on:click={sendAttack}></div>
      {/if}

    {/each}
  {/each}
</div>

<h1>My Ships</h1>
<div class="gameboard__player" in:fade>
  {#each gameboardPlayer as row, y}
    {#each row as square, x}

    {#if square === 'miss'}
      <div class="square missed" data-y={y} data-x={x}>missed</div>
    {:else if square !== null && typeof square === 'object' && checkShip(y, x, $playerUp) && !isSunk(y, x, $playerUp)}
      <div class="square hit" data-y={y} data-x={x}>damaged!</div>
    {:else if square !== null && typeof square === 'object' && isSunk(y, x, $playerUp)}
      <div class="square hit" data-y={y} data-x={x}>sunk!</div>
    {:else if square !== null && typeof square === "object" && !checkShip(y, x, $playerUp)}
      <div class="square ship">my ship</div>
    {:else}
      <div class="square" data-y={y} data-x={x}></div>
    {/if}

    {/each}
  {/each}
</div>

<style>

.gameboard__opponent, .gameboard__player{
  user-select: none;
  caret-color: transparent;
  display: grid;
  grid-template-columns: repeat(10, auto);
  grid-template-rows: repeat(10, auto);
}

.square{
  background: url(/icons/waves.svg) no-repeat center;
  background-size: cover;
  min-width: 2rem;
  min-height: 2rem;
  border: 1px solid gray;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(173, 196, 230);
}

.missed{
  background-color: rgb(186, 194, 206);
}

.hit{
  background-color: rgb(230, 173, 173);
}

.open{
  cursor: pointer;
}

</style>
