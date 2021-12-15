<script>
  import { players, view, playerUp, boards, lastAttackLocation, boardSize} from './store'
  import Bomb from './components/Bomb.svelte'

  let pos

  function isFree(p) {
    if ($boards[0].squareStatus(p) === null || $boards[0].squareStatus(p) === 'ship') return true
    return false
  }

  function getFreeNeighbor(centerPos) {
    const positions = [[centerPos[0]-1, centerPos[1]], [centerPos[0]+1, centerPos[1]], [centerPos[0], centerPos[1]-1], [centerPos[0], centerPos[1]+1]]
    for (let i = 0; i < positions.length; i++){
      if (positions[i][0] < 0 || positions[i][1] < 0 || positions[i][0] > $boardSize || positions[i][1] > $boardSize) continue
      if (isFree(positions[i])) return positions[i]
    }
    return false
  }

  function getUnattackedPosRandomly() {
    if (pos && isFree(pos)) return
    pos = $players[$playerUp].chooseRandom($boardSize)
    getUnattackedPosRandomly()
  }

  // NOTIMPLEMENTED
  // this is smarter, but still not very smart. if it hits twice vertically in a row, it will still check horizontally
  // but it's smart enough to win if lucky
  // can check if two hits have been made in a direction to make it a bit smarter
  function getUnattackedPosCloseToHit() {
    for (let y = 0; y < $boardSize; y++){
      for (let x = 0; x < $boardSize; x++){
        let centerPos = [y, x]
        if ($boards[0].squareStatus(centerPos) !== 'hit') continue
        if (getFreeNeighbor(centerPos) === false) continue;
        pos = getFreeNeighbor(centerPos)
        return true
      }
    }
    return false;
  }

  function sendAttack() {
    if ($view !== 'computerAttack') return
    getUnattackedPosCloseToHit() || getUnattackedPosRandomly()

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
  <Bomb on:introend={sendAttack}/>
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
