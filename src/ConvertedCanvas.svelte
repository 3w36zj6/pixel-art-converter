<script>
  export let canvas = undefined
</script>

<canvas bind:this={canvas} width={0} height={0}/>

<style>
  canvas {
    width: 500px;
    image-rendering: pixelated;
  }
</style>
