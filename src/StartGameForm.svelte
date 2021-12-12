<script>
  import { createPlayer } from './scripts/create-player'
  import { players, view, twoPlayerMode } from './store'
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
    $view = 'setup'
  }

  // DEVTOOL : seed players
  player1Name = 'Jane';
  player2Name = 'Joe';
  $twoPlayerMode = false
  startGame();

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
    min-height: 100vh;
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
  }

  .header{
    padding: 3rem 1rem;
    display: flex;
    justify-content: center;
    align-items: flex-end;
  }

  h1{
    vertical-align: bottom;
    height: 100%;
    font-size: 2.5rem;
  }

  .icon--cannon{
    height: 2.5rem;
    width: 2.5rem;
    transform: scale(-1, 1);
  }

  form{
    text-align: center;
    padding: 2rem 1rem;
    border-radius: 5px;
    margin: auto;
    width: 90%;
    background-color: var(--blueroot);
    color: white;
    gap: 3rem 1rem;
    display: grid;
    grid-template-columns: auto auto;
    grid-template-rows: auto auto auto;
    box-shadow: 0px 0px 10px 5px var(--gold);
  }

  label{
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
  }

  input{
    padding: .3rem;
    font-size: .75rem;
    border-radius: 3px;
  }

  .newGameBtn{
    font-size: 1rem;
    height: 3rem;
    grid-column-start: 2;
    grid-column-end: 3;
    width: 100%;
    margin: auto;
  }

  .playerCountBtn{
    justify-self: center;
    align-self: flex-end;
    font-size: .75rem;
    height: 2rem;
    width: 70%;
    grid-column-start: 1;
    grid-column-end: 2;
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

  @media only screen and (min-width: 600px) {
    .playerCountBtn{
      font-size: .8rem;
      width: 60%;
    }

    .header{
      padding: 1rem;
    }
    form{
      width: 75%;
    }
    h1{
      font-size: 5rem;
    }
    .icon--cannon{
      height: 5rem;
      width: 5rem;
    }
    label{
      font-size: 2rem;
    }
    input{
      font-size: 1.5rem;
    }
    .newGameBtn{
      font-size: 1.5rem;
    }
  }

</style>
