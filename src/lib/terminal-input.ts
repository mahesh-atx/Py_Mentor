export const TERMINAL_INPUT_BUFFER_BYTES = 64 * 1024;
export const TERMINAL_INPUT_HEADER_BYTES = Int32Array.BYTES_PER_ELEMENT * 2;
export const TERMINAL_MAX_INPUT_BYTES =
  TERMINAL_INPUT_BUFFER_BYTES - TERMINAL_INPUT_HEADER_BYTES;

export type TerminalInputBuffer = {
  buffer: SharedArrayBuffer;
  control: Int32Array;
  bytes: Uint8Array;
};

/** Create the shared hand-off used by the UI and the blocked Pyodide worker. */
export function createTerminalInputBuffer(): TerminalInputBuffer {
  const buffer = new SharedArrayBuffer(TERMINAL_INPUT_BUFFER_BYTES);
  return {
    buffer,
    control: new Int32Array(buffer, 0, 2),
    bytes: new Uint8Array(buffer, TERMINAL_INPUT_HEADER_BYTES),
  };
}

/**
 * Write one terminal line and wake Python's synchronous input() callback.
 * State 1 means input is available; state 2 means execution was cancelled.
 */
export function provideTerminalInput(
  input: TerminalInputBuffer,
  value: string
): void {
  const encoded = new TextEncoder().encode(value);
  if (encoded.byteLength > input.bytes.byteLength) {
    throw new Error(
      `Input is too long. The maximum is ${input.bytes.byteLength} UTF-8 bytes per line.`
    );
  }

  input.bytes.fill(0);
  input.bytes.set(encoded);
  Atomics.store(input.control, 1, encoded.byteLength);
  Atomics.store(input.control, 0, 1);
  Atomics.notify(input.control, 0, 1);
}

export function cancelTerminalInput(input: TerminalInputBuffer): void {
  Atomics.store(input.control, 0, 2);
  Atomics.notify(input.control, 0, 1);
}
