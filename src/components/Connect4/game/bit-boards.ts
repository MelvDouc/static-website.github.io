import { cellOf, NB_CELLS } from "@/components/Connect4/game/BoardDimensions.js";

const MAX_BITBOARD = (1n << BigInt(NB_CELLS)) - 1n;
const CELL_MASKS: bigint[] = [];
const log2Map = new Map<bigint, number>();

for (let cell = 0; cell < NB_CELLS; cell++) {
  CELL_MASKS[cell] = 1n << BigInt(cell);
  log2Map.set(CELL_MASKS[cell], cell);
}

const not = (bitBoard: bigint): bigint => MAX_BITBOARD - bitBoard;
export const setCell = (bitBoard: bigint, cell: number): bigint => bitBoard | CELL_MASKS[cell];
export const clearCell = (bitBoard: bigint, cell: number): bigint => bitBoard & not(CELL_MASKS[cell]);
export const isCellSet = (bitBoard: bigint, cell: number): boolean => (bitBoard & CELL_MASKS[cell]) !== 0n;
export const bitboardOf = (y: number, x: number): bigint => 1n << BigInt(cellOf(y, x));

export function getCells(bitBoard: bigint): number[] {
  const cells: number[] = [];

  while (bitBoard) {
    const cell = log2Map.get(bitBoard & -bitBoard) as number;
    cells.push(cell);
    bitBoard &= (bitBoard - 1n);
  }

  return cells;
}