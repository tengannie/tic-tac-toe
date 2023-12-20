import { useState } from "react"

export default function PlayerInfo({initialName,symbol}) {
    const [playerName, setPlayerName] = useState(initialName)
    const [isEditing, setIsEditing] = useState(false)

    const handleChange= (event) => {
        setPlayerName(event.target.value)
    }
    const handleEditClick = ()=> {
        setIsEditing((editing)=> !editing)
    }

    return(
        <li>
          <span className="player">
            {isEditing ? <input type="text" value={playerName} onChange={handleChange}/> : <span className="player-name">{playerName}</span>}
            <span className="player-symbol">{symbol}</span>
          </span>
          <button onClick={handleEditClick}>{isEditing ? "Save" : "Edit"}</button>
        </li>
    )
}