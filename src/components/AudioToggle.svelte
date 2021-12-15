<script>
import { audio } from '../store'

</script>

<div class="audio">
  {#if $audio}
    <img on:click={ ()=> $audio = !$audio } class="icon--volumeOn" src="/icons/volumeOn.svg" alt="volume on icon" />
  {:else}
    <img on:click={ ()=> $audio = !$audio } class="icon--volumeOff" src="/icons/volumeOff.svg" alt="volume off icon" />
  {/if}
</div>

<style>
  .audio{
    position: absolute;
    top: 0;
    right: 0;
    text-align: right;
    padding: 1rem 1rem 0 0;
    z-index: 10;
  }

  .audio > img{
    height: 2rem;
    width: 2rem;
    cursor: pointer;
  }

  @media only screen and (min-width: 750px) and (min-height: 750px) {
    .audio > img{
      height: 3rem;
      width: 3rem;
    }
  }

</style>
