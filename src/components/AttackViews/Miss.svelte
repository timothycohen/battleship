<script>
  import { onMount, createEventDispatcher } from 'svelte'
  import { audio } from '../../store'


	const dispatch = createEventDispatcher();

  onMount( () => {
    const splash = new Audio('./audio/splash.wav')
    splash.volume = .2
    $audio && splash.play();
    dispatch('mounted')
  });
</script>

  <img class="icon--splash" src="./icons/splash.svg" alt="splash icon" />

<style>
  .icon--splash{
    position: absolute;
    bottom: 0;
    width: 80vw;
    transform: scaleY(2) translateY(-25%);
  }

  @media only screen and (min-width: 600px) {
    .icon--splash{
      transform: scaleY(1) translateY(0%);
    }
  }
</style>
