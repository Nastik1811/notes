import React from 'react'

const TagChip = ({name, onClick, onDelete, selected}) => {
    return(

        <li className={selected ?"tag-chip selected" : "tag-chip" }>
            <span className="chip-text" onClick={onClick}>{name}</span>
            <button className="delete-btn" onClick={onDelete}></button>
        </li>
    )
}

export default TagChip