<script>
  import { createGameboard } from './scripts/create-gameboard'
  import { boards, view, players } from './store'
  import { fade } from 'svelte/transition'

  // placeShipsRandomly is not a pure function (uses math.random), if it fails after 200 times, it will return false
  $players.forEach(player => {
    $boards = [...$boards, createGameboard()]
  })

  $: finished = shipSelection.reduce((prev, ship) => prev && ship.placed, true)

  let currentPlayer = 0;

  let shipSelection = [
    {name: 'Carrier', length: 5, placed: false, id: null},
    {name: 'Battleship', length: 4, placed: false, id: null},
    {name: 'Cruiser', length: 3, placed: false, id: null},
    {name: 'Submarine', length: 3, placed: false, id: null},
    {name: 'Destroyer', length: 2, placed: false, id: null},
  ];

  $: {
    shipSelection.forEach(ship => { ship.placed = false; ship.id = null })
    const shipsOnBoard = $boards[currentPlayer].getShips()
    shipsOnBoard.forEach(ship => {
      let option = shipSelection.find(selection => selection.name === ship.name)
      option.placed = true;
      option.id = ship.id
    })
    shipSelection = shipSelection
  }

  let activeSelection = 0;
  let direction = 'hor';
  let warning = '';

  function placeShip(e) {
    if (shipSelection[activeSelection].placed === true) return;

    try {
      $boards[currentPlayer].placeShip([+e.target.dataset.y, +e.target.dataset.x], shipSelection[activeSelection].name, direction)
      $boards = $boards;
      activeSelection++
      if (activeSelection === shipSelection.length) activeSelection -= shipSelection.length
    } catch (err) {
      warning = 'Not enough room!'
      setTimeout(() => { warning = '' }, 2000);
    }
  }

  function removeShip(e) {
    const data = e.target.closest('.square').dataset
    let board = $boards[currentPlayer]
    board.removeShip([+data.y, +data.x])
    $boards[currentPlayer] = board
  }

  function placeAllShips() {
    let tempBoard = createGameboard()
    tempBoard.placeShipsRandomly()

    // update the id of the ship in ship selection
    $boards[currentPlayer] = tempBoard;
  }

  function clear() {
    let tempBoard = createGameboard()
    $boards[0] = tempBoard;
  }

  function finish() {
    if (currentPlayer === 0 && $players[1].human) {
      currentPlayer = 1;
    } else if (currentPlayer === 0 && !$players[1].human) {
      currentPlayer = 1;
      placeAllShips()
      $view = 'pass'
    } else {
      $view = 'pass'
    }
  }

</script>

<div class="fullScreen setup">

  <div class='warning'>{warning}</div>

  <button on:click={placeAllShips}>Place Randomly!</button>

  <ul class="shipSelection">
    {#each shipSelection as { name, length, placed }, i}
      <li
        class="{i === activeSelection ? "active" : ""}"
        class:placed
        on:click={() => activeSelection = i}
      >
        {name} length: {length}
      </li>
    {/each}
  </ul>

  <button on:click={() => direction = direction === 'ver' ? 'hor' : 'ver'}>
    {#if direction === 'ver'}Horizontal{:else}Vertical{/if}
  </button>

  <div class="gameboard__setup" in:fade>
    {#each $boards[currentPlayer].getBoard() as row, y}
      {#each row as square, x}

        {#if square !== null && typeof square === "object"}
          <div on:click={removeShip} class="square" data-id={square.ship.id} date-shipName={square.ship.name} data-y={y} data-x={x}><div class="ship"></div></div>
        {:else}
          <div on:click={placeShip} class="square open" data-y={y} data-x={x}></div>
        {/if}

      {/each}
    {/each}
  </div>

  <button disabled={!finished} on:click={finish}>ready to play</button>
  <button on:click={clear}>clear ships</button>

</div>

<style>

.setup{
  padding: 1rem;
}

.gameboard__setup{
  display: grid;
  grid-template-columns: repeat(10, auto);
  grid-template-rows: repeat(10, auto);
  border: 1rem solid var(--gold);
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

.ship{
  font-weight: bolder;
  width: 100%;
  height: 100%;
  background: url(/icons/ship.svg) no-repeat center;
  background-size: contain;
  display: flex;
  align-items: center;
  justify-content: center;
}

.open{
  cursor: pointer;
}

li{
  list-style: none;
  cursor: pointer;
}

.active{
  color: green;
}

.placed{
  color: gray;
}

button:disabled{
  color: gray;
}
</style>
