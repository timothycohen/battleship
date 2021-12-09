<script>
  import { view } from './store'
  import { fade } from 'svelte/transition'

  function delayAndPass() {
    setTimeout(() => {
      $view = 'pass'
    }, 2000);
  }
</script>

<div class="fullScreen hit" on:click= { () => $view = 'pass' }>
    <h1>Hit!!!</h1>

    <img in:fade={{duration: 300, easing: (t) => t}}
      on:introend="{delayAndPass}"
      class="icon--explosion" src="/icons/explosion.svg" alt="explosion icon"
    />
</div>

<style>

  h1{
    padding: 2rem 2rem 0 0;
    font-size: 3rem;
    width: 100%;
    text-align: right;
    z-index: 5;
    color: var(--bluedarken70);
  }

  .icon--explosion{
    position: absolute;
    bottom: 0;
    width: 80vw;
    transform: scaleY(2) translateY(-25%);
  }

  @media only screen and (min-width: 600px) {
    h1{
      font-size: 5rem;
    }
    .icon--explosion{
      transform: scaleY(1) translateY(0%);
    }
  }
</style>
