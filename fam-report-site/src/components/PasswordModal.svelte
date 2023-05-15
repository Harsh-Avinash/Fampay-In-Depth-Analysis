<script>
  let password = "";
  let showErrorMessage = false;
  const correctPassword = "harshu2002";

  function checkPassword() {
    if (password !== correctPassword) {
      password = "";
      showErrorMessage = true;
    } else {
      showErrorMessage = false;
      // Here you would normally set the authenticated status in localStorage and hide the modal,
      // but Astro doesn't support this as of my knowledge cutoff in September 2021.
    }
  }
</script>

<div id="passwordModal" class="modal">
  <!-- Modal content -->
  <div class="modal-content">
    <p>Please enter the password to access this website:</p>
    <input type="password" bind:value={password} class="password-input" />
    {#if showErrorMessage}
      <p style="color: red;">Incorrect password, please try again.</p>
    {/if}
    <button on:click={checkPassword}>Submit</button>
  </div>
</div>

<style>
  /* Add your modal styles here */
</style>
