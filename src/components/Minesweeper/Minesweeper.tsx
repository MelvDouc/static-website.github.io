import SmallComponentWrapper from "@/components/SmallComponentWrapper/SmallComponentWrapper.jsx";
import MinesweeperGame from "./MinesweeperGame.js";
import "./Minesweeper.scss";

export default function Minesweeper() {
  const game = new MinesweeperGame({
    numberOfRows: 10,
    numberOfCols: 10,
    numberOfMines: 20
  });

  return (
    <SmallComponentWrapper>
      <div className="minesweeper">{game.cells.flat()}</div>
      <div>
        <button className="btn btn-primary" onclick={() => game.reset()}>New Game</button>
      </div>
    </SmallComponentWrapper>
  );
}