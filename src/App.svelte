<script>
  import StartGameForm from "./StartGameForm.svelte";
  import Options from "./Options.svelte";
  import Setup from "./Setup.svelte";
  import Scoreboard from "./components/Scoreboard.svelte";
  import Gameboard from "./Gameboard.svelte";
  import Audio from './components/AudioToggle.svelte'
  import PassScreen from "./PassScreen.svelte";
  import ComputerAttack from "./ComputerAttack.svelte";
  import AttackFeedback from "./components/AttackViews/AttackFeedback.svelte";
  import { view } from './store'

</script>

<main>


  {#if $view === 'new'}
    <Audio />
    <StartGameForm />
  {:else if $view === 'options'}
    <Options />
  {:else if $view === 'setup'}
    <Setup />
  {:else if $view === 'board'}
    <Audio />
    <Scoreboard />
    <Gameboard />
  {:else if $view === 'pass'}
    <PassScreen />
  {:else if $view === 'computerAttack'}
    <ComputerAttack />
  {:else if $view === 'sunk' || $view === 'miss' || $view === 'hit' || $view === 'over'}
    <AttackFeedback type={$view}/>
  {/if}

</main>
