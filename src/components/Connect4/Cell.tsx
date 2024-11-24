import Player, { type Checker } from "@/components/Connect4/game/Player.js";
import cssClasses from "./Cell.module.scss";

export default function Cell({ setChecker, onCheckerChange, onResultChange }: {
  onCheckerChange: (subscription: (checker: Checker) => void) => void;
  onResultChange: (subscription: (hasWinningIndex: boolean) => void) => void;
  setChecker: VoidFunction;
}) {
  const { cellRed, cellYellow, cellWin } = cssClasses;

  return (
    <div
      className={cssClasses.cell}
      onclick={setChecker}
      $init={(cell) => {
        const { classList } = cell;
        onCheckerChange((checker) => {
          switch (checker) {
            case Player.RED:
              classList.add(cellRed);
              break;
            case Player.YELLOW:
              classList.add(cellYellow);
              break;
            default:
              classList.remove(cellRed, cellYellow, cellWin);
          }
        });
        onResultChange((hasWinningIndex) => {
          hasWinningIndex
            ? classList.add(cellWin)
            : classList.remove(cellWin);
        });
      }}
    ></div>
  );
}