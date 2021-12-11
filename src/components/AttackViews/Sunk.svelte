<script>
  import { fade } from 'svelte/transition'

</script>

  <div class="fullScreen sunk">
    <img class="icon--explosion" src="/icons/explosion.svg" alt="explosion icon" />
    <img in:fade={{duration: 300, easing: (t) => t}} on:introend class="icon--ship" src="/icons/ship.svg" alt="ship icon" />
  </div>

<style>

  .sunk{
    overflow: hidden;
    max-height: 100vh;
  }

  .icon--explosion{
    position: absolute;
    bottom: 0;
    width: 100vw;
    z-index: 2;
    animation: explode 500ms ease-in-out forwards;
  }
  .icon--ship{
    position: absolute;
    bottom: 0;
    width: 100vw;
    transform: scaleY(2) translateY(-25%);
    z-index: 1;
    animation: sink 2s 500ms ease-in-out forwards;
  }

  @keyframes sink{
    0% {
      opacity: 1;
    }
    99% {
      opacity: 0;
      transform: translateY(100%);
    }
    100%{
      opacity: 0;
      transform: translateY(100%);
      display: none;
    }
  }

  @keyframes explode{
    0% {
      opacity: 0;
      transform: scale(.2) translateY(-25%);
    }
    100% {
      opacity: 1;
      transform: scale(1.2) translateY(-25%);
    }
  }


  @media only screen and (min-width: 600px) {
    .icon--explosion{
      transform: scaleY(1) translateY(0%);
    }

  }
</style>
