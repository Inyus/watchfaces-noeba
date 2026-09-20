export function assertRange(buffer: Uint8Array, offset: number, length: number, label = 'read'): void {
  if (!Number.isInteger(offset) || !Number.isInteger(length) || offset < 0 || length < 0 || offset + length > buffer.length) {
    throw new RangeError(`${label} is outside the binary: offset=${offset}, length=${length}, size=${buffer.length}`)
  }
}

export function readU16LE(buffer: Uint8Array, offset: number): number {
  assertRange(buffer, offset, 2, 'u16')
  return (buffer[offset] ?? 0) | ((buffer[offset + 1] ?? 0) << 8)
}

export function readI16LE(buffer: Uint8Array, offset: number): number {
  const value = readU16LE(buffer, offset)
  return value >= 0x8000 ? value - 0x1_0000 : value
}

export function readU24LE(buffer: Uint8Array, offset: number): number {
  assertRange(buffer, offset, 3, 'u24')
  return (buffer[offset] ?? 0) | ((buffer[offset + 1] ?? 0) << 8) | ((buffer[offset + 2] ?? 0) << 16)
}

export function readU32LE(buffer: Uint8Array, offset: number): number {
  assertRange(buffer, offset, 4, 'u32')
  return (
    (buffer[offset] ?? 0)
    | ((buffer[offset + 1] ?? 0) << 8)
    | ((buffer[offset + 2] ?? 0) << 16)
    | ((buffer[offset + 3] ?? 0) << 24)
  ) >>> 0
}

export function writeU16LE(buffer: Uint8Array, offset: number, value: number): void {
  assertRange(buffer, offset, 2, 'u16 write')
  buffer[offset] = value & 0xff
  buffer[offset + 1] = (value >>> 8) & 0xff
}

export function writeU24LE(buffer: Uint8Array, offset: number, value: number): void {
  assertRange(buffer, offset, 3, 'u24 write')
  buffer[offset] = value & 0xff
  buffer[offset + 1] = (value >>> 8) & 0xff
  buffer[offset + 2] = (value >>> 16) & 0xff
}

export function writeU32LE(buffer: Uint8Array, offset: number, value: number): void {
  assertRange(buffer, offset, 4, 'u32 write')
  buffer[offset] = value & 0xff
  buffer[offset + 1] = (value >>> 8) & 0xff
  buffer[offset + 2] = (value >>> 16) & 0xff
  buffer[offset + 3] = (value >>> 24) & 0xff
}

export function readNullTerminated(buffer: Uint8Array, offset: number, maximum: number): string {
  assertRange(buffer, offset, maximum, 'string')
  let end = offset
  while (end < offset + maximum && buffer[end] !== 0) end += 1
  return new TextDecoder().decode(buffer.subarray(offset, end))
}

export function writeFixedString(buffer: Uint8Array, offset: number, maximum: number, value: string): void {
  assertRange(buffer, offset, maximum, 'string write')
  const encoded = new TextEncoder().encode(value)
  buffer.fill(0, offset, offset + maximum)
  buffer.set(encoded.subarray(0, maximum), offset)
}

export function toHex(buffer: Uint8Array): string {
  return [...buffer].map((value) => value.toString(16).padStart(2, '0')).join('')
}