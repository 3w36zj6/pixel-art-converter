<script>
  import { onMount } from "svelte"

  let canvas

  onMount(() => {
    const ctx = canvas.getContext("2d")

    ctx.fillRect(25, 25, 100, 100)
    ctx.clearRect(45, 45, 60, 60)
    ctx.strokeRect(50, 50, 50, 50)
  })
</script>

<canvas bind:this={canvas} width={320} height={320} />
