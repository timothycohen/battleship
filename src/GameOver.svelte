<script>
  import { view } from './store'

</script>

<h1>
  Game Over!!!
</h1>

<button on:click={() => $view = 'new'}>New Game</button>

<style>
  button{
    cursor: pointer;
  }
</style>
