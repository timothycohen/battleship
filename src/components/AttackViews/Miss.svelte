<script>
  import { onMount } from 'svelte'
  import { createEventDispatcher } from 'svelte'

	const dispatch = createEventDispatcher();

  onMount( () => dispatch('mounted') )
</script>

  <img class="icon--splash" src="/icons/splash.svg" alt="splash icon" />

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
