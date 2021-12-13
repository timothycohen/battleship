<script>
  import { players, view, playerUp, boards, lastAttackLocation, boardSize} from './store'
  import Bomb from './components/Bomb.svelte'

  let pos

  function getUnattackedPos() {
    if (pos && ($boards[0].squareStatus(pos) === null || $boards[0].squareStatus(pos) === 'ship')) return
    pos = $players[$playerUp].chooseRandom($boardSize)
    getUnattackedPos()
  }

  function sendRandomAttack() {
    if ($view !== 'computerAttack') return

    getUnattackedPos()
    $lastAttackLocation = pos;
    $boards[0].receiveAttack(pos)
    const status = $boards[0].squareStatus(pos)

    if ($boards[0].gameOver()) $view = 'over'
    else if (status === 'sunk') $view = 'sunk'
    else if (status === 'hit') $view = 'hit'
    else $view = 'miss'
  }

</script>

<div class="fullScreen passScreen">
  <h1>{ $players[$playerUp].name } is returning fire!</h1>
  <Bomb on:introend={sendRandomAttack}/>
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
  }

  @media only screen and (min-width: 600px) {
    h1{
      font-size: 5rem;
    }
  }

</style>
