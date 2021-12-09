<script>
  import StartGameForm from "./StartGameForm.svelte";
  import Setup from "./Setup.svelte";
  import Scoreboard from "./Scoreboard.svelte";
  import Gameboard from "./Gameboard.svelte";
  import PassScreen from "./PassScreen.svelte";
  import Sunk from "./Sunk.svelte";
  import Miss from "./Miss.svelte";
  import Hit from "./Hit.svelte";
  import GameOver from "./GameOver.svelte";
  import { view } from './store'

</script>

<main>
  {#if $view === 'new'}
    <StartGameForm />
  {:else if $view === 'setup'}
    <Setup />
  {:else if $view === 'board'}
    <Scoreboard />
    <Gameboard />
  {:else if $view === 'pass'}
    <PassScreen />
  {:else if $view === 'sunk'}
    <Sunk />
  {:else if $view === 'miss'}
    <Miss />
  {:else if $view === 'hit'}
    <Hit />
  {:else if $view === 'over'}
    <GameOver />
  {/if}
</main>

<style>
  main{
    background: #e6eff8;
  }
</style>
