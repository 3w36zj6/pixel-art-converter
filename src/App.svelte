<script lang="ts">
  let files
</script>

<main>
  <h1>Pixel Art Converter</h1>
  <input type="file" bind:files />

  {#if files && files[0]}
    <p>
      {files[0].name}
    </p>
  {/if}
</main>
