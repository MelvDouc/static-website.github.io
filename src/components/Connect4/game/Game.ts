import { type Obs, obs } from "reactfree-jsx";
import getWinningLine from "./get-winning-line.js";
import BoardDimensions from "./BoardDimensions.js";
import Player, { type Checker } from "./Player.js";

export default class Game {
  private static readonly EMPTY_BOARD = Array.from({ length: BoardDimensions.HEIGHT }, () => {
    return Array(BoardDimensions.WIDTH).fill(0);
  }) as Checker[][];

  private static readonly DEFAULT_STATE = {
    player: Player.RED,
    board: Game.EMPTY_BOARD,
    winningIndices: null
  };

  private stateObs: Obs<GameState>;
  private readonly prevStates: GameState[] = [];

  constructor() {
    this.stateObs = obs(Game.DEFAULT_STATE);
  }

  public get activePlayer(): Player {
    return this.stateObs.value.player;
  }

  public get board(): Checker[][] {
    return this.stateObs.value.board;
  }

  public setChecker(y: number): void {
    if (this.stateObs.value.winningIndices)
      return;

    for (let x = BoardDimensions.HEIGHT - 1; x >= 0; x--) {
      if (this.board[x][y] !== 0)
        continue;

      const board = structuredClone(this.board);
      board[x][y] = this.activePlayer;

      this.prevStates.push(this.stateObs.value);
      this.stateObs.value = {
        board,
        winningIndices: getWinningLine(board, this.activePlayer, { x, y }),
        player: -this.activePlayer
      };
      return;
    }
  }

  public onPlayerChange(subscription: (player: Player) => void): void {
    this.stateObs.subscribe(({ player }) => subscription(player));
  }

  public onBoardChange(subscription: (board: Checker[][]) => void): void {
    this.stateObs.subscribe(({ board }) => subscription(board));
  }

  public onResultChange(subscription: (winningIndices: Set<number> | null) => void): void {
    this.stateObs.subscribe(({ winningIndices }) => subscription(winningIndices));
  }

  public undoLastMove(): void {
    const prevState = this.prevStates.pop();
    if (prevState)
      this.stateObs.value = prevState;
  }

  public restart(): void {
    this.prevStates.length = 0;
    this.stateObs.value = Game.DEFAULT_STATE;
  }
}

interface GameState {
  player: Player;
  board: Checker[][];
  winningIndices: Set<number> | null;
}