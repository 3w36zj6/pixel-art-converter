<script>
  import { convert } from "./convert"

  export let canvas = undefined

  const handleClick = () => {
    convert(canvas)
  }
</script>

<button on:click={handleClick}>Convert</button>
