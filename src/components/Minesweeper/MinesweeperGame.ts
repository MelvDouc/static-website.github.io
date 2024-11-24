import { obs, type Obs } from "reactfree-jsx";
import { adjacentCoords, coordsToIndex } from "@/utils/coords.js";
import { randomInt } from "@/utils/random.js";
import AlertBox from "@/components/AlertBox/AlertBox.jsx";
import MinesweeperCell from "./MinesweeperCell.jsx";

export default class MinesweeperGame {
  readonly #numberOfRows: number;
  readonly #numberOfCols: number;
  readonly #numberOfMines: number;
  readonly #cells: MinesweeperCell[][];
  readonly #flagCountObs: Obs<number>;
  readonly #minedIndices = new Set<number>();
  #statusObs: Obs<"ongoing" | "win" | "loss">;

  constructor({ numberOfRows, numberOfCols, numberOfMines }: {
    numberOfRows: number;
    numberOfCols: number;
    numberOfMines: number;
  }) {
    this.#numberOfRows = numberOfRows;
    this.#numberOfCols = numberOfCols;
    this.#numberOfMines = numberOfMines;
    this.#cells = Array.from({ length: numberOfRows }, (_, x) => {
      return Array.from({ length: numberOfCols }, (_, y) => {
        return new MinesweeperCell({ x, y, game: this });
      });
    });
    this.#flagCountObs = obs(numberOfMines);
    this.#statusObs = obs("ongoing");

    this.#flagCountObs.subscribe(() => {
      if (this.isWin())
        this.#statusObs.value = "win";
    });

    this.#statusObs.subscribe((status) => {
      switch (status) {
        case "win":
          document.body.addEventListener("animationend", (e) => {
            if (e.animationName !== "rotate_body") return;
            document.body.classList.remove("rotate-body");
            AlertBox.create({ message: "You win!" });
          }, { once: true });
          document.body.classList.add("rotate-body");
          break;
        case "loss":
          this.#cells.forEach((row) => {
            row.forEach((cell) => {
              cell.covered = false;
              cell.flagged = false;
              if (this.#isMineAtIndex(cell.index))
                cell.revealMine();
            });
          });
          AlertBox.create({ message: "Boom!", type: "danger" });
          break;
        case "ongoing":
          this.#flagCountObs.value = this.#numberOfMines;
          this.#minedIndices.clear();
          this.#cells.forEach((row) => {
            row.forEach((cell) => cell.reset());
          });
      }
    });
  }

  get areMinesPlaced(): boolean {
    return this.#minedIndices?.size > 0;
  }

  get cells(): MinesweeperCell[][] {
    return this.#cells;
  }

  get isOver(): boolean {
    return this.#statusObs.value !== "ongoing";
  }

  get numberOfRows(): number {
    return this.#numberOfRows;
  }

  #isMineAtIndex(index: number): boolean {
    return this.#minedIndices.has(index);
  }

  countAdjacentMines(x: number, y: number): number {
    let count = 0;

    for (const coords of adjacentCoords(x, y, this.#numberOfRows, this.#numberOfCols))
      if (this.#isMineAtIndex(coordsToIndex(coords.x, coords.y, this.#numberOfRows)))
        count++;

    return count;
  }

  isWin(): boolean {
    return this.#flagCountObs.value === 0 && this.#cells.every((row) => {
      return row.every((cell) => {
        return this.#isMineAtIndex(cell.index) ? cell.flagged : !cell.covered;
      });
    });
  }

  placeMines(excludedIndex: number): void {
    this.#minedIndices.add(excludedIndex);
    const numberOfCells = this.#numberOfRows * this.#numberOfCols;

    while (this.#minedIndices.size < this.#numberOfMines + 1) {
      this.#minedIndices.add(randomInt(0, numberOfCells - 1));
    }

    this.#minedIndices.delete(excludedIndex);
  }

  reset(): void {
    this.#statusObs.value = "ongoing";
  }

  toggleFlag(cell: MinesweeperCell): void {
    if (cell.flagged) {
      cell.flagged = false;
      this.#flagCountObs.value++;
      return;
    }
    if (this.#flagCountObs.value > 0) {
      cell.flagged = true;
      this.#flagCountObs.value--;
    }
  }

  uncover(cell: MinesweeperCell, isFirstTime = true, visitedIndices = new Set<number>()): void {
    cell.covered = false;

    if (this.#isMineAtIndex(cell.index)) {
      this.#statusObs.value = "loss";
      return;
    }

    visitedIndices.add(cell.index);
    const adjacentMineCount = this.countAdjacentMines(cell.x, cell.y);

    if (adjacentMineCount > 0)
      cell.innerText = String(adjacentMineCount);

    if (this.isWin()) {
      this.#statusObs.value = "win";
      return;
    }

    if (adjacentMineCount > 0 && !isFirstTime)
      return;

    for (const coords of adjacentCoords(cell.x, cell.y, this.#numberOfRows, this.#numberOfCols)) {
      const peer = this.#cells[coords.x][coords.y];
      if (!visitedIndices.has(peer.index) && peer.canBeUncovered() && !this.#isMineAtIndex(peer.index))
        this.uncover(peer, false, visitedIndices);
    }
  }
}