<script>
  import { view } from './store'

</script>

<h1>
  Hit!!!
</h1>

<button on:click={() => $view = 'pass'}>Finish Turn</button>

<style>
  button{
    cursor: pointer;
  }
</style>
