<script>
  import { createPlayer } from './scripts/create-player'
  import { players, view, playerUp } from './store'

  let player1Name;
  let player2Name;

  const startGame = () => {
    const playerNames = [player1Name, player2Name];
    $players = playerNames.map(createPlayer);
    $playerUp = 1;
    $view = 'setup'
  }

  // DEVTOOL : seed players
  // player1Name = 'Jane';
  // player2Name = 'Joe';
  // startGame();

</script>

<form id="players" on:submit|preventDefault={startGame}>
  <label for="player1">Player 1</label>
  <input id="player1" type="text" bind:value={player1Name}/>
  <label for="player2">Player 2</label>
  <input id="player2" type="text" bind:value={player2Name}/>
  <button class="newGameBtn">New Game</button>
</form>
