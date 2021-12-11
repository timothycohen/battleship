<script>
  import { fly } from 'svelte/transition'

  // calculate bomb size and a random flight trajectory
  let bombSize = .5*window.innerWidth
  let randX = (() => window.innerWidth*Math.random(window.innerWidth) * (Math.random() < .5 ? 1 : -1))()
  let randY = (() => window.innerWidth*Math.random(window.innerWidth) * (Math.random() < .5 ? 1 : -1))()

</script>

<img in:fly={{duration: 1500, x:randX, y:randY, easing: (t) => t}}
  on:introend
  class="icon--bomb" src="/icons/bomb.svg" alt="bomb icon"
  style="height: {bombSize}px; width: {bombSize}px;"
/>

<style>
  img{
    position: absolute;
    left: 0;
    top: 0;
  }
</style>
