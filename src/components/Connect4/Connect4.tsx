import SmallComponentWrapper from "@/components/SmallComponentWrapper/SmallComponentWrapper.jsx";
import Board from "@/components/Connect4/Board.js";
import PlayerDisplay from "@/components/Connect4/PlayerDisplay.js";
import Game from "@/components/Connect4/game/Game.js";
import cssClasses from "@/components/Connect4/Connect4.module.scss";

export default function Connect4() {
  const game = new Game();

  return (
    <SmallComponentWrapper>
      <div className={cssClasses.connect4}>
        <PlayerDisplay
          onPlayerChange={(subscription) => game.onPlayerChange(subscription)}
          onResultChange={(subscription) => game.onResultChange((indices) => subscription(indices !== null))}
        />
        <Board game={game} />
        <div className={cssClasses.connect4Buttons}>
          <button
            className={["btn", "btn-primary"].join(" ")}
            onclick={() => game.undoLastMove()}
          >Undo</button>
          <button
            className={["btn", "btn-primary"].join(" ")}
            onclick={() => game.restart()}
          >New Game</button>
        </div>
      </div>
    </SmallComponentWrapper>
  );
}