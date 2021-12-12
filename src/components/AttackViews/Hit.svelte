<script>
  import { onMount } from 'svelte'
  import { createEventDispatcher } from 'svelte'

	const dispatch = createEventDispatcher();

  onMount( () => dispatch('mounted') )

</script>

<img class="icon--explosion" src="/icons/explosion.svg" alt="explosion icon" />

<style>

  .icon--explosion{
    position: fixed;
    bottom: 0;
    z-index: 2;
    animation: explode 700ms ease-in-out forwards;
    animation-play-state: running;
    opacity: 0;
    transform: scaleY(.2) scaleX(.2);
    transform-origin : 50% 100%;
  }

  @keyframes explode{
    100% { opacity: 1; transform: scaleY(1.5) scaleX(1); }
  }

  @media only screen and (min-width: 550px) {
    @keyframes explode{
      100% { opacity: 1; transform: scaleY(.45) scaleX(.7); }
    }
  }

  @media only screen and (min-width: 750px) and (min-height: 750px) {
    @keyframes explode{
      100% { opacity: 1; transform: scaleY(1.3) scaleX(1); }
    }
  }

</style>
