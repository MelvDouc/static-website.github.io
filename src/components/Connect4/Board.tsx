import Cell from "./Cell.jsx";
import Game from "./game/Game.js";
import BoardDimensions from "./game/BoardDimensions.js";
import cssClasses from "./Board.module.scss";

export default function Board({ game }: { game: Game; }) {
  return (
    <div
      className={cssClasses.board}
      $init={(element) => {
        element.style.cssText = `--connect4-rows: ${BoardDimensions.HEIGHT}; --connect4-cols: ${BoardDimensions.WIDTH}`;
      }}
    >
      {game.board.map((row, x) => (
        row.map((_, y) => (
          <Cell
            setChecker={() => game.setChecker(y)}
            onCheckerChange={(listener) => {
              game.onBoardChange((board) => listener(board[x][y]));
            }}
            onResultChange={(onWinListener) => {
              game.onResultChange((winningLine) => {
                onWinListener(winningLine !== null && winningLine.has(x * BoardDimensions.WIDTH + y));
              });
            }}
          />
        ))
      ))}
    </div>
  );
}