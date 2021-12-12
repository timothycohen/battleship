<script>
  import Hit from './Hit.svelte'
</script>

<img class="icon--ship" src="/icons/ship.svg" alt="ship icon" />
<Hit on:mounted/>

<style>
  .icon--ship{
    position: absolute;
    bottom: 0;
    z-index: 1;

    transform: scale(.7) translateY(25%);
    animation: sink 1500ms 500ms ease-in-out forwards;
  }

  @keyframes sink{
    100%{ opacity: 0; transform: scale(.7) translateY(200%); }
  }

  @media only screen and (min-width: 550px) {
    @keyframes sink{
      100%{ opacity: 0; transform: scale(.7) translateY(200%); }
    }
  }

  @media only screen and (min-width: 750px) and (min-height: 750px) {
    @keyframes sink{
      100%{ opacity: 0; transform: scale(.7) translateY(200%); }
    }
  }

</style>
