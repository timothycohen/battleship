<script>
  import { players, view, playerUp} from './store'
  import Bomb from './components/Bomb.svelte'

  let ready = false;

  function goToBoard() {
    if (!ready) return
    if ($view !== 'pass') return
    $view = 'board'
  }

</script>

<div class="fullScreen passScreen noOverflow" on:click={goToBoard}>
  <h1>{ $players[$playerUp].name }, prepare for attack!</h1>
  <button on:click|stopPropagation={() => ready = true}>Ready!</button>
  {#if ready}<Bomb on:introend={goToBoard}/>{/if}
</div>

<style>
  .passScreen{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    overflow: hidden;
    max-height: 100vh;
    gap: 3rem;
  }

  h1{
    font-size: 5rem;
  }

  button{
    width: 80%;
    font-size: 1.5rem;
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

  .noOverflow{
    overflow: hidden;
    position: relative;
  }

</style>
