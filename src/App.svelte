<script>
  import StartGameForm from "./StartGameForm.svelte";
  import Setup from "./Setup.svelte";
  import Scoreboard from "./Scoreboard.svelte";
  import Gameboard from "./Gameboard.svelte";
  import PassScreen from "./PassScreen.svelte";
  import ComputerAttack from "./ComputerAttack.svelte";
  import AttackFeedback from "./components/AttackViews/AttackFeedback.svelte";
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
  {:else if $view === 'computerAttack'}
    <ComputerAttack />
  {:else if $view === 'sunk'}
    <AttackFeedback type='sunk'/>
  {:else if $view === 'miss'}
    <AttackFeedback type='miss'/>
  {:else if $view === 'hit'}
    <AttackFeedback type='hit'/>
  {:else if $view === 'over'}
    <AttackFeedback type='over'/>
  {/if}
</main>

<style>
</style>
