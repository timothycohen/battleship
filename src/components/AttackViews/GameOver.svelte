<script>
  import { boards, playerUp, lastAttackLocation, view, players } from '../../store'
  import { onMount } from 'svelte'
  import { fade } from 'svelte/transition'

  let bgLoaded = false
  onMount(() => bgLoaded = true)

  function newGame () {
    $boards = []
    $playerUp = 0
    $lastAttackLocation = []
    $view = 'new'
  }

</script>

{#if bgLoaded}
  <div in:fade="{{ duration: 1000 }}" class="bgImg"></div>
{/if}

<div class="fullScreen over">
  {#if $players[$playerUp].human }
    <h1 class="win">{$players[$playerUp].name} has won the battle!</h1>
    <h1 class="congrats">Congratulations!</h1>
  {:else}
    <h1 class="lose">You've lost your ships Admiral!</h1>
  {/if}

  <button on:click={newGame}>Next Battle</button>

</div>

<style>

button {
  cursor: pointer;
  box-shadow: 0 0 0 0 var(--red);
  animation: pulse 2s infinite;
  padding: 1rem;
  font-size: 2.5rem;
  color: var(--red);
  border-radius: 100%;
}


@keyframes pulse {
  0% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 var(--red);
  }

  70% {
    transform: scale(1);
    box-shadow: 0 0 0 10px var(--red);
  }

  100% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 var(--red);
  }
}

  .over{
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
  }

  .win, .lose, .congrats{
    padding: 1.5rem;
    font-size: 3rem;
    width: 100%;
    text-align: center;
    z-index: 5;
    color: var(--bluedarken70);
    text-shadow: 3px 3px #899097;
    display: inline-block;
  }

  .congrats{
    font-size: 2.5rem;
  }

  .bgImg{
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    min-height: 100vh;
    background-image: url(/images/cover-image.jpg);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-position-x: center;
    filter: blur(4px);
    z-index: -1;
  }

  @media only screen and (min-width: 400px) and (min-height: 450px) {
    .win, .lose {
      font-size: 5rem;
    }
    .congrats{
      font-size: 4rem;
    }
  }

  @media only screen and (min-width: 750px) {
    .win, .lose {
      font-size: 5rem;
    }
    .congrats{
      font-size: 4rem;
    }
  }

</style>
