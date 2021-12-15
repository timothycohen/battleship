<script>
  import { fade } from 'svelte/transition'
  import { view, playerUp, boards, players, boardSize, lastAttackLocation, twoPlayerMode, audio } from './store'

  let opponent = $playerUp === 1 ? 0 : 1
  let showShips = false;
  if (!$twoPlayerMode) showShips = true;
  let animate = false;
  let attack = {}

  let attackedY;
  let attackedX;
  if ($lastAttackLocation.length) {
    attackedY = $lastAttackLocation[0]
    attackedX = $lastAttackLocation[1]
  }

  function prepareAttack(e){
    if (animate) return
    attack['boardY'] = +e.target.dataset.y;
    attack['boardX'] = +e.target.dataset.x;
    $boards[opponent].receiveAttack([attack.boardY, attack.boardX])
    attack['hit'] = $boards[opponent].squareStatus([attack.boardY, attack.boardX])
    $lastAttackLocation = [attack.boardY, attack.boardX]

    let hitPosition = e.target.getBoundingClientRect();
    attack['height'] = hitPosition.bottom - hitPosition.top
    attack['width'] = hitPosition.right - hitPosition.left
    attack['top'] = hitPosition.top + window.scrollY
    attack['left'] = hitPosition.left + window.scrollX
    $audio && new Audio('./audio/attack.wav').play();
    animate = true;
  }

  function sendAttack(){
    if ($boards[opponent].gameOver()) $view = 'over'
    else if (attack.hit  === 'sunk') $view = 'sunk'
    else if (attack.hit  === 'hit') $view = 'hit'
    else $view = 'miss'
  }

</script>

<div class="gameboard">

  <div class="opponent">
    <div class="header">
      <h1>Fire into enemy {$players[opponent].name}'s waters!</h1>
    </div>

    <div class="gameboard__opponent" style="--boardSize: {$boardSize}">
      {#each $boards[opponent].getBoard() as row, y}
        {#each row as square, x}

          {#if square === 'miss'}
            <div class="square missed" data-y={y} data-x={x}>MISS</div>
          {:else if $boards[opponent].squareStatus([y,x]) === 'hit'}
            <div class="square hit" data-id={square.ship.id} date-shipName={square.ship.name} data-y={y} data-x={x}>HIT</div>
          {:else if $boards[opponent].squareStatus([y,x]) === 'sunk'}
            <div class="square hit" data-id={square.ship.id} date-shipName={square.ship.name} data-y={y} data-x={x}>
              <div class="ship">SUNK</div>
            </div>
          {:else}
            <div class="square open" data-y={y} data-x={x} on:click={prepareAttack}></div>
          {/if}

        {/each}
      {/each}
    </div>
  </div>

  <div class="player">
    <div class="header">
      <h1>Friendly Waters</h1>
      {#if $twoPlayerMode}
        <button class="revealShipBtn" on:click={ () => showShips = !showShips }>{showShips ? 'Conceal' : 'Reveal'} ships</button>
      {/if}
    </div>

    <div class="gameboard__player" style="--boardSize: {$boardSize}">
      {#each $boards[$playerUp].getBoard() as row, y}
        {#each row as square, x}
          {#if square === 'miss'}
            <div class="square missed {attackedY === y ? (attackedX === x ? 'lastAttack' : '') : ''}" data-y={y} data-x={x}>
              MISS
            </div>
          {:else if $boards[$playerUp].squareStatus([y,x]) === 'hit'}
            <div class="square hit {attackedY === y ? (attackedX === x ? 'lastAttack' : '') : ''}" data-id={square.ship.id} date-shipName={square.ship.name} data-y={y} data-x={x}>
              HIT
            </div>
          {:else if $boards[$playerUp].squareStatus([y,x]) === 'sunk'}
            <div class="square hit {attackedY === y ? (attackedX === x ? 'lastAttack' : '') : ''}" data-id={square.ship.id} date-shipName={square.ship.name} data-y={y} data-x={x}>
              <div class="ship">SUNK</div>
            </div>
          {:else if $boards[$playerUp].squareStatus([y,x]) === 'ship'}
            <div class="square {attackedY === y ? (attackedX === x ? 'lastAttack' : '') : ''}">
              {#if showShips}<div class="ship"></div>{/if}
            </div>
          {:else}
            <div class="square" data-y={y} data-x={x}></div>
          {/if}

        {/each}
      {/each}
    </div>
  </div>

  {#if animate}
  <img in:fade={{duration: 1000, easing: (t) => t}}
    on:introend="{sendAttack}"
    class="icon--bomb" src="./icons/bomb.svg" alt="bomb icon"
    style="--height: {attack.height}px; --width: {attack.width}px; --top: {attack.top}px; --left: {attack.left}px; "
  />
  {/if}

</div>

<style>

.gameboard{
  padding: 1rem;
  color: var(--bluelighten90);
}

.player, .opponent{
  padding: 1rem 0;
  width: 100%;
}

.header{
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 2rem;
}

.revealShipBtn{
  margin-bottom: .5rem;
}

.gameboard__opponent, .gameboard__player{
  display: grid;
  grid-template-columns: repeat(var(--boardSize), auto);
  grid-template-rows: repeat((--boardSize), auto);
}

.square{
  background: url(../icons/waves.svg) no-repeat center;
  background-size: cover;
  min-width: 2rem;
  min-height: 2rem;
  border: 1px solid gray;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(173, 196, 230);
}

.missed, .hit, .ship{
  font-weight: bolder;
}

.missed{
  background: url(../icons/splash.svg) no-repeat center;
  background-size: contain;
  background-color: rgb(186, 194, 206);
}

.hit{
  background: url(../icons/explosion.svg) no-repeat center;
  background-color: rgb(230, 173, 173);
}

.ship{
  background: url(../icons/ship.svg) no-repeat center;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-size: contain;
}

.open, .icon--bomb{
  cursor: crosshair;
}

.icon--bomb{
  position: absolute;
  height: var(--height);
  width: var(--width);
  top: var(--top);
  left: var(--left);
}

button{
  display: flex;
  align-items: center;
  justify-content: center;
  padding: .5rem 1rem;
  cursor: pointer;
  border-radius: 5px;
  background-color: var(--bluelighten60);
  color: var(--bluedarken40);
  font-size: 1.5rem;
}

button:hover{
  background-color: var(--bluelighten50);
}

.lastAttack{
  animation: lastAttack 5s forwards;
  width: 100%;
  height: 100%;
}

@keyframes lastAttack{
  0%, 40%, 100% { box-shadow: none }
  20%, 60%, 80% { box-shadow: 0 0 5px 5px red inset; }
}

@media only screen and (min-width: 750px) and (min-height: 750px) {
  .gameboard__opponent, .gameboard__player{
    height: 40vh;
  }
}

</style>
