<script lang="ts">
  import Canvas from "./Canvas.svelte"
  import ConvertButton from "./ConvertButton.svelte"

  let files
  let canvas

  const loadImage = () => {
    const reader = new FileReader()
    reader.readAsDataURL(files[0])
    reader.onload = () => {
      const img = new Image()
      img.src = reader.result as string

      img.onload = () => {
        canvas.width = img.naturalWidth
        canvas.height = img.naturalHeight
        const ctx = canvas.getContext("2d")
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
      }
    }
  }
</script>

<main>
  <h1>Pixel Art Converter</h1>
  <input type="file" bind:files on:change={loadImage} />

  {#if files && files[0]}
    <p>
      {files[0].name}
    </p>
  {/if}
  <div>
    <Canvas bind:canvas />
  </div>
  <div>
    <ConvertButton />
  </div>
</main>
