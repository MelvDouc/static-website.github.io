import { coordsToIndex } from "@/utils/coords.js";
import type MinesweeperGame from "./MinesweeperGame.js";

export default class MinesweeperCell extends HTMLElement {
  readonly #game: MinesweeperGame;
  readonly #x: number;
  readonly #y: number;
  readonly #index: number;

  constructor({ x, y, game }: {
    x: number;
    y: number;
    game: MinesweeperGame;
  }) {
    super();
    this.#x = x;
    this.#y = y;
    this.#index = coordsToIndex(x, y, game.numberOfRows);
    this.#game = game;
    this.covered = true;

    this.addEventListener("click", () => {
      if (this.#game.isOver)
        return;
      if (!this.#game.areMinesPlaced)
        this.#game.placeMines(this.index);
      if (this.canBeUncovered())
        this.#game.uncover(this);
    });
    this.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      if (this.#game.isOver)
        return;
      if (this.covered)
        this.#game.toggleFlag(this);
    });
  }

  get covered(): boolean {
    return this.dataset.covered === "1";
  }

  set covered(covered: boolean) {
    this.dataset.covered = covered ? "1" : "0";
  }

  get flagged(): boolean {
    return this.dataset.flagged === "1";
  }

  set flagged(flagged: boolean) {
    this.dataset.flagged = flagged ? "1" : "0";
  }

  get index(): number {
    return this.#index;
  }

  get x(): number {
    return this.#x;
  }

  get y(): number {
    return this.#y;
  }

  canBeUncovered(): boolean {
    return this.covered && !this.flagged;
  }

  revealMine(): void {
    this.dataset.mined = "1";
  }

  reset(): void {
    this.covered = true;
    this.flagged = false;
    delete this.dataset.mined;
    this.innerText = "";
  }
}

customElements.define("minesweeper-cell", MinesweeperCell);
