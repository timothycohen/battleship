<script>
  import { view } from './store'

  setTimeout(() => $view = 'pass', 2000);

</script>

<div class="fullScreen sunk" on:click= { () => $view = 'pass' }>
    <h1>SUNK!!!</h1>
    <img class="icon--explosion" src="/icons/explosion.svg" alt="explosion icon" />
    <img class="icon--ship" src="/icons/ship.svg" alt="ship icon" />
</div>

<style>

  .sunk{
    overflow: hidden;
    max-height: 100vh;
  }

  h1{
    padding: 2rem 2rem 0 0;
    font-size: 3rem;
    width: 100%;
    text-align: right;
    z-index: 3;
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
    h1{
      font-size: 5rem;
    }
    .icon--explosion{
      transform: scaleY(1) translateY(0%);
    }

  }
</style>
