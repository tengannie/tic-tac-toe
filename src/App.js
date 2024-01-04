import { useState, useEffect } from "react"
import './App.css';
import PlayerInfo from './components/PlayerInfo';
import GameBoard from './components/GameBoard';
import Log from "./components/Log";
import GameOver from "./components/GameOver";
import { WINNING_COMBINATIONS } from "./components/winning_combination";

function deriveActivePlayer(gameTurns) {
  let currentPlayer = 'X';
  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = 'O'
  }
  return currentPlayer;
}

const PLAYERS = {
  X: 'Player 1',
  O: 'Player 2'
}
const INITIAL_GAME_BOARD = [
  [null,null,null],
  [null,null,null],
  [null,null,null]
]

function deriveGameBoard(gameTurns) {
  let gameBoard = [...INITIAL_GAME_BOARD.map(array=>[...array])];

  for (const turn of gameTurns) {
      const { square, player} = turn;
      const {row, col} = square;

      gameBoard[row][col] = player;
  }

  return gameBoard;
}
function deriveWinner(gameBoard, players) {
  let winner;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column]
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column]
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column]

    if (firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol) {
      winner = players[firstSquareSymbol];
    }
  }

  return winner;
}

function App() {
  const [players, setPlayers] = useState(PLAYERS);
  const [gameTurns, setGameTurns] = useState([])
  
  const activePlayer = deriveActivePlayer(gameTurns);
  
  const gameBoard = deriveGameBoard(gameTurns)

  const winner = deriveWinner(gameBoard, players);

  const hasDraw = gameTurns.length === 9 && !winner 

  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns( prevTurns => {
      const currentPlayer = deriveActivePlayer(prevTurns);
      const updatedTurns = [{ square: {row: rowIndex, col: colIndex}, player: currentPlayer},...prevTurns]

      return updatedTurns
    })
  }

  function handleRestart() {
    setGameTurns([]);
  }

  function handlePlayerName(symbol, newName) {
    setPlayers(prevPlayers => {
      return{
        ...prevPlayers,
        [symbol]: newName
      }
    })
  }

  const [width, setWidth] = useState(window.innerWidth);

    function handleWindowSizeChange() {
        setWidth(window.innerWidth);
    }
    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        }
    }, []);
    
    const isMobile = width <= 768;

  return (
    <main>
     <header><h1>TIC-TAC-TOE</h1></header>
    <div id="game-container">
      <ol id="players" className="highlight-player">
        <PlayerInfo initialName={PLAYERS.X} symbol="X" isActive={activePlayer==='X'} onChangeName={handlePlayerName} isMobile={isMobile}/>
        <PlayerInfo initialName={PLAYERS.O} symbol="O" isActive={activePlayer==='O'} onChangeName={handlePlayerName} isMobile={isMobile}/>
      </ol>
      {(winner || hasDraw) ? <GameOver winner={winner} onRestart={handleRestart}/> : <></>}
      <GameBoard onSelectSquare={handleSelectSquare} activesPlayerSymbol={activePlayer} board={gameBoard} isMobile={isMobile}/>
    </div>
    <Log turns={gameTurns}/>
    </main>
  );
}

export default App;
