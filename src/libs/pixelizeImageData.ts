const chooseAtRandom = (array: number[][], count: number): number[][] => {
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

export const pixelizeImageData = (imageData: ImageData, k: number): ImageData => {
    const { width, height, data } = imageData
    const pixels: number[][] = []

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const base = (y * width + x) * 4
            pixels.push([data[base + 0], data[base + 1], data[base + 2]])
        }
    }

    let chosenPixels = chooseAtRandom(pixels, k)
    let groupIndexes: number[] = []

    for (let iter = 0; iter < 10; iter++) {
        groupIndexes = []
        for (const pixel of pixels) {
            const distances = chosenPixels.map(cp => abs(pixel, cp))
            groupIndexes.push(distances.indexOf(Math.min(...distances)))
        }

        const groupIndexCount = Array.from({ length: k }, (_, i) => groupIndexes.filter(x => x === i).length)
        const means = Array.from({ length: k }, () => [0, 0, 0])

        for (let i = 0; i < pixels.length; i++) {
            means[groupIndexes[i]][0] += pixels[i][0] / groupIndexCount[groupIndexes[i]]
            means[groupIndexes[i]][1] += pixels[i][1] / groupIndexCount[groupIndexes[i]]
            means[groupIndexes[i]][2] += pixels[i][2] / groupIndexCount[groupIndexes[i]]
        }

        chosenPixels = means
    }

    const newData = new Uint8ClampedArray(data.length)
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const base = (y * width + x) * 4
            const color = chosenPixels[groupIndexes[y * width + x]]
            newData[base + 0] = color[0]
            newData[base + 1] = color[1]
            newData[base + 2] = color[2]
            newData[base + 3] = 255
        }
    }
    return new ImageData(newData, width, height)
}
