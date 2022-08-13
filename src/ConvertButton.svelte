<script>
  import { convert } from "./convert"

  export let originalCanvas = undefined
  export let convertedCanvas = undefined
  export let k = undefined

  const handleClick = () => {
    convert(originalCanvas, convertedCanvas, k)
  }
</script>

<button on:click={handleClick}>Convert</button>
