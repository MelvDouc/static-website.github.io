import Player from "./game/Player.js";

export default function PlayerDisplay({ onPlayerChange, onResultChange }: {
  onPlayerChange: (subscription: (player: Player) => void) => void;
  onResultChange: (subscription: (isWin: boolean) => void) => void;
}) {
  let player = Player.RED;
  let isWin = false;

  return (
    <div
      $init={(e) => {
        onResultChange((win) => {
          isWin = win;
          if (isWin)
            e.innerText = `${playerDiscs[player]} wins!`;
        });
        onPlayerChange((p) => {
          if (!isWin) {
            player = p;
            e.innerText = `${playerDiscs[player]} to move`;
          }
        });
      }}
    >{playerDiscs[player]} to move</div>
  );
}

const playerDiscs = {
  [Player.RED]: "🔴",
  [Player.YELLOW]: "🟡"
} as const;