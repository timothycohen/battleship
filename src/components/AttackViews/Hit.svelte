<script>
  import { fade } from 'svelte/transition'

</script>

    <img in:fade={{duration: 300, easing: (t) => t}}
      on:introend
      class="icon--explosion" src="/icons/explosion.svg" alt="explosion icon"
    />

<style>

  .icon--explosion{
    position: absolute;
    bottom: 0;
    width: 80vw;
    transform: scaleY(2) translateY(-25%);
  }

  @media only screen and (min-width: 600px) {
    .icon--explosion{
      transform: scaleY(1) translateY(0%);
    }
  }
</style>
