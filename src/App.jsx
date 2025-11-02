import { useState } from "react";
import bg from "./assets/bg1.jpg";
import Board from "./Board";
/**
 * To collect data from multiple children, or to have two child components communicate with each other, declare the shared state in their parent
 * component instead. The parent component can pass that state back down to the children via props. This keeps the child components in sync with
 * each other and with their parent.
 *
 * Calling the setSquares function lets React know the state of the component has changed. This will trigger a re-render of the components that use
 * the squares state (Board) as well as its child components (the Square components that make up the board).
 *
 *
 * JavaScript supports closures which means an inner function (e.g. handleClick) has access to variables and functions defined in an outer function
 * (e.g. Board). The handleClick function can read the squares state and call the setSquares method because they are both defined inside of the
 * Board function.
 *
 * Here is why this doesn’t work. The handleClick(0) call will be a part of rendering the board component. Because handleClick(0) alters the state
 * of the board component by calling setSquares, your entire board component will be re-rendered again. But this runs handleClick(0) again, leading
 * to an infinite loop:
 * 
 * 
 *
 */
// TODO
/**
 * 
 * For the current move only, show “You are at move #…” instead of a button.
 * Rewrite Board to use two loops to make the squares instead of hardcoding them.
 * Add a toggle button that lets you sort the moves in either ascending or descending order.
 * When someone wins, highlight the three squares that caused the win (and when no one wins, display a message about the result being a draw).
 * Display the location for each move in the format (row, col) in the move history list.
 */

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [xIsNext, setXIsNext] = useState(true);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    setXIsNext(!xIsNext);
  }
  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
    setXIsNext(nextMove % 2 === 0);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (currentMove === move) {
      description = "You are here";
    } else if (move > 0) {
      description = "Go to move #" + move;
    } else {
      description = "Go to game start";
    }
    return (
      <li key={move}>
        <button
          className={currentMove === move ? "current-move" : ""}
          onClick={() => jumpTo(move)}
        >
          {description}
        </button>
      </li>
    );
  });
  return (
    <main className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </main>
  );
}
