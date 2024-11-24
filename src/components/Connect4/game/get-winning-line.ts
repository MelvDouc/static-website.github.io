import BoardDimensions from "./BoardDimensions.js";
import Player, { type Checker } from "./Player.js";
import type { Coords as Coordinates } from "@/types.js";

const xOffsets = [0, 1, 1, 1];
const yOffsets = [1, 1, 0, -1];

export default function getWinningLine(board: Checker[][], player: Player, coords: Coordinates): Set<number> | null {
  for (let i = 0; i < xOffsets.length; i++) {
    const xOffset = xOffsets[i];
    const yOffset = yOffsets[i];
    const forwardCount = countConnectedCheckers(board, coords, player, xOffset, yOffset);
    const backwardCount = countConnectedCheckers(board, coords, player, -xOffset, -yOffset);

    if (forwardCount + backwardCount + 1 !== 4)
      continue;

    const indices = new Set<number>();

    for (let i = -backwardCount; i <= forwardCount; i++) {
      const x = coords.x + i * xOffset;
      const y = coords.y + i * yOffset;
      indices.add(x * BoardDimensions.WIDTH + y);
    }

    return indices;
  }

  return null;
}

function countConnectedCheckers(board: Checker[][], coords: Coordinates, player: Player, xOffset: number, yOffset: number): number {
  let count = 0;

  for (let i = 1; i < 4; i++) {
    const x = coords.x + xOffset * i;
    const y = coords.y + yOffset * i;

    if (!isSafe(x, y) || board[x][y] !== player)
      break;
    count++;
  }

  return count;
}

function isSafe(x: number, y: number) {
  return x >= 0 && x < BoardDimensions.HEIGHT && y >= 0 && y < BoardDimensions.WIDTH;
}