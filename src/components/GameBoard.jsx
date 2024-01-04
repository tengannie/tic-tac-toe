
export default function GameBoard( {onSelectSquare, board, isMobile}) {
    
   
        return <ol id={isMobile ? "game-board-mobile" : "game-board"}>
            {board.map((row, rowIndex)=> <li key={rowIndex}>
        <ol>
            {row.map((playerSymbol,colIndex)=> 
                        <li key={colIndex}>
                            <button onClick={()=> onSelectSquare(rowIndex,colIndex)} disabled={playerSymbol}>{playerSymbol}</button></li>)}
        </ol>
    </li>)}</ol>

}