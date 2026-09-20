const MAX_RUN = 0x7f

function equalPixel(data: Uint8Array, left: number, right: number, bytesPerPixel: number): boolean {
  for (let index = 0; index < bytesPerPixel; index += 1) {
    if (data[left + index] !== data[right + index]) return false
  }
  return true
}

/**
 * Older Xiaomi image RLE. A low control byte repeats one complete pixel.
 * The decoder also accepts high-bit literal packets found in some binaries.
 */
export function encodeRleV1(data: Uint8Array, bytesPerPixel: number): Uint8Array {
  if (bytesPerPixel < 1 || data.length % bytesPerPixel !== 0) {
    throw new Error(`RLE v1 input length ${data.length} is not divisible by bpp ${bytesPerPixel}`)
  }

  const output: number[] = []
  for (let offset = 0; offset < data.length;) {
    let count = 1
    while (
      count < MAX_RUN
      && offset + (count + 1) * bytesPerPixel <= data.length
      && equalPixel(data, offset, offset + count * bytesPerPixel, bytesPerPixel)
    ) {
      count += 1
    }
    output.push(count)
    for (let byte = 0; byte < bytesPerPixel; byte += 1) output.push(data[offset + byte] ?? 0)
    offset += count * bytesPerPixel
  }
  return Uint8Array.from(output)
}

export function decodeRleV1(encoded: Uint8Array, expectedLength: number, bytesPerPixel: number): Uint8Array {
  const output = new Uint8Array(expectedLength)
  let inputOffset = 0
  let outputOffset = 0

  while (inputOffset < encoded.length && outputOffset < output.length) {
    const control = encoded[inputOffset++] ?? 0
    const count = control & MAX_RUN
    if (count === 0) throw new Error('RLE v1 contains a zero-length packet')

    if ((control & 0x80) === 0) {
      if (inputOffset + bytesPerPixel > encoded.length) throw new Error('Truncated RLE v1 repeat packet')
      const pixel = encoded.subarray(inputOffset, inputOffset + bytesPerPixel)
      inputOffset += bytesPerPixel
      for (let repeat = 0; repeat < count; repeat += 1) {
        if (outputOffset + bytesPerPixel > output.length) throw new Error('RLE v1 expands beyond its declared size')
        output.set(pixel, outputOffset)
        outputOffset += bytesPerPixel
      }
    } else {
      const literalLength = count * bytesPerPixel
      if (inputOffset + literalLength > encoded.length || outputOffset + literalLength > output.length) {
        throw new Error('Truncated RLE v1 literal packet')
      }
      output.set(encoded.subarray(inputOffset, inputOffset + literalLength), outputOffset)
      inputOffset += literalLength
      outputOffset += literalLength
    }
  }

  if (outputOffset !== expectedLength) throw new Error(`RLE v1 produced ${outputOffset} bytes; expected ${expectedLength}`)
  return output
}

/** Palette/index RLE used by the modern mi8pro family, including o66. */
export function encodeRleV2(data: Uint8Array): Uint8Array {
  const output: number[] = []
  let offset = 0

  while (offset < data.length) {
    let repeat = 1
    while (repeat < MAX_RUN && offset + repeat < data.length && data[offset + repeat] === data[offset]) repeat += 1

    if (repeat >= 3) {
      output.push(repeat, data[offset] ?? 0)
      offset += repeat
      continue
    }

    const literalStart = offset
    offset += repeat
    while (offset < data.length && offset - literalStart < MAX_RUN) {
      let nextRepeat = 1
      while (nextRepeat < 3 && offset + nextRepeat < data.length && data[offset + nextRepeat] === data[offset]) nextRepeat += 1
      if (nextRepeat >= 3) break
      offset += Math.min(nextRepeat, MAX_RUN - (offset - literalStart))
    }
    const literalLength = offset - literalStart
    output.push(0x80 | literalLength)
    for (let index = literalStart; index < offset; index += 1) output.push(data[index] ?? 0)
  }

  return Uint8Array.from(output)
}

export function decodeRleV2(encoded: Uint8Array, expectedLength: number): Uint8Array {
  const output = new Uint8Array(expectedLength)
  let inputOffset = 0
  let outputOffset = 0

  while (inputOffset < encoded.length && outputOffset < output.length) {
    const control = encoded[inputOffset++] ?? 0
    const count = control & MAX_RUN
    if (count === 0) throw new Error('RLE v2 contains a zero-length packet')

    if ((control & 0x80) !== 0) {
      if (inputOffset + count > encoded.length || outputOffset + count > output.length) throw new Error('Truncated RLE v2 literal packet')
      output.set(encoded.subarray(inputOffset, inputOffset + count), outputOffset)
      inputOffset += count
      outputOffset += count
    } else {
      if (inputOffset >= encoded.length || outputOffset + count > output.length) throw new Error('Truncated RLE v2 repeat packet')
      output.fill(encoded[inputOffset++] ?? 0, outputOffset, outputOffset + count)
      outputOffset += count
    }
  }

  if (outputOffset !== expectedLength) throw new Error(`RLE v2 produced ${outputOffset} bytes; expected ${expectedLength}`)
  return output
}