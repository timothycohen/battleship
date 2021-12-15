<script>
  import { createGameboard } from './scripts/create-gameboard'
  import ReadyBtn from './components/ReadyBtn.svelte'
  import { boards, view, players, boardSize, twoPlayerMode, playerUp, numberOfShips, quickStart } from './store'
  import { fade } from 'svelte/transition'

  // create a new gameboard for each player
  for (let i=0; i<$players.length; i++){
    $boards = [...$boards, createGameboard($boardSize, $numberOfShips)]
  }

  // ex: [ {name: 'Carrier', length: 5, placed: false, id: null, selected: true}, ... ]
  let shipSelections = $boards[0].getShipSelection()
  shipSelections.forEach((ship, i) => {
    ship.placed = false;
    ship.id = null;
    ship.selected = i === 0 ? true : false;
  })

  $: activeShipSelection = shipSelections.find(ship => ship.selected)

  // the ready button is only rendered when all ships are placed
  $: finished = shipSelections.reduce((prev, ship) => prev && ship.placed, true)

  // any time the board is updated, the ship menu selection updates the placed bool and ship id
  $: {
    shipSelections.forEach(ship => { ship.placed = false; ship.id = null })
    const shipsOnBoard = $boards[$playerUp].getShipsPlaced()
    shipsOnBoard.forEach(ship => {
      let option = shipSelections.find(selection => selection.name === ship.name)
      option.placed = true;
      option.id = ship.id
    })
    shipSelections = shipSelections
  }

  // the placeship function places the actively selected ship onto the board if it hasn't been placed
  // if there is no space, it shows a warning
  // it calls a function to select the next unplaced ship, if there is one
  let direction = 'hor';
  let warning = '';
  let warningPosY = 0;
  let warningPosX = 0;

  function placeShip(e) {
    if (activeShipSelection.placed) return;

    try {
      $boards[$playerUp].placeShip([+e.target.dataset.y, +e.target.dataset.x], activeShipSelection.name, direction)
      $boards = $boards;
      selectNextUnplacedShip();
    } catch (err) {
      warningPosY = e.target.getBoundingClientRect().top + window.scrollY
      warningPosX = e.target.getBoundingClientRect().left + window.scrollX
      warning = '⚠ No room!'
      setTimeout(() => { warning = '' }, 2000);
    }
  }

  // remove ship removes the ship from the board array. the reactive components handle the DOM and selection menu
  // if the board was finished, it makes the active selection the removed ship
  function removeShip(e) {
    const data = e.target.closest('.square').dataset
    const board = $boards[$playerUp]

    board.removeShip([+data.y, +data.x])
    $boards[$playerUp] = board

    shipSelections.forEach(option => {
      option.selected = false;
      if (option.name === data.name) option.selected = true;
    })
  }

  // placeShipsRandomly is not a pure function (uses math.random), if it fails after 200 times, it will return false
  // the reactive components handle the DOM and selection menu
  function placeAllShips() {
    let tempBoard = createGameboard($boardSize, $numberOfShips)
    tempBoard.placeShipsRandomly()
    $boards[$playerUp] = tempBoard;
  }

  // reset the board array. the reactive components handle the DOM and selection menu
  function clear() {
    let tempBoard = createGameboard($boardSize, $numberOfShips)
    $boards[0] = tempBoard;
  }

  // moves to the next view after all humans have placed their ships
  function finish() {
    if ($playerUp === 0 && $twoPlayerMode) {
      $playerUp = 1;
      shipSelections.forEach(ship => ship.selected = false)
      shipSelections[0].selected = true
      shipSelections = shipSelections
    } else if ($playerUp === 0 && !$twoPlayerMode) {
      $playerUp = 1;
      placeAllShips()
      $playerUp = 0;
      $view = 'board'
    } else {
      $playerUp = 0;
      $view = 'pass'
    }
  }

  function selectClickedShip(e) {
    let option = e.target.closest('.optionName')
    if (option.dataset.placed === 'true') return
    if (option.dataset.selected === 'true') return

    shipSelections.forEach(ship => {
      if (ship.name !== option.dataset.name) ship.selected = false
      else ship.selected = true;
    })
      shipSelections = shipSelections
  }

  function selectNextUnplacedShip() {
    let shipIndex = shipSelections.indexOf(shipSelections.find(ship => ship.selected))
    shipSelections.forEach(ship => ship.selected = false)
    for(let i=0; i<shipSelections.length; i++){
      shipIndex++
      if (shipIndex === shipSelections.length) shipIndex -= shipSelections.length
      if (!shipSelections[shipIndex].placed) return shipSelections[shipIndex].selected = true
    }
    shipSelections[shipIndex].selected = true
  }

  if ($quickStart) {
    placeAllShips()
    finish()
    if ($twoPlayerMode) {
      placeAllShips()
      finish()
    }
  }

</script>

<div in:fade class="fullScreen setup">

  <div class="shipSelectionContainer">
    <h1 class="instruction">{$players[$playerUp].name}, navigate your ships!</h1>

    <ul class="shipSelections">
      {#each shipSelections as { name, length, placed, selected } }
        <li class="optionName"
          data-name={name}
          data-placed={placed}
          class:selected
          class:placed
          on:click={selectClickedShip}
        >
          {name} <ul class:placed>{#each Array(length) as _, i}<li></li>{/each}</ul>
        </li>
      {/each}
    </ul>

    <div class="optionsContainer">
      <button class="directionBtn" on:click={() => direction = direction === 'ver' ? 'hor' : 'ver'}>
        {#if direction === 'hor'}
          <img class="icon--hor" src="./icons/hor.svg" alt="horizontal icon"/>
          Horizontal
        {:else}
          <img class="icon--ver" src="./icons/ver.svg" alt="vertical icon"/>
          Vertical
        {/if}

      </button>

      <button class="randomBtn" on:click={placeAllShips}>
        <img class="icon--random" src="./icons/random.svg" alt="random icon"/>
        Random
      </button>
      <button class="clearBtn" on:click={clear}>
        <img class="icon--clear" src="./icons/clear.svg" alt="clear icon"/>
        Clear All
        </button>
    </div>

    <div class="selectionExample">
      {#if finished}
        <ReadyBtn on:click={finish}/>
      {:else}
        {#each shipSelections as ship }
          {#if ship.selected}
            <div class="selectionExample--name">{ship.name}</div>
            <ul class="selectionExample--icons {direction === 'ver' ? 'vertical' : ''}">
              {#each Array(ship.length) as _, i}
                <li></li>
              {/each}
            </ul>
          {/if}
        {/each}
      {/if}
    </div>

  </div>

  <div class="gameboard__setup" style="--boardSize: {$boardSize}">
    <div class='warning' style="--top: {warningPosY}px; --left: {warningPosX}px;">{warning}</div>

    {#each $boards[$playerUp].getBoard() as row, y}
      {#each row as square, x}

        {#if square !== null && typeof square === "object"}
          <div on:click={removeShip} class="square" data-name={square.ship.name} data-y={y} data-x={x}><div class="ship"></div></div>
        {:else}
          <div on:click={placeShip} class="square open" data-y={y} data-x={x}></div>
        {/if}

      {/each}
    {/each}
  </div>

</div>

<style>

.setup{
  padding: 1rem 0;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}

/* #################### SHIP SELECTION #################### */

.shipSelectionContainer{
  border-radius: 5px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;
  min-height: 14rem;
  width: 90%;
  margin-bottom: 1rem;

  background-color: var(--blueroot);
  background-image: linear-gradient(315deg, var(--bluelighten50) 0%, var(--bluelighten70) 74%);
}

.instruction{
  width: 100%;
  text-align: center;
  font-size: 2.5rem;
  margin: .5rem 0 0 0;
  color: var(--bluedarken70);
}

.shipSelections{
  min-height: 12rem;
}

.shipSelections li{
  font-size: 1.5rem;
  list-style: none;
  cursor: pointer;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  color: var(--bluelighten90);
}

.shipSelections li:hover{
  box-shadow: 0 5px 5px -7px var(--gold);
}

.shipSelections > li > ul{
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}

.shipSelections > li > ul > li{
  width: 2rem;
  height: 2rem;
  background: url(../icons/ship.svg) no-repeat center;
  background-size: contain;
}

.shipSelections .selected{
  color: var(--gold);
  box-shadow: none;
}

.shipSelections .placed, .placed li{
  color: gray;
  opacity: 75%;
  cursor: default;
  font-weight: lighter;
}

.shipSelections, .optionsContainer, .selectionExample{
  background-color: var(--bluedarken40);
  min-width: 12rem;
  padding: 1rem;
  margin: .5rem;
  border-radius: 5px;
  box-shadow: 0 5px 15px -7px var(--bluedarken70);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}

.selectionExample{
  justify-content: center;
  min-height: 14rem;
  display: none;
}

.selectionExample--name{
  color: white;
  font-size: 1.5rem;
  font-weight: bolder;
  text-align: center;
}

.selectionExample--icons{
  display: flex;
  align-items: center;
  justify-content: center;
}

.selectionExample--icons.vertical{
  flex-direction: column;
}

.selectionExample--icons li{
  width: 2rem;
  height: 2rem;
  background: url(../icons/ship.svg) no-repeat center;
  background-size: contain;
  list-style: none;
}

/* #################### OPTION BUTTONS #################### */


.optionsContainer{
  min-width: 9rem;
}

.directionBtn,
.randomBtn,
.clearBtn{
  display: flex;
  align-items: center;
  justify-content: center;
  width: 5.75rem;
  height: 2.2rem;
  cursor: pointer;
  border-radius: 5px;
  background-color: var(--bluelighten60);
  color: var(--bluedarken40);
}

.directionBtn:hover,
.randomBtn:hover,
.clearBtn:hover{
  box-shadow: 0 5px 15px -7px var(--gold);
}

/* #################### BOARD #################### */
.warning{
  position: absolute;
  font-size: 1.5rem;
  text-align: center;
  color: var(--gold);
  top: var(--top);
  left: var(--left);
  background-color: var(--bluelighten90);
  opacity: .8;
  border-radius: 5px;
  box-shadow: 0 5px 15px -7px var(--grayshadow);
}

.gameboard__setup{
  width: 90vw;
  height: 40vh;
  display: grid;
  grid-template-columns: repeat(var(--boardSize), auto);
  grid-template-rows: repeat((--boardSize), auto);
}

.square{
  background: url(../icons/waves.svg) no-repeat center;
  background-size: cover;
  width: 100%;
  height: 100%;
  border: 1px solid gray;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(173, 196, 230);
}

.ship{
  width: 100%;
  height: 100%;
  background: url(../icons/ship.svg) no-repeat center;
  background-size: contain;
  display: flex;
  align-items: center;
  justify-content: center;
}

.square .ship{
  cursor: grab;
}

.open{
  cursor: pointer;
}

@media only screen and (min-width: 400px) and (min-height: 400px) {
  .selectionExample{
    display: flex;
  }
}

@media only screen and (min-width: 750px) and (min-height: 350px) {
  .selectionExample{
    display: flex;
  }
}

@media only screen and (min-width: 750px) and (min-height: 1000px) {
  .gameboard__setup{
    width: 80vw;
    height: 60vh;
  }
}

</style>
