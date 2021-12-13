<script>
  export let disabled = false;
</script>

<button class="finishedBtn" disabled={disabled} on:click>Ready!</button>

<style>
.finishedBtn{
  color: var(--bluedarken40);
  padding: .75rem 1rem;
  font-size: 2rem;
  font-weight: bolder;
  box-shadow: 0 5px 15px -7px var(--gold);
  border-radius: 5px;
}

.finishedBtn:hover:not(:disabled){
  box-shadow: 0 5px 15px 0px var(--gold);
  cursor: pointer;
}

.finishedBtn:disabled{
  box-shadow: none;
}
</style>
