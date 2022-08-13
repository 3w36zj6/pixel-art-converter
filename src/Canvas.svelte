<script>
  import { onMount } from "svelte"

  export let canvas = undefined

  onMount(() => {
    const ctx = canvas.getContext("2d")

    ctx.fillRect(25, 25, 100, 100)
    ctx.clearRect(45, 45, 60, 60)
    ctx.strokeRect(50, 50, 50, 50)
  })
</script>

<canvas bind:this={canvas} />
