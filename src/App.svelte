<script lang="ts">
  import Canvas from "./Canvas.svelte"

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
  <div>
    <Canvas />
  </div>
</main>
