<script lang='ts'>
  import { pixelizeImageData } from './libs/pixelizeImageData'

  let files: FileList | null = null
  let originalCanvas: HTMLCanvasElement | null = null
  let originalImage: string | null = null
  let convertedCanvas: HTMLCanvasElement | null = null

  let k = 4
  let downScale = 4

  const readFileAsImage = (file: File): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        const img = new Image()
        img.src = reader.result as string
        img.onload = () => resolve(img)
        img.onerror = reject
      }
      reader.onerror = reject
    })
  }

  const drawImageToCanvas = (img: HTMLImageElement, canvas: HTMLCanvasElement, scale: number) => {
    canvas.width = img.naturalWidth / scale
    canvas.height = img.naturalHeight / scale
    const ctx = canvas.getContext('2d')
    if (!ctx)
      return
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
  }

  const convertToPixelArt = (srcCanvas: HTMLCanvasElement, dstCanvas: HTMLCanvasElement, k: number) => {
    const ctx = srcCanvas.getContext('2d')
    if (!ctx)
      return
    const imageData = ctx.getImageData(0, 0, srcCanvas.width, srcCanvas.height)
    const pixelized = pixelizeImageData(imageData, k)
    const dstCtx = dstCanvas.getContext('2d')
    if (!dstCtx)
      return
    dstCtx.putImageData(pixelized, 0, 0)
  }

  const loadImage = async () => {
    if (files && files[0] && originalCanvas && convertedCanvas) {
      const img = await readFileAsImage(files[0])
      originalImage = img.src
      drawImageToCanvas(img, originalCanvas, downScale)
      drawImageToCanvas(img, convertedCanvas, downScale)
      convertToPixelArt(originalCanvas, convertedCanvas, k)
    }
  }

  const handleConvert = () => {
    if (!originalCanvas || !convertedCanvas)
      return
    const ctx = originalCanvas.getContext('2d')
    if (!ctx)
      return
    const imageData = ctx.getImageData(0, 0, originalCanvas.width, originalCanvas.height)
    const pixelized = pixelizeImageData(imageData, k)
    const dstCtx = convertedCanvas.getContext('2d')
    if (!dstCtx)
      return
    dstCtx.putImageData(pixelized, 0, 0)
  }
</script>

<main>
  <h1>Pixel Art Converter</h1>
  <p>k-means法を用いたドット絵コンバーターです。初期値を乱数によって決定するため実行毎に結果が変化します。</p>
  <input type='file' bind:files on:change={loadImage} />
  <h2>Parameter</h2>
  <div>
    <p>k={k}</p>
    <input type='range' bind:value={k} on:change={loadImage} min='2' max='32' />
  </div>
  <div>
    <p>downscale={downScale}</p>
    <input type='range' bind:value={downScale} on:change={loadImage} min='1' max='16' />
  </div>
  <div>
    <button on:click={handleConvert}>Convert</button>
  </div>
  <h2>Image</h2>
  <div>
    <img src={originalImage} alt="" style='width: 500px;' />
    <canvas bind:this={originalCanvas} width={0} height={0} style='display: none;'></canvas>
    <canvas bind:this={convertedCanvas} width={0} height={0} style='width:500px; image-rendering:pixelated;'></canvas>
  </div>
  <h2>View on GitHub</h2>
  <p>
    <a href='https://github.com/3w36zj6/pixel-art-converter'
    ><img alt='pixel-art-converter' src='https://gh-card.dev/repos/3w36zj6/pixel-art-converter.svg' /></a
    >
  </p>
</main>

<style>
  input[type="range"] {
    width: 400px;
  }
</style>
