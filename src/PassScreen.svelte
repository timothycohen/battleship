<script>
  import { players, view, playerUp } from './store'
  import { fly } from 'svelte/transition'

  if (!$players[1].human) $view='board'

  $playerUp = $playerUp === 0 ? 1: 0;
  let ready = false;

  // calculate bomb size and a random flight trajectory
  let bombSize = .5*window.innerWidth
  let randX = (() => window.innerWidth*Math.random(window.innerWidth) * (Math.random() < .5 ? 1 : -1))()
  let randY = (() => window.innerWidth*Math.random(window.innerWidth) * (Math.random() < .5 ? 1 : -1))()

</script>

<div class="fullScreen passScreen">
  <h1>{ $players[$playerUp].name }, prepare for attack!</h1>
  <button on:click={ () => ready = true }>Ready!</button>
</div>

{#if ready}
<img in:fly={{duration: 700, x:randX, y:randY, easing: (t) => t}}
  on:introend="{() => $view='board'}"
  class="icon--bomb" src="/icons/bomb.svg" alt="bomb icon"
  style="height: {bombSize}px; width: {bombSize}px;"
/>
{/if}

<style>
  .passScreen{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    overflow: hidden;
    max-height: 100vh;
  }

  button{
    width: 80%;
    font-size: .75rem;
    height: 3rem;
    border: 1px solid var(--bluelighten90);
    background-color: var(--bluedarken70);
    color: white;
    border-radius: 4px;
    cursor: pointer;
  }

  button:hover{
    background-color: var(--bluedarken60);
    border: 1px solid white;
  }

  @media only screen and (min-width: 600px) {
    h1{
      font-size: 5rem;
    }
    button{
      font-size: 1.5rem;
    }
  }

  img{
    position: absolute;
    left: 0;
    top: 0;
  }

</style>
