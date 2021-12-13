<script>
  import { createPlayer } from './scripts/create-player'
  import { players, view, twoPlayerMode, quickStart } from './store'
  import { fade } from 'svelte/transition'
  import { onMount } from 'svelte'

  let bgLoaded = false

  onMount(() => bgLoaded = true)

  let player1Name;
  let player2Name;

  const startGame = () => {
    const playerNames = [player1Name, player2Name];
    let isHuman = [true, $twoPlayerMode];

    $players = playerNames.map((name, i) => createPlayer(name, isHuman[i]));
    $view = 'options'
  }

  function quickStartGame() {
    $quickStart = true;
    startGame();
  }

  // DEVTOOL : seed players
  player1Name = 'Jane';
  player2Name = 'Joe';
  // $twoPlayerMode = false;
  // quickStartGame()

</script>

<div class="bg"/>
{#if bgLoaded}
<div in:fade="{{ duration: 1000 }}" class="bgImg"></div>

<div class="startGame" in:fade="{{ delay: 300, duration: 700 }}">
  <div class="header">
    <h1>Battleship</h1>
    <img class="icon--cannon" src="/favicon.svg" alt="cannon icon"/>
  </div>
  <form id="players" on:submit|preventDefault={startGame}>
    <label for="player1">Player 1</label>
    <input id="player1" required type="text" bind:value={player1Name}/>

    <label for="player2">
      {#if $twoPlayerMode}Player 2{:else}Computer{/if}
    </label>
    <input id="player2" required type="text" bind:value={player2Name}/>

    <button class="playerCountBtn"
      on:click|preventDefault={() => $twoPlayerMode = !$twoPlayerMode}>
      {#if $twoPlayerMode}1 Player{:else}2 Player{/if}
    </button>

    <button on:click|preventDefault={quickStartGame} class="quickStartBtn">Quick Start</button>

    <button class="newGameBtn">New Game</button>

  </form>
</div>
{/if}

<style>

  .bg, .bgImg, .startGame{
    position: absolute;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    overflow: none;
  }

  .bg{
    background-color: var(--blueroot);
    z-index: -2;
  }

  .bgImg{
    background-image: url(/images/cover-image.jpg);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-position-x: center;
    filter: blur(4px);
    z-index: -1;
  }

  .startGame{
    z-index: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .header{
    margin-top: 20vh;
    margin-bottom: 5vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  h1{
    font-size: 4rem;
  }

  .icon--cannon{
    height: 4rem;
    width: 4rem;
    transform: scale(-1, 1);
  }

  form{
    padding: 1rem;
    border-radius: 5px;
    width: 90%;
    background-color: var(--blueroot);
    color: white;
    box-shadow: 0px 0px 10px 5px var(--gold);
    display: grid;
    grid-template-columns: repeat(12, auto);
    grid-template-rows: repeat(3, auto);
    gap: 1rem;
  }

  label{
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    font-size: 1rem;
    grid-column-start: 0;
    grid-column-end: 3;
  }

  input{
    padding: .3rem;
    font-size: 1.3rem;
    border-radius: 3px;
    grid-column-start: 4;
    grid-column-end: 13;
  }

  button{
    border: 1px solid var(--bluelighten90);
    background-color: var(--bluedarken70);
    color: white;
    border-radius: 4px;
    cursor: pointer;
  }

  button:hover{
    background-color: var(--bluedarken60);
  }

  .playerCountBtn{
    font-size: .75rem;
    padding: .25rem;
    grid-column-start: 0;
    grid-column-end: 3;
    align-self: end;
    height: 75%;
  }

  .quickStartBtn{
    padding: .5rem;
    font-size: 1rem;
    grid-column-start: 4;
    grid-column-end: 8;
    align-self: end;
    height: 75%;
  }

  .newGameBtn{
    padding: .5rem;
    font-size: 1.5rem;
    grid-column-start: 8;
    grid-column-end: 13;
  }

  @media only screen and (min-width: 750px) and (min-height: 500px) {
    h1{
      font-size: 8rem;
    }
    .icon--cannon{
      height: 8rem;
      width: 8rem;
      transform: scale(-1, 1);
    }
    .header{
      margin-top: 10vh;
    }
    form{
      gap: 2rem;
      padding: 2rem;
    }
    label{
      font-size: 2.5rem;
    }
    input{
      padding: .5rem;
      font-size: 2.5rem;
    }
    .playerCountBtn, .quickStartBtn, .newGameBtn{
      padding: 1rem;
    }
    .playerCountBtn{
      font-size: 2rem;
    }
    .quickStartBtn{
      font-size: 2rem;
    }
    .newGameBtn{
      font-size: 3rem;
    }
  }

</style>
