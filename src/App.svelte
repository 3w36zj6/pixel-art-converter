<script lang="ts">
  import OriginalCanvas from "./OriginalCanvas.svelte"
  import ConvertedCanvas from "./ConvertedCanvas.svelte"
  import ConvertButton from "./ConvertButton.svelte"

  import { convert } from "./convert"

  let files
  let originalCanvas
  let originalImage
  let convertedCanvas

  let k = 4
  let downScale = 4

  const loadImage = () => {
    const reader = new FileReader()
    if (files && files[0]) {
      reader.readAsDataURL(files[0])
      reader.onload = () => {
        const img = new Image()
        img.src = reader.result as string

        img.onload = () => {
          originalImage = reader.result
          originalCanvas.width = img.naturalWidth / downScale
          originalCanvas.height = img.naturalHeight / downScale
          convertedCanvas.width = img.naturalWidth / downScale
          convertedCanvas.height = img.naturalHeight / downScale

          const originalContext = originalCanvas.getContext("2d")
          const convertedContext = convertedCanvas.getContext("2d")
          originalContext.drawImage(
            img,
            0,
            0,
            originalCanvas.width,
            originalCanvas.height
          )
          convertedContext.drawImage(
            img,
            0,
            0,
            originalCanvas.width,
            originalCanvas.height
          )
          convert(originalCanvas, convertedCanvas, k)
        }
      }
    }
  }
</script>

<main>
  <h1>Pixel Art Converter</h1>
  <p>
    k-means法を用いたドット絵コンバーターです。初期値を乱数によって決定するため実行毎に結果が変わります。
  </p>
  <input type="file" bind:files on:change={loadImage} />
  <h2>Parameter</h2>
  <div>
    <p>k={k}</p>
    <input type="range" bind:value={k} on:change={loadImage} min="2" max="32" />
  </div>
  <div>
    <p>downscale={downScale}</p>
    <input
      type="range"
      bind:value={downScale}
      on:change={loadImage}
      min="1"
      max="16"
    />
  </div>
  <div>
    <ConvertButton {originalCanvas} {convertedCanvas} {k} />
  </div>
  <h2>Image</h2>
  <div>
    <img src={originalImage} alt="" />
    <OriginalCanvas bind:canvas={originalCanvas} />
  </div>
  <div>
    <ConvertedCanvas bind:canvas={convertedCanvas} />
  </div>
  <h2>Twitterでつぶやく</h2>
  <p>
    画像は自動で挿入されません。ダウンロードまたはクリップボードにコピーしてから添付してください。
  </p>
  <ul>
    <li>
      <a
        href="https://twitter.com/intent/tweet?hashtags=pixelart&amp;text=ドット絵コンバーター%20/%20Pixel%20Art%20Converter&amp;url={location.toString()}"
        >Tweet</a
      >
    </li>
  </ul>
</main>

<style>
  img {
    width: 400px;
  }

  input[type="range"] {
    width: 400px;
  }
</style>
