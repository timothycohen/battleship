<script>
  import { fade } from 'svelte/transition'

</script>

    <img in:fade={{duration: 300, easing: (t) => t}}
      on:introend
      class="icon--splash" src="/icons/splash.svg" alt="splash icon"
    />

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
