<script>
  import { players, view, playerUp } from './store'
  $playerUp = $playerUp === 0 ? 1: 0;

</script>

<h1>
  { $players[$playerUp].name } is up. Pass the screen!
  <button on:click={() => $view='board'}>Ready!!!</button>
</h1>

<style>
  button{
    cursor: pointer;
  }
</style>