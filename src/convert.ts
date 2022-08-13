const choose_at_random = (array, count: number) => {
    count = count || 1
    array = array.slice()

    const result = []
    for (const i of Array(count).keys()) {
        const arrayIndex = Math.floor(Math.random() * array.length)
        result[i] = array[arrayIndex]
        array.splice(arrayIndex, 1)
    }
    return result
}

const abs = (color1: number[], color2: number[]): number => {
    return (color1[0] - color2[0]) ** 2 + (color1[1] - color2[1]) ** 2 + (color1[2] - color2[2]) ** 2
}

export const convert = (originalCanvas: HTMLCanvasElement, convertedCanvas: HTMLCanvasElement, k: number) => {
    const originalContext = originalCanvas.getContext("2d")
    const imageData = originalContext.getImageData(0, 0, originalCanvas.width, originalCanvas.height)

    const pixels = []

    for (const y of Array(originalCanvas.height).keys()) {
        for (const x of Array(originalCanvas.width).keys()) {
            const base = (y * originalCanvas.width + x) * 4
            pixels.push([imageData.data[base + 0], imageData.data[base + 1], imageData.data[base + 2]])
        }
    }

    let chosenPixels = choose_at_random(pixels, k)
    let groupIndexes = []

    for (const _ of Array(10).keys()) {
        groupIndexes = []
        for (const pixel of pixels) {
            const distances = []
            for (const chosenPixel of chosenPixels) {
                distances.push(abs(pixel, chosenPixel))
            }
            groupIndexes.push(distances.indexOf(Math.min(...distances)))

        }

        const groupIndexCount = [...Array(k).keys()].map((i) => { return groupIndexes.filter(x => x == i).length })

        const means = [...Array(k).keys()].map((i) => { return [0, 0, 0] })

        for (const i of Array(pixels.length).keys()) {
            means[groupIndexes[i]][0] += pixels[i][0] / groupIndexCount[groupIndexes[i]]
            means[groupIndexes[i]][1] += pixels[i][1] / groupIndexCount[groupIndexes[i]]
            means[groupIndexes[i]][2] += pixels[i][2] / groupIndexCount[groupIndexes[i]]
        }

        chosenPixels = means

    }
    for (const y of Array(originalCanvas.height).keys()) {
        for (const x of Array(originalCanvas.width).keys()) {
            const base = (y * originalCanvas.width + x) * 4
            imageData.data[base + 0] = chosenPixels[groupIndexes[(y * originalCanvas.width + x)]][0]
            imageData.data[base + 1] = chosenPixels[groupIndexes[(y * originalCanvas.width + x)]][1]
            imageData.data[base + 2] = chosenPixels[groupIndexes[(y * originalCanvas.width + x)]][2]
            imageData.data[base + 3] = 255
        }
    }
    const convertedContext = convertedCanvas.getContext("2d")
    convertedContext.putImageData(imageData, 0, 0)

}