<script>
  import { view } from '../../store'
</script>

<button on:click={() => $view = 'new'}>New Game</button>

<style>
  button{
    cursor: pointer;
  }
</style>
