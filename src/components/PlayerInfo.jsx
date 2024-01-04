import { useState } from "react"

export default function PlayerInfo({initialName,symbol, isActive, onChangeName, isMobile}) {
    const [playerName, setPlayerName] = useState(initialName)
    const [isEditing, setIsEditing] = useState(false)

    const handleChange= (event) => {
        setPlayerName(event.target.value)
    }
    const handleEditClick = ()=> {
        setIsEditing((editing)=> !editing)
        if (isEditing) {
            onChangeName(symbol, playerName)
        }
    }

    const mobileCSS = isMobile ? "-mobile" : ''

    return(
        <li className={isActive ? "active" : undefined}>
          <div className={`player${mobileCSS}`}>
          <span className="player-symbol">{symbol}</span>
            {isEditing ? <input type="text" value={playerName} onChange={handleChange}/> : <span className={`player-name${mobileCSS}`}>{playerName}</span>}
          <button onClick={handleEditClick}>{isEditing ? "Save" : "Edit"}</button>
          </div>
        </li>
    )
}