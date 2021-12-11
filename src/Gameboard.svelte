<script>
  import { fade } from 'svelte/transition'
  import { view, playerUp, boards, players, boardSize } from './store'

  let opponent = $playerUp === 1 ? 0 : 1
  let gameboardPlayer = $boards[$playerUp].getBoard()
  let gameboardOpponent = $boards[opponent].getBoard()
  let playerShips = $boards[$playerUp].getShips()
  let opponentShips = $boards[opponent].getShips()

  let show = false;
  let animate = false;
  let attack = {}

  function checkShip(y, x, player) {
    if (player === opponent){
      let ship = opponentShips.find(s => s.id === gameboardOpponent[y][x].ship.id)
      return ship.inspectShip(gameboardOpponent[y][x].position)
    }

    let ship = playerShips.find(s => s.id === gameboardPlayer[y][x].ship.id)
    return ship.inspectShip(gameboardPlayer[y][x].position)
  }

  function isSunk(y, x, player) {
    let ship;
    if (player === opponent){
      ship = opponentShips.find(s => s.id === gameboardOpponent[y][x].ship.id)
    } else {
      ship = playerShips.find(s => s.id === gameboardPlayer[y][x].ship.id)
    }
    return ship.isSunk()
  }

  function prepareAttack(e){
    if (animate) return
    attack['boardY'] = +e.target.dataset.y;
    attack['boardX'] = +e.target.dataset.x;
    attack['hit'] = $boards[opponent].receiveAttack([attack.boardY, attack.boardX])

    let hitPosition = e.target.getBoundingClientRect();
    attack['height'] = hitPosition.bottom - hitPosition.top
    attack['width'] = hitPosition.right - hitPosition.left
    attack['top'] = hitPosition.top + window.scrollY
    attack['left'] = hitPosition.left + window.scrollX
    animate = true;
  }

  function sendAttack(){
    if ($boards[opponent].gameOver()) $view = 'over'
    else if (attack.hit && isSunk(attack.boardY, attack.boardX, opponent)) $view = 'sunk'
    else if (attack.hit) $view = 'hit'
    else $view = 'miss'
  }


</script>

<div class="gameboard fullScreen">

  <div class="player">
    <div class="header">
      <h1>Fire into enemy {$players[opponent].name}'s waters!</h1>
    </div>

    <div class="gameboard__opponent" style="--boardSize: {boardSize}" in:fade>
      {#each gameboardOpponent as row, y}
        {#each row as square, x}

          {#if square === 'miss'}
            <div class="square missed" data-y={y} data-x={x}>MISS</div>
          {:else if square !== null && typeof square === 'object' && checkShip(y, x, opponent) & !isSunk(y, x, opponent)}
            <div class="square hit" data-id={square.ship.id} date-shipName={square.ship.name} data-y={y} data-x={x}>HIT</div>

          {:else if square !== null && typeof square === 'object' && isSunk(y, x, opponent)}
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

  <div class="opponent">
    <div class="header">
      <h1>Friendly Waters</h1>
      <button class="revealShipBtn" on:click={ () => show = !show }>{show ? 'Conceal' : 'Reveal'} ships</button>
    </div>

    <div class="gameboard__player" style="--boardSize: {boardSize}" in:fade>
      {#each gameboardPlayer as row, y}
        {#each row as square, x}

          {#if square === 'miss'}
            <div class="square missed" data-y={y} data-x={x}>MISS</div>
          {:else if square !== null && typeof square === 'object' && checkShip(y, x, $playerUp) && !isSunk(y, x, $playerUp)}
            <div class="square hit" data-id={square.ship.id} date-shipName={square.ship.name} data-y={y} data-x={x}>HIT</div>
          {:else if square !== null && typeof square === 'object' && isSunk(y, x, $playerUp)}
            <div class="square hit" data-id={square.ship.id} date-shipName={square.ship.name} data-y={y} data-x={x}>
              <div class="ship">SUNK</div>
            </div>
          {:else if square !== null && typeof square === "object" && !checkShip(y, x, $playerUp)}
            <div class="square">
              {#if show}<div class="ship"></div>{/if}
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
    class="icon--bomb" src="/icons/bomb.svg" alt="bomb icon"
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

.missed, .hit, .ship{
  font-weight: bolder;
}

.missed{
  background: url(/icons/splash.svg) no-repeat center;
  background-size: contain;
  background-color: rgb(186, 194, 206);
}

.hit{
  background: url(/icons/explosion.svg) no-repeat center;
  background-size: contain;
  background-color: rgb(230, 173, 173);
}

.ship{
  width: 100%;
  height: 100%;
  background: url(/icons/ship.svg) no-repeat center;
  background-size: contain;
  display: flex;
  align-items: center;
  justify-content: center;
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

</style>
