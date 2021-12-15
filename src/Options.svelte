<script>
  import { createGameboard } from './scripts/create-gameboard'
  import ReadyBtn from './components/ReadyBtn.svelte'
  import { view, boardSize, numberOfShips, quickStart } from './store'
  import { fade } from 'svelte/transition'

  $: exampleBoard = createGameboard($boardSize, $numberOfShips).getBoard()
  $: shipSelections = createGameboard($boardSize, $numberOfShips).getShipSelection()

  const MAXSHIPS = 5
  const MINSHIPS = 3
  const MAXBOARD = 10
  const MINBOARD = 6
  const REGULARSHIPS = 5
  const REGULARBOARD = 8
  const RAPIDSHIPS = 3
  const RAPIDBOARD = 6

  const moreShips = () => $numberOfShips = $numberOfShips > MAXSHIPS - 1 ? MAXSHIPS : $numberOfShips + 1
  const fewerShips = () => $numberOfShips = $numberOfShips < MINSHIPS + 1 ? MINSHIPS : $numberOfShips - 1
  const biggerBoard = () => $boardSize = $boardSize > MAXBOARD - 1 ? MAXBOARD : $boardSize + 1
  const smallerBoard = () => $boardSize = $boardSize < MINBOARD + 1 ? MINBOARD : $boardSize - 1
  const rapid = () =>  { $boardSize = RAPIDBOARD; $numberOfShips = RAPIDSHIPS; }
  const regular = () =>  { $boardSize = REGULARBOARD; $numberOfShips = REGULARSHIPS; }

  if ($quickStart) {
    $boardSize = REGULARBOARD; $numberOfShips = REGULARSHIPS;
    $view = 'setup'
  }

</script>

<div in:fade class="fullScreen options">

  <div class="shipSelectionContainer">
    <h1 class="instruction">Prepare your ships and territory!</h1>
    <ul class="shipSelections">
      {#each shipSelections as { name, length } }
        <li class="optionName">
          {name} <ul>{#each Array(length) as _, i}<li></li>{/each}</ul>
        </li>
      {/each}
    </ul>

    <div class="readyContainer">
      <ReadyBtn on:click={() => $view = 'setup'}/>
    </div>

    <div class="optionsContainer">
      <div class="ships">
        <button on:click={fewerShips} disabled={$numberOfShips === MINSHIPS}>-</button>
        <span>Ships</span>
        <button on:click={moreShips} disabled={$numberOfShips === MAXSHIPS}>+</button>
      </div>
      <div class="mode">
        <button on:click={rapid} disabled={$numberOfShips === RAPIDSHIPS && $boardSize === RAPIDBOARD}>Rapid</button>
        <button on:click={regular} disabled={$numberOfShips === REGULARSHIPS && $boardSize === REGULARBOARD}>Regular</button>
      </div>
      <div class="waters">
        <button on:click={smallerBoard} disabled={$boardSize === MINBOARD}>-</button>
        <span>Waters</span>
        <button on:click={biggerBoard} disabled={$boardSize === MAXBOARD}>+</button>
      </div>
    </div>

  </div>

  <div class="gameboard__options" style="--boardSize: {$boardSize}">
    <div class="overlayBtn">
      <ReadyBtn on:click={() => $view = 'setup'}/>
    </div>

    {#each exampleBoard as row}
      {#each row as square}
        <div class="square"></div>
      {/each}
    {/each}
  </div>

</div>

<style>

.options{
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
  background-color: var(--bluedarken40);
  height: 12rem;
  width: 17rem;
  padding: 1rem;
  margin: .5rem;
  border-radius: 5px;
  box-shadow: 0 5px 15px -7px var(--bluedarken70);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}

.shipSelections li{
  font-size: 1.5rem;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  color: var(--bluelighten90);
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

/* #################### BUTTONS #################### */

.optionsContainer, .readyContainer {
  background-color: var(--bluedarken40);
  width: 13rem;
  height: 12rem;
  padding: 1rem;
  margin: .5rem;
  border-radius: 5px;
  box-shadow: 0 5px 15px -7px var(--bluedarken70);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}

.readyContainer{
  min-height: 0rem;
  min-width: 0rem;
  padding: 1.5rem;
  display: none;
}

.ships, .waters, .mode{
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.ships > span, .waters > span{
  color: var(--bluelighten90);
}

button{
  padding: .5rem 1rem;
  cursor: pointer;
  border-radius: 5px;
  background-color: var(--bluelighten60);
  color: var(--bluedarken40);
}

button:disabled{
  background-color: gray;
}

.mode > button{
  padding: .5rem .5rem;
  width: 50%;
}

.overlayBtn{
  width: 90%;
  padding-top: 1rem;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* #################### BOARD #################### */

.gameboard__options{
  display: grid;
  grid-template-columns: repeat(var(--boardSize), auto);
  grid-template-rows: repeat((--boardSize), auto);
  width: 90vw;
  height: 40vh;
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

/* #################### BREAKPOINTS #################### */

@media only screen and (min-width: 835px) {
  .readyContainer{
    display: flex;
  }
  .overlayBtn{
    display: none;
  }
}

@media only screen and (min-width: 750px) and (min-height: 1000px) {
  .gameboard__options{
    height: 60vh;
  }
}

</style>
