<script>
  import { view, twoPlayerMode, playerUp } from '../../store'
  import Hit from './Hit.svelte'
  import Miss from './Miss.svelte'
  import Sunk from './Sunk.svelte'
  import GameOver from './GameOver.svelte'

  export let type = 'hit';

  function delayAndPass() {
    setTimeout(() => {
      if (!['hit', 'miss', 'sunk', 'over'].includes($view)) return
      pass()
    }, 2000);
  }

  function pass() {
    $playerUp = $playerUp === 0 ? 1 : 0;
    if ($twoPlayerMode) $view = 'pass'
    else if ($playerUp === 0) $view = 'board'
    else $view = 'computerAttack'
  }

</script>

{#if type==="over"}
  <GameOver/>
{:else}
  <div class="fullScreen noOverflow" on:click={pass}>
    {#if type === 'hit'}
      <h1>Hit!!!</h1>
      <Hit on:mounted={delayAndPass}/>
    {/if}

    {#if type === 'miss'}
      <h1>Miss!!!</h1>
      <Miss on:mounted={delayAndPass}/>
    {/if}

    {#if type === 'sunk'}
      <h1>SUNK!!!</h1>
      <Sunk on:mounted={delayAndPass}/>
    {/if}
  </div>
{/if}

<style>

h1{
  padding: 2rem 2rem 0 0;
  font-size: 5rem;
  width: 100%;
  text-align: right;
  z-index: 5;
  color: var(--bluedarken70);
  position: absolute;
}

.noOverflow{
  overflow: hidden;
  position: relative;
}

</style>
